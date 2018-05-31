define(['App'], function (app) {
    app.register.controller('MyBankCardsController',
        ['$scope', '$ionicPopup', 'UsersService', 'gToast', 'HelpAlterService',function ($scope, $ionicPopup, UsersService, gToast, HelpAlterService) {
            $scope.banks = [];
            $scope.AlertTemplate2 = {
                title: "提示！",
                content: "请选择银行卡！",
            }
            UsersService.GetBindingCards().then(function (data) { 
                console.log(data); 
                if (data.Success) { 
                    $scope.banks = data.Result;  
                }
           
            });

             
            $scope.PopupClose = function () {
                $scope.Popup.close();
            };
           
            //添加银行卡
            $scope.AddBankCardsFun = function () {
                
                if (HelpAlterService.GetlocalStorage.IsRealName() == 'true') {
                    location.href = "#/AddBankCards";
                } else {
                    var pop = HelpAlterService.Confirmation($scope, "<div style='width:100%;text-align:center;'>您必须通过实名认证后才能绑定银行卡</div>", "取消", "立即认证")
                    pop.then(function (e) {
                        console.log(e);
                        if (e) {
                            location.href = "#/RegIdentification/2";
                        }
                    });

                }
            };



            //银行卡详情
            $scope.goDetail = function (detail) {

                HelpAlterService.SetlocalStorage.BankCarDetail(detail);
                location.href = "#/BankDetail";
            };

            //当我们用完模型时，清除对应的对象
            $scope.$on("$destroy", function () {
                if ($scope.Popup != null) {
                    $scope.Popup.close(false);
                }
            });

        }]);


});
