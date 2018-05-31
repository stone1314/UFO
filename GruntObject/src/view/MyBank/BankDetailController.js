define(['App'], function (app) {
    app.register.controller('BankDetaillController',
        ['$scope', 'gToast', 'UsersService', '$state', 'HelpAlterService', '$timeout', function ($scope, gToast, UsersService, $state, HelpAlterService, $timeout) {
            //  console.log(HelpAlterService.GetlocalStorage.BankCarDetail());
            $scope.Model = {
                detail: HelpAlterService.GetlocalStorage.BankCarDetail()

            };
            //  删除银行卡
            $scope.delBank = function () {
                $scope.Popup = HelpAlterService.Confirmation_Pwd($scope, "确认要删除银行卡？");
                $scope.Popup.then(function (res) {
                    if (res) {
                        console.log(res);

                        UsersService.DelCard($scope.Model.detail.BankCardId, res).then(function (data) {
                            if (data.Success) {
                                console.log(data); 
                                var alertModel = HelpAlterService.Alert_showResults($scope, '删除成功');

                                $timeout(function () {
                                    history.back();
                                    alertModel.close();
                                }, 3000);
                            }
                        });


                        // location.reload = "#/MyBankCards";

                    } else {
                        console.log('You are not sure');
                    }
                });

            };

            //当我们用完模型时，清除对应的对象
            $scope.$on("$destroy", function () {
                if ($scope.Popup != null) {
                    $scope.Popup.close(false);
                }
            });
        }]);
});
