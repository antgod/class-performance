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

app.use(function * () {
    if(~this.url.indexOf('favicon.ico')){
        this.body="";
        return;
    }

    let url = this.query.url;
    let body=yield promise(url);

    let scriptHtml= fs.readFileSync('./timing.js');
    let script=`<script>${scriptHtml}</script>`;

    this.body=`${body}${script}`;
});

app.listen(3000);

