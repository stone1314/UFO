define(['App'], function (app) {
    app.register.controller('PwdSetNewPwdController',
        ['$scope', 'UsersService', 'HelpAlterService', '$state', '$cookieStore', function ($scope, UsersService, HelpAlterService, $state, $cookieStore) {
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

                        //HelpAlterService.AlertTemplate2($scope, '提示', '密码重置成功,请重新登入', function (e) {
                        //    //location.replace("#/Login");
                        //    $state.go("Login", { from: "ValueAddedPlan" });
                        //})
                        $scope.showResults = HelpAlterService.Alert_Templates($scope, "密码重置成功,请重新登入");
                        $scope.showResults.then(function (res) {
                            if (res) {
                                $cookieStore.put("PhoneNumber", "");
                                $state.go("Login", { from: "ValueAddedPlan" });
                            }
                        });
                    } else {
                        history.back();
                    }
                });
            }

            //当我们用完模型时，清除对应的对象
            $scope.$on("$destroy", function () { 
                if ($scope.showResults != null) {
                    $scope.showResults.close(false);
                }
            });
        }]);
});
