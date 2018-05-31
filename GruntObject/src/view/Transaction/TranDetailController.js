define(['App'], function (app) {
    app.register.controller('TranDetailController',
        ['$scope', 'ProductsService', '$stateParams',function ($scope, ProductsService, $stateParams) {
            $scope.viewModel = {
                TradeDetail: null,
                busiTypeText: ""
            }
            //划扣中、付款成功、回款成功、申请续投
            var StatusText = function (busiType, payStatus) {
                if (busiType == '100000000') {
                    if (payStatus == '100000002') {
                        return "划扣中";
                    } else if (payStatus == '100000001') {
                        return "付款成功";
                    }
                }
                else if (busiType == '100000001') {
                    return "回款成功";
                }
                else if (busiType == '100000002') {
                    return "已申请续投";
                }
                //0：交易失败 1：交易成功 2：付款中 3：回款成功 4：申请续投
            };
           
            ProductsService.QueryTradeDetail($stateParams.paymentNo).then(function (data) {
                console.log(data)
                if (data.Success) {
                   
                    $scope.viewModel.TradeDetail = data.Result.Data;
                    $scope.viewModel.busiTypeText = StatusText($scope.viewModel.TradeDetail.BusiType, $scope.viewModel.TradeDetail.PayStatus);
                }
            });

           
        }]);
});
