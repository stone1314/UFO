define(['App'], function (app) {
    app.register.controller('InvestListController',
        ['$scope', 'ProductsService',function ($scope, ProductsService) {
            $scope.curPage = 1;
            $scope.pageSize = 10;
            $scope.noMoreItemsAvailable = false;
            $scope.viewModel = {
                sumAllocatedAmt:"",
                InvestList: null

            }
            function QuerySumAllocatedAmount() {
                ProductsService.QuerySumAllocatedAmount().then(function (data) {
                    console.log(data);
                    if (data.Success) {
                        $scope.viewModel.sumAllocatedAmt = data.Result.SumAllocatedAmount;
                    }
                });
            }
             
            QuerySumAllocatedAmount();
            $scope.doRefresh = function () {
                $scope.curPage = 1;
                $scope.viewModel.InvestList = null;
                ProductsService.QueryTrade($scope.curPage, $scope.pageSize).then(function (data) {
                    console.log(data);
                    if (data.Success) {
                        $scope.viewModel.InvestList = data.Result.Models;
                       // $scope.viewModel.sumAllocatedAmt = data.Result.data.txMap.sumAllocatedAmt;总收益
                        $scope.noMoreItemsAvailable = false;
                        $scope.Pulling = true;
                        
                        $scope.$broadcast('scroll.refreshComplete');

                    }
                });
                //获取总金额
                QuerySumAllocatedAmount();
            }

            $scope.loadMore = function () {
                $scope.noMoreItemsAvailable = false;
                //"595583198001186129"
                ProductsService.QueryTrade($scope.curPage, $scope.pageSize).then(function (data) {
                    console.log(data);
                    if (data.Success) {
                        if (data.Result.Models == null) {
                            $scope.noMoreItemsAvailable = true;
                        } else {
                            if ($scope.curPage == 1) {
                                $scope.viewModel.InvestList = data.Result.Models;
                                //$scope.viewModel.sumAllocatedAmt = data.Result.data.txMap.sumAllocatedAmt;   总收益
                                if (data.Result.Models.length < 10) {
                                    $scope.noMoreItemsAvailable = true;
                                } else {
                                    $scope.noMoreItemsAvailable = false;
                                    $scope.curPage += 1;
                                }
                            } else {
                                angular.forEach(data.Result.Models, function (data, index, array) {
                                    $scope.viewModel.InvestList[$scope.viewModel.InvestList.length] = data;
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
            }

           
            $scope.hrefText = function (statusCode,paymentNo) {
                if (statusCode == 0) {
                    return "#";
                }
                else if (statusCode == 1 || statusCode == 2 || statusCode == 3) {
                    return "#/TranDetail/" + paymentNo;
                }
               
                else if (statusCode == 4) {
                    return "#/TranList/" + paymentNo;
                }
            }
        }]);
});
