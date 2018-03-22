let router = require('express').Router();
let path = require('path');
let fs = require('fs');
let con = require('../config/sqlconfig.js');
let pageId = require('../util/UUID.js');
var	protocol,resultArr=[];

router.post('/imgupload' ,function (req,res,next){
	let headers = req.headers,
		referer = headers.referer,
		reg = /(\S*):\/\//;
	resultArr = [];
	protocol = headers.referer.match(reg)[0];
	var resultList = req.files.map(function (fileData){
		resultArr.push(sendImgs(fileData));
	});
    console.log(req.files);
	Promise.all(resultArr).then(function (optionsList){
		res.send({
			'errno':0,
			'msg':'success 上传成功',
			'url': optionsList
		})
	}).catch(function (err){
		res.send({
			'errno':1,
			'msg':'error上传失败',
			'url': []
		})
	});
});


function sendImgs(fileData){
	var promise = new Promise(function (resolve,reject){
		var	imgPath = fileData.path,		// 存贮文件路径
			imgExt = path.extname(fileData.originalname), // 获取上传文件后缀名;
		    newPath = imgPath + imgExt,
		    imgName = fileData.filename + imgExt,
		    watermark = '../static/img/hcLogo.jpg';
			imgName = 'static/img/'+ imgName;
		fs.rename(imgPath,newPath,function (err,result){
			var openid = pageId.createUUID(),
				newUrl = protocol !== 'https://' ? `${global.httpPath}/${imgName}`: `${global.httpsPath}/${imgName}`;
			if(!err){
				con.query('insert into imgsql(openid,src,title) values(?,?,?)', [openid , newUrl, fileData.originalname], function (orr,data){
				    !err && resolve(newUrl);
				})
			}else{
				reject('error');
			};
		});
	});
	return promise;
}


module.exports = router;
