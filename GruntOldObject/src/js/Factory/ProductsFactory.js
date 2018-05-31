(function(window, angular, undefined) {'use strict';
    angular.module('ProductsFactory', ['HttpFactory']).factory("ProductsService", ['HttpService', '$stateParams', "gToast", "$cookieStore", '$q', 'VerificationHelp', function (HttpService, $stateParams, gToast, $cookieStore, $q, VerificationHelp) {
        var ServiceUrl = {
            QueryProductURL: "api/services/app/product/QueryProduct",
            QueryProductDetailURL: "api/services/app/Product/QueryProductDetail",
            QueryReinvestContractListURL: 'Product/QueryReinvestContractList',
            QueryReinvestContractDetURL: 'Product/QueryReinvestContractDetail',     //客户已购买可续投的合同列表(续投产品)详情
            QueryReinvestProductListURL: 'Product/QueryReinvestProductList',
            QueryReinvestContractInfoURL: 'Trade/QueryContractDetail',        //查询
            QueryTxListURL: 'Trade/QueryTxList',                                  //查询交易记录
            QueryTxDetailURL: 'Trade/QueryTxDetail',            //查询交易详情
            QueryContractListURL: 'Contract/QueryContractList',      //查询合同列表
            PurchaseURL: 'Trade/Purchase',                             //购买产品
            ReinvestRUL: 'Trade/Reinvest',                         //产品续投
            QuerySumAllocatedAmountURL: 'Trade/QuerySumAllocatedAmount',     //详情总金额
            QueryContractDetailURL: 'Contract/QueryContractDetail',              //查询合同详情
            TradeQueryContractListURL: 'Trade/QueryContractList',      //查询回款记录列表
            EstimateProductListURL: 'Calc/EstimateProductList',          //获取试算产品
            FinapiURL: 'Calc/Finapi',                                    //出借试算
            QueryDistributeInfoURL: 'Trade/QueryDistributeInfo',        //查询收益明细
            QueryUfoTxURL: 'Trade/QueryUfoTx',                            //结果轮询
            QueryReinvestTypeURL: 'Other/QueryReinvestType',
            EstimateDateRUL: "Calc/EstimateDate",                             //获取试算产品日期
            QueryDefProductCategoryListURL: 'Product/QueryDefProductCategoryList',        //大类产品列表页    2.1
            QueryDefProductCategoryDetailURL: 'Product/QueryDefProductCategoryDetail',     //大类产品详情接口   2.1
            PrePurchasingURL: 'Trade/PrePurchasing',                                     //购买前查询信息
            QueryReinvestProductCatgoryURL: 'Product/QueryReinvestProductCatgory',        //获取可以被续投的产品大类列表
            QueryReinvestProductListByCategoryURL: 'Product/QueryReinvestProductListByCategory',                         //获取可以被续投大类中的产品列表
            ApplyQuitURL: 'Trade/ApplyQuit',                                              //申请退出
            ValidateInviteCodeURL: 'Trade/ValidateInviteCode',                                              //验证邀请码
            //QueryReinvestContractInfoURL: 'api/services/app/Trade/QueryContractDetail'// 'api/services/app/Product/QueryReinvestContractInfo'
        }

        return {
            prddetailsUrl: "",
            ProductOrderMoney: {
                Type: 0,
                value: "",
                Bank: ''
            },
            ///*
            ///*  /api/services/app/product/QueryProduct    增值计划列表
            ///*
            ProductList: function (currentPage, pageSize) {
                if (currentPage == null || !angular.isNumber(currentPage) || currentPage < 1) {
                    currentPage = 1;
                }
                return HttpService.AjaxToJsonUnLoading(ServiceUrl.QueryProductURL, {
                    PageIndex: currentPage, PageSize: pageSize
                });
            },
            ///*
            ///*  /api/services/app/Product/QueryProductDetail   获取产品详情
            ///*
            ProductDetail: function (pid) {
                console.log(pid);
                return HttpService.AjaxToJson(ServiceUrl.QueryProductDetailURL, {
                    ProductId: pid
                });
            },
            ///*
            ///* Product/QueryReinvestContractList   续投产品列表
            ///*
            QueryContractList: function (currentPage, pageSize) {
                if (currentPage == null || !angular.isNumber(currentPage) || currentPage < 1) {
                    currentPage = 1;
                }
                return HttpService.PostToJsonUnLoading(ServiceUrl.QueryReinvestContractListURL, {
                    PageIndex: currentPage, PageSize: pageSize
                });
            },
            ///*
            ///*  Product/QueryReinvestContractDet  续投产品详细信息(点击续投按钮)
            ///*
            ContractDetail: function (contractNo) {
                return HttpService.PostToJsonUnLoading(ServiceUrl.QueryReinvestContractDetURL, {
                    ContractId: contractNo
                });
            },
            ///* 
            ///* Product/QueryReinvestProductList   获取可以被续投的产品列表
            ///*
            RinvestProduct: function () {
                return HttpService.PostToJsonUnLoading(ServiceUrl.QueryReinvestProductListURL, {
                    PageIndex: 1, PageSize: 100
                });
            },

            ///*
            ///*    续投产品详细信息(点击产品跳转)
            ///* 
            GetQueryAssertInfo: function (ContractId) {
                if (!ContractId) {
                    return HttpService.ResultHelp(false, "合同号不能为空！", "");
                }
                return HttpService.PostToJson(ServiceUrl.QueryReinvestContractInfoURL, {
                    "ContractId": ContractId
                });
            },
            ///
            /// 获取续投方式
            ///
            QueryReinvestType: function (ProductId) {

                return HttpService.PostToJsonUnLoading(ServiceUrl.QueryReinvestTypeURL, {
                    "ProductId": ProductId
                });
            },
            ///*
            ///*  查询单笔理财详情-收益明细(更改)
            ///*
            GetQueryDistributeInfo: function (contractNo) {
                if (!contractNo) {
                    return HttpService.ResultHelp(false, "合同号不能为空！", "");
                }
                return HttpService.PostToJson(ServiceUrl.QueryDistributeInfoURL, {
                    "ContractId": contractNo
                });
            },
            ///*
            ///*  api/services/app/Trade/QueryTxList  查询交易记录列表
            ///*
            QueryTrade: function (currentPage, pageSize) {
                if (currentPage == null || !angular.isNumber(currentPage) || currentPage < 1) {
                    currentPage = 1;                           
                }
                return HttpService.PostToJsonUnLoading(ServiceUrl.QueryTxListURL, {
                    PageIndex: currentPage, PageSize: pageSize
                });
            },
            ///*
            ///*  api/services/app/Trade/QueryTxDetail    查询交易详情
            ///*
            QueryTradeDetail: function (TradeDetailId) {
                return HttpService.PostToJson(ServiceUrl.QueryTxDetailURL, { TradeDetailId: TradeDetailId });
            },
            ///*
            ///*  QuerySumAllocatedAmountURL   收益总金额
            ///*
            QuerySumAllocatedAmount: function () {
                return HttpService.PostToJson(ServiceUrl.QuerySumAllocatedAmountURL, null);
            },

            ///*
            ///*  api/services/app/Contract/QueryContractList   获取合同列表
            ///*
            QueryContract: function (currentPage, pageSize, quitStatus) {
                if (currentPage == null || !angular.isNumber(currentPage) || currentPage < 1) {
                    currentPage = 1;
                }
                return HttpService.PostToJsonUnLoading(ServiceUrl.QueryContractListURL, {
                    "PageIndex": currentPage, "PageSize": pageSize, "QuitStatus": quitStatus
                });
            },
            ///*
            ///*   api/services/app/Trade/Purchase   购买理财产品
            ///*
            TradeChase: function (productId, bankRecordId, txAmt, password, InviteCode) {
                if (productId == null | productId == "") {
                    return HttpService.ResultHelp(false, "产品标识丢失！", "");
                }
                if (bankRecordId == null | bankRecordId == "") {
                    return HttpService.ResultHelp(false, "请选择银行卡！", "");
                }
                if (txAmt == null | txAmt == "") {
                    return HttpService.ResultHelp(false, "请输入金额！", "");
                }
                if (!password) {
                    return HttpService.ResultHelp(false, "请输入密码！", "");
                }
                return HttpService.PostToJson(ServiceUrl.PurchaseURL, {
                    BankCardId: bankRecordId, ProductId: productId, Amount: txAmt, Password: password, InviteCode: InviteCode
                });
            },
            ///*
            ///* api/services/app/Trade/Reinvest   申请续投
            ///*
            ApplyReinvest: function (contractNo, pid, reinvestType, password) {
                if (contractNo == null) {
                    return false;
                }
                if (pid == null) {
                    return false;
                }
                if (reinvestType == null) {
                    return false;
                }
                return HttpService.PostToJson(ServiceUrl.ReinvestRUL, {
                    ContractId: contractNo, ProductId: pid, ReinvestType: reinvestType, Password: password
                });
            },

            ///*
            ///*  api/services/app/Contract/QueryContractDetail 合同详情
            ///*
            ContractDetails: function (contractNo) {
                return HttpService.PostToJson(ServiceUrl.QueryContractDetailURL, {
                    "ContractId": contractNo
                });

            },



            ///*
            ///*  投资记录 列表
            ///*
            TradeQueryContractList: function (currentPage, pageSize, quitStatus) {
                if (currentPage == null || !angular.isNumber(currentPage) || currentPage < 1) {
                    currentPage = 1;
                }
                return HttpService.PostToJsonUnLoading(ServiceUrl.TradeQueryContractListURL, {
                    PageIndex: currentPage, PageSize: pageSize, QuitStatus: quitStatus
                });//QuitStatus	退出状态 100000000：理财中(含有募集中/理财中) 100000001: 退出中 10000
            },


            ///*
            ///*   试算结果
            ///*
            QueryFinAPI: function (kindno, pactamt, valuedate, enddate) {
                console.log(valuedate);
                console.log(enddate);
                return HttpService.PostToJson(ServiceUrl.FinapiURL, {
                    kindno: kindno, pactamt: pactamt, valuedate: valuedate, enddate: enddate
                });
            },
            ///*
            ///*   试算产品列表
            ///*
            EstimateProductList: function () {
                return HttpService.PostToJson(ServiceUrl.EstimateProductListURL, null);
            },
            ///*
            ///*   获取试算时间   
            ///*
            EstimateDate: function (productId,investDate) {
                return HttpService.PostToJson(ServiceUrl.EstimateDateRUL, { InvestDate: investDate, ProductId: productId });

            },
            //续投明细(交易明细)   交易明细整在QueryTradeDetail 中 
            //QueryReinvestInfo: function (paymentNo) {
            //    return HttpService.AjaxToJson("api/services/app/Trade/QueryReinvestInfo", { paymentNo: paymentNo });
            //},
            //ProductDetail: function (productId) {//获取产品详情
            //    return HttpService.AjaxToJson("api/services/app/Product/ProductDetail", { pid: productId });
            //},


            ///*
            ///*  产品结果轮询
            ///*
            QueryUFOTX: function (paymentNo) {
                return HttpService.PostToJsonUnLoading(ServiceUrl.QueryUfoTxURL, { paymentNo: paymentNo });
            },
            ///*
            ///*  产品大类列表    2.1
            ///*
            QueryDefProductCategoryList: function (currentPage, pgeSize) {
                return HttpService.PostToJsonUnLoading(ServiceUrl.QueryDefProductCategoryListURL, {
                    PageIndex: currentPage, PageSize: pgeSize
                });
               // return HttpService.AjaxToJsonUnLoading("api/services/app/Product/QueryProductList", null);
            },
            ///*
            ///*  产品大类详细页    2.1
            ///*
            QueryDefProductCategoryDetail: function (categoryId) {
                
                return HttpService.PostToJson(ServiceUrl.QueryDefProductCategoryDetailURL, {
                    CategoryId: categoryId
                });
            },
            ///*
            ///*   购买前查询信息
            ///*   PrePurchasingURL
            PrePurchasing: function (productId) {
                return HttpService.PostToJson(ServiceUrl.PrePurchasingURL, { ProductId: productId })
            },

            ///*
            ///* 获取可以被续投的产品大类列表
            ///*
            QueryReinvestProductCatgory: function () {
                return HttpService.PostToJson(ServiceUrl.QueryReinvestProductCatgoryURL, null);
            },
            ///*
            ///*   获取可以被续投大类中的产品列表
            ///*
            QueryReinvestProductListByCategory: function (CategoryId) {
                return HttpService.PostToJson(ServiceUrl.QueryReinvestProductListByCategoryURL, { CategoryId: CategoryId });
            },
            ///*
            ///*  申请退出
            ///*
            ApplyQuit: function (ContractId, Password) {
                return HttpService.PostToJson(ServiceUrl.ApplyQuitURL, { "ContractId": ContractId, "Password": Password });

            },
            ValidateInviteCode: function (InviteCode) {
                return HttpService.PostToJson(ServiceUrl.ValidateInviteCodeURL, { "InviteCode": InviteCode});

        }
        }
    }]);

})(window, window.angular);