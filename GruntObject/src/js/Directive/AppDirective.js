

var appDirective = angular.module("appDirective", ['ionic'])
    /*
    回退
    */
    .directive('backButton', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', goBack);

                function goBack() {
                    if (scope.isBackCustom) {
                        scope.BackCustomFun();
                    } else {
                        history.back();
                    }
                    scope.$apply();
                }
            }
        }
    })
    /*
     退出微信浏览器
    */
    .directive('moCloseweixin', function ($ionicPopup) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', closeWeixin);

                function closeWeixin() {

                    var confirmPopup = $ionicPopup.confirm({
                        title: '提示',
                        template: '是否退出微信浏览器！',
                        cancelText: "取 消",
                        cancelType: "button-Size-Height-35",
                        okText: "确 定",
                        okType: "button-red button-Size-Height-35"
                    }).then(function (res) {
                        if (res) {
                            if (scope.isCancel == true) {
                                scope.UserCancel();
                            } else {
                                WeixinJSBridge.call("closeWindow");
                            }
                        }
                    });
                    scope.$apply();
                }
            }
        }
    })

    /*
     退出微信浏览器
    */
    .directive('moCloseview', function ($ionicPopup) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', closeWeixin);

                function closeWeixin() {
                    if (scope.isBackUp) {
                        history.back();
                    } else {
                        var confirmPopup = $ionicPopup.confirm({
                            title: '提示',
                            template: '是否关闭！'
                        }).then(function (res) {
                            if (res) {
                                WeixinJSBridge.call("closeWindow");
                            }
                        });
                        scope.$apply();
                    }
                }
            }
        }
    })
    /*
    重置  不包含子对象和数组
    */
    .directive('moReset', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', onReset);

                function onReset() {
                    if (attrs.moReset == null || attrs.moReset == "") {
                        return;
                    }
                    var strArry = attrs.moReset.split('.');
                    var entity = scope;
                    angular.forEach(strArry, function (value, key) {
                        if (value != "" && value != null) {
                            entity = entity[value];
                        }
                    })

                    angular.forEach(entity, function (data, index, array) {
                        if (getDataType(array[index]) == 'type' || angular.isUndefined(array[index])) {
                            array[index] = null;
                        } else if (angular.isObject(array[index])) {
                            array[index] = null;
                        } else if (angular.isArray(array[index])) {
                            array[index] = [];
                        }
                    });
                    if (scope.isResetBackFun) {
                        scope.ResetBackFun();
                    }
                    scope.$apply();
                }
            }
        }
    })
    /*
    重置  包含子对象和数组
    */
    .directive('moResetall', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('click', onReset);

                function onReset() {
                    if (attrs.moResetall == null || attrs.moResetall == "") {
                        return;
                    }
                    var strArry = attrs.moResetall.split('.');
                    var entity = scope;
                    angular.forEach(strArry, function (value, key) {
                        if (value != "" && value != null) {
                            entity = entity[value];
                        }
                    });
                    angular.forEach(entity, function (data, index, array) {

                        if (getDataType(array[index]) == 'type' || angular.isUndefined(array[index])) {
                            array[index] = null;
                        } else if (angular.isArray(array[index])) {
                            array[index] = [];
                        } else if (angular.isObject(array[index])) {
                            childReset(array[index]);
                        }
                    });
                    if (scope.isResetBackFun) { //重置后 设置默认值
                        scope.ResetBackFun();
                    }
                    scope.$apply();
                }

                if (scope.isResetBackFun) {
                    scope.ResetBackFun();
                }
                var childReset = function (obj) {
                    angular.forEach(obj, function (data, index, array) {
                        if (getDataType(array[index]) == 'type' || angular.isUndefined(array[index])) {
                            if (array[index] == true) {
                                array[index] = false;
                            } else {
                                array[index] = "";
                            }
                        } else if (angular.isArray(array[index])) {
                            array[index] = [];
                        } else if (angular.isObject(array[index])) {
                            childReset(array[index]);
                        }
                    });
                }
            }
        }
    })
    /*
    验证身份证
    */
    .directive('moIdcard', function () {
        return {
            require: "ngModel",
            link: function (scope, element, attr, ngModel) {

                var customValidator = function (value) {
                    var validity = true;
                    if (value == null || value == "") {
                        scope.IdNoMsg = "身份证号码不能为空！";
                        validity = false;
                    } else {
                        validity = IdCardValidate(value);
                        if (!validity) {
                            scope.model.ToastMessage = "身份证号码输入错误";
                            scope.IdNoMsg = "身份证号码输入错误！";
                        }
                    }

                    ngModel.$setValidity("moIdcard", validity);
                    return validity ? value : undefined;
                };
                ngModel.$formatters.push(customValidator);
                ngModel.$parsers.push(customValidator);
            }
        };
    })
    /*
    验证手机
    */
    .directive('moPhone', function () {
        return {
            require: "ngModel",
            link: function (scope, element, attr, ngModel) {
                if (ngModel) {
                    var emailsRegexp = /^(?:1\d\d)\d{8}$/i;

                }

                var customValidator = function (value) {

                    var name = $(element).attr('name')

                    var validity = ngModel.$isEmpty(value) || emailsRegexp.test(value);
                    if (value == null || value == "") {

                        scope.mobileMsg = "手机号码不能为空";
                        validity = false;
                    } else {
                        if (!validity) {
                            scope.mobileMsg = "手机号码输入错误";
                        }
                    }
                    ngModel.$setValidity("moPhone", validity);
                    return validity ? value : undefined;
                };
                ngModel.$formatters.push(customValidator);
                ngModel.$parsers.push(customValidator);
            }
        };
    })

    /*
    邮箱验证
    */
    .directive('moEmail', function () {
        return {
            require: "ngModel",
            link: function (scope, element, attr, ngModel) {
                if (ngModel) {
                    var emailsRegexp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i;

                }

                var customValidator = function (value) {

                    var name = $(element).attr('name')

                    var validity = ngModel.$isEmpty(value) || emailsRegexp.test(value);
                    if (value == null || value == "") {
                        scope.emailMsg = "邮箱不能为空";
                        validity = false;
                    } else {
                        if (!validity) {
                            scope.emailMsg = "邮箱输入错误";
                        }
                    }
                    ngModel.$setValidity("moEmail", validity);
                    return validity ? value : undefined;
                };
                ngModel.$formatters.push(customValidator);
                ngModel.$parsers.push(customValidator);
            }
        };
    })


    .directive('moDate', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                var opt = {}
                opt.date = { preset: 'date' };
                opt.datetime = { preset: 'datetime', minDate: new Date(2010, 3, 10), maxDate: new Date(2050, 7, 30), stepMinute: 5 };
                opt.time = { preset: 'time' };
                opt.tree_list = { preset: 'list', labels: ['Region', 'Country', 'City'] };
                opt.image_text = { preset: 'list', labels: ['Cars'] };
                opt.select = { preset: 'select' };


                var parameters = {
                    theme: 'android-ics light', mode: 'scroller', display: 'bottom', lang: 'ch'
                }
                if (!angular.isUndefined(scope.moDateparameter)) {
                    if (typeof scope.moDateparameter.onSelect == 'function') {
                        parameters.onSelect = scope.moDateparameter.onSelect;
                    }
                    if (!angular.isUndefined(scope.moDateparameter.minDate)) {
                        opt.date.minDate = scope.moDateparameter.minDate;
                        opt.datetime.minDate = scope.moDateparameter.minDate;
                    }
                    if (!angular.isUndefined(scope.moDateparameter.maxDate)) {
                        opt.date.maxDate = scope.moDateparameter.maxDate;
                        opt.datetime.maxDate = scope.moDateparameter.maxDate;
                    }
                }

                $(element).val('').scroller('destroy').scroller($.extend(opt[attrs.moDate], parameters))

                //  scope.$apply();

            },
            scope: {
                moDateparameter: "="
            }
        }
    })
    .directive('moBar', function () {
        return {
            restrict: 'E',
            scope: {
                href: "@", //跳转路径
                isedit: "@"
            },
            transclude: false,
            template: '<div class="tabs tabs-icon-top">' +
                ' <a class="tab-item" href="{{href}}">' +
                ' <i class="icon ion-ios-redo"></i>' +
                ' 下一页' +
                ' </a>' +
                ' </div>',
        }
    })


    /*密码格式校验=数字和字母组成 暂时没用到*/
    .directive("pwdpatterncheck", [
        function () {
            return {
                restrict: 'A',
                require: "ngModel",
                link: function (scope, element, attrs, ctrl) {
                    var pattern = /^(?!\d+$)(?![A-Za-z]+$)[a-zA-Z0-9]{6,}$/;
                    var validator = function (value) {
                        var validity = true;
                        if (value.length < 6) {
                            scope.model.NewPwdMsg = "密码长度必须在6到20个字符之间！";
                            validity = false;
                        } else {
                            if (!pattern.test(value)) {
                                scope.model.NewPwdMsg = "密码须由数字和字母组成！";
                                validity = false;
                            }
                        }
                        ctrl.$setValidity("patterncheck", validity);
                        return validity ? value : undefined;
                    }
                    ctrl.$parsers.push(validator);
                }
            }
        }
    ])
    /*两次输入密码一致校验指令 */
    .directive("pwdcheck", [
        function () {
            return {
                restrict: 'A',
                require: "ngModel",
                link: function (scope, element, attrs, ctrl) {
                    if (ctrl) { /*ctrl:第二次输入*/
                        var firstInput = element.inheritedData("$formController")[attrs.pwdcheck];
                        var repeatValidator = function (value) {
                            var validity = value === firstInput.$viewValue;
                            ctrl.$setValidity("issamepassword", validity);
                            return validity ? value : undefined;
                        };
                        ctrl.$parsers.push(repeatValidator);
                        ctrl.$formatters.push(repeatValidator);
                        firstInput.$parsers.push(
                            function (value) {
                                ctrl.$setValidity("issamepassword", value === ctrl.$viewValue);
                                return value;
                            });
                    }
                }
            };
        }
    ])
    //是否禁用 表单
    .directive('moDisabledform', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                if (attrs.moDisabledform == "true") {
                    $(element).find("input").attr("disabled", attrs.moDisabledform);
                    $(element).find("input").css("backgroundColor", "white");
                    $(element).find("select").attr("disabled", attrs.moDisabledform);
                    //   $(element).find("select").touchstart = function (e) { alert(1);e.preventDefault(); };
                    $(element).find("select").bind("touchstart", function (e) { e.preventDefault(); });
                    $(element).find("select").css("backgroundColor", "white");
                    $(element).find("textarea").attr("disabled", attrs.moDisabledformue);
                    $(element).find("textarea").css("backgroundColor", "white");

                } else {
                    $(element).find("input").removeAttr("disabled");
                    $(element).find("input").removeAttr("style");
                    $(element).find("select").removeAttr("disabled");
                    $(element).find("select").unbind("touchstart");
                    $(element).find("select").removeAttr("style");
                    $(element).find("textarea").removeAttr("disabled");
                    $(element).find("textarea").removeAttr("style");
                }
            }
        }
    })
    .directive('ufoRadio', function () {
        return {
            restrict: "E",
            template: '<img ng-src="{{hasChecked?dagou:dagouweixuan}}"  style="{{ufoStyle}}" class="{{ufoClass}}" ng-click="imgClick()" />',
            link: function ($scope, element, attrs) {
                $scope.ufoStyle = attrs.ufoStyle;
                $scope.ufoClass = attrs.ufoClass;

                $scope.dagou = "img/dagou.png"
                $scope.dagouweixuan = "img/dagouweixuan.png"
               
                $scope.imgClick = function () {
                    $scope.hasChecked = !$scope.hasChecked;
                    if ($scope.hasArray == true) {
                        
                        if (attrs.hasMorecheck) {
                            $scope.arrayObj[$scope.index][attrs.field] = $scope.hasChecked;
                        } else {
                            angular.forEach($scope.arrayObj, function (item, index, array) {
                                if (index == $scope.index) {
                                    item[attrs.field] = true;
                                } else {
                                    item[attrs.field] = false;
                                }
                            });
                        } 
                    };
                    if (typeof $scope.ufoClick == 'function') {
                        $scope.ufoClick();
                    }
                }
            },
            scope: {
                hasChecked: "=", 
                hasArray: "=",
                arrayObj: "=",
                index: "@",
                ufoClick: "=",
                
            }
        }
    }).directive('ufoRadio2', function () {
        return {
            restrict: "E",
            template: '<i class="icon {{classText}} fontSize-1-5"  style="vertical-align:sub" ng-click="imgClick()"></i>',
            link: function ($scope, element, attrs) {
                console.log($scope.hasChecked);
                $scope.classText = "ion-ios-circle-outline fontColor-666666"
                var s = function () {
                    if (!$scope.hasChecked) {
                        $scope.classText = "ion-ios-circle-outline fontColor-666666";
                    } else {
                        $scope.classText = "ion-ios-checkmark fontColor-fb4747"
                    }
                }


                $scope.imgClick = function () {
                    $scope.hasChecked = !$scope.hasChecked;
                    s();
                }
                s();
              
            },
            scope: {
                hasChecked: "=", 
            }
        }
    }).directive('ufoImg', function () {
        return {
            restrict: "E",
            template: '<img ng-src="{{chose}}"   style="{{ufoStyle}}" class="{{ufoClass}}" ng-click="imgClick()" />',
            link: function ($scope, element, attrs) {
                $scope.chose = "img/mima.png";
                
                if (typeof $scope.ufoIntputtype == 'undefined' || $scope.ufoIntputtype == 'text' || $scope.ufoIntputtype == "" || $scope.ufoIntputtype == null) {
                    $scope.ufoIntputtype = "password";
                    $scope.chose = "img/mima.png"
                } else {
                    $scope.ufoIntputtype = "text";
                    $scope.chose = "img/mimakejian.png"
                }

                $scope.ufoStyle = attrs.ufoStyle;
                $scope.ufoClass = attrs.ufoClass;

                //$scope.chose = "img/mima.png"
                //$scope.unchose = "img/mimakejian.png"

                $scope.imgClick = function () {
                    if (typeof $scope.ufoIntputtype == 'undefined' || $scope.ufoIntputtype == 'text' || $scope.ufoIntputtype == "" || $scope.ufoIntputtype == null) {
                        $scope.ufoIntputtype = "password";
                        $scope.chose = "img/mima.png"
                    } else {
                        $scope.ufoIntputtype = "text";
                        $scope.chose = "img/mimakejian.png"
                    }
                    //$scope.hasChecked = !$scope.hasChecked; 
                    //$scope.ufoClick($scope.ufoNumber);
                }
            },
            scope: {
                ufoIntputtype: "=" 
            }
        }
    })
    .directive('ufoRate', function () {
        return {
            restrict: "E",
            template: '{{MoreSymbol}}{{integer}}<label style="{{ufoStyle}}">{{decimals}}%</label> ',
            link: function ($scope, element, attrs) {
                $scope.MoreSymbol = "";
                if ($scope.ufoContractagreement == '100000001') {
                    $scope.MoreSymbol = "≥";
                }
                $scope.ufoStyle = attrs.ufoStyle; 
                var arry = $scope.value.split('.'); 
                if (arry.length == 2) {
                    $scope.integer = arry[0];
                    $scope.decimals = '.' + arry[1]; 
                } else {
                    $scope.integer = arry[0];
                    //$scope.integer = attrs.ufoStyle;
                     $scope.decimals = '.00'; 
                }
            },
            scope: {
                value: "@",
                ufoContractagreement:"@"
            }
        }
    })
     .directive('ufoMondyformat', function () {
         return {
             restrict: "E",
             template: '{{busiTypeText}}',
             link: function ($scope, element, attrs) { 
                 $scope.busiTypeText = "";
                  
                 if ($scope.ufoBusitype == '100000002') { 
                     $scope.busiTypeText = "已申请续投";
                 } else if ($scope.ufoBusitype == '100000001') { 
                     $scope.busiTypeText = "回款成功";
                 } else if ($scope.ufoBusitype == '100000000' && $scope.ufoPaystatus == '100000001') { 
                     $scope.busiTypeText = "付款成功";
                 } else if ($scope.ufoBusitype == '100000000' && $scope.ufoPaystatus == '100000002') { 
                     $scope.busiTypeText = "划扣中";
                 } else if ($scope.ufoBusitype == '100000000' && $scope.ufoPaystatus == '100000000') {
                     $scope.busiTypeText = "交易失败";
                 };
             },
             scope: {
                 ufoBusitype: "@", 
                 ufoPaystatus: '@', 
             }
         }
     })
    .directive('ufoInfiniteScroll', function () {
        return {
            restrict: "E",
            templateUrl: "templates/directives/infiniteScroll.html",
            link: function ($scope, element, attrs) {
                $scope.loadMore = function () {
                    if (typeof $scope.ufoLoadmore == 'function') {
                        $scope.ufoLoadmore();
                    }
                }


            },
            scope: {
                pulling: "=",
                ufoLoadmore: "=",
                hasData:"@"
            }
        }
    })
    .directive('ufoReflistduedate', function () {
        return {
            restrict: "E",
            template: '<label class="fontSize-1">{{dataText}}</label> ',
            link: function ($scope, element, attrs) {
                $scope.dataText = "";


                if ($scope.ufoPontractagreement == '100000001') {
                    if ($scope.ufoStatus=='100000002') {
                        if ($scope.ufoDate == null || $scope.ufoDate == "") {
                            $scope.dataText = '实际到期为准';
                        } else {
                            $scope.dataText = $scope.ufoDate;
                        }
                    } else {
                        $scope.dataText = '随时申请退出 ';
                    }
                } else {
                    if ($scope.ufoDate == null || $scope.ufoDate == "") {
                        $scope.dataText = '实际到期为准';
                    } else {
                        $scope.dataText =  $scope.ufoDate;
                    }
                }
            },
            scope: {
                ufoDate: "=",
                ufoPontractagreement: "=",
                ufoStatus: "=", 
            }
        }
    })
    .directive('ufoDateformat', function () {
        return {
            restrict: "E",
            template: " {{dateText}}",
            link: function ($scope, element, attrs) {
               
                $scope.dateText = $scope.ufoDate;
                if ($scope.ufoDate == null || $scope.ufoDate == "") {
                    $scope.dateText = $scope.ufoDate;
                } else {
                    if ($scope.ufoFormat == "date") {
                        var a=$scope.ufoDate.split(' ');
                        $scope.dateText = a[0];
                    } else {
                        $scope.dateText = $scope.ufoDate;
                    }
                }
            },
            scope: {
                ufoDate: "=",
                ufoFormat: "@"
            }
        }
    })
    .directive('ufoDateformat2', function () {
        return {
            restrict: "E",
            template: " {{dateText}}",
            link: function ($scope, element, attrs) {
                $scope.dateText = "";
                if ($scope.ufoDate != "") {
                    $scope.dateText = $scope.ufoDate.substring(0, 4) + "-" + $scope.ufoDate.substring(4, 6) + "-" + $scope.ufoDate.substring(6, 8);
                }
            },
            scope: {
                ufoDate: "=",
            }
        }
    })
    .filter("checkData", function () {
        return function (input, querydata) {

            var out = [];
            angular.forEach(input, function (data, index, array) {
                var check = false;
                angular.forEach(querydata, function (d, i, a) {
                    if (angular.isUndefined(d)) {
                        check = true;
                    }
                    if (data[i].indexOf(d) > -1) {
                        check = true;
                    }
                });

                if (check) {
                    out.push(data);
                }
            });

            return out;
        }
    })
     .directive('ufoHeader', function () {
         return {
             restrict: "E",
             templateUrl: "templates/directives/Header.html",
             link: function ($scope, element, attrs) {
                  
             },
             scope: {
                 ufoTitle: "@", 
             }
         }
     });


angular.forEach(['x', 'y', 'x1', 'x2', 'y1', 'y2', 'width', 'height', 'transform'], function (name) {
    var ngName = 'ng' + name[0].toUpperCase() + name.slice(1);
    appDirective.directive(ngName, function () {
        return function (scope, element, attrs) {
            attrs.$observe(ngName, function (value) {
                attrs.$set(name, value);
            })
        };
    });
});


appDirective
        .directive('qkCursor', ["$ionicScrollDelegate", function ($ionicScrollDelegate) {
            var winWidth = window.innerWidth;

            var getPonit = function (left, pointWidth) {
                var lineIndex = Math.round(left / pointWidth);
                if (lineIndex == 0) lineIndex = 1;
                return lineIndex;
            }

            function pre_link($scope, element, attrs) {
                //point="500"
                //point-width="10"
                //height="60"
                //number-distance="1000"
                //锚点数量
                var point = $scope.point;

                //锚点间隔
                var pointWidth = $scope.pointWidth;
                //数据间隔差
                var numberDistance = $scope.numberDistance;
                //高度
                var height = $scope.height;

                var text = $scope.text / $scope.numberDistance;

                var catLeft = text * pointWidth;

                var scrollHandle = $ionicScrollDelegate.$getByHandle("cursorHandle");
                scrollHandle.scrollTo(catLeft, 0, false);


                $scope.svgStyle = {
                    "width": (point * pointWidth + winWidth) + "px",
                    "height": height
                }

                $scope.lineArr = [];
                $scope.textArr = [];
            
                for (var i = 0; i <= point+50; i++) {
                    if (i >= 50) {
                        var item = {
                        };
                        if (i <= point) {
                            item.x1 = i * pointWidth + 0.5 * winWidth + 1 - 0.5;
                            item.y1 = (i % 10 == 0) ? height - 20 : height - 10;
                            item.x2 = item.x1;
                            item.y2 = height;
                        }
                        item.isShow = true;

                        $scope.lineArr.push(item);

                        if (i % 10 == 0) {
                            $scope.textArr.push({
                                x: item.x1,
                                y: item.y1,
                                text: i * $scope.numberDistance,
                                translate: "translate(-{0},-10)".replace("{0}", ((i + "").length * 5) + "")
                            }
                            )
                        }
                    }
                }
                var lineIndex = getPonit(catLeft, pointWidth);
                
                $scope.lineArr[lineIndex].isShow = false;


            };

            function post_link($scope, element, attrs) {

                //锚点间隔
                var pointWidth = $scope.pointWidth;
                $scope.currentLine = {};
                var scrollHandle = $ionicScrollDelegate.$getByHandle("cursorHandle");

                var resetLineShow = function () {
                    angular.forEach($scope.lineArr, function (line) {
                        line.isShow = true;
                    });
                }

                $scope.onComplete = function () {
                    var left = scrollHandle.getScrollPosition().left;
                    var catLeft = getPonit(left, pointWidth) * pointWidth;

                    if (catLeft < 500) {
                        catLeft = 500;
                    }

                    var lineIndex = getPonit(left, pointWidth);
                    scrollHandle.scrollTo(catLeft, 0, false);

                    $scope.currentLine.isShow = false;
                }
                $scope.onDrag = function () {

                    resetLineShow();
                }
                $scope.onScroll = function () {

                    var left = scrollHandle.getScrollPosition().left;

                    var lineIndex = getPonit(left, pointWidth);
                    if (lineIndex < 50) {
                        lineIndex = 50;
                    }
                    
                    $scope.currentLine = $scope.lineArr[lineIndex];
                    $scope.$apply(function () {
                        $scope.text = lineIndex * $scope.numberDistance;
                    });

                }
                
                $scope.text = 0;
            };

            return {
                restrict: "E",
                templateUrl: "templates/directives/cursor.html",
                link: function ($scope, element, attrs) {
                    return {
                        pre: pre_link($scope, element, attrs),
                        post: post_link($scope, element, attrs)
                    }
                }
                    ,
                scope: {
                    point: "=",
                    pointWidth: "=",
                    height: "=",
                    text: "=",
                    numberDistance: "="
                }
            }
        }
        ]);

