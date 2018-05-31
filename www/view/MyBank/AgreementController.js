define(['App'], function (app) {
    app.register.controller('AgreementController',
        ['$scope', 'UsersService', '$ionicPopup', 'gToast','HelpAlterService', 'ProductsService',function ($scope, UsersService, $ionicPopup, gToast, HelpAlterService, ProductsService) {
 
            $scope.btnState = [{ key: '100000000', bgValue: "button-orange", colorValue: "#fff" },//#fff
                                    { key: '100000001', bgValue: "", colorValue: "#989898" },
                                    { key: '100000002', bgValue: "", colorValue: "#989898" }]

            $scope.Model = { data: null };

           


            $scope.state = '100000000';
            $scope.curPage = 1;
            $scope.pageSize = 10;
            $scope.noMoreItemsAvailable = false;
            $scope.viewModel = {
                AgreementList: null,
                HasPayProduct:true
            }



            //理财中
            $scope.GetFinance = function (state) {
                $scope.state = state;//1：理财中  2：已退出  3：退出中
                $.each($scope.btnState, function (index, value) {
                    console.log(value.key == state);
                    if (value.key == state) {
                        value.bgValue = "button-orange";
                        value.colorValue = "#fff";
                    } else {
                        value.bgValue = "";
                        value.colorValue = "#989898";
                    }
                });
                $scope.doRefresh();
            };


            $scope.doRefresh = function () { 
                $scope.viewModel.AgreementList = null;
               
                $scope.curPage = 1;
                $scope.viewModel.AgreementList = [];
                $scope.noMoreItemsAvailable = false;
                ProductsService.QueryContract(1, $scope.pageSize, $scope.state).then(function (data) {
                    console.log(data);
                    if (data.Success) {
                        $scope.viewModel.AgreementList = data.Result;
                        $scope.noMoreItemsAvailable = false;
                        $scope.curPage = 1;
                        $scope.$broadcast('scroll.refreshComplete');

                    }
                });  
            }

            $scope.loadMore = function () {
                $scope.noMoreItemsAvailable = false;
                console.log($scope.state);
                ProductsService.QueryContract($scope.curPage, $scope.pageSize, $scope.state).then(function (data) {
                    console.log(data);
                    if (data.Success) {
                        if (data.Result == null) {
                            $scope.noMoreItemsAvailable = true;
                        } else {
                            if ($scope.curPage == 1) {
                                $scope.viewModel.AgreementList = data.Result;
                                if (data.Result.length < 10) {
                                    $scope.noMoreItemsAvailable = true;
                                } else {
                                    $scope.noMoreItemsAvailable = false;
                                    $scope.curPage += 1;
                                }
                            } else {
                                angular.forEach(data.Result, function (data, index, array) {
                                    $scope.viewModel.AgreementList[$scope.viewModel.AgreementList.length] = data;
                                });
                                if (data.Result.length < 10) {
                                    $scope.noMoreItemsAvailable = true;
                                } else {
                                    $scope.noMoreItemsAvailable = false;
                                    $scope.curPage += 1;
                                }
                            }
                        }
 
                    } else {
                        $scope.noMoreItemsAvailable = true;
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            }

            
            ///协议预览
            $scope.ContactHref = function (resType, url, title) {
               
                var u = navigator.userAgent;
                //var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                //alert('是否是Android：' + isAndroid);
                
                $scope.alertModel.close();
                if (isiOS) {
                    location.href = url;
                } else {
                    console.log(resType + "-----" + url + "-----" + title);
                    //HelpAlterService.ContractHelp.contactUrl = url;
                    HelpAlterService.SetlocalStorage.Agreement.Title(title);
                    HelpAlterService.SetlocalStorage.Agreement.Url(url);
                    location.href = "#/RegSetIdentification/0/" + resType + "/0/0";
                }
              
                
            };
            $scope.agreement = function (contractNo) {
                if (!contractNo) {
                    gToast.open("合同号不存在！");
                    return false;
                }

                ProductsService.ContractDetails(contractNo).then(function (data) {
                    console.log(data);
                    if (data.Success) {
                        $scope.Model.AgreementList = data.Result;
                        if ($scope.Model.AgreementList.length <= 0) {
                            gToast.open("合同正在努力的生成中，请稍后再试");
                            return false;
                        }
                        $scope.alertModel = $ionicPopup.alert({
                            templateUrl: 'templates/Popup/CIContactTemplate2.html',
                            scope: $scope,
                            okText: "返回",
                            okType: "button-red button-Size-Height-35"
                        });
                        $scope.alertModel.then(function (res) {
                            //location.href = "#/AmtContent/contractNo"
                            //location.replace("#/tab/FinanceProduct");
                        });
                    }
                }); 
            }

            //当我们用完模型时，清除对应的对象
            $scope.$on("$destroy", function () {
                if ($scope.alertModel != null) {
                    $scope.alertModel.close(false);
                } 
            });



        }]);
});
