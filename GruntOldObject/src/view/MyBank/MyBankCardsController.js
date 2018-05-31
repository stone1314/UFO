define(['App'], function (app) {
    app.register.controller('MyBankCardsController',
        ['$scope', '$ionicPopup', 'UsersService', 'gToast', 'HelpAlterService',function ($scope, $ionicPopup, UsersService, gToast, HelpAlterService) {
           // $scope.model = { pwd: "", content: "您确定要删除此银行卡？" }; 
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



            //  删除银行卡
            $scope.showConfirm = function () {
                if ($("#divMybankCardsList").find("img[src='img/dagou.png']").length == 0) { 
                    $scope.Popup = HelpAlterService.AlertTemplate2($scope, "提示", "请选择银行卡！", null); 
                } else { 
                    $scope.Popup = HelpAlterService.PasswordConfirmation($scope, "您确定要删除此银行卡？"); 
                    $scope.Popup.then(function (res) { 
                        if (res) {
                            $.each($scope.banks, function (index, value) {
                                if (value.hasDel) {
                                    UsersService.DelCard(value.BankCardId,  $scope.model.pwd).then(function (data) {
                                        if (data.Success) {
                                            $scope.banks.splice($scope.banks.indexOf(value), 1);
                                        }
                                    });
                                }
                            });
                            // location.reload = "#/MyBankCards";

                        } else {
                            console.log('You are not sure');
                        }
                    });
                }
            };

            $scope.PopupClose = function () {
                $scope.Popup.close();
            };

            //添加银行卡
            $scope.AddBankCardsFun = function () { 
                if (HelpAlterService.GetlocalStorage.IsRealName()=='true') {
                    location.href = "#/AddBankCards";
                } else {
                    location.href = "#/RegIdentification/2";
                }
            }

            //当我们用完模型时，清除对应的对象
            $scope.$on("$destroy", function () {
                if ($scope.Popup != null) {
                    $scope.Popup.close(false);
                }
            });

        }]);


});
