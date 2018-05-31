define(['App'], function (app) {
    app.register.controller('PaymentOrderController',
        ['$scope', '$ionicActionSheet', 'UsersService', 'gToast', 'ProductsService', '$stateParams', '$ionicPopup', 'HelpAlterService', 'VerificationHelp', '$state', '$ionicLoading', '$rootScope', function ($scope, $ionicActionSheet, UsersService, gToast, ProductsService, $stateParams, $ionicPopup, HelpAlterService, VerificationHelp, $state, $ionicLoading, $rootScope) {
            $rootScope.productTabIndex = 0;  //登入跳转乱七八糟的 
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
                haschecked:false
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



            $scope.ChoseCard = function () {
                HelpAlterService.ContractHelp.hasToContract = true;
                HelpAlterService.ContractHelp.content = $scope.viewModel;
                location.href = "#/GetBankCards";
            }

            $scope.PopupClose = function () {
                $scope.model.pwd = "";
                $scope.Popup.close();
            };

            $scope.Commit = function () {

                // $scope.viewModel.disableSubmit = true;
               
                if (!$("#txAmt").val()) {
                    gToast.open("请输入金额！");
                    return false;
                }

                if (isNaN($("#txAmt").val()) || $("#txAmt").val().length>10) {
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

                if (!$scope.viewModel.haschecked) {
                    gToast.open("请阅读并同意协议！");
                    return false;
                }
                //if ($scope.viewModel.dataDetail.ProductDetail.MaxAmount < Number($("#txAmt").val())) {
                //    gToast.open("最多可以购买" + $scope.viewModel.dataDetail.ProductDetail.MaxAmount + "元！");
                //    return false;
                //}
                
                if ($scope.viewModel.dataCard == null) {
                    gToast.open("请添加银行卡！");
                    return false;
                }
                if ($scope.viewModel.dataCard.DayLimit != null) {
                    if (Number($("#txAmt").val()) > $scope.viewModel.dataCard.DayLimit) {
                        //gToast.open("您输入的金额大于所有使用银行卡的日划扣限额，可能需要多日划口！");

                        $scope.alertModel = HelpAlterService.Alert($scope, "您输入的金额大于所使用银行卡的日划扣限额，可能需要多日划扣");

                        $scope.alertModel.then(function (res) {
                            HelpAlterService.ContractHelp.content = $scope.viewModel;
                            location.href = '#/POrderConfirm';
                        });
                        return false;

                    }
                }
                HelpAlterService.ContractHelp.content = $scope.viewModel;
                location.href = '#/POrderConfirm';

                 
            }

            $scope.agreement = function () {
                HelpAlterService.ContractHelp.content = $scope.viewModel;
                location.href = '#/ContractList/PaymentOrder';
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

            $scope.input_Clear = function () {
                $scope.viewModel.txAmt = "";
            }
            $scope.keyup = function (maxAmount) {
                if ($scope.viewModel.txAmt > maxAmount) {
                    $scope.viewModel.txAmt = maxAmount;
                }
            }
            $scope.operation_Amount = function (operation) {    //增减 金额

                if (operation == "-") {
                    $scope.viewModel.txAmt = $scope.viewModel.txAmt - 1000;
                    if ($scope.viewModel.txAmt <= 0) {
                        $scope.viewModel.txAmt = "";
                    }
                } else {
                    if ($scope.viewModel.txAmt == "") {
                        $scope.viewModel.txAmt = 1000;
                    } else {
                        $scope.viewModel.txAmt = $scope.viewModel.txAmt + 1000;
                    }
                    //if ($scope.viewModel.txAmt > maxAmount) {
                    //    $scope.viewModel.txAmt = maxAmount;
                    //}
                }
            }
            $scope.InviteCode = function () { 
                $scope.Popup = HelpAlterService.Confirmation_InviteCode($scope, "");
                $scope.Popup.then(function (res) {
                    if (res) {
                        ProductsService.ValidateInviteCode(res).then(function (data) {
                            console.log(data);
                            if (data.Success) {
                                $scope.viewModel.InviteCode = res;
                                $scope.viewModel.InviteCodeMessage = data.Result.Message;
                            }
                        });
                    }

                });
            }

        }]);


});
