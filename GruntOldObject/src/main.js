/// <reference path="js/app.js" />
/// <reference path="lib/ionic/js/ionic.bundle.min.js" />
var fileExt="";
$.ajaxSettings.async = false; //设置getJson同步
var myDate = new Date();
$.getJSON("js/appConfig.json?v="+myDate.getMilliseconds(), function(data){

    fileExt= data.versions;
    console.log(fileExt+"--------------------------------");
});
$.ajaxSettings.async = true; //设置getJson同步




require.config({

    baseUrl: "",

    // alias libraries paths
    paths: {
        'ionic': 'lib/ionic/js/ionic.bundle.min',
        'angularAMD': 'lib/angularAMD',
        //
        'Cookies': 'lib/angular-cookies',
        //'jquery': 'jquery-1.10.2',
        'Jweixin': 'lib/jweixin-1.0.0',
        'mobiscroll': 'lib/mobiscroll.custom-2.5.0.min',
        'gToast': 'lib/gToast',
        'DataValidate': 'lib/DataValidate',
        'MD5': 'lib/md5',
        'ios9Uiwebview': 'lib/angular-ios9-uiwebview.patch',



        'App': 'js/app'+fileExt,
        'built': 'js/Factory/built'+fileExt
        //'QkEntity1': 'QkEntity1',
        //'serversAdapter1': 'serversAdapter1',
        
        //'AppFactory': 'Factory/AppFactory.min',
    },
    map: {
        '*': {
            'css': 'lib/css.min'
        }
    },
    /*！！！前端版本号,每次更新要修改版本号，以便每次更新内容都可以在前端及时体现！！！,切记！！！*/
    urlArgs: "v=1.0.2",
    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angularAMD': ['ionic'],
        'built': ['ionic'],
        'gToast': ['ionic'],
        'Cookies': ['ionic'],
        'ios9Uiwebview': ['ionic'],
        'App': ['built','ionic']
    },

    // kick start application
    // kick start application
    deps: ['App', 'css!../css/all'+fileExt+'.min']
});
