define(['App'], function (app) {
    app.register.controller('PaymentResultController',
        ['$scope','$stateParams',function ($scope,$stateParams) {
            $scope.tolMoney = $stateParams.tolMoney;

            $scope.OK = function () {
                location.replace("#/ProductTabs/ValueAddedPlan/1");
            }
        }]);
});
