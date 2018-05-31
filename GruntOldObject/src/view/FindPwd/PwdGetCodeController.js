define(['App'], function (app) {
    app.register.controller('PwdGetCodeController',
        ['$scope', 'UsersService', '$cookieStore', '$ionicPopup', 'gToast', 'HelpAlterService', '$state', '$interval', function ($scope, UsersService, $cookieStore, $ionicPopup, gToast, HelpAlterService, $state, $interval) {
            $scope.viewModel = {
                User: {
                    PhoneNumber: $cookieStore.get("PhoneNumber"),
                    validateCode: "",
                    status: -1
                },
            }
            var statusMessage = function (status) {
                if (status == 0) {
                    gToast.open("该手机号码未注册！");
                    return;
                } else if (status == 1) {
                    gToast.open("该手机号码已过期！");
                    return;
                }
            }

            HelpAlterService.SetTime($scope, "PwdGetCode");


            $scope.GetSms = function () { 
                UsersService.GetSms($scope.viewModel.User.PhoneNumber, 2).then(function (data) { //2:忘记密码 
                    if (data.Success && !data.Result.HasImageCaptcha) {
                        HelpAlterService.BeginTime($scope, "PwdGetCode");
                    } else {
                        if (data.Success && data.Result.HasImageCaptcha) {
                            $scope.Popup = HelpAlterService.ImageCode($scope, $scope.viewModel.User.PhoneNumber, 2, $scope.GetSms, data.Result.ImageCaptch);

                        }
                    }
                }); 
            }

            //缓存手机号
            $scope.SaveNumber = function () {
                $cookieStore.put("PhoneNumber", $scope.viewModel.User.PhoneNumber);
            }

            $scope.nextPage = function () {
                if ($scope.viewModel.User.validateCode == "") {
                    gToast.open("请输入验证码！");
                    return false;
                }

                UsersService.VerifyMobile($scope.viewModel.User.PhoneNumber).then(function (result) {
                    if (result.Success) { 

                        UsersService.SendValidCode($scope.viewModel.User.PhoneNumber, 7, $scope.viewModel.User.validateCode, "").then(function (data) { //2:忘记密码 
                            console.log(data);
                            if (data.Success) {
                                HelpAlterService.EndTime($scope, "PwdGetCode");
                                UsersService.ResetPwdModel.Mobile = $scope.viewModel.User.PhoneNumber;
                                UsersService.ResetPwdModel.MessageCaptcha = $scope.viewModel.User.validateCode;

                                if (result.Result.Result) { 
                                    $state.go("PwdSetVerify"); 
                                } else { 
                                    $state.go("PwdSetNewPwd"); 
                                }
                            }
                        });

                    }
                });

            };

            //当我们用完模型时，清除对应的对象
            $scope.$on("$destroy", function () {
                if ($scope.Popup != null) {
                    $scope.Popup.close(false);
                } 
                HelpAlterService.EndTime($scope, "PwdGetCode");  
            });
        }]);
});
