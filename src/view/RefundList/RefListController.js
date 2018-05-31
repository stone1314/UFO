define(['App'], function (app) {
    app.register.controller('RefListController',
        ['$scope', 'ProductsService','$state',function ($scope, ProductsService,$state) {

            $scope.curPage = 1;
            $scope.noMoreItemsAvailable = false;
            $scope.viewModel = {
                quitStatus: '100000000',
                TradeQueryContractList: null,
            }
            if($state.current.indexRef==0){
                $scope.viewModel.quitStatus='100000000';
            }else if($state.current.indexRef==1){
                $scope.viewModel.quitStatus='100000001';
            }else if($state.current.indexRef==2){
                $scope.viewModel.quitStatus='100000002';
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

            $scope.goProDetail = function (ContractId) {
                location.href = "#/ProDetail/RefList/" + ContractId;
            }

        }]);
});
