define(['App'], function (app) {
    app.register.controller('AmtContentController',
        ['$scope', '$stateParams',function ($scope, $stateParams) {
            console.log("AmtContentController");

            console.log($stateParams.contractNo);

             


        }]);
});
