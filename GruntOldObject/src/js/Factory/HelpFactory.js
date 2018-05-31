(function (window, angular, undefined) {
    'use strict';
    angular.module('HelpAlterFactory', ['HttpFactory']).factory("HelpAlterService", ['HttpService', '$cookieStore', "gToast", "$ionicPopup", '$interval', 'VerificationHelp', 'UsersService', '$ionicModal', '$sce', '$timeout', '$rootScope',
        function (HttpService, $cookieStore, gToast, $ionicPopup, $interval, VerificationHelp, UsersService, $ionicModal, $sce, $timeout, $rootScope) {


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

                ImageCode: function (scope, PhoneNumber, resType, SmsFunc, ImageCaptch) {
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
                            console.log(scope.ImgCode.imgvalidateCode);
                            UsersService.SendValidCode(PhoneNumber, resType, "", scope.ImgCode.imgvalidateCode).then(function (data) { //1:注册  3：图片
                                if (data.Success) {
                                    SmsFunc();
                                }
                            });
                        }
                    });

                    scope.ImgCode.imgsrc = $sce.trustAsResourceUrl("data:image/png;base64," + ImageCaptch);// RestWebHost.Host + "Account/GetImageRefresh?mobile=" + PhoneNumber + "&type=" + type + "&resType=" + resType + "&s=" + new Date().getSeconds();
                    scope.ImgCodeClick = function () {


                        UsersService.GetSms(PhoneNumber, resType).then(function (data) { //1:注册 
                            console.log(data);
                            if (data.Success && data.Result.HasImageCaptcha) {
                                scope.ImgCode.imgsrc = $sce.trustAsResourceUrl("data:image/png;base64," + data.Result.ImageCaptch);
                            }
                        });
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
                Alert: function ($scope, context) {
                    var alertModel = $ionicPopup.alert({
                        cssClass: '',
                        template: context,// '该笔理财无电子合同，请查看您的纸质合同',
                        scope: $scope,
                        okText: "确定",
                        okType: "button-red button-Size-Height-35"
                    });

                    return alertModel;
                },
                SetTime: function ($scope, name) {
                    $scope.TimeModel = {
                        validateCodeShow: true,
                        countdown: 60
                    }

                    if (typeof ($cookieStore.get("validateCodeShows" + name)) == "undefined" || $cookieStore.get("countdown" + name) <= 1 || $cookieStore.get("countdown" + name) == 60) {
                        $scope.TimeModel.validateCodeShow = true;
                        $scope.TimeModel.countdown = 60;
                        $cookieStore.put("validateCodeShows" + name, true);
                        $cookieStore.put("countdown" + name, 60);
                    } else if ($cookieStore.get("validateCodeShows" + name) == false) {
                        $scope.TimeModel.validateCodeShow = $cookieStore.get("validateCodeShows" + name);
                        $scope.TimeModel.countdown = $cookieStore.get("countdown" + name);

                        $scope.intervalTime = setInterval(function () {

                            // $scope.$apply(function() {  
                            $scope.Settime(name);
                            if ($scope.TimeModel.countdown <= 0) {
                                $scope.TimeModel.validateCodeShow = true;
                                $scope.TimeModel.countdown = 60;
                                $cookieStore.put("validateCodeShows" + name, true);
                                $cookieStore.put("countdown" + name, 60);
                                console.log(111111111111);
                                clearInterval($scope.intervalTime);
                            }
                            $scope.$apply();
                        }, 1000);

                        //$scope.intervalTime = $interval(function () {
                        //    $scope.Settime(name);
                        //}, 1000, $scope.TimeModel.countdown).then(function () {
                        //    $scope.TimeModel.validateCodeShow = true;
                        //    $scope.TimeModel.countdown = 60;
                        //    $cookieStore.put("validateCodeShows" + name, true);
                        //    $cookieStore.put("countdown" + name, 60);
                        //    console.log(22222222222);
                        //});

                    }

                    $scope.Settime = function (name) {
                        console.log($scope.TimeModel.countdown);
                        $cookieStore.put("validateCodeShows" + name, false);
                        $cookieStore.put("countdown" + name, $scope.TimeModel.countdown);
                        $scope.TimeModel.countdown--;
                    }
                },
                BeginTime: function ($scope, name) {
                    $cookieStore.put("countdown" + name, 60);
                    $scope.TimeModel.validateCodeShow = false;

                    $scope.intervalTime = setInterval(function () {


                        $scope.Settime(name);
                        if ($scope.TimeModel.countdown <= 0) {
                            $scope.TimeModel.validateCodeShow = true;
                            $scope.TimeModel.countdown = 60;
                            $cookieStore.put("validateCodeShows" + name, true);
                            $cookieStore.put("countdown" + name, 60);
                            console.log(111111111111);
                            clearInterval($scope.intervalTime);
                        }
                        $scope.$apply();
                    }, 1000);



                    //$scope.intervalTime = $interval(function () {
                    //    $scope.Settime(name);
                    //}, 1000, $cookieStore.get("countdown" + name)).then(function () {
                    //    $scope.TimeModel.validateCodeShow = true;
                    //    $scope.TimeModel.countdown = 60;
                    //    $cookieStore.put("validateCodeShows" + name, true);
                    //    $cookieStore.put("countdown" + name, 60);
                    //    console.log(111111111111);
                    //}); 
                },
                EndTime: function ($scope, name) {
                    clearInterval($scope.intervalTime);   //取消调用 

                    $scope.TimeModel.validateCodeShow = true;
                    $scope.TimeModel.countdown = 60;
                    $cookieStore.put("validateCodeShows" + name, true);
                    $cookieStore.put("countdown" + name, 60);
                    console.log($cookieStore.get("validateCodeShows" + name))
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
                InvitationCodeConfirmation: function ($scope, content) {
                    if ($scope.model != null) {
                        $scope.model.code = "";
                        $scope.model.content = content;
                    } else {
                        $scope.model = {
                            code: "",
                            content: content
                        };
                    }
                    var Popup = $ionicPopup.show({
                        templateUrl: 'templates/Popup/InvitationCode.html',
                        scope: $scope,
                        buttons: [
                                  {
                                      text: '确 认',
                                      //  type: "button-red button-small  ",
                                      type: 'button-red button-Size-Height-35',
                                      onTap: function (e) {
                                          if (!$scope.model.code) {
                                              gToast.open("请输入邀请码");
                                              e.preventDefault();
                                          } else {
                                              return $scope.model.code;
                                          }
                                      }
                                  }
                        ]
                    });
                    $scope.PopupClose = function () {
                        Popup.close();
                    }
                    return Popup;
                }
                , PasswordConfirmation: function ($scope, content) {
                    if ($scope.model != null) {
                        $scope.model.pwd = "";
                        $scope.model.content = content;
                    } else {
                        $scope.model = {
                            pwd: "",
                            content: content
                        };
                    }
                    var Popup = $ionicPopup.show({
                        templateUrl: 'templates/Popup/DelBank.html',
                        scope: $scope,
                        buttons: [
                                  {
                                      text: '确 定',
                                      //  type: "button-red button-small  ",
                                      type: 'button-red button-Size-Height-35',
                                      onTap: function (e) {
                                          if (!$scope.model.pwd) {
                                              gToast.open("请输入登录密码");
                                              e.preventDefault();
                                          } else {
                                              return $scope.model.pwd;
                                          }
                                      }
                                  }
                        ]
                    });
                    $scope.PopupClose = function () {
                        Popup.close();
                    }
                    $scope.PopupHrefClose = function () {
                        location.href = "#/PwdGetCode";
                        Popup.close();
                    }
                    return Popup;
                },
                AlertOKTemplate: function ($scope, content) {
                    if ($scope.Model == null) {
                        $scope.Model = {};
                    }
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
                        Title: function (title) {
                            $rootScope.Agreement.Title = title;
                        },
                        Url: function (url) {
                            $rootScope.Agreement.url = url;
                        }
                    }
                },
                GetlocalStorage: {
                    AccessToken: function () {
                        return localStorage.getItem("AccessToken")
                    },
                    AccessTokenTime: function () {
                        return localStorage.getItem("AccessTokenTime")
                    },
                    IsRealName: function () {
                        return localStorage.getItem("IsRealName")
                    },
                    Agreement: {
                        Title: function () {
                            return $rootScope.Agreement.Title
                        },
                        Url: function () {
                            return $rootScope.Agreement.url
                        }
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

})(window, window.angular);