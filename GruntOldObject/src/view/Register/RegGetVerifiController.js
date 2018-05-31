define(['App'], function (app) {
    app.register.controller('RegGetVerifiController',
        ['$scope', 'gToast', 'VerificationHelp', 'UsersService', '$interval', '$ionicPopup', 'HelpAlterService',function ($scope, gToast, VerificationHelp, UsersService, $interval, $ionicPopup, HelpAlterService) {

            $scope.User = {
                PhoneNumber: "", Pwd1: "", Pwd2: "", isshow: true,
                pwdType1: "text", pwdType2: "text", status: -1, validateCode: ""
            };
            if (HelpAlterService.ContractHelp.hasToContract) {
                $scope.User = HelpAlterService.ContractHelp.content;
                if (HelpAlterService.ContractHelp.hasValue) {
                    $scope.User.isshow = true;
                    HelpAlterService.ContractHelp.hasValue = true;
                }
                $scope.User.pwdType1 = "text";
                $scope.User.pwdType2 = "text";
                HelpAlterService.ContractHelp.hasToContract = false;
            } 

            HelpAlterService.SetTime($scope, "RegGetVerifi"); 

            $scope.GetSms = function () { 
                UsersService.GetSms($scope.User.PhoneNumber, 1).then(function (data) { //1:注册 
                    console.log(data);
                    if (data.Success && data.Result.HasImageCaptcha) {
                        $scope.Popup = HelpAlterService.ImageCode($scope, $scope.User.PhoneNumber, 1, $scope.GetSms, data.Result.ImageCaptch);
                    } else if (data.Success && !data.Result.HasImageCaptcha) {
                        HelpAlterService.BeginTime($scope, "RegGetVerifi");
                    }
                }); 

            }

            $scope.Commit = function () {

                if (!VerificationHelp.PhoneVerification($scope.User.PhoneNumber)) {
                    gToast.open("请输入正确的手机号！");
                    return false;
                }

                if ($scope.User.Pwd1 == "" || $scope.User.Pwd2 == "") {
                    gToast.open("密码不能为空！");
                    return false;
                }

                if (!VerificationHelp.PwdVerification($scope.User.Pwd1)) {
                    gToast.open("密码由6-14位数字和字母组成！");
                    return false;
                }

                if ($scope.User.Pwd1 != $scope.User.Pwd2) {
                    gToast.open("您2次输入的密码不一致，请重新输入！");
                    return false;
                }
                if ($scope.User.validateCode=="") {
                    gToast.open("请输入验证码");
                    return false;
                }
                //验证协议是否同意

                if (!$scope.User.isshow) {
                    gToast.open("协议未确认，请确认协议！");
                    return false;
                } else {
                    UsersService.ufoUser.regAcpt = 1;
                }

                //验证验证码信息

                //验证  短信验证码
                UsersService.SendValidCode($scope.User.PhoneNumber, 6, $scope.User.validateCode, "").then(function (data) { //1、注册  

                    if (data.Success) {
                        HelpAlterService.EndTime($scope, "RegGetVerifi");
                        UsersService.ufoUser.Mobile = $scope.User.PhoneNumber;
                        UsersService.ufoUser.Password = $scope.User.Pwd1;
                        UsersService.ufoUser.Captcha = $scope.User.validateCode;
                        location.replace("#/RegReferrer");
                    }
                });
            }

            

            var statusMessage = function (status) {
                if (status == 1) {
                    gToast.open("该手机号码已过期！");
                    return;
                } else if (status == 2 || status == 3) {
                    gToast.open("该手机号码已注册！");
                    return;
                }
            }
 

            //合同预览
            $scope.PreviewContrart = function (title) {
                HelpAlterService.ContractHelp.hasToContract = true;
                HelpAlterService.ContractHelp.content = $scope.User;
                HelpAlterService.SetlocalStorage.Agreement.Title(title);
                location.href = "#/RegSetIdentification/1/1/1/0"
            }

            //当我们用完模型时，清除对应的对象
            $scope.$on("$destroy", function () {
                if ($scope.Popup != null) {
                    $scope.Popup.close(false);
                }
                HelpAlterService.EndTime($scope, "RegGetVerifi");
            });
        }]);
});
