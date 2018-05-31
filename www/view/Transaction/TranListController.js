define(['App'], function (app) {
    app.register.controller('TranListController',
        ['$scope','ProductsService', '$stateParams',function ($scope, ProductsService, $stateParams) {
            $scope.viewModel = {
                QueryReinvestInfo:null
                
            }
            $scope.init = function () {
                ProductsService.QueryTradeDetail($stateParams.paymentNo).then(function (data) {
                    console.log(data);
                    if (data.Success) {
                        $scope.viewModel.QueryReinvestInfo = data.Result.Data;
                    }
                });
            }
        }]);
});
