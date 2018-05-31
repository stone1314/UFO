define(['App'], function (app) {
    app.register.controller('ProductTabsController',
       
        ['$scope', '$location', '$state', '$timeout', '$ionicSlideBoxDelegate',function ($scope, $location, $state, $timeout, $ionicSlideBoxDelegate) {
            $scope.ViewModel = {
                tab1: "selected",
                tab2: "",
                tab3:""
            }

            $scope.status = function (index) {
     
                $ionicSlideBoxDelegate.$getByHandle("slideimgs").slide(index)
                if (index == 0) {
                    $scope.ViewModel.tab1 = "selected";
                    $scope.ViewModel.tab2 = "";
                    $scope.ViewModel.tab3 = "";
                } else if (index == 1) {
                    $scope.ViewModel.tab2 = "selected";
                    $scope.ViewModel.tab1 = "";
                    $scope.ViewModel.tab3 = "";
                }  
            } 
           
    
            $scope.slideHasChangeds = function ($index) { 
                if ($index == 0) {
                    $state.go('ProductTabs.ValueAddedPlan');
                } 
                else if ($index == 1) {
                    $state.go('ProductTabs.CIProductList');
                }
               
                if ($index == 0) {
                    $scope.ViewModel.tab1 = "selected";
                    $scope.ViewModel.tab2 = "";
                    $scope.ViewModel.tab3 = "";
                } else if ($index == 1) {
                    $scope.ViewModel.tab2 = "selected";
                    $scope.ViewModel.tab1 = "";
                    $scope.ViewModel.tab3 = "";
                } 
            }
 
            if ($location.absUrl().indexOf("/ProductTabs/ValueAddedPlan") > 0) { 
                $timeout(function () {
                    $scope.status(0);
                }, 10);
            } else if ($location.absUrl().indexOf("/ProductTabs/CIProductList") > 0) {
                $timeout(function () {
                    $scope.status(1);
                }, 10);
            }
        }]);

});
