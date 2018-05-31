define(['App'], function (app) {
    app.register.controller('RegChoseController',
        ['$scope', 'UsersService',function ($scope, UsersService) {
            $scope.SelectType = function (type)
            {
                UsersService.ufoUser.isNew = type;
            }
        }]);
});
