define(['App'], function (app) {
    app.register.controller('CalculatorController',
        ['$scope', '$ionicActionSheet', '$ionicPopup', '$ionicScrollDelegate', 'ProductsService', '$stateParams', 'gToast', '$timeout', 'HelpAlterService', function ($scope, $ionicActionSheet, $ionicPopup, $ionicScrollDelegate, ProductsService, $stateParams, gToast, $timeout, HelpAlterService) {

            //$scope.orderNumber = 100000;
            $scope.productIndex = 1;

            $scope.viewModel = {
                productDatas: [],
                HasFixed: false,
                HasYearProduct: false,
                productData: "",
                InvestmentAmount: 100000,
                InvestmentDate: "",
                VoteDate: "--",
                EndDate: "--",
                result: {
                    Dividend: 0,
                    firstDividend: 0,
                    middleDividend: 0,
                    lastDividend: 0,
                    DividendVIP: 0
                },
                FromView: "templates/include/Calculator/FixedFrom.html",
                ResultView: "templates/include/Calculator/FixedResult.html"

            }

            if ($stateParams.money != 0) {
                $scope.viewModel.InvestmentAmount = $stateParams.money;
            }

            var selectEndDate = $scope.viewModel.EndDate;
            var scrollHandles = $ionicScrollDelegate.$getByHandle("paroductHandle");
            var ResultDisplayFun = function (contractAgreement) {
                if (contractAgreement == "100000004" || contractAgreement == "100000008") {
                    $scope.IsResultDisplay = false;
                    $("#CalculatorContent").css("bottom", "0px");

                } else {
                    $scope.IsResultDisplay = true;
                    $("#CalculatorContent").css("bottom", "140px");
                }

            }
            var ShowView = function (contractAgreement) {
                console.log(contractAgreement);
                ResultDisplayFun(contractAgreement);

                //if (contractAgreement == "100000004") {
                //    $scope.viewModel.FromView = "templates/include/Calculator/YYFXFrom.html";
                //    $scope.viewModel.ResultView = "templates/include/Calculator/YYFXResult.html";

                //} else
                if (contractAgreement == "100000001" || contractAgreement == "100000002" || contractAgreement == "100000003") {
                    //$scope.viewModel.FromView = "templates/include/Calculator/NNSLFrom.html";
                    $scope.viewModel.ResultView = "templates/include/Calculator/NNSLResult.html";
                } else if (contractAgreement == "100000006") {
                    //$scope.viewModel.FromView = "templates/include/Calculator/FixedFrom.html";
                    $scope.viewModel.ResultView = "templates/include/Calculator/MLTYResult.html";
                } else if (contractAgreement == "100000007") {
                    //$scope.viewModel.FromView = "templates/include/Calculator/FixedFrom.html";
                    $scope.viewModel.ResultView = "templates/include/Calculator/FGJHResult.html";
                }
                else if (contractAgreement == "100000009") { 
                    $scope.viewModel.ResultView = "templates/include/Calculator/XSBResult.html";
                }
                else {
                    // $scope.IsResultDisplay = true;
                    //$scope.viewModel.FromView = "templates/include/Calculator/FixedFrom.html";
                    $scope.viewModel.ResultView = "templates/include/Calculator/FixedResult.html";
                }

                if (contractAgreement == "100000001") {
                    $scope.viewModel.FromView = "templates/include/Calculator/NNSLFrom.html";
                } else if (contractAgreement == "100000008") {
                    $scope.viewModel.FromView = "templates/include/Calculator/BBGFrom.html";
                } else {
                    $scope.viewModel.FromView = "templates/include/Calculator/FixedFrom.html";
                }

            }
            ProductsService.EstimateProductList().then(function (data) {
                console.log(data);
                if (data.Success) {

                    $scope.viewModel.productDatas = data.Result;
                    if ($stateParams.productId == 0) {
                        $scope.viewModel.productData = $scope.viewModel.productDatas[$scope.productIndex - 1];
                        scrollHandles.scrollTo(wid * ($scope.productIndex - 1), 0, false);
                    } else {
                        angular.forEach($scope.viewModel.productDatas, function (data, index, array) {
                            if (data.ProductId == $stateParams.productId) {
                                $scope.viewModel.productData = data;
                                scrollHandles.scrollTo(wid * (index), 0, false);
                                $scope.productIndex = index + 1;
                            }
                        });
                    }

                    ShowView($scope.viewModel.productData.ContractType);
                }
            });



            var wid = (screen.width / 3);// + (screen.width % 3);
            var getPonitToP = function (left, pointWidth) {
                var lineIndex = Math.round(left / pointWidth);
                //if (lineIndex == 0) lineIndex = 1;
                return lineIndex;
            }

            $scope.onCompleteT = function () {
                var left = scrollHandles.getScrollPosition().left;

                var catLeft = getPonitToP(left, wid) * wid;
                // var lineIndex = getPonit(left, pointWidth);


                scrollHandles.scrollTo(catLeft, 0, false);
                $scope.productIndex = getPonitToP(left, wid) + 1;


                $scope.viewModel.productData = $scope.viewModel.productDatas[$scope.productIndex - 1];


                ShowView($scope.viewModel.productData.ContractType);

                $scope.viewModel.InvestmentDate = "";
                $scope.viewModel.VoteDate = "--";
                $scope.viewModel.EndDate = "--";
                $scope.viewModel.result = {
                    Dividend: 0,
                    firstDividend: 0,
                    middleDividend: 0,
                    lastDividend: 0,
                    DividendVIP: 0
                };
                $("#imgZuo").css("opacity", 1);
                $("#imgYou").css("opacity", 1);
            }
            $scope.onDragT = function () {

                $("#imgZuo").css("opacity", 0.5);
                $("#imgYou").css("opacity", 0.5);
            }
            $scope.onScrollT = function () {
            }


            $scope.setDate = function () {
                if ($scope.viewModel.InvestmentDate == "") {
                    gToast.open("请选择投资日期");

                    return false;
                }
                var opt = {}
                var endTime = new Date(selectEndDate.replace(/-/g, "/"));
                opt.date = { preset: 'date', minDate: endTime, maxDate: new Date(2090, 12, 29) };
                $("#viewModel_EndDate").scroller('destroy').scroller($.extend(opt.date, { theme: 'android-ics light', mode: 'scroller', display: 'bottom', lang: 'ch' }))
            }

            function addDate(dd, dadd) {
                var a = new Date(dd)
                a = a.valueOf()
                a = a + dadd * 24 * 60 * 60 * 1000
                a = new Date(a)
                return a;
            }
            $scope.submit = function () {

                if ($scope.viewModel.InvestmentDate == "") {
                    gToast.open("请选择投资日期");
                    return false;
                }

                if (isNaN($scope.viewModel.InvestmentAmount) || $scope.viewModel.InvestmentAmount == "") {
                    gToast.open("金额输入过大或有误，请检查");
                    return false;
                } 
                //console.log($scope.viewModel.InvestmentAmount);
                if (Number($scope.viewModel.InvestmentAmount) < $scope.viewModel.productData.MinAmount) {
                    gToast.open("小于 " + $scope.viewModel.productData.MinAmount + "元 无法投资");
                    $scope.viewModel.result.data = [];
                    $scope.viewModel.result.dataVip = [];
                    return false;
                }
                if ($scope.viewModel.productData.ContractType == "100000004" || $scope.viewModel.productData.ContractType == "100000008") {
                    HelpAlterService.CalculatorHelp.productName = $scope.viewModel.productData.ProductName;
                    location.href = "#/PopupResult/" + $scope.viewModel.productData.ProductId + "/" + $scope.viewModel.productData.ContractType + "/" + $scope.viewModel.InvestmentAmount + "/" + $scope.viewModel.VoteDate + "/" + $scope.viewModel.EndDate;
                } else {

                    ProductsService.QueryFinAPI($scope.viewModel.productData.ProductId, $scope.viewModel.InvestmentAmount, $scope.viewModel.VoteDate.replace(/-/g, ""), $scope.viewModel.EndDate.replace(/-/g, "")).then(function (data) {
                        if (data.Success) {
                            console.log(data);
                            if ($scope.viewModel.productData.ContractType == "100000004") {
                                $scope.viewModel.result.firstDividend = data.Result.Data.content[0][0].interest;
                                $scope.viewModel.result.middleDividend = data.Result.Data.content[0][1].interest;
                                $scope.viewModel.result.lastDividend = data.Result.Data.content[0][data.Result.Data.content[0].length - 1].interest;
                            } else if ($scope.viewModel.productData.ContractType == "100000001" || $scope.viewModel.productData.ContractType == "100000002" || $scope.viewModel.productData.ContractType == "100000003") {
                                $scope.viewModel.result.Dividend = data.Result.Data.content[0][0].interest;
                            } else if ($scope.viewModel.productData.ContractType == "100000006") {
                                $scope.viewModel.result.Dividend = data.Result.Data.content[0][0].interest;
                            } else if ($scope.viewModel.productData.ContractType == "100000007") {
                                $scope.viewModel.result.data = data.Result.Data.content[0];
                                $scope.viewModel.result.dataVip = data.Result.Data.content[1];
                            }
                            else {
                                $scope.viewModel.result.Dividend = data.Result.Data.content[0][0].interest;
                                $scope.viewModel.result.DividendVIP = data.Result.Data.content[1][0].interest;
                            }
                        }

                    });
                }
            }




            $scope.IsResultDisplay = true;
            function eventChecks() {
                // alert(window.innerHeight + "-------------------" + windowInnerHeight);
                if (window.innerHeight > windowInnerHeight) {//这里逻辑可以更改下，有可能其他js事件会导致高度变化，这里就只做个简单判断了
                    clearInterval(timer);
                    ResultDisplayFun($scope.viewModel.productData.ContractType);
                    //$scope.IsResultDisplay = true;
                    $scope.$apply();
                    //$('#txtInvestmentAmount').blur();
                }
            }
            // $('#txtInvestmentAmount').click(eventCheck).blur(eventCheck);
            $scope.ResultDisplay = function (a) { 
                if (!isiOS) {
                    $timeout(function () {
                        if (a == 1) {
                            //$scope.IsResultDisplay = true;
                            clearInterval(timer);
                            //$("#CalculatorContent").css("bottom", "140px");
                        } else {
                            $scope.IsResultDisplay = false;
                            $("#CalculatorContent").css("bottom", "0px")
                            $timeout(function () {//由于键盘弹出是有动画效果的，要获取完全弹出的窗口高度，使用了计时器
                                windowInnerHeight = window.innerHeight;//获取弹出android软键盘后的窗口高度
                                timer = setInterval(function () { eventChecks() }, 100);//100ms检查下窗口高度是否改变
                            }, 500);
                        }
                    }, 100);
                }
            }


            $scope.keyPress = function () {
                var keyCode = event.keyCode;
                if ((keyCode >= 48 && keyCode <= 57)) {
                    event.returnValue = true;
                } else {
                    event.returnValue = false;
                }
            }
            $scope.keyUp = function () {
                // this.value = this.value.replace(/\D/g, '');
                $scope.viewModel.InvestmentAmount = $scope.viewModel.InvestmentAmount.replace(/\D/g, '');
            }




            //时间参数
            $scope.moDateparameter = {
                onSelect: function (valueText, inst) {
                    console.log($scope.viewModel.productData);

                    ProductsService.EstimateDate($scope.viewModel.productData.ProductId, valueText).then(function (data) {
                        console.log(data);
                        if (data.Success) {
                            $scope.viewModel.VoteDate = data.Result.ValueDate;
                            $scope.viewModel.EndDate = data.Result.DueDate;
                            selectEndDate = $scope.viewModel.EndDate;

                        }
                    });
                    $scope.moDueDateparameter = {
                        minDate: valueText
                    }
                }
            }

        }]);
});
