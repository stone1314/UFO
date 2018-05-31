define(['App'], function (app) {
    app.register.controller('PaymentOrderController',
        ['$scope', 'UsersService', 'gToast', 'ProductsService', '$stateParams', '$ionicPopup', 'HelpAlterService', 'VerificationHelp', '$state',function ($scope, UsersService, gToast, ProductsService, $stateParams, $ionicPopup, HelpAlterService, VerificationHelp, $state) {

            $scope.viewModel = {
                isshow: true,
                hasCard: false,
                dataCard: null,
                dataCards: null,
                txAmt: "",
                dataDetail: null,
                disableSubmit: false,
                HasPayProduct: false,
                InviteCode: "",
                InviteCodeMessage: "",
            };

            ProductsService.PrePurchasing($stateParams.ProductId).then(function (data) {
                console.log(data);
                if (data.Success) {
                    $scope.viewModel.dataDetail = data.Result;
                    $scope.viewModel.dataCard = data.Result.DefaultBankCard
                }
                if (HelpAlterService.ContractHelp.hasToContract) {
                    HelpAlterService.ContractHelp.hasToContract = false;
                    $scope.viewModel = HelpAlterService.ContractHelp.content;
                    if (HelpAlterService.ContractHelp.hasValue) {
                        $scope.viewModel.isshow = true;
                        HelpAlterService.ContractHelp.hasValue = true;
                    }
                }
            });

             

            $scope.DeleteCode = function () {
                $scope.viewModel.InviteCode = "";
                $scope.viewModel.InviteCodeMessage = "";
            };
            $scope.ChoseCard = function () {
                HelpAlterService.ContractHelp.hasToContract = true;
                HelpAlterService.ContractHelp.content = $scope.viewModel;
                location.href = "#/GetBankCards";
            }
            $scope.InvitationCode = function () {
                $scope.Popup = HelpAlterService.InvitationCodeConfirmation($scope, null);
                
                $scope.Popup.then(function (res) {
                    if (res) {
                        //ValidateInviteCode
                        ProductsService.ValidateInviteCode(res).then(function (result) {
                            if (result.Success)
                            {
                                console.log(result);
                                $scope.viewModel.InviteCode = res;
                                $scope.viewModel.InviteCodeMessage = result.Result.Message;
                            }
                        });
                    } else {
                        console.log('You are not sure');
                    }
                    $scope.model.code = "";
                });
            };
            $scope.PopupClose = function () {
                $scope.model.pwd = "";
                $scope.Popup.close();
            };


            var commitData = function () {
                $scope.Popup = HelpAlterService.PasswordConfirmation($scope, "支付金额（" + $("#txAmt").val() + "元）");

                $scope.Popup.then(function (res) {
                    if (res) {
                        console.log($scope.viewModel.dataCard);
                        ProductsService.TradeChase($stateParams.ProductId, $scope.viewModel.dataCard.BankCardId, $("#txAmt").val(), $scope.model.pwd, $scope.viewModel.InviteCode).then(function (result) {
                            console.log(result);
                            if (result.Success) {
                                //if (result.Result.resCode === "0397") {
                                //    location.replace("#/PaymentResultfailure/1");
                                //    return false;
                                //} else if (result.Result.resCode === "0105") {
                                //    location.replace("#/PaymentResultfailure/2");
                                //    return false;
                                //}
                                location.replace("#/PaymentResultSuccess/" + result.Result.PaymentNo);

                            }
                            //else {
                            //    if (result.Error.Code == 397) {
                            //        location.replace("#/PaymentResultfailure/1");
                            //    } else {
                            //        if (result.Error.Code == 105) {
                            //            location.replace("#/PaymentResultfailure/2");
                            //        }
                            //    }
                            //}
                            $scope.viewModel.disableSubmit = false;

                        });
                    } else {
                        console.log('You are not sure');
                    }
                    $scope.model.pwd = "";
                });
            }


            $scope.Commit = function () {
                if ($scope.viewModel.isshow) {
                    // $scope.viewModel.disableSubmit = true;

                    if (!$("#txAmt").val()) {
                        gToast.open("请输入金额！");
                        return false;
                    }

                    if (isNaN($("#txAmt").val())) {
                        gToast.open("金额输入过大或有误，请检查");
                        return false;
                    }
                    if (($("#txAmt").val() % 1000) > 0 || !VerificationHelp.IntVerification($("#txAmt").val())) {
                        gToast.open("投资金额必须是1000元往上递增！");
                        return false;
                    }

                    if ($scope.viewModel.dataDetail.ProductDetail
 .MinAmount > Number($("#txAmt").val())) {
                        gToast.open("投资金额不能少于起投金额！");
                        return false;
                    }
                    
                    if ($scope.viewModel.dataCard == null) {
                        gToast.open("请添加银行卡！");
                        return false;
                    }

                    if ($scope.viewModel.dataCard.DayLimit != null) {
                        if (Number($("#txAmt").val()) > $scope.viewModel.dataCard.DayLimit) {
                            //  gToast.open("投资金额大于所使用银行卡的日限额！");

                            $scope.alertModel = HelpAlterService.AlertOKTemplate($scope, "您输入的金额大于所使用银行卡的日划扣限额，可能需要多日划扣");

                            $scope.alertModel.then(function (res) {
                                commitData();
                                 
                            });

                            return false;
                        }
                    }
                    commitData();

                } else {
                    gToast.open("请阅读并同意协议！");
                    return;
                }
            }

            $scope.agreement = function () {
                $scope.alertModel = $ionicPopup.alert({
                    templateUrl: 'templates/Popup/CIContactTemplate.html',
                    scope: $scope,
                    okText: "返回",
                    okType: "button-red button-Size-Height-35"
                });
                $scope.alertModel.then(function (res) {
                    //location.replace("#/tab/FinanceProduct");
                });
            }

            $scope.AddBankCardsFun = function () {
                UsersService.QueryUserDetail().then(function (data) {
                    console.log(data);
                    if (data.Success) {
                        if (data.Result.Data) {
                            if (data.Result.Data.CertNo == "" || data.Result.Data.CertNo == null) {
                                location.href = "#/RegIdentification/2";
                            } else {
                                location.href = "#/AddBankCards";
                            }
                            //href="#/AddBankCards"
                        }
                    }
                });
            }

            ///协议预览
            $scope.ContactHref = function (resType,title) {
                $scope.alertModel.close();
                HelpAlterService.ContractHelp.hasToContract = true;
                HelpAlterService.ContractHelp.content = $scope.viewModel;
                HelpAlterService.SetlocalStorage.Agreement.Title(title);
                location.href = "#/RegSetIdentification/3/" + resType + "/1/" + $scope.viewModel.dataDetail.ProductDetail.ContractType;
            }


            //当我们用完模型时，清除对应的对象
            $scope.$on("$destroy", function () {
                if ($scope.InvestmentOKTemplate != null) {
                    $scope.InvestmentOKTemplate.close(false);
                }
                if ($scope.alertModel != null) {
                    $scope.alertModel.close(false);
                }
                if ($scope.Popup != null) {
                    $scope.Popup.close(false);
                }
            });
        }]);


});
