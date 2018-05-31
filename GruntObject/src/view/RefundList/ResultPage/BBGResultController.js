define(['App'], function (app) {
    app.register.controller('BBGResultController',
        function ($scope, UsersService, $stateParams, $cookieStore) {
            $scope.viewModel = { data: null };
 
            $scope.viewModel.data = $cookieStore.get("detailList");
        });
});
