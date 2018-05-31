define(['App'], function (app) {
    app.register.controller('ProDetailController',
        ['$scope', '$stateParams', 'ProductsService', '$ionicPopup', 'gToast', 'HelpAlterService', '$rootScope', 'HelpAlterService', '$cookieStore', function ($scope, $stateParams, ProductsService, $ionicPopup, gToast, HelpAlterService, $rootScope, HelpAlterService, $cookieStore) {

            $scope.Model = {
                data: null,
                Has_btnState: false,
                btnStateText: "申请续投",
                btnStateHref: "#/IncomeList/",
                btnDisabled:false,
                includeView: '',
                includeView_top:'',
            };//templates/include/ProDetail/FixedProductDetail.html
            ProductsService.GetQueryAssertInfo($stateParams.ContractId).then(function (data) {
                console.log(data);
                if (data.Success) {
                    $scope.Model.data = data.Result.Data;
                    if ($scope.Model.data.ContractType == '100000008') {
                        $scope.Model.includeView_top = 'templates/include/ProDetail/BBGPrdDetailHeader.html';
                    } else {
                        $scope.Model.includeView_top = 'templates/include/ProDetail/FixedPrdDetailHeader.html';
                    }
                    if ($scope.Model.data.ContractType == '100000004') {    //月月付息
                        $scope.Model.includeView = 'templates/include/ProDetail/YYFXProductDetail.html';
                    } else if ($scope.Model.data.ContractType == '100000007') {    //梵高计划
                        $scope.Model.includeView = 'templates/include/ProDetail/FGJHProductDetail.html';
                    } else if ($scope.Model.data.ContractType == '100000008') {    //步步高
                        $scope.Model.includeView = 'templates/include/ProDetail/BBGProductDetail.html';
                    } else {
                        $scope.Model.includeView = 'templates/include/ProDetail/FixedProductDetail.html';
                    };



                    if ($stateParams.pageNo == "CIProductList") {
                        $scope.Model.Has_btnState = true;
                        $scope.Model.btnStateText = "申请续投";
                        $scope.Model.btnStateHref = "#/ApplyCI/" + $scope.Model.data.ContractId;
                    };

                    if ($stateParams.pageNo == "RefList") {
                        if ($scope.Model.data.ContractType == '100000004') {
                            $scope.Model.Has_btnState = true;
                            $scope.Model.btnStateText = "收益明细";
                            $scope.Model.btnStateHref = "#/IncomeList/" + $scope.Model.data.ContractId + "/" + $scope.Model.data.ContractType;
                        } else if ($scope.Model.data.ContractType == '100000008') {
                            if ($scope.Model.data.QuitStatus == "100000000") {
                                if ($scope.Model.data.IsLockQuit == false) {
                                    $scope.Model.Has_btnState = true;
                                    $scope.Model.btnStateText = "申请退出";
                                    $scope.Model.btnStateHref = "IsLockQuit";
                                } else if ($scope.Model.data.InvestQuitStatus == true) {
                                    $scope.Model.Has_btnState = true;
                                    $scope.Model.btnStateText = "已申请退出";
                                    $scope.Model.btnStateHref = "";
                                    $scope.Model.btnDisabled = true;
                                } else {
                                    $scope.Model.Has_btnState = true;
                                    $scope.Model.btnStateText = "申请退出";
                                    $scope.Model.btnStateHref = "IsLockQuit";
                                    $scope.Model.btnDisabled = true;
                                }
                            } else if ($scope.Model.data.QuitStatus == "100000001") {
                                $scope.Model.Has_btnState = true;
                                $scope.Model.btnStateText = "已申请退出";
                                $scope.Model.btnStateHref = "";
                                $scope.Model.btnDisabled = true;
                            }
                        } else {
                            $scope.Model.Has_btnState = false;
                        }
                    }



                };
            });

            $scope.goIncomeList = function () {
                $cookieStore.put("detailList", $scope.Model.data.Ab032List);
                location.href = "#/IncomeList/" + $scope.Model.data.ContractId + "/" + $scope.Model.data.ContractType;
            }
            
            $scope.btn_hrefPage = function () {
                if ($scope.Model.btnStateHref != "") {
                    if ($scope.Model.btnStateHref == "IsLockQuit") {   //步步高申请退出
                        $scope.Popup = HelpAlterService.Confirmation_Pwd($scope, "确认退出？");
                        $scope.Popup.then(function (res) {
                            if (res) {
                                //  申请退出
                                ProductsService.ApplyQuit($scope.Model.data.ContractId, res).then(function (result) {
                                    console.log(result);
                                    if (result.Success) {
                                        $scope.Popup = HelpAlterService.AlertOKTemplate($scope, "退出申请成功！");
                                        $scope.Popup.then(function (result) {
                                            console.log(result);
                                            location.href = "#/InvestmentRecordTabs/RefList0";
                                        });
                                    }
                                });
                            } else {
                                console.log('You are not sure');
                            }
                        });
                    } else {
                        location.href = $scope.Model.btnStateHref;
                    }
                }
            }

            $scope.agreement = function (contractNo) {
                if (!contractNo) {
                    gToast.open("合同号不存在！");
                    return false;
                }

                ProductsService.ContractDetails(contractNo).then(function (data) {
                    console.log(data);
                    if (data.Success) {
                        // $rootScope.AgreementList = data.Result;
                        if ($scope.Model.data.PaperContract != null) {
                            HelpAlterService.Alert($scope, $scope.Model.data.PaperContract);
                            return false;
                        }
                        if (data.Result.length <= 0) {
                            gToast.open("合同正在努力的生成中，请稍后再试");
                            return false;
                        }
                        HelpAlterService.SetlocalStorage.Agreement.List(data.Result);

                        location.href = '#/ContractList/ProDetail';

                    } else {
                        HelpAlterService.Alert($scope, '该笔理财无电子合同，请查看您的纸质合同');
                    }
                });
            };
            ///协议预览
            $scope.ContactHref_CJ = function (resType, title, ContractType) {

                HelpAlterService.SetlocalStorage.Agreement.Title(title);
                location.href = "#/RegSetIdentification/3/" + resType + "/1/" + ContractType;
            }

        }]);
});
