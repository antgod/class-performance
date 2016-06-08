"use strict";

let fs=require('fs');
let koa = require('koa');
let request = require('request');
let app = koa();

let promise=(url)=>{
    return new Promise((resolve,reject)=>{
        if(url){
            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(body)
                }
            })
        }else{
            resolve('');
        }
    })
};


let formatUrl=(body,host)=>{
    var reg=/(?:href|src)=\"([^\"]*)\"/g;
    return body.replace(reg,function(i,l){
        if(~l.indexOf('http')){
            return i;
        }
        return i.replace(l,host+l);
    });
};


app.use(function * () {
    let url=this.query.url,host;

    if(url&&~url.indexOf('http')){
        host=url;
    }

    let body=yield promise(url);

    body=formatUrl(body,host);

    let scriptHtml= fs.readFileSync('./timing.js');
    let script=`<script>${scriptHtml}</script>`;

    this.body=`${body}${script}`;
});

app.listen(3000);

