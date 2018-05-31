define(['App'], function (app) {
    app.register.controller('PaymentResultfailureController',
        ['$scope','$stateParams',function ($scope,$stateParams) {
            $scope.viewModel = {
                resultType: $stateParams.resultType
            }
            $scope.OK = function () {
                location.replace("#/ProductTabs/ValueAddedPlan/1");
            }
        }]);
});
