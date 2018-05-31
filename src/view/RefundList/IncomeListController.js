define(['App'], function (app) {
    app.register.controller('IncomeListController',
        ['$scope', '$stateParams', 'ProductsService',function ($scope, $stateParams, ProductsService) {
            $scope.Model = {
                list: null,
                includeView:"",
            };

            ProductsService.GetQueryAssertInfo($stateParams.ContractId).then(function (data) {
                console.log(data);
                if (data.Success) {
                    console.log(data);
                    $scope.Model.list = data.Result.Data.Ab032List;
                    if (data.Result.Data.ContractType == "100000008") {
                        $scope.Model.includeView = "templates/include/ReturnsDetailed/BBGDetail.html";
                    } else {
                        $scope.Model.includeView = "templates/include/ReturnsDetailed/YYFXDetail.html";
                    }
                }
            });
        }]);
});
