define(['App'], function (app) {
    app.register.controller('SubscribeListController',
        ['$scope', 'ProductsService', '$timeout', function ($scope, ProductsService, $timeout) {
            $scope.Model = {
                list:null
            }
            ProductsService.QueryOrderRecordList().then(function (data) {
                console.log(data);
                $scope.Model.list = data.Result.Models;
            });

            $scope.showDetail = function (item, index) {
                item.hasShow = true;
                $timeout(function () {
                    if ($("#ConsultingInfo" + index).is(":hidden")) { 
                        $("#ConsultingInfo" + index).slideDown(500);
                    } else { 
                        $("#ConsultingInfo" + index).slideUp(500, function () {
                            $scope.$apply(function () {
                                item.hasShow = false;
                            });
                        });
                    }
                }, 100);


            }
        }]);
});
