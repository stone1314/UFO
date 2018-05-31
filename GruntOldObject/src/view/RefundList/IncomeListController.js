define(['App'], function (app) {
    app.register.controller('IncomeListController',
        ['$scope', '$stateParams', 'ProductsService', '$cookieStore', function ($scope, $stateParams, ProductsService, $cookieStore) {
            $scope.Model = {
                list: null,
                includeView:"",
            };
 
            // $scope.viewModel.data = $cookieStore.get("detailList");
            if ($stateParams.ContractType == "100000008") {
                $scope.Model.title = "预期产品收益"
                $scope.Model.list = $cookieStore.get("detailList");
                
                $scope.Model.includeView = "templates/include/ReturnsDetailed/BBGDetail.html";
            } else {
                $scope.Model.title = "收益明细"
                ProductsService.GetQueryDistributeInfo($stateParams.ContractId).then(function (data) {
                    console.log(data);
                    if (data.Success) {
                        $scope.Model.list = data.Result.Data;
                        $scope.Model.includeView = "templates/include/ReturnsDetailed/YYFXDetail.html";

                    }
                });
            }
        }]);
});
