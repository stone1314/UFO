﻿define(['App'], function (app) {
    app.register.controller('LoginController',
        ['$scope', 'UsersService', '$state', '$stateParams', 'VerificationHelp', '$cookieStore', 'HelpAlterService', '$rootScope', function ($scope, UsersService, $state, $stateParams, VerificationHelp, $cookieStore, HelpAlterService, $rootScope) {
          
            $scope.pwdIoc = "img/mima.png";
            $scope.pwdState = "password";
            $scope.user = { txtNum: "", txtPwd: "" };

            $scope.Show = function () {
                if ($scope.pwdIoc == "img/mima.png") {
                    $scope.pwdIoc = "img/mimakejian.png";
                    $scope.pwdState = "text";
                } else {
                    $scope.pwdIoc = "img/mima.png";
                    $scope.pwdState = "password";
                }

            };
            $scope.DelNum = function () {
                $scope.user = { txtNum: "" };
            };
            $scope.Login = function () {
                UsersService.Login($scope.user.txtNum, $("#user_pwd").val()).then(function (data) {
                    console.log(data);
                    if (data.Success) {
                        //保存token
                        // UsersService.SetToken(data.Result.AccessToken);
                       
                        if (data.Result.UserNo != null && data.Result.UserNo != '') { 
                            HelpAlterService.SetlocalStorage.token(data.Result.AccessToken, true);
                        } else { 
                            HelpAlterService.SetlocalStorage.token(data.Result.AccessToken, false);
                        };
                        HelpAlterService.SetlocalStorage.IsQualified(data.Result.IsQualified);
                        HelpAlterService.SetlocalStorage.InvestFlag(data.Result.InvestFlag);
                        console.log($stateParams["from"]);
                        if ($rootScope.productTabIndex == 1) {
                            $rootScope.productTabIndex = 0;
                            location.replace("#/ProductTabs/FundList");
                        } else if ($rootScope.productTabIndex == 2) {
                            $rootScope.productTabIndex = 0;
                            location.replace("#/ProductTabs/CIProductList");
                        } else if ($rootScope.productTabIndex == 3) {
                            $rootScope.productTabIndex = 0;
                            history.back();
                        } else {
                            location.replace("#/ProductTabs/ValueAddedPlan/1");
                        }
                        
                        //var from = $stateParams["from"];
                        //if (from == 'ValueAddedPlan') {
                        //    location.href = "#/ProductTabs/ValueAddedPlan/1";
                        //} else {
                        //    history.back();
                        //};
                    }
                });
            }; 
        }]);
});
