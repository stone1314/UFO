define(['App'], function (app) {
    app.register.controller('ProductInfoTabsController',
        ['$scope', '$rootScope', '$stateParams', '$state', function ($scope, $rootScope, $stateParams, $state) {

            $scope.indexRef = $state.current.indexRef;
            $scope.height = "0";
            console.log($('.slider').height());
            if ($state.current.indexRef == 0) {
                $scope.headerTitle = "产品详情"
                location.replace("#/ProductInfoTabs/ProductInfo/" + $stateParams.ProductId);
                $scope.height = 0;
            } else {
                $scope.headerTitle = "产品描述"
                location.replace("#/ProductInfoTabs/ProductDescribe/" + $rootScope.ProductId);
                $scope.height = "-" + $('.slider').height();//(screen.height - 86);  //151
            }
 

            $rootScope.$on('productInfoTabs', function (event, args) {
             
                if (args == "0") {
                    $scope.headerTitle = "产品详情"
                    $scope.height = 0;
                    location.replace("#/ProductInfoTabs/ProductInfo/" + $rootScope.PrentProductId);
                } else {
                   
                    $scope.height = "-" + +$('.slider').height(); //(screen.height - 86);   //151
                    $scope.headerTitle="产品描述"
                    location.replace("#/ProductInfoTabs/ProductDescribe/" + $rootScope.ProductId);
                }
                //$scope.height = args;
            });

            $scope.lijitouzi = function () {
                location.href = "#/PaymentOrder/" + $rootScope.ProductId;
            };
            $scope.btnText = "立即购买"
            $scope.pdtDis = false;
            $scope.ctrlBtn = function (ContractType, RaiseState, IsNewbee) {
                if (ContractType == "100000009") {
          
                    if (!IsNewbee) {
                        $scope.btnText = "立即购买"
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
