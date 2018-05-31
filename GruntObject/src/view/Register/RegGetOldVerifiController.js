/// <reference path="../../templates/Modal/PreviewContart.html" />
define(['App'], function (app) {
    app.register.controller('RegGetOldVerifiController',
        ['$scope', 'UsersService', '$interval', '$ionicActionSheet', 'VerificationHelp', 'gToast', '$ionicPopup', 'HelpAlterService', function ($scope, UsersService, $interval, $ionicActionSheet, VerificationHelp, gToast, $ionicPopup, HelpAlterService) {

            $scope.User = {
                PhoneNumber: "", Pwd1: "", Pwd2: "",
                CardName: "证件类型", CardType: "",
                CardId: "", isshow: true, isshow2: true,
                pwdType1: "text", pwdType2: "text",
                status: -1, validateCode: "", cardState: false
            };
            if (HelpAlterService.ContractHelp.hasToContract) {
                $scope.User = HelpAlterService.ContractHelp.content;
                if (HelpAlterService.ContractHelp.hasValue) {
                    if ($scope.User.resType == 1) {
                        $scope.User.isshow = true;
                    }
                    if ($scope.User.resType == 2) {
                        $scope.User.isshow2 = true;
                    }
                    HelpAlterService.ContractHelp.hasValue = true;
                }
                $scope.User.pwdType1 = "text";
                $scope.User.pwdType2 = "text";
                HelpAlterService.ContractHelp.hasToContract = false;
            };


            var statusMessage = function (status) {
                if (status == 1) {
                    gToast.open("该手机号码已过期！");
                    return;
                } else if (status == 2 || status == 3) {
                    gToast.open("该手机号码已注册！");
                    return;
                }
            };


            HelpAlterService.SetTime($scope, "RegGetOldVerifi");

            $scope.GetSms = function () {
                UsersService.GetSms($scope.User.PhoneNumber, 1).then(function (data) { //1:注册  
                    console.log(data);
                    if (data.Success && data.Result.HasImageCaptcha) {
                        $scope.Popup = HelpAlterService.ImageCode($scope, $scope.User.PhoneNumber, 1, $scope.GetSms, data.Result.data.ImageCaptch);
                    } else if (data.Success && !data.Result.HasImageCaptcha) {
                        HelpAlterService.BeginTime($scope, "RegGetOldVerifi");
                    }
                });
            };


            UsersService.QueryCertificateType().then(function (data) {
                console.log(data);
                if (data.Success) {
                    $scope.Cards = data.Result;
                    angular.forEach($scope.Cards, function (data, index, array) {
                        data.text = data.Name;
                    });
                }
            });

            $scope.SelectCards = function () {
                $ionicActionSheet.show({
                    buttons: $scope.Cards,
                    cancelText: '取 消',
                    buttonClicked: function (index) {
                        $scope.User.CardName = $scope.Cards[index].Name;
                        $scope.User.CardType = $scope.Cards[index].Value;
                        $scope.User.cardState = true;

                        return true;
                    }
                });
            };


            $scope.Commit = function () {


                if (!VerificationHelp.PhoneVerification($scope.User.PhoneNumber)) {
                    gToast.open("请输入正确的手机号！");
                    return false;
                };

                if ($scope.User.Pwd1 == "" || $scope.User.Pwd2 == "") {
                    gToast.open("密码不能为空！");
                    return false;
                };

                if ($scope.User.CardName == "证件类型") {
                    gToast.open("请选择证件类型！");
                    return false;
                };
                if ($scope.User.CardType == "id_card") {
                    if (!IdCardValidate($scope.User.CardId)) {
                        gToast.open("请输入正确的身份证号！");
                        return false;
                    }
                };
                if (!VerificationHelp.PwdVerification($scope.User.Pwd1)) {
                    gToast.open("密码由6-14位字符，数字组成！");
                    return false;
                };

                if ($scope.User.Pwd1 != $scope.User.Pwd2) {
                    gToast.open("您2次输入的密码不一致，请重新输入！");
                    return false;
                };

                //验证协议是否同意

                if (!$scope.User.isshow || !$scope.User.isshow2) {
                    gToast.open("协议未确认，请确认协议！");
                    return false;
                } else {
                    UsersService.ufoUser.caAcpt = 1;
                    UsersService.ufoUser.regAcpt = 1;
                };


                //验证验证码信息

               
                    UsersService.ufoUser.Mobile = $scope.User.PhoneNumber;
                    UsersService.ufoUser.Password = $scope.User.Pwd1;
                    UsersService.ufoUser.CertType = $scope.User.CardType;
                    UsersService.ufoUser.CertNo = $scope.User.CardId;
                    UsersService.ufoUser.IsNew = false;
                    UsersService.ufoUser.validateCode = $scope.User.validateCode;
                    UsersService.ufoUser.Captcha = $scope.User.validateCode;
                    UsersService.ufoUser.Recommend = 3;

                    UsersService.SaveUfoUser(UsersService.ufoUser).then(function (data) {
                        console.log(data);
                        if (data.Success) {
                            HelpAlterService.EndTime($scope, "RegGetOldVerifi");
                            HelpAlterService.SetlocalStorage.IsQualified(false);
                            //保存token 
                            if (data.Result.UserNo != null && data.Result.UserNo != '') {
                                console.log(data.Result.UserNo);
                                HelpAlterService.SetlocalStorage.token(data.Result.AccessToken, true);
                            } else {

                                HelpAlterService.SetlocalStorage.token(data.Result.AccessToken, false);
                            }
                            location.replace("#/ProductTabs/ValueAddedPlan/1");
                        } else {
                            gToast.open(data.Error.Message);
                        }
                    });
               

              
            };

            //当我们用完模型时，清除对应的对象
            $scope.$on("$destroy", function () {
                if ($scope.Popup != null) {
                    $scope.Popup.close(false);
                }
                HelpAlterService.EndTime($scope, "RegGetOldVerifi");
            });
            //合同预览
            $scope.PreviewContrart = function (resType, title) {
                HelpAlterService.ContractHelp.hasToContract = true;
                $scope.User.resType = resType;
                HelpAlterService.ContractHelp.content = $scope.User;
                HelpAlterService.SetlocalStorage.Agreement.Title(title);
                // HelpAlterService.SetlocalStorage.Agreement.Url(url);
                location.href = "#/RegSetIdentification/1/" + resType + "/1/0"

            };





        }]);
});
