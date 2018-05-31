define(['App'], function (app) {
    app.register.controller('PwdGetCodeController',
        ['$scope','UsersService', '$interval', '$cookieStore', '$ionicPopup', 'gToast', 'HelpAlterService', '$state',function ($scope, UsersService, $interval, $cookieStore, $ionicPopup, gToast, HelpAlterService, $state) {
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
                            $scope.Popup = HelpAlterService.ImageCode($scope, $scope.User.PhoneNumber, 7, $scope.GetSms, data.Result.ImageCaptch);

                        }
                    }
                });
            };

            //缓存手机号
            $scope.SaveNumber = function () {
                $cookieStore.put("PhoneNumber", $scope.viewModel.User.PhoneNumber);
            };

            $scope.nextPage = function () {


                UsersService.VerifyMobile($scope.viewModel.User.PhoneNumber).then(function (result) {
                    if (result.Success) {
                        //        $scope.viewModel.User.status = result.Result.data.status;
                        //        if (result.Result.data.status == 0 || result.Result.data.status == 1) {
                        //            statusMessage($scope.viewModel.User.status)
                        //        } else {

                        UsersService.SendValidCode($scope.viewModel.User.PhoneNumber, 2, $scope.viewModel.User.validateCode, "").then(function (data) { //2:忘记密码 
                            console.log(data);
                            if (data.Success) {
                                UsersService.ResetPwdModel.Mobile = $scope.viewModel.User.PhoneNumber;
                                UsersService.ResetPwdModel.MessageCaptcha = $scope.viewModel.User.validateCode;

                                console.log(result);
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
            });
        }]);
});
