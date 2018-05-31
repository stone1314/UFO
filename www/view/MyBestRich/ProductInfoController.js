define(['App'], function (app) {
    app.register.controller('ProductInfoController',
        ['$scope', 'ProductsService', '$stateParams', 'HelpAlterService', '$ionicScrollDelegate',function ($scope, ProductsService, $stateParams, HelpAlterService, $ionicScrollDelegate) {
            $scope.viewModel = {
                RateView: "templates/include/ProductInfo/YYTCRate.html",
                product:null,
                productInfo: null,
                ShowTitle: true,
                pdtClassTyle1: true,
                pdtClassTyle2: false,
                pdtDis: false
            }

           // $scope.viewModel.RateView = "templates/include/ProductInfo/YYTCRate.html";
            var scrollHandles = $ionicScrollDelegate.$getByHandle("paroductHandle");
            var wid = (screen.width / 5);// + (screen.width % 3);


            ProductsService.QueryDefProductCategoryDetail($stateParams.ProductId).then(function (data) {
                console.log(data);
                if (data.Success) {
                    $scope.viewModel.product = data.Result;



                    //默认选中当中的（具有偶数个产品时为第n/2，奇数个产品时为第（n+1）/2）产品
                    var productIndex = parseInt($scope.viewModel.product.Products.length) / 2;
                    if (parseInt($scope.viewModel.product.Products.length) % 2 == 0 && productIndex > 0) {
                        productIndex = productIndex - 1;
                    }

                    $scope.viewModel.productInfo = $scope.viewModel.product.Products[parseInt(productIndex)];
                    if ($scope.viewModel.product.SortId == 6) {
                        $scope.viewModel.RateView = "templates/include/ProductInfo/YYTCNNSLRate.html";
                    } else { 
                        $scope.viewModel.RateView = "templates/include/ProductInfo/YYTCRate.html";
                        $scope.productIndex = parseInt(productIndex) + 2;
                        scrollHandles.scrollTo(wid * (parseInt(productIndex)), 0, false);
                    }
                    
                    $scope.ctrlBtn();//按钮控制
                }
            });
            $scope.lijitouzi = function () {
                location.href = "#/PaymentOrder/" + $scope.viewModel.productInfo.ProductId;
            }


            //按钮样式控制
            $scope.ctrlBtn = function () { 
                if ($scope.viewModel.productInfo.ContractType == "100000009") {
                    if (!$scope.viewModel.productInfo.IsNewbee) {
                        $scope.viewModel.pdtClassTyle1 = false;
                        $scope.viewModel.pdtClassTyle2 = true;
                        $scope.viewModel.pdtDis = true;
                    }
                }
            }

            $scope.ProductDescribeFun = function (url) {
                localStorage.setItem("ProductDescribeURL", url)
                location.href = "#/ProductDescribe";
            }
             
            var getPonitToP = function (left, pointWidth) {
                var lineIndex = Math.round(left / pointWidth);
                //if (lineIndex == 0) lineIndex = 1;
                return lineIndex;
            }

            var isClick = false;
            $scope.onCompleteT = function () {
                if (!isClick) {
                    var left = scrollHandles.getScrollPosition().left;

                    var catLeft = getPonitToP(left, wid) * wid;
                    scrollHandles.scrollTo(catLeft, 0, false);
                    $scope.productIndex = getPonitToP(left, wid) + 2;

                    $scope.viewModel.productInfo = $scope.viewModel.product.Products[parseInt($scope.productIndex) - 2];

                }

            }
            $scope.onDragT = function () {
                isClick = false;
            }
            $scope.onScrollT = function () {
            }
            $scope.changePrd = function (index) {
                isClick = true;
                if (index != ($scope.productIndex - 2)) {
                    $scope.viewModel.productInfo = $scope.viewModel.product.Products[index];

                    $scope.productIndex = index + 2;

                    scrollHandles.scrollTo(wid * (index), 0, false);
                }
            }
        }]);
});
