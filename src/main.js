/// <reference path="js/app.js" />
/// <reference path="lib/ionic/js/ionic.bundle.min.js" />
require.config({

    baseUrl: "",

    // alias libraries paths
    paths: {
        'AppConfig':'lib/AppConfig',
        'ionic': 'lib/ionic/js/ionic.bundle.min',
        'angularAMD': 'lib/angularAMD',
        'Cookies': 'lib/angular-cookies',
        'Jweixin': 'lib/jweixin-1.0.0',
        'mobiscroll': 'lib/mobiscroll.custom-2.5.0.min',
        'gToast': 'lib/gToast',
        'DataValidate': 'lib/DataValidate',
        'MD5': 'lib/md5',


        'App': 'js/app',
        'AppDirective': 'js/Directive/AppDirective',
        'AppFactory': 'js/Factory/AppFactory',
        'UsersFactory': 'js/Factory/UsersFactory',
        'HelpFactory': 'js/Factory/HelpFactory',
        'ProductsFactory': 'js/Factory/ProductsFactory'
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
        'angularAMD': ['AppConfig','ionic'],
        'AppDirective': ['AppConfig','ionic'],
        'gToast': ['AppConfig','ionic'],
        'Cookies': ['AppConfig','ionic'],
        'AppFactory': ['AppConfig','ionic'],
        'ios9Uiwebview': ['AppConfig','ionic'],
        'UsersFactory': ['AppConfig','AppFactory'],
        'HelpFactory': ['AppConfig','AppFactory'],
        'ProductsFactory': ['AppConfig','AppFactory']
    },

    // kick start application
    deps: ['App', 'css!../css/qufo.min']
});
