define(['App'], function (app) {
    app.register.controller('FundDetailController',
       ['$scope', 'ProductsService', '$stateParams', 'HelpAlterService', '$ionicScrollDelegate', function ($scope, ProductsService, $stateParams, HelpAlterService, $ionicScrollDelegate) {



           $scope.Model = {
               productInfo: null,
               Rage:null
           }


 
         
           var scrollHandles = $ionicScrollDelegate.$getByHandle("fundDetailHandle");
           var wid = (screen.width / 3);


           ProductsService.QueryFundProductDetail($stateParams.productId).then(function (data) {
               console.log(data);
               if (data.Success) {
                  
                   $scope.Model.productInfo = data.Result.Data;
                   $scope.tabsBtn($scope.Model.productInfo);
                   var rateIndex = parseInt(data.Result.Data.Rates.length) / 2;
                   if (parseInt(data.Result.Data.Rates.length) % 2 == 0 && rateIndex > 0) {
                       rateIndex = rateIndex - 1;
                   }
                   $scope.Model.Rage = $scope.Model.productInfo.Rates[parseInt(rateIndex)];
                   $scope.rateIndex = parseInt(rateIndex) + 1;
                   scrollHandles.scrollTo(wid * (parseInt(rateIndex)), 0, false);

               }

           });




           

           var getPonitToP = function (left, pointWidth) {
               var lineIndex = Math.round(left / pointWidth);
               //if (lineIndex == 0) lineIndex = 1;
               return lineIndex;
           };

           var isClick = false;
           $scope.onCompleteT = function () {
              
              


               if (!isClick) {
                   var left = scrollHandles.getScrollPosition().left;

                   var catLeft = getPonitToP(left, wid) * wid;
                   scrollHandles.scrollTo(catLeft, 0, false);
                   $scope.rateIndex = getPonitToP(left, wid) + 1;

                   $scope.Model.Rage = $scope.Model.productInfo.Rates[parseInt(parseInt($scope.rateIndex) - 1)];

               }
           };
           $scope.onDragT = function () {
               isClick = false;
           };
           $scope.onScrollT = function () {
           };
           $scope.changePrd = function (index) {  
               isClick = true;
               if (index != ($scope.rateIndex - 1)) {
                 
                   $scope.Model.Rage = $scope.Model.productInfo.Rates[parseInt(index)];

                   $scope.rateIndex = index + 1;

                   scrollHandles.scrollTo(wid * (index), 0, false);
               }
           };

           

           $scope.loadMore = function () {

               $scope.noMoreItemsAvailable = true;
               var position = $ionicScrollDelegate.getScrollPosition().top;//取滑动TOP值  
               console.log($ionicScrollDelegate.getScrollPosition());

               if (position > 0 && $scope.Model.productInfo != null) {
                   localStorage.setItem("FundDescribeURL", $scope.Model.productInfo.ProductUrl)
                   // console.log($scope.viewModel.productInfo.DetailUrl)
                   // $rootScope.$emit("productInfoTabs", "-580");

                   $scope.GoFundDescribe();

               }
               $scope.noMoreItemsAvailable = false;
               $scope.$broadcast('scroll.infiniteScrollComplete');
           }


           $scope.FundDescribeFun = function (url) {
               localStorage.setItem("FundDescribeURL", url)
               location.href = "#/FundDescribe";
           };
           //当我们用完模型时，清除对应的对象
           $scope.$on("$destroy", function () {
               if ($scope.Popup != null) {
                   $scope.Popup.close(false);
               }
               if ($scope.showResults != null) {
                   $scope.showResults.close(false);
               }
           });
        }]);
});
