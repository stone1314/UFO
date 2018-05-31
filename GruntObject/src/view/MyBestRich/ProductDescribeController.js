define(['App'], function (app) {
    app.register.controller('ProductDescribeController',
        ['$scope', 'ProductsService', '$stateParams', '$rootScope', '$sce', '$http', function ($scope, ProductsService, $stateParams, $rootScope, $sce, $http) {
            $scope.viewModel = {
                url: "",
                IsBanner: false
            }


            //$scope.viewModel = { url: "" }
            console.log(localStorage.getItem("ProductDescribeURL"));
            $scope.viewModel.url = localStorage.getItem("ProductDescribeURL");

            $scope.fileExtension = $scope.viewModel.url.substring($scope.viewModel.url.lastIndexOf('.') + 1).toLowerCase();
            //console.log($scope.fileExtension);
            

            if ($stateParams.from == "banner") {
                $scope.viewModel.IsBanner = true;
            };
            $scope.doRefresh = function () {
 
                $scope.GoProductInfo($stateParams.ProductId);
            };


            //$scope.scanClick=function() {
            //    if(isiOS) {
            //        window.webkit.messageHandlers.ScanAction.postMessage("banner");

            //    }else{
            //        window.webkit.HtmlcallJava2("banner");
            //    }
            //}



           // $scope.viewModel.url = $sce.trustAsResourceUrl("https://ufo-back.quarkfinance.com/templates/include/ProductDescribe/Describe4.html");
           
        }]);
});
