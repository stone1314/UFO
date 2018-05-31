({
    // app顶级目录，非必选项。如果指定值，baseUrl则会以此为相对路径,会对整个目录文件进行处理
    appDir: "./",
    // 模块根目录。默认情况下所有模块资源都相对此目录。
    // 若该值未指定，模块则相对build文件所在目录。
    // 若appDir值已指定，模块根目录baseUrl则相对appDir。
    baseUrl: ".",
    // 指定输出目录，若值未指定，则相对 build 文件所在目录
    dir: "./www",
    //// alias libraries paths
    //// 在 RequireJS 2.0.2 中，输出目录的所有资源会在 build 前被删除
    //// 值为 true 时 rebuild 更快，但某些特殊情景下可能会出现无法预料的异常
    //keepBuildDir: false,
    // CSS 优化方式，目前支持以下几种：
    // none: 不压缩，仅合并
    // standard: 标准压缩，移除注释、换行，以及可能导致 IE 解析出错的代码
    // standard.keepLines: 除标准压缩外，保留换行
    // standard.keepComments: 除标准压缩外，保留注释 (r.js 1.0.8+)
    // standard.keepComments.keepLines: 除标准压缩外，保留注释和换行 (r.js 1.0.8+)
    optimizeCss: "standard",
    //以【./r】开头的文件不做处理
    fileExclusionRegExp: /^(\.|r.js)/,
    // JS 文件优化方式，目前支持以下几种：
    //   uglify: （默认） 使用 UglifyJS 来压缩代码
    //   closure: 使用 Google's Closure Compiler 的简单优化模式
    //   closure.keepLines: 使用 closure，但保持换行
    //   none: 不压缩代码
    optimize: "uglify",
    // 使用 UglifyJS 时的可配置参数
    // See https://github.com/mishoo/UglifyJS for the possible values.
    uglify: {
        mangle: false //false 不混淆变量名,默认 true,混淆
    },
    //mainConfigFile:'js/main.js',
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
        'ios9Uiwebview': 'lib/angular-ios9-uiwebview.patch',

        'App': 'js/app',
        'AppDirective': 'js/Directive/AppDirective',
        'AppFactory': 'js/Factory/AppFactory',
        'UsersFactory': 'js/Factory/UsersFactory',
        'HelpFactory': 'js/Factory/HelpFactory',
        'ProductsFactory': 'js/Factory/ProductsFactory'
    },
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
    modules: [
        {
            name: 'main',
            include: [
                'js/app',
                'lib/css.min'
            ],
            exclude:[
            ]
        }
    ]
})
