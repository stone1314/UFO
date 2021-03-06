﻿/// <reference path="WxResult.html" />
"use strict";

define(['angularAMD', 'Jweixin', 'ionic', 'gToast', 'DataValidate', 'Cookies', "AppDirective", "AppFactory", "UsersFactory", "ProductsFactory", "HelpFactory"], function (angularAMD, wx) {
    var app = angular.module("mainModule", ['ionic', "ngCookies", "appDirective", "appFactory", "gToast"]);

    app.filter("leadingZeroes", function () {
        return function (data) {
            var pad = "000" + data;
            pad = pad.substr(pad.length - 3);
            return pad;
        }
    });
    app.run(function ($ionicPlatform, $rootScope, $location) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
        $rootScope.Agreement = {
        };
    })

    /*AngularJS iframe跨域打开内容时报错,需要加入以下代码，
     *错误信息：Blocked loading resource from url not allowed by $sceDelegate policy
     */
    app.config(function ($sceDelegateProvider, $httpProvider, $ionicConfigProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            RestWebHost.URL + '/**']);



        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json; charset=UTF-8';
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        $ionicConfigProvider.views.transition('none');
        $httpProvider.interceptors.push('UserInterceptor');
    });

    app.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

      .state('Index', angularAMD.route({
          url: "/",
          cache: false,
          reload: true,
          templateUrl: "view/Login.html",
          controllerUrl: "view/LoginController.js"
      }))
       .state('Login', angularAMD.route({
           url: "/Login/:from",

           cache: false,
           reload: true,
           templateUrl: "view/Login.html",
           controllerUrl: "view/LoginController.js"

       }))
       .state('ProductTabs.ValueAddedPlan', angularAMD.route({
           url: "/ValueAddedPlan/:openid",

           //cache: false,
           indexRef: 0,
           controllerUrl: "view/MyBestRich/ValueAddedPlanController.js",
           views: {
               'tab-ValueAddedPlan': {
                   templateUrl: "view/MyBestRich/ValueAddedPlan.html"
               }
           }
       }))
      //.state('ProductTabs.ContractConfirmation', angularAMD.route({
      //    url: "/ContractConfirmation",
      //    cache: false,
      //    controllerUrl: "view/PrivateEquity/ContractConfirmationController.js",
      //    views: {
      //        'tab-ValueAddedPlan': {
      //            templateUrl: "view/PrivateEquity/ContractConfirmation.html"
      //        }
      //    }
      //}))

        .state('ProductTabs.FundList', angularAMD.route({
            url: "/FundList",
            cache: false,
            indexRef: 1,
            controllerUrl: "view/PrivateEquity/FundListController.js",
            views: {
                'tab-FundList': {
                    templateUrl: "view/PrivateEquity/FundList.html"
                }
            }
        }))
         .state('FundDetail', angularAMD.route({
             url: "/FundDetail/:productId",
             cache: false,
             reload: true,
             templateUrl: "view/PrivateEquity/FundDetail.html",
             controllerUrl: "view/PrivateEquity/FundDetailController.js",
         }))
        .state('FundDescribe', angularAMD.route({
            url: "/FundDescribe",
            cache: false,
            reload: true,
            templateUrl: "view/PrivateEquity/FundDescribe.html",
            controllerUrl: "view/PrivateEquity/FundDescribeController.js",
        }))

        .state('ProductTabs.CIProductList', angularAMD.route({
            url: "/CIProductList",
            cache: false,
            indexRef: 2,
            controllerUrl: "view/ContinuedInvestment/CIProductListController.js",
            views: {
                'tab-CIProductList': {
                    templateUrl: "view/ContinuedInvestment/CIProductList.html"
                }
            }
        }))
        .state('ProductTabs', angularAMD.route({
            url: "/ProductTabs",
            cache: false,
            reload: true,
            animation: 'no-animation',
            templateUrl: "view/Tabs/ProductTabs.html",
            controllerUrl: "view/Tabs/ProductTabsController.js"

        }))

        //.state('ProductInfo', angularAMD.route({
        //    url: "/ProductInfo/:ProductId",
        //    cache: false,
        //    reload: true,
        //    templateUrl: "view/MyBestRich/ProductInfo.html",
        //    controllerUrl: "view/MyBestRich/ProductInfoController.js"
        //}))
        .state('ProductDescribe', angularAMD.route({
            url: "/ProductDescribe/:ProductId",
            animation: 'slide-in-up',
            templateUrl: "view/MyBestRich/ProductDescribe.html",
            controllerUrl: "view/MyBestRich/ProductDescribeController.js"

        }))
        .state('PaymentOrder', angularAMD.route({
            url: "/PaymentOrder/:ProductId",
            cache: false,
            templateUrl: "view/MyBestRich/PaymentOrder.html",
            controllerUrl: "view/MyBestRich/PaymentOrderController.js"

        }))
        .state('POrderConfirm', angularAMD.route({
            url: "/POrderConfirm",
            cache: false,
            templateUrl: "view/MyBestRich/POrderConfirm.html",
            controllerUrl: "view/MyBestRich/POrderConfirmController.js"

        }))
       .state('PaymentResult', angularAMD.route({
           url: "/PaymentResult/:tolMoney",
           cache: false,
           reload: true,
           templateUrl: "view/MyBestRich/PaymentResult.html",
           controllerUrl: "view/MyBestRich/PaymentResultController.js"
       }))
        .state('PaymentResultSuccess', angularAMD.route(
            {
                url: "/PaymentResultSuccess/:paymentNo",
                cache: false,
                reload: true,
                templateUrl: "view/MyBestRich/PaymentResultSuccess.html",
                controllerUrl: "view/MyBestRich/PaymentResultSuccessController.js"
            }
        ))
        .state('PaymentResultfailure', angularAMD.route(
            {
                url: "/PaymentResultfailure/:resultType",
                cache: false,
                reload: true,
                templateUrl: "view/MyBestRich/PaymentResultfailure.html",
                controllerUrl: "view/MyBestRich/PaymentResultfailureController.js"
            }
        ))
        .state('ApplyCI', angularAMD.route({
            url: "/ApplyCI/:contractNo",
            cache: false,
            templateUrl: "view/ContinuedInvestment/ApplyCI.html",
            controllerUrl: "view/ContinuedInvestment/ApplyCIController.js"

        }))
        .state('Calculator', angularAMD.route({
            url: "/Calculator/:productId/:money",

            templateUrl: "view/Calculator/Calculator.html",
            controllerUrl: "view/Calculator/CalculatorController.js"

        }))//计算器结果页面

        .state('PopupResult', angularAMD.route({
            url: "/PopupResult/:pid/:contractAgreement/:InvestmentAmount/:VoteDate/:EndDate",
            templateUrl: "view/Calculator/PopupResult.html",
            controllerUrl: "view/Calculator/PopupResultController.js"

        }))
            //注册
        .state('RegGetVerifi', angularAMD.route({
            url: "/RegGetVerifi",
            cache: false,
            templateUrl: "view/Register/RegGetVerifi.html",
            controllerUrl: "view/Register/RegGetVerifiController.js"

        }))
        .state('RegGetOldVerifi', angularAMD.route({
            url: "/RegGetOldVerifi",
            cache: false,
            templateUrl: "view/Register/RegGetOldVerifi.html",
            controllerUrl: "view/Register/RegGetOldVerifiController.js"

        }))
        .state('RegIdentification', angularAMD.route({
            url: "/RegIdentification/:type",
            cache: false,
            templateUrl: "view/Register/RegIdentification.html",
            controllerUrl: "view/Register/RegIdentificationController.js"
        }))
         .state('RegSetIdentification', angularAMD.route({
             url: "/RegSetIdentification/:type/:resType/:conType/:pid",
             cache: false,
             templateUrl: "view/Register/RegSetIdentification.html",
             controllerUrl: "view/Register/RegSetIdentificationController.js"
         }))
            .state('RegReferrer', angularAMD.route({
                url: "/RegReferrer",
                cache: false,
                templateUrl: "view/Register/RegReferrer.html",
                controllerUrl: "view/Register/RegReferrerController.js"
            }))
        .state('RegSetPwd', angularAMD.route({
            url: "/RegSetPwd",
            cache: false,
            templateUrl: "view/Register/RegSetPwd.html",
            controllerUrl: "view/Register/RegSetPwdController.js"
        }))
        .state('RegChose', angularAMD.route({
            url: "/RegChose",

            templateUrl: "view/Register/RegChose.html",
            controllerUrl: "view/Register/RegChoseController.js"
        }))



        //查找密码
        .state('PwdGetCode', angularAMD.route({
            url: "/PwdGetCode",
            cache: false,
            templateUrl: "view/FindPwd/PwdGetCode.html",
            controllerUrl: "view/FindPwd/PwdGetCodeController.js"
        }))
         .state('PwdSetVerify', angularAMD.route({
             url: "/PwdSetVerify",

             cache: false,
             templateUrl: "view/FindPwd/PwdSetVerify.html",
             controllerUrl: "view/FindPwd/PwdSetVerifyController.js"
         }))
         .state('PwdSetNewPwd', angularAMD.route({
             url: "/PwdSetNewPwd",
             cache: false,
             templateUrl: "view/FindPwd/PwdSetNewPwd.html",
             controllerUrl: "view/FindPwd/PwdSetNewPwdController.js"
         }))
        //修改手机号
         .state('MyBaseAccount', angularAMD.route({
             url: "/MyBaseAccount",
             cache: false,
             templateUrl: "view/SetTelphone/MyBaseAccount.html",
             controllerUrl: "view/SetTelphone/MyBaseAccountController.js"
         }))
         .state('TelGetCode', angularAMD.route({
             url: "/TelGetCode",

             templateUrl: "view/SetTelphone/TelGetCode.html",
             controllerUrl: "view/SetTelphone/TelGetCodeController.js"
         }))
         .state('TelSetPwd', angularAMD.route({
             url: "/TelSetPwd",
             cache: false,
             templateUrl: "view/SetTelphone/TelSetPwd.html",
             controllerUrl: "view/SetTelphone/TelSetPwdController.js"
         }))
            //添加删除银行卡
          .state('MyBankCards', angularAMD.route({
              url: "/MyBankCards",
              cache: false,
              reload: true,
              templateUrl: "view/MyBank/MyBankCards.html",
              controllerUrl: "view/MyBank/MyBankCardsController.js",
          }))
             .state('BankDetail', angularAMD.route({
                 url: "/BankDetail",
                 cache: false,
                 reload: true,
                 templateUrl: "view/MyBank/BankDetail.html",
                 controllerUrl: "view/MyBank/BankDetailController.js",
             }))
         .state('AddBankCards', angularAMD.route({
             url: "/AddBankCards",
             cache: false,
             reload: true,
             templateUrl: "view/MyBank/AddBankCards.html",
             controllerUrl: "view/MyBank/AddBankCardsController.js"
         }))
         .state('Banks', angularAMD.route({
             url: "/Banks",
             templateUrl: "view/MyBank/Banks.html",
             controllerUrl: "view/MyBank/BanksController.js"
         }))
         .state('Agreement', angularAMD.route({
             url: "/Agreement",
             templateUrl: "view/MyBank/Agreement.html",
             controllerUrl: "view/MyBank/AgreementController.js"
         }))
         .state('AmtContent', angularAMD.route({
             url: "/AmtContent/:contractNo",
             cache: false,
             templateUrl: "view/MyBank/AmtContent.html",
             controllerUrl: "view/MyBank/AmtContentController.js"
         }))
          .state('GetBankCards', angularAMD.route({
              url: "/GetBankCards",
              cache: false,
              templateUrl: "view/MyBank/GetBankCards.html",
              controllerUrl: "view/MyBank/GetBankCardsController.js"
          }))
          .state('InvestmentRecordTabs', angularAMD.route({
              url: "/InvestmentRecordTabs",
              cache: false,
              reload: true,
              animation: 'no-animation',
              templateUrl: "view/Tabs/InvestmentRecordTabs.html",
              controllerUrl: "view/Tabs/InvestmentRecordTabsController.js"

          }))
          .state('InvestmentRecordTabs.financialing', angularAMD.route({
              url: "/RefList0",
              cache: false,
              reload: true,
              indexRef: 0,
              controllerUrl: "view/RefundList/RefListController.js",
              views: {
                  'tab-financialing': {
                      templateUrl: "view/RefundList/RefList.html"
                  }
              }
          }))
          .state('InvestmentRecordTabs.exiting', angularAMD.route({
              url: "/RefList1",
              cache: false,
              reload: true,
              indexRef: 1,
              controllerUrl: "view/RefundList/RefListController.js",
              views: {
                  'tab-exiting': {
                      templateUrl: "view/RefundList/RefList.html"
                  }
              }
          }))
            .state('InvestmentRecordTabs.exited', angularAMD.route({
                url: "/RefList2",
                cache: false,
                reload: true,
                indexRef: 2,
                controllerUrl: "view/RefundList/RefListController.js",
                views: {
                    'tab-exited': {
                        templateUrl: "view/RefundList/RefList.html"
                    }
                }
            }))
            //还款记录
          // .state('RefList', angularAMD.route({
            //   url: "/RefList",
              // cache: false,
              // templateUrl: "view/RefundList/RefList.html",
               //controllerUrl: "view/RefundList/RefListController.js",
               //resolve: {
               //    permission: function (UsersService) {
               //        return UsersService.permissionCheck();
               //    }
               //}
           //}))

            .state('InvestListTabs', angularAMD.route({
                url: "/InvestListTabs",
                cache: false,
                reload: true,
                animation: 'no-animation',
                templateUrl: "view/Tabs/InvestListTabs.html",
                controllerUrl: "view/Tabs/InvestListTabsController.js"

            }))
             .state('InvestListTabs.InvestList', angularAMD.route({
                 url: "/InvestList",
                 cache: false,
                 reload: true,
                 indexRef: 0,
                 controllerUrl: "view/Transaction/InvestListController.js",
                 views: {
                     'tab-InvestList': {
                         templateUrl: "view/Transaction/InvestList.html"
                     }
                 }
             }))
            .state('InvestListTabs.ConsultingList', angularAMD.route({
                url: "/ConsultingList",
                cache: false,
                reload: true,
                indexRef: 1,
                controllerUrl: "view/PrivateEquity/ConsultingListController.js",
                views: {
                    'tab-Consulting': {
                        templateUrl: "view/PrivateEquity/ConsultingList.html"
                    }
                }
            }))

            ////交易记录
            //.state('InvestList', angularAMD.route({
            //    url: "/InvestList",
            //    cache: false,
            //    templateUrl: "view/Transaction/InvestList.html",
            //    controllerUrl: "view/Transaction/InvestListController.js"
            //}))
            //.state('TranList', angularAMD.route({
            //    url: "/TranList/:paymentNo",
            //    templateUrl: "view/Transaction/TranList.html",
            //    controllerUrl: "view/Transaction/TranListController.js"
            //}))
            //.state('TranDetail', angularAMD.route({
            //    url: "/TranDetail/:paymentNo",
            //    templateUrl: "view/Transaction/TranDetail.html",
            //    controllerUrl: "view/Transaction/TranDetailController.js"
            //}))


             .state('IncomeList', angularAMD.route({
                 url: "/IncomeList/:ContractId",
                 templateUrl: "view/RefundList/IncomeList.html",
                 controllerUrl: "view/RefundList/IncomeListController.js"
             }))
             .state('ProDetail', angularAMD.route({
                 url: "/ProDetail/:pageNo/:ContractId",
                 cache: false,
                 templateUrl: "view/RefundList/ProDetail.html",
                 controllerUrl: "view/RefundList/ProDetailController.js",
             }))
              .state('ContractList', angularAMD.route({
                  url: "/ContractList/:from",
                  cache: false,
                  templateUrl: "view/RefundList/ContractList.html",
                  controllerUrl: "view/RefundList/ContractListController.js",
              }))
            //我的优福
             .state('MyAccount', angularAMD.route({
                 url: "/MyAccount",
                 cache: false,
                 templateUrl: "view/MyAccount/MyAccount.html",
                 controllerUrl: "view/MyAccount/MyAccountController.js"
             }))
         .state('ProductInfoTabs', angularAMD.route({
             url: "/ProductInfoTabs",
             cache: false,
             reload: true,
             animation: 'no-animation',
             templateUrl: "view/Tabs/ProductInfoTabs.html",
             controllerUrl: "view/Tabs/ProductInfoTabsController.js"

         }))

         .state('ProductInfoTabs.ProductInfo', angularAMD.route({
             url: "/ProductInfo/:ProductId",
             //cache: false,
             reload: true,
             indexRef: 0,
             controllerUrl: "view/MyBestRich/ProductInfoController.js",
             views: {
                 'tab-ProductInfo': {
                     templateUrl: "view/MyBestRich/ProductInfo.html"
                 }
             }
         }))
          .state('ProductInfoTabs.ProductDescribe', angularAMD.route({
              url: "/ProductDescribe/:ProductId",
              cache: false,
              reload: true,
              indexRef: 1,
              controllerUrl: "view/MyBestRich/ProductDescribeController.js",
              views: {
                  'tab-ProductDes': {
                      templateUrl: "view/MyBestRich/ProductDescribe.html"
                  }
              }
          }));


        $urlRouterProvider.otherwise('/');
    });

    var indexController = function ($scope, $rootScope, gToast, WXService, $cookieStore, $state) {

        if (WxSwitch.IsSwitch == "OPEN") {
            var brower = navigator.userAgent.toLowerCase();
            if (brower.indexOf("micromessenger") == -1 && brower.indexOf("windows phone") == -1) {
                //alert("请在微信端浏览");
                window.location.href = "../WxResult.html";
            }
        }
        $(window).unload(function () {
            WeixinJSBridge.invoke('closeWindow', {}, function (res) {

                $cookieStore.put("validateCodeShowsRegGetOldVerifi", true);
                $cookieStore.put("countdownRegGetOldVerifi", 60);

                $cookieStore.put("validateCodeShowsPwdGetCode", true);
                $cookieStore.put("countdownPwdGetCode", 60);

                $cookieStore.put("validateCodeShowsRegGetVerifi", true);
                $cookieStore.put("countdownRegGetVerifi", 60);

                $cookieStore.put("validateCodeShowsAddBankCards", true);
                $cookieStore.put("countdownAddBankCards", 60);

            });
        });

        // 如果用户已经登录了，则立即跳转到一个默认主页上去，无需再登录
        //if ($rootScope.user.token) {
        //    $state.go($rootScope.defaultPage);
        //    return;
        //}

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (toState.name == 'Login' || toState.name == 'ProductTabs.ValueAddedPlan' || toState.name == 'PwdGetCode'
                || toState.name == 'RegChose' || toState.name == "ProductInfo" || toState.name == "ProductDescribe"
                || toState.name == 'Calculator' || toState.name == 'RegGetVerifi' || toState.name == 'RegGetOldVerifi'
                || toState.name == 'RegReferrer' || toState.name == 'RegSetIdentification' || toState.name == 'RegIdentification'
                || toState.name == 'PwdSetNewPwd' || toState.name == 'PwdSetVerify' || toState.name == 'PopupResult' || toState.name == 'ProductInfoTabs.ProductDescribe' || toState.name == "ProductInfoTabs.ProductInfo") return;// 如果是进入登录界面则允许
            // 如果用户不存在
            if (!localStorage.getItem("AccessToken")) {
                event.preventDefault();// 取消默认跳转行为
                $state.go("Login", { from: fromState.name });//跳转到登录界面
                //, { from: fromState.name, w: 'notLogin' }
            }
        });
        $rootScope.$on('userIntercepted', function (errorType) {
            // 跳转到登录界面，这里我记录了一个from，这样可以在登录后自动跳转到未登录之前的那个界面

            $state.go("Login", { from: $state.current.name });
            //, { from: $state.current.name, w: errorType }
            //
        });


        $scope.$on('$stateChangeSuccess', function (event, nextRoute, currentRoute) {
            WXService.WXReady();
        });

    };

    indexController.$inject = ['$scope', '$rootScope', 'gToast', 'WXService', '$cookieStore', '$state'];
    app.controller("indexController", indexController);
    // Bootstrap Angular when DOM is ready
    angularAMD.bootstrap(app);
    return app;
});


