define(['App'], function (app) {
    app.register.controller('ProductInfoTabsController',
        ['$scope', '$rootScope', '$stateParams', '$state', function ($scope, $rootScope, $stateParams, $state) {

            $scope.indexRef = $state.current.indexRef;
            $scope.height = "0";
            console.log($('.slider').height());
            if ($state.current.indexRef == 0) {
                location.replace("#/ProductInfoTabs/ProductInfo/" + $stateParams.ProductId);
                $scope.height = 0;
            } else { 
                location.replace("#/ProductInfoTabs/ProductDescribe/"+$stateParams.from+"/" + $stateParams.ContractType+"/"+$stateParams.ProductId);
                $scope.height = "-" + $('.slider').height();//(screen.height - 86);  //151
            }
 
 


            $scope.GoProductInfo = function (productId) {
                
                $scope.height = 0;
                location.replace("#/ProductInfoTabs/ProductInfo/" + productId);
            };
            $scope.GoProductDescribe= function (from,ContractType,ProductId) {
                $scope.height = "-" + +$('.slider').height(); //(screen.height - 86);   //151
              
                location.replace("#/ProductInfoTabs/ProductDescribe/" + from+"/"+ContractType+"/"+ProductId);
            };


            $scope.lijitouzi = function () {
                $rootScope.productTabIndex = 3;
                location.href = "#/PaymentOrder/" + $rootScope.ProductId;
            };

            $scope.setProductTitle = function (title) {
                $scope.headerTitle = title;
            }

            $scope.btnText = "立即投资"
            $scope.pdtDis = false;
            $scope.ctrlBtn = function (ContractType, RaiseState, IsNewbee) {
                if (ContractType == "100000009") {
          
                    if (!IsNewbee) {
                        $scope.btnText = "立即投资"
                        $scope.pdtDis = true;
                    }
                }
                if (RaiseState == '100000002') {
                    $scope.btnText = "已售罄"
                    $scope.pdtDis = true;
                }
            };
        }]);

});
