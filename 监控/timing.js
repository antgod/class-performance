'use strict';

const calc=()=>{
    //for(let key in Timing){
    //    if(TimingEnmu[key]){
    //        console.log(TimingEnmu[key],Timing[key]);
    //    }
    //}

    let {redirectStart,redirectEnd,domainLookupStart,domainLookupEnd,connectStart,connectEnd,
        requestStart,responseStart,responseEnd,domInteractive,domLoading,
        domContentLoadedEventEnd,domContentLoadedEventStart,domComplete,
        loadEventEnd,loadEventStart}= Timing;
    console.log('跳转时间',redirectEnd-redirectStart);
    console.log('域名查询时间',domainLookupEnd-domainLookupStart);
    console.log('三次握手/建立连接与发送请求时间',connectEnd-connectStart);
    console.log('请求/返回时间',responseStart-requestStart);
    console.log('下载时间',responseEnd-responseStart);
    console.log('dom解析时间',domInteractive-domLoading);
    console.log('内嵌资源加载时间',domComplete-domInteractive);
    console.log('脚本执行时间',domContentLoadedEventEnd-domContentLoadedEventStart);
    //console.log('onload回调函数执行时间',loadEventEnd-loadEventStart);
};
window.onload=()=>calc();

let Timing = performance.timing;

let TimingEnmu = {
    //跳转时间
    redirectStart             : "跳转开始时的时间。",
    redirectEnd               : "跳转结束时时间。",
    //缓存时间
    fetchStart                : "返回浏览器准备使用HTTP请求读取文档时的时间。该事件在网页查询本地缓存之前发生",
    //域名查询时间:如果是静态(304),返回fetchStart
    domainLookupStart         : "返回域名查询开始时的时间。",
    domainLookupEnd           : "返回域名查询结束时的时间。",
    //建立连接与发送请求时间:如果是静态(304),返回fetchStart
    connectStart              : "返回HTTP请求开始向服务器发送时的时间",
    connectEnd                : "连接建立指的是所有握手和认证过程全部结束",

    //返回浏览器与服务器安全连接握手时间
    secureConnectionStart     : "返回浏览器与服务器开始安全链接的握手时的时间。",

    //下载时间
    requestStart              : "返回浏览器向服务器发出HTTP请求时时间",
    responseStart             : "返回浏览器从服务器收到第一个字节时的时间",
    responseEnd               : "返回浏览器从服务器收到最后一个字节时（如果在此之前HTTP连接已经关闭，则返回关闭时）的时间",

    //dom渲染时间
    domLoading                : "返回当前网页DOM结构开始解析时的时间",
    domInteractive            : "返回当前网页DOM结构结束解析、开始加载内嵌资源时间",
    domContentLoadedEventStart: "返回当前网页DOMContentLoaded事件发生时（即DOM结构解析完毕、所有脚本开始运行时）的时间",
    domContentLoadedEventEnd  : "返回当前网页所有需要执行的脚本执行完成时的时间",
    domComplete               : "返回当前网页DOM结构生成时的时间",

    //
    loadEventStart            : "返回当前网页load事件的回调函数开始时的时间。",
    loadEventEnd              : "返回当前网页load事件的回调函数运行结束时的时间。"
};

//uninitialized - 还未开始载入
//loading - 载入中
//interactive - 已加载，文档与用户可以开始交互
//complete - 载入完成
//当document文档正在加载时,返回"loading",当文档结束渲染但在加载内嵌资源时,返回"interactive",当文档加载完成时,返回"complete".
