/// <reference path="../../templates/include/Calculator/YYFXResult.html" />
define(['App'], function (app) {
    app.register.controller('PopupResultController',
        ['$scope', '$ionicActionSheet', '$ionicPopup', '$ionicScrollDelegate', 'ProductsService', '$stateParams', 'gToast', '$timeout', 'HelpAlterService', function ($scope, $ionicActionSheet, $ionicPopup, $ionicScrollDelegate, ProductsService, $stateParams, gToast, $timeout, HelpAlterService) {
            
            $scope.viewModel = {
                FromView: "templates/include/Calculator/YYFXResult.html",
                productName: HelpAlterService.CalculatorHelp.productName,
                productId: $stateParams.pid,
                InvestmentAmount: $stateParams.InvestmentAmount,
                VoteDate: $stateParams.VoteDate,
                EndDate: $stateParams.EndDate,
                datas: [],
                totalAmt:"0.00"

            }
            if ($stateParams.contractAgreement == "100000004") {
                $scope.viewModel.FromView = "templates/include/Calculator/YYFXResult.html";
            } else {
                $scope.viewModel.FromView = "templates/include/Calculator/BBGResult.html";
            }

           
            ProductsService.QueryFinAPI($stateParams.pid, $stateParams.InvestmentAmount, $stateParams.VoteDate.replace(/-/g, ""), $stateParams.EndDate.replace(/-/g, "")).then(function (data) {
                if (data.Success) {
                    console.log(data);
                    $scope.viewModel.datas = data.Result.Data.content;
                    $scope.viewModel.totalAmt = data.Result.Data.totalAmt;
                }

            });
        }]);
});
