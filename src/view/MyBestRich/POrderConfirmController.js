define(['App'], function (app) {
    app.register.controller('POrderConfirmController',
        ['$scope', '$ionicActionSheet', 'UsersService', 'gToast', 'ProductsService', '$stateParams', '$ionicPopup', 'HelpAlterService', 'VerificationHelp', '$state', '$ionicLoading', function ($scope, $ionicActionSheet, UsersService, gToast, ProductsService, $stateParams, $ionicPopup, HelpAlterService, VerificationHelp, $state, $ionicLoading) {
            $scope.viewModel = HelpAlterService.ContractHelp.content;
            $scope.model = {};
            if ($scope.viewModel == null) {
                history.back();
                return;
            }
            $scope.agreement = function () {
                // HelpAlterService.ContractHelp.content = $scope.viewModel;
                location.href = '#/ContractList/PaymentOrder';
            }
            if ($scope.viewModel.dataDetail.ProductDetail.ContractType == '100000007') {
                ProductsService.ConfirmPurchasing($scope.viewModel.dataDetail.ProductDetail.ProductId, $scope.viewModel.txAmt).then(function (result) {
                    console.log(result.Result);
                    $scope.model = result.Result;
                });

            }

            $scope.Commit = function () {
                $scope.Popup = HelpAlterService.Confirmation_Pwd($scope);

                $scope.Popup.then(function (res) {
                    if (res) {
                        //$ionicLoading.show({
                        //    templateUrl: 'templates/Load/Waiting.html'
                        //});
                        console.log($scope.viewModel.dataCard);
                        ProductsService.TradeChase($scope.viewModel.dataDetail.ProductDetail.ProductId, $scope.viewModel.dataCard.BankCardId, $scope.viewModel.txAmt, res, $scope.viewModel.InviteCode).then(function (result) {
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

                });
            }
        }]);
});
