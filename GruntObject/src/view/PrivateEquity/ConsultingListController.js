define(['App'], function (app) {
    app.register.controller('SubscribeListController',
        ['$scope', 'ProductsService', '$timeout', function ($scope, ProductsService, $timeout) {
            $scope.Model = {
                list:null
            }
          

            $scope.curPage = 1;
 
            $scope.noMoreItemsAvailable = false;



            $scope.doRefresh = function () {
           

                $scope.curPage = 1;
                ProductsService.QueryOrderRecordList($scope.curPage, 10).then(function (data) {
                    console.log(data);
                    if (data.Success) {
                        $scope.Model.list = data.Result.Models;
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
            }

            $scope.loadMore = function () {
                $scope.noMoreItemsAvailable = false;
                //"595583198001186129"
                ProductsService.QueryOrderRecordList($scope.curPage, 10).then(function (data) {
                    console.log(data);
                    if (data.Success) {
                        if (data.Result.Models == null) {
                            $scope.noMoreItemsAvailable = true;
                        } else {
                            if ($scope.curPage == 1) {
                                $scope.Model.list = data.Result.Models;
                                //$scope.viewModel.sumAllocatedAmt = data.Result.data.txMap.sumAllocatedAmt;   总收益
                                if (data.Result.Models.length < 10) {
                                    $scope.noMoreItemsAvailable = true;
                                } else {
                                    $scope.noMoreItemsAvailable = false;
                                    $scope.curPage += 1;
                                }
                            } else {
                                angular.forEach(data.Result.Models, function (data, index, array) {
                                    $scope.Model.list[$scope.Model.list.length] = data;
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



            $scope.showDetail = function (item, index) {
                item.hasShow = true;
                $timeout(function () {
                    if ($("#ConsultingInfo" + index).is(":hidden")) { 
                        $("#ConsultingInfo" + index).slideDown(500);
                    } else { 
                        $("#ConsultingInfo" + index).slideUp(500, function () {
                            $scope.$apply(function () {
                                item.hasShow = false;
                            });
                        });
                    }
                }, 100);


            }
        }]);
});
