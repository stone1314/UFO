define(['App'], function (app) {
    app.register.controller('POrderConfirmController',
        ['$scope', '$ionicActionSheet', 'UsersService', 'gToast', 'ProductsService', '$stateParams', '$ionicPopup', 'HelpAlterService', 'VerificationHelp', '$state', '$ionicLoading', function ($scope, $ionicActionSheet, UsersService, gToast, ProductsService, $stateParams, $ionicPopup, HelpAlterService, VerificationHelp, $state, $ionicLoading) {
            $scope.viewModel = HelpAlterService.ContractHelp.content;   //传递的对象 
            if (HelpAlterService.ContractHelp.content == null) {
                history.back();
                return;
            }
            if ($scope.viewModel.dataDetail.ProductDetail.MultiRates != null) {
                if ($scope.viewModel.dataDetail.ProductDetail.MultiRates.length > 1) { 
                    if ($scope.viewModel.dataDetail.ProductDetail.MultiRates[0].Right * 10000 > $scope.viewModel.txAmt) {
                        $scope.viewModel.dataDetail.ProductDetail.ExpectedRate = $scope.viewModel.dataDetail.ProductDetail.MultiRates[0].Rate;
                    }else if ($scope.viewModel.dataDetail.ProductDetail.MultiRates[1].Left * 10000 <= $scope.viewModel.txAmt) { 
                        $scope.viewModel.dataDetail.ProductDetail.ExpectedRate = $scope.viewModel.dataDetail.ProductDetail.MultiRates[1].Rate;
                    }
                }
            }
            $scope.model = {};
            if ($scope.viewModel == null) {
                history.back();
                return;
            }


            $scope.agreement = function () { 
                location.href = '#/ContractList/PaymentOrder';
            }
            if ($scope.viewModel.dataDetail.ProductDetail.ContractType == '100000007') {
                ProductsService.ConfirmPurchasing($scope.viewModel.dataDetail.ProductDetail.ProductId, $scope.viewModel.txAmt).then(function (result) {
                    $scope.model = result.Result;
                });

            }

            $scope.Commit = function () { 
                $scope.Popup = HelpAlterService.Confirmation_Pwd($scope); 
                $scope.Popup.then(function (res) {
                    if (res) {
                        console.log($scope.viewModel.dataCard);
                        ProductsService.TradeChase($scope.viewModel.dataDetail.ProductDetail.ProductId, $scope.viewModel.dataCard.BankCardId, $scope.viewModel.txAmt, res, $scope.viewModel.InviteCode).then(function (result) {
                            if (result.Success) { 
                                location.replace("#/PaymentResultSuccess/" + result.Result.PaymentNo); 
                            }

                            $scope.viewModel.disableSubmit = false;

                        });
                    } else {
                        console.log('You are not sure');
                    }

                });
            }

            //当我们用完模型时，清除对应的对象
            $scope.$on("$destroy", function () {
                if ($scope.Popup != null) {
                    $scope.Popup.close(false);
                }
            });
        }]);
});
