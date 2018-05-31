/// <reference path="templates/Popup/AlertTemplate.html" />
define(['App'], function (app) {
    app.register.controller('FundListController',
        ['$scope', '$ionicPopup',function ($scope, $ionicPopup) {
            $scope.subscribe = function () {
                var alertPopup = $ionicPopup.alert({
                    templateUrl: 'templates/Popup/AlertTemplate.html',
                    okText: "关闭",
                    okType: "button-red button-Size-Height-35"
                });
                alertPopup.then(function (res) {
                    //location.replace("#/tab/FinanceProduct");
                });
            }
            
        }]);
});
