define(['App'], function (app) {
    app.register.controller('ProductTabsController',

        ['$scope', '$location', '$state', '$timeout', '$ionicSlideBoxDelegate', '$rootScope',function ($scope, $location, $state, $timeout, $ionicSlideBoxDelegate, $rootScope) {
            $scope.ViewModel = {
                indexRef: $state.current.indexRef
            };
            
           
            $rootScope.$on('productTabs', function (event, args) {
                $scope.status(args);
            });

            $scope.indexRef = $state.current.indexRef,
 
             //$scope.status = function (index) {

             //    $ionicSlideBoxDelegate.$getByHandle("slideimgs").slide(index)
             //    $scope.ViewModel.indexRef = index;
             //};


            $scope.status = function (index) {
                $rootScope.productTabIndex = index;
                console.log($rootScope.productTabIndex);
                $ionicSlideBoxDelegate.$getByHandle("slideimgs").slide(index)
                $scope.ViewModel.indexRef = index;
            };



            $scope.slideHasChangeds = function ($index) {
 
                if ($index == 0) {

                    location.replace("#/ProductTabs/ValueAddedPlan/1");
                } 
                else if ($index == 1) { 
                    location.replace("#/ProductTabs/FundList");
                }
                else if ($index == 2) { 
                    location.replace("#/ProductTabs/CIProductList");
                }
                $scope.ViewModel.indexRef = $index;
            };
            $timeout(function () {
                $scope.status($state.current.indexRef);
            }, 10);
        }]);

});
