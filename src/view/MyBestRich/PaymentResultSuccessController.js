define(['App'], function (app) {
    app.register.controller('PaymentResultSuccessController',
        ['$scope', '$stateParams', 'ProductsService', '$ionicLoading', 'gToast',function ($scope, $stateParams, ProductsService, $ionicLoading, gToast) {
            $scope.viewModel = {
                paymentNo: $stateParams.paymentNo,
                resultType: 2,
                txMap: {},
                hasPolling: true,
                isShowButton: false,
                waitText: "交易正在处理中...",

            }
            //结果返回前请不要重复提交。

            $scope.OK = function () {
                location.replace("#/ProductTabs/ValueAddedPlan/1");
            };
            


     
        
            function QueryUFOTX() {
                if (!$scope.viewModel.hasPolling) {

                    return false;
                };

                ProductsService.QueryUFOTX($stateParams.paymentNo).then(function (result) {
                    console.log(result);
                    if (result.Success) {

                        if (result.Result.Data.TxFlag === "0") {
                            $scope.viewModel.resultType = 0;
                            // 请核对您银行卡金额或更换银行卡
                            $scope.viewModel.waitText = result.Result.Data.FailReason;
                        } else if (result.Result.Data.TxFlag === "2") {
                            setTimeout(QueryUFOTX, "5000");
                        } else if (result.Result.Data.TxFlag === "1") {
                            $scope.viewModel.resultType = 1;
                            $scope.viewModel.txMap = result.Result.Data;
                            var d = result.Result.Data.TxTime.split(" ");
                            $scope.viewModel.txMap.txDate = d[0];
                            $scope.viewModel.txMap.txTimes = d[1];

                        } else if (result.Result.Data.TxFlag === "3") {
                            $scope.viewModel.resultType = 3;
                            //$scope.viewModel.isShowButton = true;
                            //$scope.viewModel.waitText = "提示：交易处理中，请勿重复提交。";
                            //setTimeout(function () {
                            //    location.replace("#/MyAccount");
                            //}, 3000);
                            //return false;
                        } else if (result.Result.Data.TxFlag === "4") {
                            $scope.viewModel.resultType = 2;
                            $scope.viewModel.isShowButton = true;
                            $scope.viewModel.waitText = result.Result.Data.FailReason;
                            setTimeout(function () {
                                location.replace("#/MyAccount");
                            }, 3000);
                            return false;
                        }




                        //if (result.Result.resCode === "666") {
                        //    $scope.viewModel.resultType = 2;
                        //    $scope.viewModel.isShowButton = true;
                        //    $scope.viewModel.waitText = "提示：交易处理中，请勿重复提交。";
                        //    setTimeout(function () {
                        //        location.replace("#/MyAccount");
                        //    }, 3000);
                        //    return false;
                        //} else {
                        //    if (result.Result.Data.TxFlag === "2") {
                        //        setTimeout(QueryUFOTX, "5000");
                        //    } else if (result.Result.Data.TxFlag === "1") {
                        //        $scope.viewModel.resultType = 1;
                        //        $scope.viewModel.txMap = result.Result.Data;
                        //        var d = result.Result.Data.TxTime.split(" ");
                        //        $scope.viewModel.txMap.txDate = d[0];
                        //        $scope.viewModel.txMap.txTimes = d[1];
                             
                        //    } else if (result.Result.Data.TxFlag === "3") {
                        //        $scope.viewModel.resultType = 3;
                        //        //$scope.viewModel.isShowButton = true;
                        //        //$scope.viewModel.waitText = "提示：交易处理中，请勿重复提交。";
                        //        //setTimeout(function () {
                        //        //    location.replace("#/MyAccount");
                        //        //}, 3000);
                        //        //return false;
                        //    } else { 
                        //        $scope.viewModel.resultType = 0;
                        //    }
                        //}
                    } else {
                        $scope.viewModel.resultType = 0;
                    }
                });
            }
            if ($stateParams.paymentNo != "undefined") { 
                QueryUFOTX();
            }
            //当我们用完模型时，清除对应的对象
            $scope.$on("$destroy", function () {
                $scope.viewModel.hasPolling = false;
                
            });
        }]);
});
