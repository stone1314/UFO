/// <reference path="js/app.js" />
/// <reference path="lib/ionic/js/ionic.bundle.min.js" />
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



        'App': 'js/app',
        'routerConfig': 'js/appRouterConfig',
        'AppDirective': 'js/Directive/AppDirective',
        'AppFactory': 'js/Factory/AppFactory',
        'UsersFactory': 'js/Factory/UsersFactory',
        'HelpFactory': 'js/Factory/HelpFactory',
        'ProductsFactory': 'js/Factory/ProductsFactory'
        //'QkEntity1': 'QkEntity1',
        //'serversAdapter1': 'serversAdapter1',
        
        //'AppFactory': 'Factory/AppFactory.min',
    },
    /*！！！前端版本号,每次更新要修改版本号，以便每次更新内容都可以在前端及时体现！！！,切记！！！*/
    urlArgs: "v=1.0.2",
    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angularAMD': ['ionic'],
        'AppDirective': ['ionic'],
        'gToast': ['ionic'],
        'Cookies': ['ionic'],
        'routerConfig': ['ionic'],
        'AppFactory': ['ionic'],
        'ios9Uiwebview': ['ionic'],
        'UsersFactory': ['AppFactory'],
        'HelpFactory': ['AppFactory'],
        'ProductsFactory': ['AppFactory']
    },

    // kick start application
    deps: ['App']
});
