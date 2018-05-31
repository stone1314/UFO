define(['App'], function (app) {
    app.register.controller('ProductDescribeController',
        ['$scope', 'ProductsService', '$stateParams', '$rootScope', function ($scope, ProductsService, $stateParams, $rootScope) {
            $scope.viewModel = { url: "" }
            console.log(localStorage.getItem("ProductDescribeURL"));
            $scope.viewModel.url = localStorage.getItem("ProductDescribeURL");

            $scope.doRefresh = function () {
                $rootScope.$emit("productInfoTabs", "0");
              
            }
           
        }]);
});
