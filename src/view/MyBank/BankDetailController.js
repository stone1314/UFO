define(['App'], function (app) {
    app.register.controller('BankDetaillController',
        ['$scope', 'gToast', 'UsersService', '$state', 'HelpAlterService', function ($scope, gToast, UsersService, $state, HelpAlterService) {
            //  console.log(HelpAlterService.GetlocalStorage.BankCarDetail());
            $scope.Model = {
                detail: HelpAlterService.GetlocalStorage.BankCarDetail()

            };

            //  删除银行卡
            $scope.delBank = function () {
                $scope.Popup = HelpAlterService.Confirmation_Pwd($scope, "您确定要删除此银行卡？");
                $scope.Popup.then(function (res) {
                    if (res) {
                        console.log(res);

                        UsersService.DelCard($scope.Model.detail.BankCardId, res).then(function (data) {
                            if (data.Success) {

                                $scope.banks.splice($scope.banks.indexOf(value), 1);
                                HelpAlterService.Alert_showResults($scope, '删除成功');
                            }
                        });


                        // location.reload = "#/MyBankCards";

                    } else {
                        console.log('You are not sure');
                    }
                });

            };
        }]);
});
