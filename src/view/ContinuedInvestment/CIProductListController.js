define(['App'], function (app) {
    app.register.controller('CIProductListController',
        ['$scope', 'ProductsService',function ($scope, ProductsService) {
            $scope.curPage = 1;
            $scope.noMoreItemsAvailable = false;



            $scope.viewModel = {
                CIProductList: null,
                viewForm: "/templates/Load/NoProduct.html",
                viewForm_state: false
            };

            $scope.doRefresh = function () {
                $scope.viewModel.CIProductList = null;
                ProductsService.QueryContractList(1, 10).then(function (data) {
                    console.log(data);
                    if (data.Success) {
                        $scope.viewModel.CIProductList = data.Result.Models;
                        if ($scope.viewModel.CIProductList.length < 1) {
                            $scope.viewModel.viewForm_state = true;
                        }

                        $scope.noMoreItemsAvailable = false;
                        $scope.Pulling = true;
                        $scope.curPage = 1;
                        $scope.$broadcast('scroll.refreshComplete');

                    }
                });
            };

            $scope.loadMore = function () {
                $scope.noMoreItemsAvailable = false;
                //"595583198001186129"
                ProductsService.QueryContractList($scope.curPage, 10).then(function (data) {
                    if (data.Success) {
                        if (data.Result.Models.length <= 0) {
                            $scope.noMoreItemsAvailable = true;
                        } else {
                            if ($scope.curPage == 1) {
                                $scope.viewModel.CIProductList = data.Result.Models;
                                if (data.Result.Models.length < 10) {
                                    $scope.noMoreItemsAvailable = true;
                                } else {
                                    $scope.noMoreItemsAvailable = false;
                                    $scope.curPage += 1;
                                }
                            } else {
                                angular.forEach(data.Result.Models, function (data, index, array) {
                                    $scope.viewModel.CIProductList[$scope.viewModel.CIProductList.length] = data;
                                });
                                if (data.Result.Models.length < 10) {
                                    $scope.noMoreItemsAvailable = true;
                                } else {
                                    $scope.noMoreItemsAvailable = false;
                                    $scope.curPage += 1;
                                }
                            }
                        }
                        if ($scope.viewModel.CIProductList == null || $scope.viewModel.CIProductList.length < 1) {
                            $scope.viewModel.viewForm_state = true;
                        }
                    } else {
                        $scope.noMoreItemsAvailable = true;
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            }
             
            $scope.GoToProDetail = function (contractNo) {
                location.href = "#/ProDetail/CIProductList/" + contractNo;
            } 
        }]);
});
