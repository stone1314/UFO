define(['App'], function (app) {
    app.register.controller('FundDetaiTabsController',
        ['$scope', '$rootScope', '$stateParams', '$state', 'HelpAlterService', 'ProductsService', function ($scope, $rootScope, $stateParams, $state, HelpAlterService, ProductsService) {

            $scope.indexRef = $state.current.indexRef;
            $scope.height = "0";
           


            console.log($('.slider').height());
            if ($state.current.indexRef == 0) {
                location.replace("#/FundDetaiTabs/FundDetail/" + $stateParams.productId);
                $scope.height = 0;
            } else {
                location.replace("#/FundDetaiTabs/FundDescribe/" + $stateParams.productId);
                $scope.height = "-" + $('.slider').height();//(screen.height - 86);  //151
            }
 

           


            $scope.GoFundInfo = function () {
                $scope.height = 0;
                location.replace("#/FundDetaiTabs/FundDetail/" + $stateParams.productId);
            };
            $scope.GoFundDescribe = function () {
                $scope.height = "-" + +$('.slider').height(); //(screen.height - 86);   //151
                location.replace("#/FundDetaiTabs/FundDescribe/"+ $stateParams.productId);
            };






            $scope.lijitouzi = function () {
                location.href = "#/PaymentOrder/" + $rootScope.ProductId;
            };
            $scope.tabModel = {
                productInfo:null
            }
            $scope.tabsBtn = function (productInfo) {
                console.log(productInfo);
                $scope.tabModel.productInfo = productInfo;
                if ($scope.tabModel.productInfo.Status == '100000003' || $scope.tabModel.productInfo.Status == '100000001') {
                    $scope.tabModel.productInfo.IsOrdered = true;
                }
            };



            $scope.Consulting = function () {
                $scope.Popup = HelpAlterService.Confirmation_Pwd($scope);
                $scope.Popup.then(function (res) {
                    if (res) {

                        ProductsService.PreOrder(res, $scope.tabModel.productInfo.ProductId).then(function (data) {
                            if (data.Success) {
                                console.log(data);
                                $scope.showResults = HelpAlterService.Alert_Templates($scope, data.Result.Message);
                                $scope.showResults.then(function (res) {
                                    if (res) {
                                        history.back();
                                    }
                                });
                            }

                        });

                    }
                });
            }
        }]);

});
