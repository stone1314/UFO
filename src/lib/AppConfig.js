﻿/*描述：此文件主要记录前端定义的一些常量，这样集中起来，方便后续维护
        定义的内容主要有：正则表达式，可以配置的常量等..
        
*/
/*后端Host地址*/
var u = navigator.userAgent;
//var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var RestWebHost = {
    //Host: 'http://172.29.250.88/'
    
    //Host: 'http://ufo2.tunnel.qydev.com/'
    //Host: 'https://sit-ufo-desk.quarkfinance.com/'        //sit
    //HostSIT: 'https://ufo-desk.quarkfinance.com/'           //sit
    //Host: 'https://ufo-desk.quarkfinance.com/',             //2.0 dev   
    Host: 'https://sit-ufov2-desk.quarkfinance.com/'      //2.0 sit https://sit-ufov2-desk.quarkfinance.com/
    //Host: 'https://sit-ufov2-desk.quarkfinance.com/'      //2.0 uat
    
};
/*是否允许前端只在微信端访问
 *OPEN:是  CLOSE:否        */
var WxSwitch = {
    IsSwitch: "CLOSE"
};