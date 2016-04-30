var express = require('express');
var path=require("path");
var static = require('./static');
var app = express();

//以下两种方式均能实现缓存，第一种：HTTP自带缓存，第二种，NODE实现缓存
//app.use(express.static(path.join(__dirname)));
app.use(static({root:'.',maxAge:60}));
app.listen(3000);

app.get('/', function (req, res) {
   res.end("首页")
});