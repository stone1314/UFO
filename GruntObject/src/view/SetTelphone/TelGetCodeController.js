define(['App'], function (app) {
    app.register.controller('TelGetCodeController',
        ['$scope', '$ionicPopup',function ($scope, $ionicPopup) {
            
            $scope.showAlert = function () {
                var alertPopup = $ionicPopup.alert({
                    template: '<div style="width:100%;text-align:center"><p><label style="color:rgba(237, 121, 25, 1)">恭喜您！</label></p><p><label style="color:rgba(237, 121, 25, 1)">您已成功申请续投！</label></p></div>',
                    okText: "返 回",
                    okType: "button-orange button-small"
                });
                alertPopup.then(function (res) {
                   // location.replace("#/tab/FinanceProduct");
                });
            }

        }]);
});
