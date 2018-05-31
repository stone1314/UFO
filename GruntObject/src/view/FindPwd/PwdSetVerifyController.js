define(['App'], function (app) {
    app.register.controller('PwdSetVerifyController',
        ['$scope', 'UsersService','gToast',function ($scope, UsersService,gToast) {
            
            if (UsersService.ResetPwdModel.Mobile == null || UsersService.ResetPwdModel.Mobile == "") {
                location.replace("#/PwdGetCode");
            }


            $scope.viewModel = {
                userName: "",
                userID:"",
            }

            $scope.NextPage = function () {
                UsersService.VerifyIdNo(UsersService.ResetPwdModel.Mobile, $scope.viewModel.userID.toUpperCase(), $scope.viewModel.userName).then(function (data) {
                    console.log(data);
                    if (data.Success) {
                        if (data.Result.Result) {
                            UsersService.ResetPwdModel.identificationNo = $scope.viewModel.userID.toUpperCase();
                            UsersService.ResetPwdModel.identificationOwnerName = $scope.viewModel.userName;
                            location.replace("#/PwdSetNewPwd");
                        }  else if (data.Result.Result) {
                            gToast.open(data.Result.Message);
                        }
                    }
                     
                });
            } 
        }]);
});
