define(['App'], function (app) {
    app.register.controller('BanksController',
        ['$scope', 'gToast', 'UsersService','$state',function ($scope, gToast, UsersService,$state) {
            $scope.banks = [];
            UsersService.GetCardBindList().then(function (data) {
                if (data.Success) {
                    $scope.banks = data.Result.data.bankList;
                } else {
                    gToast.open(data.Error);
                }

            });
            //选择银行
            $scope.choseBank = function (id, name) {
                UsersService.Bank.BankId = id;
                UsersService.Bank.BankName = name;
                //location.href = "#/AddBankCards";
                $state.go("AddBankCards", {}, {
                    reload: true
                });
               // history.back();
            };

        }]);
});
