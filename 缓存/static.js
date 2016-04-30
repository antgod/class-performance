var path = require('path');
var mime = require('mime');
var fs = require('fs');

function serverStatic(options){
    options = options||{};
    options.root = path.resolve(options.root)+path.sep;

    function  sendFile(options,stat,req,res,file){
        var lastModified = req.headers['if-modified-since'];
        if(isNaN(lastModified)){             //如果是第一次访问文件，请求头没有带if-modified-since，返回200并且设置max-age
            res.setHeader('Cache-Control','max-age='+options.maxAge);
            res.setHeader('Last-Modified',stat.mtime.getTime());
            res.writeHead(200,{'Content-Type':mime.lookup(file)});
            fs.createReadStream(file).pipe(res);
        }else if(stat.mtime.getTime() == lastModified){    //如果请求头带if-modified-since，但是等于文件修改时间，返回304
            res.statusCode = 304;
            res.end('');
        }else if(stat.mtime.getTime() > lastModified){     //如果请求头带if-modified-since，但是晚于文件修改时间，返回200
            res.setHeader('Last-Modified',stat.mtime.getTime());
            res.writeHead(200,{'Content-Type':mime.lookup(file)});
            fs.createReadStream(file).pipe(res);
        }else {
            //不会出现这种情况，代码略
            //...
        }
    }

    return function(req,res){
        var file = req.url.slice(1);
        file = path.resolve(options.root,file);
        fs.stat(file,function(err,stat){
            if(stat.isDirectory()){
                res.end('this is a directory');
            }else{
                sendFile(options,stat,req,res,file);
            }
         })
    }
}




module.exports = serverStatic;