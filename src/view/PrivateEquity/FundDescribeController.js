define(['App'], function (app) {
    app.register.controller('FundDescribeController',
        ['$scope', 'ProductsService', '$stateParams', '$rootScope', function ($scope, ProductsService, $stateParams, $rootScope) {
            $scope.viewModel = { url: "" }
            console.log(localStorage.getItem("FundDescribeURL"));
            $scope.viewModel.url = localStorage.getItem("FundDescribeURL");

          

        }]);
});
