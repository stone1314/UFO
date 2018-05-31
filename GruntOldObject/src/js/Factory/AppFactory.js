define(["Jweixin"], function (wx) {

    angular.module('HttpFactory', [])
        .factory('HttpService', ['$http', '$q', '$ionicLoading', '$timeout', 'gToast', function ($http, $q, $ionicLoading, $timeout, gToast) {

            //Post请求
            var PostToJson = function (url, Parameters) {
                $ionicLoading.show({
                    templateUrl: 'templates/Load/DataLoad.html',
                });
                var deferred = $q.defer();
                $.ajax({
                    url: RestWebHost.Host + url,
                    data: Parameters,
                    xhrFields: {
                        withCredentials: true
                    },
                    type: "POST",
                    success: function (data) {
                        resultAlert(data);
                        deferred.resolve(data);
                        $ionicLoading.hide();
                    },
                    error: function () {
                        $ionicLoading.hide();
                        gToast.open("请求服务异常！！！");
                    }

                });
                return deferred.promise;
            };
            var PostToJsonUnLoading = function (url, Parameters) {

                var deferred = $q.defer();
                $.ajax({
                    url: RestWebHost.Host + url,
                    data: Parameters,
                    xhrFields: {
                        withCredentials: true
                    },
                    type: "POST",
                    dataType: "JSON",
                    success: function (data) {

                        resultAlert(data);
                        deferred.resolve(data);
                    },
                    error: function () {
                        gToast.open("请求服务异常！！！");
                    }

                });
                return deferred.promise;

            };

            //Post请求
            var PostToObject = function (url, Parameters) { 
                $ionicLoading.show({
                    templateUrl: 'templates/Load/DataLoad.html',
                });
                var deferred = $q.defer();
                $.post(RestWebHost.Host + url, Parameters).success(function (data) {
                    resultAlert(data);
                    deferred.resolve(data);
                    $ionicLoading.hide();

                })
                .error(function () {
                    $ionicLoading.hide();
                    gToast.open("请求服务异常！！！");
                });
                return deferred.promise;
            };
            var PostToObjectUnLoading = function (url, Parameters) {
                var deferred = $q.defer();
                $.post(RestWebHost.Host + url, Parameters).success(function (data) {
                    resultAlert(data);
                    deferred.resolve(data);

                })
                .error(function () {
                    gToast.open("请求服务异常！！！");
                });
                return deferred.promise;
            };
            //Get请求
            var GetToJson = function (url, Parameters) {
                $ionicLoading.show({
                    templateUrl: 'templates/Load/DataLoad.html',
                });
                var deferred = $q.defer();
                $.get(RestWebHost.Host + url, Parameters).success(function (data) {
                    var data = JSON.parse(data);
                    if (data.success == "false") {
                        gToast.open(data.error);
                    }
                    deferred.resolve(data);
                    $ionicLoading.hide();
                })
                .error(function () {
                    $ionicLoading.hide();
                    gToast.open("请求服务异常！！！");
                });
                return deferred.promise;
            };
            var GetToJsonUnLoading = function (url, Parameters) {
                var deferred = $q.defer();
                $.get(RestWebHost.Host + url, Parameters).success(function (data) {
                    var data = JSON.parse(data);
                    if (data.success == "false") {
                        gToast.open(data.error);
                    }
                    deferred.resolve(data);
                })
                .error(function () {
                    gToast.open("请求服务异常！！！");
                });
                return deferred.promise;
            };
            //Get请求
            var GetToObject = function (url, Parameters) {
                $ionicLoading.show({
                    templateUrl: 'templates/Load/DataLoad.html',
                });

                var deferred = $q.defer();
                $.get(RestWebHost.Host + url, Parameters).success(function (data) {
                    if (data.success == "false") {
                        gToast.open(data.error);
                    }
                    deferred.resolve(data);
                    $ionicLoading.hide();
                })
                .error(function () {
                    $ionicLoading.hide();
                    gToast.open("请求服务异常！！！");
                });
                return deferred.promise;
            };
            var GetToObjectUnLoading = function (url, Parameters) {
                var deferred = $q.defer();
                $.get(RestWebHost.Host + url, Parameters).success(function (data) {
                    if (data.success == "false") {
                        gToast.open(data.error);
                    }
                    deferred.resolve(data);
                })
                .error(function () {
                    gToast.open("请求服务异常！！！");
                });
                return deferred.promise;
            };


            var AjaxToJson = function (url, Parameters) {
                $ionicLoading.show({
                    templateUrl: 'templates/Load/DataLoad.html',
                });
                var deferred = $q.defer();
                $http({
                    url: RestWebHost.Host + url,
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    }, 
                    data: Parameters,
                }).success(function (data) {
                    resultAlert(data);
                    deferred.resolve(data);
                    $ionicLoading.hide();
                }).error(function () {
                    $ionicLoading.hide();
                    gToast.open("请求服务异常！！！");
                });
                return deferred.promise;
            }
            var AjaxToJsonUnLoading = function (url, Parameters) {
                var deferred = $q.defer();
                $http({
                    url: RestWebHost.Host + url,
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: Parameters,
                }).success(function (data) {
                    resultAlert(data);
                    deferred.resolve(data);
                }).error(function () {
                    gToast.open("请求服务异常！！！");
                });
                return deferred.promise;
            }

            var resultAlert = function (data) {
                if (!data.Success && data.UnAuthorizedRequest == false) {
                    if (data.Error.Message != null && data.Error.Message != "" && data.Error.Code != 397 ) {
                        if (data.Error.Code == "6000") {
                            location.href = "#/Login";
                        } else {
                            gToast.open(data.Error.Message);
                        }
                    } 

                } else if (!data.Success && data.UnAuthorizedRequest) {
                    location.replace("#/Login");
                    //location.href="#/Login";
                }
            }
            var ResultHelp = function (success, errorMessage, result) {
                var deferred = $q.defer();
                var object = {
                    Success: success,
                    UnAuthorizedRequest: false,
                    Result: result,
                    Error: {
                        Message: errorMessage,
                        Code: "00000"
                    }
                }
                resultAlert(object);
                deferred.resolve(object);
                return deferred.promise;
            }
            return {
                PostToJson: PostToJson,
                PostToJsonUnLoading: PostToJsonUnLoading,
                PostToObject: PostToObject,
                PostToObjectUnLoading: PostToObjectUnLoading,    //不需要显示 加载提示
                GetToJson: GetToJson,
                GetToJsonUnLoading: GetToJsonUnLoading,
                GetToObject: GetToObject,
                GetToObjectUnLoading: GetToObjectUnLoading,
                AjaxToJson: AjaxToJson,
                AjaxToJsonUnLoading: AjaxToJsonUnLoading,
                ResultHelp: ResultHelp
            }
        }]).factory("VerificationHelp", [function () {
            var phoneRegexp = /^(?:1\d\d)\d{8}$/i;    //手机正则
            var emailsRegexp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i;   //邮箱正则
            var pwdRegexp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/i;      //必填，英文字符+数字，不可特殊字符，6-14位。默认不显示明文，若点亮 ，可看到输入的密码明文。
            var intRegexp = /^[1-9]\d*$/i;
            //^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$


            return {
                PhoneVerification: function (value) {
                    return phoneRegexp.test(value);
                },
                EmailVerification: function (value) {
                    return emailsRegexp.test(value);
                },
                PwdVerification: function (value) {
                    return pwdRegexp.test(value);
                },
                IntVerification: function (value) {
                    return intRegexp.test(value);
                },
                //,
                //ConvertPinyin: function (hanzhi) {
                //    return ConvertPinyin(hanzhi);
                //},
                //firstLetter: firstLetter
            }
        }]);
    var appFactory = angular.module("appFactory", ['HttpFactory'])
     .factory('DataService', ['HttpService', '$stateParams', "gToast", "$cookieStore", function (HttpService, $stateParams, gToast, $cookieStore) {
         return {
             Test: function () {
                 //HttpService.AjaxToJson("http://172.16.36.76/QUFO/Account/Login", { "PhoneNumber": "18801952397", "Password": "111111", "OpenID": "1234" }).then(function (a) {
                 //    console.log(a);
                 //});

                 console.log("appFactory.DataService");
             }

         }
     }])
    .factory('UserInterceptor', ["$q", "$rootScope", function ($q, $rootScope) {
        return {
            request: function (config) {
               
                if (localStorage.getItem("AccessToken")) {
                    var date = new Date();
                    if (date > new Date(localStorage.getItem("AccessTokenTime"))) {
                        localStorage.removeItem("AccessToken");
                        localStorage.removeItem("AccessTokenTime");
                    }
                    config.headers["AccessToken"] = localStorage.getItem("AccessToken");
                   // config.headers["AccessTokenTime"] = localStorage.getItem("AccessTokenTime");
                }
                return config;
            },
            response: function (response) {
              
               

                return response;


            },
            responseError: function (response) {
                console.log(response)
                var data = response.data;
                //// 判断错误码，如果是未登录
                //if(data["errorCode"] == "500999"){
                //    // 清空用户本地token存储的信息，如果
                //    $rootScope.user = {token:""};
                //    // 全局事件，方便其他view获取该事件，并给以相应的提示或处理
                //    $rootScope.$emit("userIntercepted","notLogin",response);
                //}
                //// 如果是登录超时
                //if(data["errorCode"] == "500998"){
                //    $rootScope.$emit("userIntercepted","sessionOut",response);
                //}
                return $q.reject(response);
            }
        };
    }])
    .factory("WXService", function () {
        return {
            WXReady: function () {
                function onBridgeReady() {
                    WeixinJSBridge.call('hideOptionMenu');
                }

                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                    }
                } else {
                    onBridgeReady();
                }
            }
        }
    });
    return appFactory;
});