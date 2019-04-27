var express = require("express");
var bodyParser = require("body-parser");
var art = require("express-art-template");
var router = require("./router");
var multer =require("multer");

var server = express();
server.listen(8888);

//配置文件
server.engine("html", art);
server.use(bodyParser.urlencoded({
	extended: false
}));
server.use(multer({dest:"./"}).any());//dest表示上传去的地址 .any表示任何都接受  .single表示只接受前端name为single括号里面值得数据

//静态开放文件夹，存了css，js，image和lib引入包等文件
server.use("/public/", express.static("./public"));

//引用路由模块
server.use(router);

//错误地址
server.use(function(req, res) {
	res.render("error.html");
});