define(['App'], function (app) {
    app.register.controller('RefListController',
        ['$scope', 'ProductsService',function ($scope, ProductsService) {

            $scope.curPage = 1;
            $scope.noMoreItemsAvailable = false;
            $scope.viewModel = {
                quitStatus: '100000000',
                TradeQueryContractList: null
            }

            $scope.btnState = [{ key: '100000000', bgValue: true, colorValue: "#fff" },//#fff
                               { key: '100000001', bgValue: false, colorValue: "#989898" },
                               { key: '100000002', bgValue: false, colorValue: "#989898" }]
            //理财中
            $scope.GetFinance = function (state) {
                $scope.viewModel.quitStatus = state;//退出状态 100000000：理财中(含有募集中/理财中) 100000001: 退出中 100000002
                $.each($scope.btnState, function (index, value) {
                    if (value.key == state) {
                        value.bgValue = true;
                        value.colorValue = "#fff";
                    } else {
                        value.bgValue = false;
                        value.colorValue = "#989898";
                    }
                }); 
                 $scope.doRefresh();
            }; 

            $scope.DataLoad = function () {
            }
             
            $scope.doRefresh = function () {
                $scope.viewModel.TradeQueryContractList = null;
                $scope.viewModel.TradeQueryContractList = [];
                $scope.curPage = 1;
                $scope.noMoreItemsAvailable = false;
                //$scope.loadMore();
                ProductsService.TradeQueryContractList(1, 10, $scope.viewModel.quitStatus).then(function (data) {
                    console.log(data);
                    if (data.Success) {
                        $scope.viewModel.TradeQueryContractList = data.Result;
                        $scope.noMoreItemsAvailable = false;
                        $scope.Pulling = true;
                        $scope.curPage = 1;
                        $scope.$broadcast('scroll.refreshComplete');

                    }
                });


            }
            $scope.loadMore = function () {

                $scope.noMoreItemsAvailable = false;
                //"595583198001186129"
                ProductsService.TradeQueryContractList($scope.curPage, 10, $scope.viewModel.quitStatus).then(function (data) {
                    console.log(data);
                    if (data.Success) {
                      
                        if (data.Result == null) {
                            $scope.noMoreItemsAvailable = true;
                        } else {
                            if ($scope.curPage == 1) {
                                $scope.viewModel.TradeQueryContractList = data.Result;
                                if (data.Result.length < 10) {
                                    $scope.noMoreItemsAvailable = true;
                                } else {
                                    $scope.noMoreItemsAvailable = false;
                                    $scope.curPage += 1;
                                }
                            } else {
                                angular.forEach(data.Result, function (data, index, array) {
                                    $scope.viewModel.TradeQueryContractList[$scope.viewModel.TradeQueryContractList.length] = data;
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
            }



        }]);
});
