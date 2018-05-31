define(['App'], function (app) {
    app.register.controller('MyAccountController',
        ['$scope', 'UsersService',function ($scope, UsersService) {
            $scope.User = {
                wealthAmt: "",
                headImg: "img/HeadPortrait.jpg",
                profitTotal: "",
                cardNum: 0,
                rpName: "",
                rpMobile: "",
                IsHideAmount:false,
                IsHideAmountImgUrl: "",
                BankCardCount:""
            };
            $scope.UserInfo = null;
            UsersService.QueryWealth().then(function (data) {
                
                if (data.Success) {
                    if (data.Result.Data) {
                        $scope.UserInfo = data.Result.Data;
                        console.log($scope.UserInfo);
                        //$scope.User.wealthAmt = data.Result.Data.WealthAmount;    //累计收益
                        if (data.Result.Data.headImg != null && data.Result.Data.headImg != "") {
                            $scope.User.headImg = data.Result.Data.headImg;    //头像
                        };
                       // $scope.User.IsHideAmount = data.Result.Data.IsHideAmount;
                        if (data.Result.Data.IsHideAmount) {
                            $scope.User.IsHideAmountImgUrl = "img/NewUI/biyan@2x.png";
                        } else {
                            $scope.User.IsHideAmountImgUrl = "img/NewUI/Unknown@2x.png";
                        }
                       // $scope.User.BankCardCount = data.Result.Data.BankCardCount;
                       // $scope.User.profitTotal = data.Result.Data.ProfitTotal;   //投资总金额
                       // $scope.User.IsWeiXinHideAmount = data.Result.Data.IsWeiXinHideAmount;
                       // $scope.User.rpName = data.Result.Data.ManagerName;   //    经理人名称
                       // $scope.User.rpMobile = data.Result.Data.ManagerMobile;     //经理人电话
                    }
                }
            });

            $scope.UpdateIsHideAmount = function () {
                UsersService.UpdateIsHideAmount(!$scope.UserInfo.IsHideAmount).then(function (data) {
                    console.log(data);
                    if (data.Result.Data.IsHideAmount) {
                        $scope.User.IsHideAmountImgUrl = "img/NewUI/biyan@2x.png";
                    } else {
                        $scope.User.IsHideAmountImgUrl = "img/NewUI/Unknown@2x.png";
                    }
                    $scope.UserInfo.IsHideAmount = data.Result.Data.IsHideAmount;
                    $scope.UserInfo.WealthAmount = data.Result.Data.WealthAmount;    //累计收益
                    $scope.UserInfo.ProfitTotal = data.Result.Data.ProfitTotal;   //投资总金额
                });
            };

            $scope.WeiXinHideUserAmount = function () {
                UsersService.WeiXinHideUserAmount("1").then(function (data) {
                    if (data.Success) {
                        $scope.User.IsWeiXinHideAmount = !$scope.User.IsWeiXinHideAmount;
                    } 
                });
            }
        }]);
});
