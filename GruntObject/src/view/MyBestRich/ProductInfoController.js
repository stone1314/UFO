define(['App'], function (app) {
    app.register.controller('ProductInfoController',
        ['$scope', 'ProductsService', '$stateParams', 'HelpAlterService', '$ionicScrollDelegate', '$ionicModal', '$timeout', '$ionicScrollDelegate', '$rootScope', function ($scope, ProductsService, $stateParams, HelpAlterService, $ionicScrollDelegate, $ionicModal, $timeout, $ionicScrollDelegate, $rootScope) {
            $scope.viewModel = {
                RateView: "templates/include/ProductInfo/YYTCRate.html",
                product: null,
                productInfo: null,
                ShowTitle: true,
                pdtClassTyle1: true,
                pdtClassTyle2: false,
                pdtDis: false,
                btnText: '立即投资',
                scorll:0

            };
             
            //$scope.viewModel.scorll=
            


            $scope.positionInfo = 0; 

            var scrollHandles = $ionicScrollDelegate.$getByHandle("paroductHandle");
            var wid = (screen.width / 5);


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
                    $rootScope.ProductId = $scope.viewModel.productInfo.ProductId;
                    $rootScope.PrentProductId = $stateParams.ProductId;


                    $scope.ctrlBtn($scope.viewModel.productInfo.ContractType, $scope.viewModel.productInfo.RaiseState, $scope.viewModel.productInfo.IsNewbee);//按钮控制

                    if ($scope.viewModel.productInfo.ContractType == "100000009") {
                        $scope.viewModel.pdtDis = true;
                    }


                    $scope.setProductTitle($scope.viewModel.product.Name);//设置Title

                    $timeout(function () {
                        if ($($(".scroll")[1]).height() < $(".slider").height()) {

                            $scope.viewModel.scorll = $(".slider").height() - $($(".scroll")[1]).height() + 30;
                            console.log($scope.viewModel.scorll);
                        }
                    },300);
                  
                }
            });
            $scope.lijitouzi = function () {
                location.href = "#/PaymentOrder/" + $scope.viewModel.productInfo.ProductId;
            };

         

            $scope.ProductDescribeFun = function (url) {
                localStorage.setItem("ProductDescribeURL", url)

            };
            

            $scope.noMoreItemsAvailable = false;
            $scope.loadMore = function () {
                
                $scope.noMoreItemsAvailable =true;
                var position = $ionicScrollDelegate.getScrollPosition().top;//取滑动TOP值  
                console.log($ionicScrollDelegate.getScrollPosition());
              
                if ($scope.viewModel.productInfo!=null) {
                     localStorage.setItem("ProductDescribeURL", $scope.viewModel.productInfo.DetailUrl)
 
                    $scope.GoProductDescribe("info", $scope.viewModel.product.SortId, $stateParams.ProductId);

                }
                $scope.noMoreItemsAvailable = false;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }


            var getPonitToP = function (left, pointWidth) {
                var lineIndex = Math.round(left / pointWidth);
                return lineIndex;
            };

            var isClick = false;
            $scope.onCompleteT = function () {
                if (!isClick) {
                    var left = scrollHandles.getScrollPosition().left;

                    var catLeft = getPonitToP(left, wid) * wid;
                    scrollHandles.scrollTo(catLeft, 0, false);
                    $scope.productIndex = getPonitToP(left, wid) + 2;

                    $scope.viewModel.productInfo = $scope.viewModel.product.Products[parseInt($scope.productIndex) - 2];
                    $rootScope.ProductId = $scope.viewModel.productInfo.ProductId;
                    $ionicScrollDelegate.$getByHandle('ProductInfoScroll').scrollTop();
                }

            };
            $scope.onDragT = function () {
                isClick = false;
            };
            $scope.onScrollT = function () {
            };
            $scope.changePrd = function (index) {
                isClick = true;
                if (index != ($scope.productIndex - 2)) {
                    $scope.viewModel.productInfo = $scope.viewModel.product.Products[index];

                    $scope.productIndex = index + 2;

                    scrollHandles.scrollTo(wid * (index), 0, false);
                    $rootScope.ProductId = $scope.viewModel.productInfo.ProductId;
                    $ionicScrollDelegate.$getByHandle('ProductInfoScroll').scrollTop();
                }
            };


        }]);
});
