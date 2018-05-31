define(['App'], function (app) {
    app.register.controller('PaymentResultfailureController',
        ['$scope','$stateParams',function ($scope,$stateParams) {
            $scope.viewModel = {
                resultType: $stateParams.resultType,
                btn_text:$stateParams.resultType==1?"确定":"关闭"
            }
            $scope.OK = function () {
                location.replace("#/ProductTabs/ValueAddedPlan/1");
            }
        }]);
});
