define(['App'], function (app) {
    app.register.controller('MyBaseAccountController',
        ['$scope', 'UsersService', 'HelpAlterService',function ($scope, UsersService, HelpAlterService) {
 
            $scope.User = {
                name: "",
                identificationNo: "",
                phone: ""
            };

            $scope.changPhone = function () {
                location.replace("#/TelGetCode");
            }

            //$scope.changPwd = function ()
            //{
            //    location.replace("#/TelSetPwd");
            //}

            $scope.Loginout = function () {
                UsersService.Logout().then(function (data) {
                    if (data.Success) {
                        HelpAlterService.RemovelocalStorage();
                        location.replace("#/Login");
                    }
                });
            }
            
            UsersService.QueryUserDetail().then(function (data) {
                console.log(data);
                if (data.Success) {
                    $scope.User.name = data.Result.Data.Name;
                    $scope.User.identificationNo = data.Result.Data.CertNo;
                    $scope.User.phone = data.Result.Data.MaskMobile;
                }
            });


        }]);
});
