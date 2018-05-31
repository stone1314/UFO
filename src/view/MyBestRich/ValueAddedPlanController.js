define(['App'], function (app) {
    app.register.controller('ValueAddedPlanController',
        ['$scope', '$ionicLoading', 'ProductsService', '$cookieStore', '$stateParams', '$state',function ($scope, $ionicLoading, ProductsService, $cookieStore, $stateParams, $state) {
            if ($stateParams.openid != 1) {
                $cookieStore.put("openID", $stateParams.openid);
            };


            $scope.curPage = 1;
            $scope.noMoreItemsAvailable = false;
            $scope.viewModel = {
                ProductList: null,
                LoginState: false //登录状态判断
            };
             
            $scope.DataLoad = function () {
                $scope.doRefresh();
            };

            //根据登录状态，设置界面显示
            if (localStorage.getItem("AccessToken")) {
                $scope.viewModel.LoginState = true;
            };

            $scope.productInfo = function (productId) {
                location.href = "#/ProductInfoTabs/ProductInfo/" + productId;
                //$state.go("ProductInfo", { ProductId: productId })
            };

            $scope.doRefresh = function () {
                $scope.viewModel.ProductList = null;
                $scope.curPage = 1;
                ProductsService.QueryDefProductCategoryList($scope.curPage).then(function (data) {
                    if (data.Success) {
                        $scope.viewModel.ProductList = data.Result;
                        if (data.Result.length < 10) {
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

            $scope.loadMore = function () {

                if ($scope.curPage != 1) {

                    $scope.noMoreItemsAvailable = false;
                    //"595583198001186129"
                    ProductsService.QueryDefProductCategoryList($scope.curPage, 10).then(function (data) {
                        console.log(data);
                        if (data.Success) {
                            if (data.Result.length <= 0) {
                                $scope.noMoreItemsAvailable = true;
                            } else {
                                if ($scope.curPage == 1) {
                                    $scope.viewModel.ProductList = data.Result;
                                    if (data.Result.length < 10) {
                                        $scope.noMoreItemsAvailable = true;
                                    } else {
                                        $scope.noMoreItemsAvailable = false;
                                        $scope.curPage += 1;
                                    }
                                } else {
                                    angular.forEach(data.Result, function (data, index, array) {
                                        $scope.viewModel.ProductList[$scope.viewModel.ProductList.length] = data;
                                    });

                                    if (data.Result.length < 10) {
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
        }]);
});
