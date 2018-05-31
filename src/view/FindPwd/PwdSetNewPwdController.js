define(['App'], function (app) {
    app.register.controller('PwdSetNewPwdController',
        ['$scope', 'UsersService', 'HelpAlterService', '$state',function ($scope, UsersService, HelpAlterService, $state) {
            $scope.viewModel = {
                newPwd: "",
                reNewPwd: "",
            }

            $scope.ConfirmUpd = function () {//NewPassword
                UsersService.ResetPwdModel.NewPassword = $scope.viewModel.newPwd;
                UsersService.ResetPwdModel.loginRePassword = $scope.viewModel.reNewPwd;
                UsersService.ResetPwd().then(function (data) {
                    console.log(data);
                    if (data.Success) {

                        HelpAlterService.AlertTemplate2($scope, '提示', '密码重置成功,请重新登入', function (e) {
                            //location.replace("#/Login");
                            $state.go("Login", { from: "ValueAddedPlan" });
                        })
                        
                    }
                });
            }
        }]);
});
