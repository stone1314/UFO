define(['App'], function (app) {
    app.register.controller('MyAccountController',
        ['$scope', 'UsersService', '$ionicPopup', 'HelpAlterService', function ($scope, UsersService, $ionicPopup, HelpAlterService) {
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

            var func = function () {
                UsersService.WeiXinHandleFirstFlag(1);
            }


            UsersService.QueryWealth().then(function (data) {
                console.log(data.Result.Data);
                if (data.Success) {
                    if (data.Result.Data) {


                        if (data.Result.Data.ContractFlag == 0) {
                            $scope.Popup = HelpAlterService.Alert_prompt($scope, "prompt_accout", func);
                        }

                        $scope.UserInfo = data.Result.Data;
                        $scope.User.IsWeiXinHideAmount = data.Result.Data.IsWeiXinHideAmount==0?true:false;
                        console.log($scope.UserInfo);
                        //$scope.User.wealthAmt = data.Result.Data.WealthAmount;    //累计收益
                        if (data.Result.Data.Avatar != null && data.Result.Data.Avatar != "") {
                            $scope.User.headImg = data.Result.Data.Avatar;    //头像
                        };
                       // $scope.User.IsHideAmount = data.Result.Data.IsHideAmount;
                        if (data.Result.Data.IsHideAmount) {
                            $scope.User.IsHideAmountImgUrl = "img/NewUI/biyan@2x.png";
                        } else {
                            $scope.User.IsHideAmountImgUrl = "img/NewUI/Unknown@2x.png";
                        }
   
                    }
                }
            });
           
 
            //var Popup = $ionicPopup.show({
            //    templateUrl: 'templates/Popup/prompt_accout.html',
            //    cssClass: 'ufoPrompt',
            //    scope: $scope
            //});
            //当我们用完模型时，清除对应的对象
            $scope.$on("$destroy", function () {
 
                if ($scope.Popup != null) {
                    $scope.Popup.close(false);
                }
            });

            $scope.UpdateIsHideAmount = function () {
                $scope.UserInfo.IsHideAmount = !$scope.UserInfo.IsHideAmount;
                if ($scope.UserInfo.IsHideAmount) {
                    $scope.User.IsHideAmountImgUrl = "img/NewUI/biyan@2x.png";
                } else {
                    $scope.User.IsHideAmountImgUrl = "img/NewUI/Unknown@2x.png";
                }
                UsersService.HideUserAmount($scope.UserInfo.IsHideAmount);
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
