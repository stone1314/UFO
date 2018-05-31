define(['App'], function (app) {
    app.register.controller('ApplyCIController',
        ['$scope', '$ionicActionSheet', '$ionicPopup', 'ProductsService', '$stateParams', 'HelpAlterService', 'gToast',function ($scope, $ionicActionSheet, $ionicPopup, ProductsService, $stateParams, HelpAlterService, gToast) {
            $scope.viewModel = {
                isshow : true,
                ProductName: "",
                ChoseProduct: null,
                SortProductName: "",
                ChoseSortProduct: null,
                CIModeIndex: '',
                CIModeName: "",
                conType:2,
                totalAmount:0,
                ContractDetail:null,
                RinvestProduct: [],
                ProductSortList: [],
                HasPayProduct:false
            };
 
            $scope.AlertTemplate2 = {
                title: "恭喜您！",
                content: "您已经成功申请续投",
            }

            $scope.CIModes = [
                  //{ text: '本金续投', index: '100000001', conType: 2 },
                  //{ text: '本息续投', index: '100000002', conType: 3 }
            ];
            ProductsService.ContractDetail($stateParams.contractNo).then(function (data) { 
                if (data.Success) { 
                    $scope.viewModel.ContractDetail = data.Result.Data;
                    console.log($scope.viewModel.ContractDetail);
                    //$scope.viewModel.totalAmount = $scope.viewModel.ContractDetail.InvestAmt;
                    console.log(data);
                    if (HelpAlterService.ContractHelp.hasToContract) {
                        HelpAlterService.ContractHelp.hasToContract = false;
                        $scope.viewModel = HelpAlterService.ContractHelp.content;
                        if (HelpAlterService.ContractHelp.hasValue) {
                            $scope.viewModel.isshow = true;
                            HelpAlterService.ContractHelp.hasValue = true;
                        }
                    }

                    //获取续投方式
                    ProductsService.QueryReinvestType($scope.viewModel.ContractDetail.Pid).then(function (data) {
                        if (data.Success) { 
                            angular.forEach(data.Result, function (data, index, array) { 
                                $scope.CIModes.push({ text: data.Name, index: data.Value });
                                //$scope.CIModes[$scope.CIModes.length] = { text: data.Name, index: data.Value };
                            }); 
                        }
                    })

                }
            });
             
            //ProductsService.RinvestProduct().then(function (data) {
               
            //    if (data.Success) {
            //        console.log(data);
            //        $scope.viewModel.RinvestProduct = data.Result.Data;
            //        angular.forEach($scope.viewModel.RinvestProduct, function (data, index, array) {
            //            data.text = data.ProductName;
            //        });

            //        console.log($scope.viewModel.RinvestProduct);
            //    }
            //});
            //获取续投大类产品
            ProductsService.QueryReinvestProductCatgory().then(function (data) {
                console.log(data);
                if (data.Success) {

                    $scope.viewModel.ProductSortList = data.Result.Data;
                    angular.forEach($scope.viewModel.ProductSortList, function (data, index, array) {
                        data.text = data.Name;
                    });
                    console.log(data);
                }
            });

           
            
           


            $scope.agreement = function () {
                if ($scope.viewModel.ChoseProduct == null) {
                    gToast.open("请选择续投产品");
                    return false;
                } 
                $scope.alertModel = $ionicPopup.alert({
                    templateUrl: 'templates/Popup/CIContactTemplate.html',
                    scope: $scope,
                    okText: "返回",
                    okType: "button-red button-Size-Height-35"
                });
                $scope.alertModel.then(function (res) {
                    //location.replace("#/tab/FinanceProduct");
                });
            }
            //产品选择下拉列表
            $scope.productSheet = function () {
                $ionicActionSheet.show({
                    buttons: $scope.viewModel.RinvestProduct,
                    cancelText: '取 消',
                    buttonClicked: function (index) {
                        
                        $scope.viewModel.ProductName = $scope.viewModel.RinvestProduct[index].text;
                        $scope.viewModel.ChoseProduct = $scope.viewModel.RinvestProduct[index];
                        console.log($scope.viewModel.ChoseProduct);
                        return true;
                    }
                });
                $scope.cancelText = true;
            }

            $scope.subscribe = function () {
                
                $scope.alertModel = $ionicPopup.alert({
                    templateUrl: 'templates/Popup/AlertTemplate2.html',
                    scope:$scope,
                    okText: "返回",
                    okType: "button-red button-Size-Height-35"
                });
                $scope.alertModel.then(function (res) {
                    //location.replace("#/tab/FinanceProduct");
                });
            }

            $scope.SelectCIMode = function () {
                // $("body").addClass("platform-ios").removeClass("platform-android").addClass("platform-ios4").removeClass("platform-android4").removeClass("platform-android4_4");
                $ionicActionSheet.show({
                    buttons: $scope.CIModes,
                    cancelText: '取 消',
                    buttonClicked: function (index) { 
                        $scope.viewModel.CIModeName = $scope.CIModes[index].text;
                        $scope.viewModel.CIModeIndex = $scope.CIModes[index].index;
                        $scope.viewModel.conType = $scope.CIModes[index].conType;
                        if ($scope.CIModes[index].index == '100000001') {
                            $scope.viewModel.totalAmount = $scope.viewModel.ContractDetail.InvestAmt;
                        } else {
                            $scope.viewModel.totalAmount = parseFloat($scope.viewModel.ContractDetail.InvestAmt) + parseFloat($scope.viewModel.ContractDetail.ExpectProfitAmt);;
                        }
                        return true;
                    }
                });
                $scope.cancelText = true;
            }


            $scope.showAlert = function () {
                $scope.alertModel = $ionicPopup.alert({
                    template: '<div style="width:100%;text-align:center;margin-top:10px;"><p><label style="color:rgba(237, 121, 25, 1)">本息续投</label>即本金利息一起续投。</p><p><label style="color:rgba(237, 121, 25, 1)">本金续投</label>即仅本金进行续投。</p></div>',
                    okText: "知 道 了 ！",
                    okType: "button-red button-Size-Height-35"
                });
                $scope.alertModel.then(function (res) {

                });
            };
 

            ///协议预览
            $scope.ContactHref = function (resType,typename) {
                $scope.alertModel.close();
                HelpAlterService.ContractHelp.hasToContract = true;
                HelpAlterService.ContractHelp.content = $scope.viewModel;
 
                HelpAlterService.SetlocalStorage.Agreement.Title(typename);
                location.href = "#/RegSetIdentification/3/" + resType + "/" + $scope.viewModel.conType + "/" + $scope.viewModel.ChoseProduct.ContractType;
            };
            $scope.submit = function () {
                if ($scope.viewModel.ChoseProduct == null) {
                    gToast.open("请选择续投产品！");
                    return false;
                }
                if ($scope.viewModel.CIModeIndex == "" || $scope.viewModel.CIModeIndex == null) {
                    gToast.open("请选择续投方式！");
                    return false;
                }
                if (!$scope.viewModel.isshow) {
                    gToast.open("请阅读并同意协议！");
                    return false;
                }

                $scope.pwdModel = HelpAlterService.Confirmation_Pwd($scope, "续投金额(" + $scope.viewModel.totalAmount + "元)");
                $scope.pwdModel.then(function (res) { 
                    if (res) {  
                        ProductsService.ApplyReinvest($stateParams.contractNo, $scope.viewModel.ChoseProduct.ProductId, $scope.viewModel.CIModeIndex, res).then(function (data) {
                            console.log(data);
                            if (data.Success) {
                                //$scope.Popup = HelpAlterService.AlertTemplate2($scope, "提示", "续投申请成功。", function () {
                                //    location.replace("#/ProductTabs/CIProductList");
                                //});

                                $scope.showResults = HelpAlterService.Alert_Templates($scope, "续投申请成功");
                                $scope.showResults.then(function (res) {
                                    if (res) {
                                        location.replace("#/ProductTabs/CIProductList");
                                    }
                                });
                            }
                        });
                    } else {
                        console.log('You are not sure');
                    }
                    $scope.model.pwd = "";
                });
               
            }
            ///试算
            $scope.GoCalculator = function () {
                var choseproductID = 0;
                if ($scope.viewModel.ChoseProduct != null) {
                    choseproductID = $scope.viewModel.ChoseProduct.PID; 
                }
                location.href = "#/Calculator/" + choseproductID + "/0";// + $scope.viewModel.totalAmount;
            }

            //当我们用完模型时，清除对应的对象
            $scope.$on("$destroy", function () {
                if ($scope.alertModel != null) {
                    $scope.alertModel.close(false);
                }
                if ($scope.pwdModel != null) {
                    $scope.pwdModel.close(false);
                }
                if($scope.showResults!=null){
                    $scope.showResults.close(false);
                }
            });



            //产品选择下拉列表
            $scope.sortProductSheet = function () {
              
                $ionicActionSheet.show({
                    buttons: $scope.viewModel.ProductSortList,
                    cancelText: '取 消',
                    buttonClicked: function (index) {
                        $scope.viewModel.ProductName = "";
                        $scope.viewModel.ChoseProduct = null;

                        $scope.viewModel.SortProductName = $scope.viewModel.ProductSortList[index].text;
                        $scope.viewModel.ChoseSortProduct = $scope.viewModel.ProductSortList[index];

                        ProductsService.QueryReinvestProductListByCategory($scope.viewModel.ChoseSortProduct.Id).then(function (data) {
                            if (data.Success) {
                                console.log(data);
                                $scope.viewModel.RinvestProduct = data.Result.Data;
                                angular.forEach($scope.viewModel.RinvestProduct, function (data, index, array) {
                                    if ($scope.viewModel.ChoseSortProduct.SortId == 6) {
                                        data.text = $scope.viewModel.ChoseSortProduct.Description;
                                    } else {
                                        data.text = data.Period + "天";
                                    }

                                });
                                if ($scope.viewModel.RinvestProduct.length == 1) {
                                    $scope.viewModel.ProductName = $scope.viewModel.RinvestProduct[0].text;
                                    $scope.viewModel.ChoseProduct = $scope.viewModel.RinvestProduct[0];
                                }
                            }
                        });
                        return true;
                    }
                });
                $scope.cancelText = true;
            }
        }]);
});
