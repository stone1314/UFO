﻿/// <reference path="WxResult.html" />
"use strict";

define(['angularAMD', 'Jweixin', 'ionic', 'gToast', 'DataValidate', 'Cookies', 'ios9Uiwebview','built'], function (angularAMD, wx) {
    var app = angular.module("mainModule", ['ionic', "ngCookies", "appDirective", "appFactory","gToast",'HelpAlterFactory','ProductsFactory','UsersFactory']);

    app.filter("leadingZeroes", function () {
        return function (data) {
            var pad = "000" + data;
            pad = pad.substr(pad.length - 3);
            return pad;
        }
    });
    app.run(function ($ionicPlatform, $rootScope, $timeout) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
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
        /*
         * 动态文件名后缀
         * */
        var fileExt="";
        $.ajaxSettings.async = false; //设置getJson同步
        var myDate = new Date();
        $.getJSON("js/appConfig.json?v="+myDate.getMilliseconds(), function(data){
            fileExt= data.versions;
        });
        $.ajaxSettings.async = true; //设置getJson同步


        $stateProvider

      .state('Index', angularAMD.route({
          url: "/",
          cache: false,
          reload: true,
          templateUrl: "view/Login"+fileExt+".html",
          controllerUrl: "view/LoginController"+fileExt+".js"
      }))
       .state('Login', angularAMD.route({
           url: "/Login/:from",

           cache: false,
           reload: true,
           templateUrl: "view/Login"+fileExt+".html",
           controllerUrl: "view/LoginController"+fileExt+".js"

       }))
       .state('ProductTabs.ValueAddedPlan', angularAMD.route({
           url: "/ValueAddedPlan/:openid",

           //cache: false,
           controllerUrl: "view/MyBestRich/ValueAddedPlanController"+fileExt+".js",
           views: {
               'tab-ValueAddedPlan': {
                   templateUrl: "view/MyBestRich/ValueAddedPlan"+fileExt+".html"
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
            controllerUrl: "view/PrivateEquity/FundListController"+fileExt+".js",
            views: {
                'tab-FundList': {
                    templateUrl: "view/PrivateEquity/FundList"+fileExt+".html"
                }
            }
        }))


        .state('ProductTabs.CIProductList', angularAMD.route({
            url: "/CIProductList",
            cache: false,
            controllerUrl: "view/ContinuedInvestment/CIProductListController"+fileExt+".js",
            views: {
                'tab-CIProductList': {
                    templateUrl: "view/ContinuedInvestment/CIProductList"+fileExt+".html"
                }
            },
            //resolve: {
            //    permission: function (UsersService) {
            //        return UsersService.permissionCheck();
            //    }
            //}
        }))
        .state('ProductTabs', angularAMD.route({
            url: "/ProductTabs",
            cache: false,
            reload: true,
            animation: 'no-animation',
            templateUrl: "view/Tabs/ProductTabs"+fileExt+".html",
            controllerUrl: "view/Tabs/ProductTabsController"+fileExt+".js"

        }))

        .state('ProductInfo', angularAMD.route({
            cache: false,
            reload: true,
            url: "/ProductInfo/:ProductId", 
            templateUrl: "view/MyBestRich/ProductInfo"+fileExt+".html",
            controllerUrl: "view/MyBestRich/ProductInfoController"+fileExt+".js"
        }))
             .state('ProductDescribe', angularAMD.route({
                 url: "/ProductDescribe",

                 templateUrl: "view/MyBestRich/ProductDescribe"+fileExt+".html",
                 controllerUrl: "view/MyBestRich/ProductDescribeController"+fileExt+".js"

             }))
        .state('PaymentOrder', angularAMD.route({
            url: "/PaymentOrder/:ProductId",
            cache: false,
            templateUrl: "view/MyBestRich/PaymentOrder"+fileExt+".html",
            controllerUrl: "view/MyBestRich/PaymentOrderController"+fileExt+".js",
            //resolve: {
            //    permission: function (UsersService) {
            //        return UsersService.permissionCheck();
            //    }
            //}

        }))
       .state('PaymentResult', angularAMD.route({
           url: "/PaymentResult/:tolMoney",
           cache: false,
           reload: true,
           templateUrl: "view/MyBestRich/PaymentResult"+fileExt+".html",
           controllerUrl: "view/MyBestRich/PaymentResultController"+fileExt+".js",
           //resolve: {
           //    permission: function (UsersService) {
           //        return UsersService.permissionCheck();
           //    }
           //}
       }))
        .state('PaymentResultSuccess',angularAMD.route(
            {
                url: "/PaymentResultSuccess/:paymentNo",
                cache: false,
                reload: true,
                templateUrl: "view/MyBestRich/PaymentResultSuccess"+fileExt+".html",
                controllerUrl: "view/MyBestRich/PaymentResultSuccessController"+fileExt+".js",
                //resolve: {
                //    permission: function (UsersService) {
                //        return UsersService.permissionCheck();
                //    }
                //}
            }
        ))
        .state('PaymentResultfailure', angularAMD.route(
            {
                url: "/PaymentResultfailure/:resultType",
                cache: false,
                reload: true,
                templateUrl: "view/MyBestRich/PaymentResultfailure"+fileExt+".html",
                controllerUrl: "view/MyBestRich/PaymentResultfailureController"+fileExt+".js",
                //resolve: {
                //    permission: function (UsersService) {
                //        return UsersService.permissionCheck();
                //    }
                //}
            }
        ))
        .state('ApplyCI', angularAMD.route({
            url: "/ApplyCI/:contractNo",
            cache: false,
            templateUrl: "view/ContinuedInvestment/ApplyCI"+fileExt+".html",
            controllerUrl: "view/ContinuedInvestment/ApplyCIController"+fileExt+".js",
            //resolve: {
            //    permission: function (UsersService) {
            //        return UsersService.permissionCheck();
            //    }
            //}

        }))
        .state('Calculator', angularAMD.route({
            url: "/Calculator/:productId/:money",

            templateUrl: "view/Calculator/Calculator"+fileExt+".html",
            controllerUrl: "view/Calculator/CalculatorController"+fileExt+".js"

        }))//计算器结果页面

        .state('PopupResult', angularAMD.route({
            url: "/PopupResult/:pid/:contractAgreement/:InvestmentAmount/:VoteDate/:EndDate",
            templateUrl: "view/Calculator/PopupResult"+fileExt+".html",
            controllerUrl: "view/Calculator/PopupResultController"+fileExt+".js"

        }))
            //注册
        .state('RegGetVerifi', angularAMD.route({
            url: "/RegGetVerifi",
            cache: false,
            templateUrl: "view/Register/RegGetVerifi"+fileExt+".html",
            controllerUrl: "view/Register/RegGetVerifiController"+fileExt+".js"

        }))
        .state('RegGetOldVerifi', angularAMD.route({
            url: "/RegGetOldVerifi",
            cache: false,
            templateUrl: "view/Register/RegGetOldVerifi"+fileExt+".html",
            controllerUrl: "view/Register/RegGetOldVerifiController"+fileExt+".js"

        }))
        .state('RegIdentification', angularAMD.route({
            url: "/RegIdentification/:type",
            cache: false,
            templateUrl: "view/Register/RegIdentification"+fileExt+".html",
            controllerUrl: "view/Register/RegIdentificationController"+fileExt+".js",
            //resolve: {
            //    permission: function (UsersService) {
            //        return UsersService.permissionCheck();
            //    }
            //}
        }))
         .state('RegSetIdentification', angularAMD.route({
             url: "/RegSetIdentification/:type/:resType/:conType/:pid",
             cache: false,
             templateUrl: "view/Register/RegSetIdentification"+fileExt+".html",
             controllerUrl: "view/Register/RegSetIdentificationController"+fileExt+".js"
         }))
            .state('RegReferrer', angularAMD.route({
                url: "/RegReferrer",
                cache: false,
                templateUrl: "view/Register/RegReferrer"+fileExt+".html",
                controllerUrl: "view/Register/RegReferrerController"+fileExt+".js"
            }))
        .state('RegSetPwd', angularAMD.route({
            url: "/RegSetPwd",
            cache: false,
            templateUrl: "view/Register/RegSetPwd"+fileExt+".html",
            controllerUrl: "view/Register/RegSetPwdController"+fileExt+".js"
        }))
        .state('RegChose', angularAMD.route({
            url: "/RegChose",

            templateUrl: "view/Register/RegChose"+fileExt+".html",
            controllerUrl: "view/Register/RegChoseController"+fileExt+".js"
        }))



        //查找密码
        .state('PwdGetCode', angularAMD.route({
            url: "/PwdGetCode",
            cache: false,
            templateUrl: "view/FindPwd/PwdGetCode"+fileExt+".html",
            controllerUrl: "view/FindPwd/PwdGetCodeController"+fileExt+".js"
        }))
         .state('PwdSetVerify', angularAMD.route({
             url: "/PwdSetVerify",

             cache: false,
             templateUrl: "view/FindPwd/PwdSetVerify"+fileExt+".html",
             controllerUrl: "view/FindPwd/PwdSetVerifyController"+fileExt+".js"
         }))
         .state('PwdSetNewPwd', angularAMD.route({
             url: "/PwdSetNewPwd", 
             cache: false,
             templateUrl: "view/FindPwd/PwdSetNewPwd"+fileExt+".html",
             controllerUrl: "view/FindPwd/PwdSetNewPwdController"+fileExt+".js"
         }))
        //修改手机号
         .state('MyBaseAccount', angularAMD.route({
             url: "/MyBaseAccount",
             cache: false,
             templateUrl: "view/SetTelphone/MyBaseAccount"+fileExt+".html",
             controllerUrl: "view/SetTelphone/MyBaseAccountController"+fileExt+".js",
             //resolve: {
             //    permission: function (UsersService) {
             //        return UsersService.permissionCheck();
             //    }
             //}
         }))
         .state('TelGetCode', angularAMD.route({
             url: "/TelGetCode",

             templateUrl: "view/SetTelphone/TelGetCode"+fileExt+".html",
             controllerUrl: "view/SetTelphone/TelGetCodeController"+fileExt+".js",
             //resolve: {
             //    permission: function (UsersService) {
             //        return UsersService.permissionCheck();
             //    }
             //}
         }))
         .state('TelSetPwd', angularAMD.route({
             url: "/TelSetPwd",
             cache: false,
             templateUrl: "view/SetTelphone/TelSetPwd"+fileExt+".html",
             controllerUrl: "view/SetTelphone/TelSetPwdController"+fileExt+".js",
             //resolve: {
             //    permission: function (UsersService) {
             //        return UsersService.permissionCheck();
             //    }
             //}
         }))
            //添加删除银行卡
          .state('MyBankCards', angularAMD.route({
              url: "/MyBankCards",
              cache: false,
              reload: true,
              templateUrl: "view/MyBank/MyBankCards"+fileExt+".html",
              controllerUrl: "view/MyBank/MyBankCardsController"+fileExt+".js",
              //resolve: {
              //    permission: function (UsersService) {
              //        return UsersService.permissionCheck();
              //    }
              //}
          }))
         .state('AddBankCards', angularAMD.route({
             url: "/AddBankCards",
             cache: false,
             reload: true,
             templateUrl: "view/MyBank/AddBankCards"+fileExt+".html",
             controllerUrl: "view/MyBank/AddBankCardsController"+fileExt+".js",
             //resolve: {
             //    permission: function (UsersService) {
             //        return UsersService.permissionCheck();
             //    }
             //}
         }))
         .state('Banks', angularAMD.route({
             url: "/Banks", 
             templateUrl: "view/MyBank/Banks"+fileExt+".html",
             controllerUrl: "view/MyBank/BanksController"+fileExt+".js",
             //resolve: {
             //    permission: function (UsersService) {
             //        return UsersService.permissionCheck();
             //    }
             //}
         }))
         .state('Agreement', angularAMD.route({
             url: "/Agreement",
             templateUrl: "view/MyBank/Agreement"+fileExt+".html",
             controllerUrl: "view/MyBank/AgreementController"+fileExt+".js",
             //resolve: {
             //    permission: function (UsersService) {
             //        return UsersService.permissionCheck();
             //    }
             //}
         }))
         .state('AmtContent', angularAMD.route({
             url: "/AmtContent/:contractNo",
             cache: false,
             templateUrl: "view/MyBank/AmtContent"+fileExt+".html",
             controllerUrl: "view/MyBank/AmtContentController"+fileExt+".js",
             //resolve: {
             //    permission: function (UsersService) {
             //        return UsersService.permissionCheck();
             //    }
             //}
         }))
            .state('GetBankCards', angularAMD.route({
                url: "/GetBankCards",
                cache: false,
                templateUrl: "view/MyBank/GetBankCards"+fileExt+".html",
                controllerUrl: "view/MyBank/GetBankCardsController"+fileExt+".js",
                //resolve: {
                //    permission: function (UsersService) {
                //        return UsersService.permissionCheck();
                //    }
                //}
            }))
            //还款记录
           .state('RefList', angularAMD.route({
               url: "/RefList",
               cache: false,
               templateUrl: "view/RefundList/RefList"+fileExt+".html",
               controllerUrl: "view/RefundList/RefListController"+fileExt+".js",
               //resolve: {
               //    permission: function (UsersService) {
               //        return UsersService.permissionCheck();
               //    }
               //}
           }))
             .state('IncomeList', angularAMD.route({
                 url: "/IncomeList/:ContractId/:ContractType",
                 templateUrl: "view/RefundList/IncomeList"+fileExt+".html",
                 controllerUrl: "view/RefundList/IncomeListController"+fileExt+".js",
                 //resolve: {
                 //    permission: function (UsersService) {
                 //        return UsersService.permissionCheck();
                 //    }
                 //}
             }))
             .state('ProDetail', angularAMD.route({
                 url: "/ProDetail/:pageNo/:ContractId",
                 cache: false,
                 templateUrl: "view/RefundList/ProDetail"+fileExt+".html",
                 controllerUrl: "view/RefundList/ProDetailController"+fileExt+".js",
                 //resolve: {
                 //    permission: function (UsersService) {
                 //        return UsersService.permissionCheck();
                 //    }
                 //}
             }))
            //我的优福
             .state('MyAccount', angularAMD.route({
                 url: "/MyAccount",
                 cache: false, 
                 templateUrl: "view/MyAccount/MyAccount"+fileExt+".html",
                 controllerUrl: "view/MyAccount/MyAccountController"+fileExt+".js"
             }))
            //交易记录
            .state('InvestList', angularAMD.route({
                url: "/InvestList",
                cache: false,
                templateUrl: "view/Transaction/InvestList"+fileExt+".html",
                controllerUrl: "view/Transaction/InvestListController"+fileExt+".js",
                //resolve: {
                //    permission: function (UsersService) {
                //        return UsersService.permissionCheck();
                //    }
                //}
            }))
            .state('TranList', angularAMD.route({
                url: "/TranList/:paymentNo",
                templateUrl: "view/Transaction/TranList"+fileExt+".html",
                controllerUrl: "view/Transaction/TranListController"+fileExt+".js"
            }))
            .state('TranDetail', angularAMD.route({
                url: "/TranDetail/:paymentNo",
                templateUrl: "view/Transaction/TranDetail"+fileExt+".html",
                controllerUrl: "view/Transaction/TranDetailController"+fileExt+".js",
                //resolve: {
                //    permission: function (UsersService) {
                //        return UsersService.permissionCheck();
                //    }
                //}
            }))



        $urlRouterProvider.otherwise('/');
    });

    var indexController = function ($scope, $rootScope, gToast, WXService, $cookieStore, $state) {
        $rootScope.$pageFinishedLoading = true;
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
                || toState.name == 'PwdSetNewPwd' || toState.name == 'PwdSetVerify' || toState.name=='PopupResult') return;// 如果是进入登录界面则允许
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


