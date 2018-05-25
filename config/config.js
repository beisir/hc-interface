let express = require('express');
let ejs = require('ejs');
let cookieParser = require('cookie-parser');
let multer = require('multer');
let cluster = require('cluster');
let bodyParser = require('body-parser');
let fs = require('fs');
let Getjson = require('../routes/Getjson.js');
let Getjsonp = require('../routes/Getjsonp.js');
let getdata = require('../routes/getdata.js');
let postdata = require('../routes/postdata.js');
let upload = require('../routes/upload.js');
let getweixin = require('../routes/getweixin.js');
let axiosData = require('../routes/axiosData.js');
let baidu_aip_sdk = require('../routes/aip_sdk.js');

let decphone = require('../routes/decphone.js');

let WebSocket = require('ws');

let socket = require('../socket/index.js');
module.exports = function (app, server){
	app.all('*',(req, res, next) => {
        // console.log(req.headers.origin)
	    res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Access-Control-Allow-Origin");
        res.header('Access-Control-Allow-Mothods', "PUT, POST, GET, DELETE, OPTIONS");
        res.header('Access-Control-Allow-Credentials', 'true');
        // res.header('Access-Control-Allow-Origin', 'http://localhost:63342');
        // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        // res.header('Access-Control-Allow-Headers', 'Content-Type');
        // res.header('Access-Control-Allow-Credentials','true');
    	next();
	});
	app.use(cookieParser('hello'));  	// 设置加密
	app.set("viewengine",'ejs');//设置渲染引擎
	app.set('views',__dirname+'/views')	//设置模板目录为当前index.js目录同级views目录下的模板
	// app.use();
	app.use('/static',express.static('./static'))
	app.use(bodyParser.urlencoded({extended:false}));
	app.use('/',function (req,res,next){
		req.secret = 'hello';
		res.cookie('name','bei',{path:'/api',maxAge:10*24*60*60*1000,signed:true});
		next();
	});

    app.use('/Getserver', getdata);
	app.use('/Weixinserver', getweixin);
	app.use('/Postserver', postdata);
    app.use('/json', Getjson);
	app.use('/jsonp', Getjsonp);

    app.use('/upload', multer({ dest:'./static/img' }).any(), upload);
    app.use('/baiduAip',multer({ dest:'./static/vido' }).any(), baidu_aip_sdk);
    var wss = new WebSocket.Server({server});
    require('../socket/index.js')(wss);
	app.use('/socket', socket);
    app.use('/axiosData', axiosData);

    app.use('/wechat', decphone);


}
