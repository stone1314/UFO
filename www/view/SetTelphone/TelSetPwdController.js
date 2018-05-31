define(['App'], function (app) {
    app.register.controller('TelSetPwdController',
        ['$scope', 'gToast', 'UsersService', 'HelpAlterService','VerificationHelp',function ($scope, gToast, UsersService, HelpAlterService,VerificationHelp) {
            $scope.viewModel = {
                oldPwd: "",
                newPwd: "",
                reNewPwd: "",
                oldPwdType: "",
                newPwdType: "",
                reNewPwdType: "",
            }


            var onTap = function () {
                UsersService.Logout().then(function (data) {
                    if (data.Success) {
                        location.replace("#/Login/1");
                    }
                });
            }
            $scope.ModifyPwd = function () {
                if ($scope.viewModel.oldPwd == "") {
                    gToast.open("当前密码不能为空！");
                    return false;
                }

                if (!VerificationHelp.PwdVerification($scope.viewModel.oldPwd)) {
                    gToast.open("当前密码输入有误！");
                    return false;
                }

                if ($scope.viewModel.newPwd == "") {
                    gToast.open("新密码不能为空！");
                    return false;
                }
                if (!VerificationHelp.PwdVerification($scope.viewModel.newPwd)) {
                    gToast.open("新密码由6-14位数字和字母组成！");
                    return false;
                }
                if ($scope.viewModel.reNewPwd == "") {
                    gToast.open("请确认新密码！");
                    return false;
                }

                if ($scope.viewModel.newPwd == $scope.viewModel.oldPwd) {
                    gToast.open("新密码和当前密码不能重复！");
                    return false;
                }
                if ($scope.viewModel.reNewPwd != $scope.viewModel.newPwd) {
                    gToast.open("您2次输入的密码不一致，请重新输入！");
                    return false;
                }
                UsersService.ModifyPwd($scope.viewModel.oldPwd, $scope.viewModel.newPwd).then(function (data) {
                    if (data.Success) {
                        HelpAlterService.RemovelocalStorage();
                        HelpAlterService.AlertTemplate2($scope,'提示','密码修改成功,请重新登入',onTap)
                    }
                });
            }
        }]);
});
