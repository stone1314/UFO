/**
 * Created by ZhipingShan on 2017/2/24.
 */
var v = new Date().getTime();


module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);
    var config = {
        app: 'src',
        dist: 'dist',
        build: 'build',
        ext: v
    }
    grunt.initConfig({
        config: config,
        copy: {
            base: {
                expand: true,
                cwd: '<%=config.app%>',
                src: ['*'],
                dest: "<%=config.dist%>"
            },
            // css:{
            //     expand:true,
            //     cwd:'<%=config.app%>/css',
            //     src:"qufo.min.css",
            //     dest:"<%=config.dist%>/css"
            // },
            // img:{
            //     expand:true,
            //     cwd:'<%=config.app%>/img/',
            //     src:"**/*",
            //     dest:"<%=config.dist%>/img/"
            // },
            // js:{
            //     expand:true,
            //     cwd:'<%=config.app%>/js/',
            //     src:"**/*.js",
            //     dest:"<%=config.dist%>/js/",
            //     ext:'<%=config.ext%>.js',
            //     extDot:'last'
            // }
            js: {
                expand: true,
                cwd: '<%=config.app%>/js/',
                src: "*.js",
                dest: "<%=config.dist%>/js/",
                ext: '<%=config.ext%>.js',
                extDot: 'last'
            },
            // js_Directive:{
            //     expand:true,
            //     cwd:'<%=config.app%>/js/Directive/',
            //     src:"**/*.js",
            //     dest:"<%=config.dist%>/js/Directive",
            //     ext:'<%=config.ext%>.js',
            //     extDot:'last'
            // },
            // js_Directive:{
            //     expand:true,
            //     cwd:'<%=config.app%>/js/Factory/',
            //     src:"**/*.js",
            //     dest:"<%=config.dist%>/js/Factory",
            //     ext:'<%=config.ext%>.js',
            //     extDot:'last'
            // },
            js_json: {
                expand: true,
                cwd: '<%=config.app%>/js/',
                src: "**/*.json",
                dest: "<%=config.dist%>/js/"
            },
            lib: {
                expand: true,
                cwd: '<%=config.app%>/lib/',
                src: "**/*",
                dest: "<%=config.dist%>/lib/"
            },
            templates: {
                expand: true,
                cwd: '<%=config.app%>/templates/',
                src: "**/*",
                dest: "<%=config.dist%>/templates/"
            },
            UFO_files: {
                expand: true,
                cwd: '<%=config.app%>/UFO_files/',
                src: "**/*",
                dest: "<%=config.dist%>/UFO_files/"
            },
            // view_js:{
            //     expand:true,
            //     cwd:'<%=config.app%>/view/',
            //     src:"**/*.js",
            //     dest:"<%=config.dist%>/view/",
            //     ext:'<%=config.ext%>.js',
            //     extDot:'last'
            // },
            view_html: {
                expand: true,
                cwd: '<%=config.app%>/view/',
                src: "**/*.html",
                dest: "<%=config.dist%>/view/",
                ext: '<%=config.ext%>.html',
                extDot: 'last'
            },
            view_ufo_files: {
                expand: true,
                cwd: '<%=config.app%>/UFO_files/',
                src: "**/*",
                dest: "<%=config.dist%>/UFO_files/",
            }

        },
        concat: {
            options: {
            },
            dist: {
                src: ['<%=config.app%>/js/Factory/**/*.js', '<%=config.app%>/js/Directive/**/*.js'],//src文件夹下包括子文件夹下的所有文件
                dest: '<%=config.dist%>/js/Factory/built.js'//合并文件在dist下名为built.js的文件
            },
            dist_css: {
                src: ['<%=config.app%>/css/**/*.css'],
                dest: '<%=config.dist%>/css/all<%=config.ext%>.min.css'
            }
        },
        cssmin: { //css文件压缩
            css: {
                src: ['<%=config.dist%>/css/all<%=config.ext%>.min.css'],//将之前的all.css
                dest: '<%=config.dist%>/css/all<%=config.ext%>.min.css'  //压缩
            }
        },
        uglify: {
            build: {
                src: '<%=config.dist%>/js/Factory/built.js',//压缩源文件是之前合并的buildt.js文件
                dest: '<%=config.dist%>/js/Factory/built<%=config.ext%>.js'//压缩文件为built.min.js
            },
            view_js: {
                expand: true,
                cwd: '<%=config.app%>/view/',
                src: "**/*.js",
                dest: "<%=config.dist%>/view/",
                ext: '<%=config.ext%>.js',
                extDot: 'last'
            }
        },
        imagemin: {
            /* 压缩图片大小 */
            dist: {
                options: {
                    optimizationLevel: 3 //定义 PNG 图片优化水平
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%=config.app%>/img/',
                        src: ['**/*.{png,jpg,jpeg,gif}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
                        dest: '<%=config.dist%>/img/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
                    }
                ]
            }
        },
        htmlmin: {
            options: {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: false,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true
            },
            html: {
                files: [
                    { expand: true, cwd: 'dist/view', src: ['**/*.html'], dest: 'dist/view' }
                ]
            }
        },
        replace: {
            example: {
                src: '<%=config.dist%>/js/appConfig.json',
                dest: '<%=config.dist%>/js/appConfig.json',
                replacements: [{
                    from: '@v',                   // string replacement
                    to: '<%=config.ext%>'
                }]
            }
        },
        clean: {
            dist: {
                src: "<%=config.dist%>"
            }
        }
    });
    //
    grunt.registerTask('default', ['clean', 'copy', 'concat', 'cssmin', 'uglify', 'htmlmin', 'replace', 'imagemin']);
}