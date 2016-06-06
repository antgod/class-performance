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

let host;
app.use(function * () {
    let url=this.query.url;

    if(url&&~url.indexOf('http')){
        host=url;
    }else{
        url=host+this.url;
    }

    let body=yield promise(url);

    let scriptHtml= fs.readFileSync('./timing.js');
    let script=`<script>${scriptHtml}</script>`;

    this.body=`${body}${script}`;
});

app.listen(3000);

