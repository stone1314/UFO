define(['App'], function (app) {
    app.register.controller('InvestmentRecordTabsController',

        ['$scope', '$location', '$state', '$timeout', '$ionicSlideBoxDelegate', '$rootScope',function ($scope, $location, $state, $timeout, $ionicSlideBoxDelegate, $rootScope) {
 
            $scope.ViewModel = {
                indexRef: $state.current.indexRef,
            };
        

            $scope.status = function (index) {

                $ionicSlideBoxDelegate.$getByHandle("slideimgs").slide(index)
                $scope.ViewModel.indexRef = index;
            };
            $scope.slideHasChangeds = function ($index) {
                if ($index == 0) {
                    location.replace("#/InvestmentRecordTabs/RefList0");
                }
                else if ($index == 1) {
                    location.replace("#/InvestmentRecordTabs/RefList1");
                }
                else if ($index == 2) {
                    location.replace("#/InvestmentRecordTabs/RefList2");
                }
                $scope.ViewModel.indexRef = $index;

            };

            $timeout(function () {
                $scope.status($state.current.indexRef);
            }, 10);
        }]);

});
