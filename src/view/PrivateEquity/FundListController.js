/// <reference path="templates/Popup/AlertTemplate.html" />
define(['App'], function (app) {
    app.register.controller('FundListController',
        ['$scope', 'ProductsService', '$ionicPopup', '$rootScope', 'HelpAlterService', function ($scope, ProductsService, $ionicPopup, $rootScope, HelpAlterService) {

            console.log(HelpAlterService.GetlocalStorage.IsQualified());

            if (HelpAlterService.GetlocalStorage.IsRealName() == 'false') {
                location.replace("#/RegIdentification/3");
                return;
            }
          
            if (HelpAlterService.GetlocalStorage.IsQualified()!='true') {
                $scope.alertPopup = HelpAlterService.Alert_Agreement($scope, RestWebHost.Host + "Contract/PreviewContract?type=4&resType=1&conType=1&ProType=0", true);

                //
                $scope.alertPopup.then(function (res) {
                    console.log(res); 
                    if (res) {
                        ProductsService.QualifiedUser().then(function (data) {
                            HelpAlterService.SetlocalStorage.IsQualified(true);
                        });
                    }

                });
            }
           
            $scope.curPage = 1;
            $scope.Model = {
                FundList:null
            }
            $scope.noMoreItemsAvailable = false;

          





            $scope.DataLoad = function () {
              
                $scope.doRefresh();
                
            };
            $scope.doRefresh = function () {
          
                $scope.curPage = 1;
                ProductsService.QueryFundProductList($scope.curPage,5).then(function (data) {
                    console.log(data);
                    if (data.Success) {
                        $scope.Model.FundList = data.Result.Models;
                        if (data.Result.Models.length < 5) {
                            $scope.noMoreItemsAvailable = true;
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        } else {
                            $scope.noMoreItemsAvailable = false;
                        }
                        $scope.curPage = 2;
                        $scope.$broadcast('scroll.refreshComplete');
                    } 
                });
            };
          

            $scope.alertPopupClose = function () {

                $scope.alertPopup.close(false);
                $rootScope.$emit("productTabs", 0);
                //location.href = "#/ProductTabs/ValueAddedPlan/1";
            }
            //当我们用完模型时，清除对应的对象
            $scope.$on("$destroy", function () {
                if ($scope.alertPopup != null) {
                    $scope.alertPopup.close(false);
                }
            });
 
           
            $scope.loadMore = function () {

                if ($scope.curPage != 1) {

                    $scope.noMoreItemsAvailable = false;
                    //"595583198001186129"
                    ProductsService.QueryDefProductCategoryList($scope.curPage, 10).then(function (data) {
                        console.log(data);
                        if (data.Success) {
                            if (data.Result.Models.length <= 0) {
                                $scope.noMoreItemsAvailable = true;
                            } else {
                                if ($scope.curPage == 1) {
                                    $scope.viewModel.ProductList = data.Result.Models;
                                    if (data.Result.Models.length < 10) {
                                        $scope.noMoreItemsAvailable = true;
                                    } else {
                                        $scope.noMoreItemsAvailable = false;
                                        $scope.curPage += 1;
                                    }
                                } else {
                                    angular.forEach(data.Result.Models, function (data, index, array) {
                                        $scope.viewModel.ProductList[$scope.viewModel.ProductList.length] = data;
                                    });

                                    if (data.Result.Models.length < 10) {
                                        $scope.noMoreItemsAvailable = true;
                                    } else {
                                        $scope.noMoreItemsAvailable = false;
                                        $scope.curPage += 1;
                                    }
                                }
                            }
                        } else {
                            $scope.noMoreItemsAvailable = true;
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    });
                } else {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            };
         
            

            $scope.GoFundDetail = function (productId) {
                location.href = "#/FundDetail/" + productId;

            }
        }]);
});
