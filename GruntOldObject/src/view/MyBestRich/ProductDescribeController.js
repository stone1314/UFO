define(['App'], function (app) {
    app.register.controller('ProductDescribeController',
        ['$scope', 'ProductsService', '$stateParams',function ($scope, ProductsService, $stateParams) {
            $scope.viewModel = { url: "" }
            $scope.viewModel.url = localStorage.getItem("ProductDescribeURL");
  
        }]);
});
