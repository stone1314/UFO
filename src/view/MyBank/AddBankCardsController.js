define(['App'], function (app) {
    app.register.controller('AddBankCardsController',
        ['$scope', 'UsersService', 'gToast', '$ionicModal', '$ionicActionSheet', '$interval', '$ionicPopup', 'HelpAlterService', 'VerificationHelp',function ($scope, UsersService, gToast, $ionicModal, $ionicActionSheet, $interval, $ionicPopup, HelpAlterService, VerificationHelp) {
            $scope.User = {
                cardName: "", cardId: "", phoneNumber: "",
                bankName: "请选择所属银行", bankNameState: false, bankId: "",
                isshow9: true, isshow: true , validateCode: ""
            };
            $scope.viewModel = {  
                User: { imgvalidateCode: "" },
            } 
            HelpAlterService.SetTime($scope, "AddBankCards");
             

            UsersService.GetCardBindList().then(function (data) {
                console.log(data);
                if (data.Success) {
                    $scope.banks = data.Result;
                    angular.forEach($scope.banks, function (data, index, array) { 
                        data.text = data.BankName;
                    });
                }  
            });

            if (HelpAlterService.ContractHelp.hasToContract) {
                $scope.User = HelpAlterService.ContractHelp.content;
                if (HelpAlterService.ContractHelp.hasValue) { 
                    if ($scope.User.resType == 1) {
                        $scope.User.isshow = true;
                    }
                    if ($scope.User.resType == 2) {
                        $scope.User.isshow9 = true;
                    } 
                    HelpAlterService.ContractHelp.hasValue = true;
                } else {
                    //从支付页面转跳的传递的HelpAlterService.ContractHelp.content对象内容不符合本页要求 s
                    $scope.User.isshow = true;
                    $scope.User.isshow9 = true;
                }
                HelpAlterService.ContractHelp.hasToContract = false;
            }

            //选卡
            $scope.GetBanks = function () {
                $ionicActionSheet.show({
                    buttons: $scope.banks,
                    cancelText: '取 消',
                    buttonClicked: function (index) {
                        $scope.User.bankId = $scope.banks[index].BankId;
                        $scope.User.bankName = $scope.banks[index].BankName;
                        $scope.User.bankNameState = true;
                        return true;
                    }
                });
            };

         

            //发送短息
            $scope.GetSms = function () { 
                UsersService.GetSms($scope.User.phoneNumber, 3).then(function (data) { //1:注册 
                    console.log(data);
                    if (data.Success  && data.Result.HasImageCaptcha) {
                        $scope.Popup = HelpAlterService.ImageCode($scope, $scope.User.phoneNumber, 3, $scope.GetSms, data.Result.ImageCaptch);
                    } else if (data.Success && !data.Result.HasImageCaptcha) {
                        HelpAlterService.BeginTime($scope, "AddBankCards");
                    }
                });
            }
            //清除手机号码
            $scope.Clear = function () {
                $scope.User.phoneNumber = "";
            };
            //提交
            $scope.Commit = function () {
                //  cardName: "", cardId: "", phoneNumber: ""bankName
                if (!$scope.User.cardName) {
                    gToast.open("请输入持卡人姓名！");
                    return false;
                }

                if (!$scope.User.bankName) {
                    gToast.open("请选择所属银行！");
                    return false;
                }

                if (!$scope.User.cardId) {
                    gToast.open("请输入银行卡号码！");
                    return false;
                }

                if (VerificationHelp.PhoneVerification($scope.User.phoneNumber) == false) {
                    
                    gToast.open("预留手机号码不能为空或输入错误！");
                    return false;
                }

                if (!$scope.User.validateCode) {
                    gToast.open("请输入验证码！");
                    return false;
                }

                //验证协议是否同意
                if (!$scope.User.isshow || !$scope.User.isshow9) {
                    gToast.open("协议未确认，请确认协议！");
                    return false;
                }


                UsersService.BindCard(
                    $scope.User.cardId,
                    $scope.User.bankId,
                    $scope.User.phoneNumber,
                    $scope.User.bankName,
                    $scope.User.cardName,
                    $scope.User.validateCode
                    ).then(function (data) {
                        console.log(data);
                        if (!data.Success) {
                            if (data.Error.Code == "229") {
                                location.href = "#/RegIdentification/1";
                            } 
                        } else {
                            //HelpAlterService.IniTime($scope, "AddBankCards"); 
                            //location.reload = "/#/MyBankCards";
                            history.back(); 
                        } 
                        //console.log(data); 
                }); 
            };
             


            //合同预览
            $scope.PreviewContrart = function (resType, title) {
                HelpAlterService.ContractHelp.hasToContract = true;
                $scope.User.resType = resType; 
                HelpAlterService.ContractHelp.content = $scope.User;
                HelpAlterService.SetlocalStorage.Agreement.Title(title);
                location.href = "#/RegSetIdentification/2/" + resType + "/1/0"

            }

            //当我们用完模型时，清除对应的对象
            $scope.$on("$destroy", function () {
                if ($scope.Popup != null) {
                    $scope.Popup.close(false);
                }
            });
        }]);
});
