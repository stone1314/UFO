﻿define(["AppFactory"], function (appFactory) {
    appFactory.factory("HelpAlterService", ['HttpService', '$cookieStore', "gToast", "$ionicPopup", '$interval', 'VerificationHelp', 'UsersService', '$ionicModal', '$sce', '$timeout', '$rootScope', '$sce',
        function (HttpService, $cookieStore, gToast, $ionicPopup, $interval, VerificationHelp, UsersService, $ionicModal, $sce, $timeout, $rootScope, $sce) {


            return {
                ContractHelp: {
                    hasToContract: false,
                    hasValue: false,
                    contactUrl: "",
                    content: null
                },
                CalculatorHelp: {
                    productName: "试算结果"
                },

                ImageCode: function (scope, PhoneNumber, type, resType, SmsFunc) {
                    scope.ImgCode = {
                        imgvalidateCode: "",
                        imgsrc: ''
                    }
                    var popup = $ionicPopup.show({
                        templateUrl: 'templates/Popup/ImgCode.html',
                        scope: scope,
                        buttons: [
                                 {
                                     text: '取 消',
                                     type: 'button-Size-Height-35'
                                 },
                          {
                              text: '确 认',
                              type: 'button-orange button-Size-Height-35',
                              onTap: function (e) {
                                  if (!scope.ImgCode.imgvalidateCode) {
                                      gToast.open("图形验证码不能为空");
                                      e.preventDefault();
                                  } else {
                                      return scope.ImgCode.imgvalidateCode;
                                  }
                              }
                          }
                        ]
                    });

                    popup.then(function (res) {
                        if (!angular.isUndefined(res) && res != null && res != "") {
                            UsersService.SendValidCode(PhoneNumber, type, scope.ImgCode.imgvalidateCode, resType).then(function (data) { //1:注册  3：图片
                                if (data.Success) {
                                    SmsFunc();
                                }
                            });
                        }
                    });

                    scope.ImgCode.imgsrc = RestWebHost.Host + "Account/GetImageRefresh?mobile=" + PhoneNumber + "&type=" + type + "&resType=" + resType + "&s=" + new Date().getSeconds();
                    scope.ImgCodeClick = function () {
                        //HelpAlterService.ImageCode_Src($scope, $scope.User.phoneNumber, 1, 3);
                        scope.ImgCode.imgsrc = RestWebHost.Host + "Account/GetImageRefresh?mobile=" + PhoneNumber + "&type=" + type + "&resType=" + resType + "&s=" + new Date().getSeconds();
                    };

                    return popup;
                },

                AlertTemplate2: function (scope, title, content, onTap) {
                    scope.AlertTemplate2 = {
                        title: title,
                        content: content,
                    }
                    var Popup = $ionicPopup.show({
                        templateUrl: 'templates/Popup/AlertTemplate2.html',
                        scope: scope,
                        buttons: [
                                  {
                                      text: '确 认',
                                      //  type: "button-red button-small  ",
                                      type: 'button-red button-Size-Height-35',
                                      onTap: function (e) {
                                          if (typeof onTap == 'function') {
                                              onTap();
                                          }
                                      }
                                  }
                        ]
                    });
                },
                SetTime: function ($scope, name) {
                    $scope.TimeModel = {
                        validateCodeShow: true,
                        countdown: 60
                    }
                    if (typeof ($cookieStore.get("validateCodeShows" + name)) == "undefined" || $cookieStore.get("countdown" + name) <= 1) {
                        $scope.TimeModel.validateCodeShow = true;
                        $scope.TimeModel.countdown = 60;
                        $cookieStore.put("validateCodeShows" + name, true);
                        $cookieStore.put("countdown" + name, 60);
                    } else if ($cookieStore.get("validateCodeShows" + name) == false) {
                        $scope.TimeModel.validateCodeShow = $cookieStore.get("validateCodeShows" + name);
                        $scope.TimeModel.countdown = $cookieStore.get("countdown" + name);
                        $interval(function () {
                            $scope.Settime(name);
                        }, 1000, $scope.TimeModel.countdown);
                    }

                    $scope.Settime = function (name) {
                        if ($scope.TimeModel.countdown <= 1) {
                            $scope.TimeModel.validateCodeShow = true;
                            $scope.TimeModel.countdown = 60;
                            $cookieStore.put("validateCodeShows" + name, true);
                            $cookieStore.put("countdown" + name, 60);
                        } else {
                            $cookieStore.put("validateCodeShows" + name, false);
                            $cookieStore.put("countdown" + name, $scope.TimeModel.countdown);
                            $scope.TimeModel.countdown--;
                        }
                    }
                },
                BeginTime: function ($scope, name) {
                    $cookieStore.put("countdown" + name, 60);
                    $scope.TimeModel.validateCodeShow = false;
                    $interval(function () {
                        $scope.Settime(name);
                    }, 1000, $cookieStore.get("countdown" + name));
                },
                PreviewContart: function ($scope, title, type, resType, conType, pid, func) {

                    //   Contract/PreviewContract?type=1&resType=1&conType=1&pid=1197    ng-src="{{PreviewContart.url}}"
                    $scope.PreviewContart = {
                        title: title,
                        type: type,
                        resType: resType,
                        conType: conType,
                        pid: pid,
                        url: $sce.trustAsResourceUrl(RestWebHost.Host + "Contract/PreviewContract?type=" + type + "&resType=" + resType + "&conType=" + conType + "&pid=" + pid + "&s=" + new Date().getSeconds()),
                    }

                    $ionicModal.fromTemplateUrl('templates/Modal/PreviewContart.html', {
                        scope: $scope,
                        animation: 'silde-in-up'
                    }).then(function (modal) {
                        $scope.PreviewContartModal = modal;

                        $scope.PreviewContartModal.show();
                        $("#abc").attr("src", RestWebHost.Host + "Contract/PreviewContract?type=" + type + "&resType=" + resType + "&conType=" + conType + "&pid=" + pid + "&s=" + new Date().getSeconds());
                    });

                    $scope.PreviewContart.function = function () {
                        if (typeof func == 'function') {
                            func();
                        }

                        //if ($scope.historycount == 1) {
                        //    console.log($scope.historycount);
                        //    $scope.historycount = 2 
                        //} else if ($scope.historycount == 2) {
                        //    console.log($scope.historycount);
                        //    $scope.historycount = 1;
                        //    history.back();
                        //}

                        $scope.PreviewContartModal.hide();
                    }


                },
                Confirmation_Pwd: function ($scope, content) {
                    $scope.Confirmation = {
                        pwd: "",
                        content: content,
                        inputType: "password",
                        placeholder: '请输入登录密码',

                    };
                    if ($scope.Confirmation != null) {
                        $scope.Confirmation.pwd = "";
                        $scope.Confirmation.content = content;
                    }  
                   
                    var Popup = $ionicPopup.show({
                        templateUrl: 'templates/Popup/PasswordConfirmation.html',
                        cssClass: 'ufoAlter',
                        scope: $scope,
                        buttons: [
                          { text: '取消', type: 'button-positive' },
                          {
                              text: '确定',
                              type: 'button-positive',
                              onTap: function (e) {
                                  if (!$scope.Confirmation.pwd) {
                                      gToast.open("请输入登录密码");
                                      e.preventDefault();
                                  } else {
                                      return $scope.Confirmation.pwd;
                                  }
                              }
                          }
                        ]
                    });

                    $scope.pwd_Clear = function () { 
                        $scope.Confirmation.pwd = "";
                    };
                    $scope.PopupClose = function () {
                        Popup.close();
                    };
                    $scope.PopupHrefClose = function () {
                        location.href = "#/PwdGetCode";
                        Popup.close();
                    };
                    return Popup;
                },
                Confirmation_InviteCode: function ($scope, content) {
                    $scope.Confirmation = {
                        pwd: "",
                        content: content,
                        inputType: "text",
                        placeholder: '请输入邀请码',

                    };
                    if ($scope.Confirmation != null) {
                        $scope.Confirmation.pwd = "";
                        $scope.Confirmation.content = content;
                    }

                    var Popup = $ionicPopup.show({
                        templateUrl: 'templates/Popup/PasswordConfirmation.html',
                        cssClass: 'ufoAlter',
                        scope: $scope,
                        buttons: [
                          { text: '取消', type: 'button-positive' },
                          {
                              text: '确定',
                              type: 'button-positive',
                              onTap: function (e) {
                                  if (!$scope.Confirmation.pwd) {
                                      gToast.open("请输入邀请码");
                                      e.preventDefault();
                                  } else {
                                      return $scope.Confirmation.pwd;
                                  }
                              }
                          }
                        ]
                    });

                    $scope.pwd_Clear = function () {
                        $scope.Confirmation.pwd = "";
                    };
                    $scope.PopupClose = function () {
                        Popup.close();
                    };
                    $scope.PopupHrefClose = function () {
                        location.href = "#/PwdGetCode";
                        Popup.close();
                    };
                    return Popup;
                },
                Confirmation: function ($scope, content,cancel,ok) {
                     var Popup = $ionicPopup.show({
                        template: content,
                        cssClass: 'ufoAlter',
                        scope: $scope,
                        buttons: [
                          { text: cancel, type: 'button-positive' },
                          {
                              text:ok,
                              type: 'button-positive',
                              onTap: function (e) {
                                  return true;
                              }
                          }
                        ]
                    });

          
                    $scope.PopupClose = function () {
                        Popup.close();
                    };
            
                    return Popup;
                },
                Alert: function ($scope,context) {
                    var alertModel = $ionicPopup.alert({
                        cssClass: 'ufoAlter',
                        template:context,// '该笔理财无电子合同，请查看您的纸质合同',
                        scope: $scope,
                        okText: "确定",
                        okType: ""
                    });

                    return alertModel;
                },
                Alert_Templates: function ($scope, context) {
                    $scope.AlertTemplate = {
                        context: context
                    };
                    var alertModel = $ionicPopup.alert({
                        cssClass: 'ufoAlter',
                        templateUrl: 'templates/Popup/Success.html',// '该笔理财无电子合同，请查看您的纸质合同',
                        scope: $scope,
                        okText: "确定",
                        okType: ""
                    });

                    return alertModel;
                },
                Alert_showResults: function ($scope, context) {
                    $scope.AlertTemplate = {
                        context: context
                    }; 

                    var alertModel = $ionicPopup.alert({
                        cssClass: 'ufoShow',
                        templateUrl: 'templates/Popup/Success.html',
                        scope: $scope, 
                    });
                   
                    $timeout(function () {
                        alertModel.close();
                    }, 3000);
                   // return alertModel;
                },
                Alert_Agreement: function ($scope, contextUrl,hasfooter) {
                    $scope.Alert_Agreement = {
                        Url:$sce.trustAsResourceUrl(contextUrl),
                        hasfooter: hasfooter,
                        hasIos: isiOS
                    }
                    var alertPopup = $ionicPopup.alert({
                        cssClass: 'ufoAlter ufoAlter_agreement',
                        templateUrl: 'templates/Popup/Alert_Agreement.html',
                        scope: $scope,
                        title: '合格投资者认证',
                        okText: "确定",
                        okType: "button-orange-alter"
                    });

                    return alertPopup;
                },
                AlertOKTemplate: function ($scope, content) {
                    $scope.Model.Content = content;
                    var Popup = $ionicPopup.show({
                        templateUrl: 'templates/Popup/AlertOKTemplate.html',
                        scope: $scope,
                        buttons: [
                                  {
                                      text: '确 认',
                                      //  type: "button-red button-small  ",
                                      type: 'button-red button-Size-Height-35',
                                      onTap: function (e) {
                                          return true;
                                      }
                                  }
                        ]
                    });
                    return Popup;
                },

                Echars_axis: function (datas, xdatas) {
                    $timeout(function () {//由于键盘弹出是有动画效果的，要获取完全弹出的窗口高度，使用了计时器

                        // 基于准备好的dom，初始化echarts实例
                        var myChart = echarts.init(document.getElementById('main'));
                        // 指定图表的配置项和数据
                        var option = {
                            title: {
                                show: false,
                                text: '步步高产品'
                            },
                            axisLabel: {
                                textStyle: {
                                    color: "#ffffff"//x轴，y轴的数字颜色，如图1
                                }
                            },
                            //axisLine: {//x轴、y轴的深色轴线，如图2
                            //    show: true,
                            //    lineStyle: {
                            //        color: "#ffffff",
                            //    }
                            //},
                            //axisTick:{ 
                            //    show: false,
                            //},
                            tooltip: {
                                trigger: 'axis'
                            },
                            //color:[
                            //    'rgba(91, 195, 184, 1)'
                            //],
                            grid: {
                                left: '10',
                                right: '10',
                                bottom: '0',
                                top: 40,
                                containLabel: true
                            },

                            xAxis: {
                                name: '期',
                                type: 'category',
                                boundaryGap: false,
                                data: xdatas,//['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
                                //data:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
                                axisLine: {//x轴、y轴的深色轴线，如图2
                                    show: true,
                                    lineStyle: {
                                        color: "#ffffff",
                                    }
                                },
                                axisLabel: {
                                    position: 'top'
                                }
                            },
                            //legend: {
                            //    data: ['年化利率']
                            //},
                            yAxis: {
                                name: '年化利率[%]',
                                type: 'value',
                                splitLine: {
                                    show: false
                                },
                                axisLine: {//x轴、y轴的深色轴线，如图2
                                    show: true,
                                    lineStyle: {
                                        color: "#ffffff",
                                    }
                                },
                                axisLabel: {
                                    formatter: '{value} '
                                }
                            },
                            series: [
                                {
                                    name: '年化利率',
                                    type: 'line',
                                    areaStyle: {
                                        normal: {
                                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                                offset: 0,
                                                color: '#fff'
                                            }, {
                                                offset: 1,
                                                color: 'rgba(252, 152, 126, 1)'
                                            }])
                                        }
                                    },
                                    data: datas
                                }
                            ]
                        };

                        // 使用刚指定的配置项和数据显示图表。
                        myChart.setOption(option);
                    }, 500);
                },
                ///*
                ///*  保存登入Token
                ///*
                SetlocalStorage: {
                    token: function (AccessToken, IsRealName) {
                        var t = new Date();//你已知的时间
                        var t_s = t.getTime();//转化为时间戳毫秒数
                        var nt = new Date();//定义一个新时间
                        nt.setTime(t_s + 1000 * 60 * 60);//设置新时间 一个小时


                        localStorage.setItem("AccessToken", AccessToken);
                        localStorage.setItem("AccessTokenTime", nt)
                        localStorage.setItem("IsRealName", IsRealName)
                    },
                    IsRealName: function (IsRealName) {
                        localStorage.setItem("IsRealName", IsRealName)
                    },
                    Agreement: {
                        List: function (list) {
                            localStorage.setItem("AgreementList", JSON.stringify(list))
                           // $rootScope.Agreement.AgreementList = list;
                        },
                        Title: function (title) {
                            $rootScope.Agreement.Title = title;
                        },
                        Url: function (url) {
                            $rootScope.Agreement.url = url;
                        }
                    },
                    BankCarDetail: function (obj) {
                        localStorage.setItem("BankCarDetail", JSON.stringify(obj))
                    },
                    IsQualified: function (bo) {
                        localStorage.setItem("IsQualified", bo)
                    }
                },
                GetlocalStorage: {
                    AccessToken: function () {
                        localStorage.getItem("AccessToken")
                    },
                    AccessTokenTime: function () {
                        return localStorage.getItem("AccessTokenTime")
                    },
                    IsRealName:function( ){
                        return localStorage.getItem("IsRealName");
                    },
                    IsQualified: function () {
                        return localStorage.getItem("IsQualified");
                    },
                    Agreement: {
                        List: function () {
                            return JSON.parse(localStorage.getItem("AgreementList"));
                        },
                        Title: function () {
                            return $rootScope.Agreement.Title
                        },
                        Url: function () {
                            return $rootScope.Agreement.url
                        }
                    },
                    BankCarDetail: function () {
                        return JSON.parse(localStorage.getItem("BankCarDetail"));
                    }

                },
                RemovelocalStorage: function () {
                    localStorage.removeItem("AccessToken");
                    localStorage.removeItem("AccessTokenTime");
                    localStorage.removeItem("RealName");
                    $rootScope.Agreement = null; 
                }

            }
        }]);

});