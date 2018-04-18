let router = require('express').Router();
let path = require('path');
let fs = require('fs');
let con = require('../config/sqlconfig.js');
let pageId = require('../util/UUID.js');
var ffmpeg=require('fluent-ffmpeg');//创建一个ffmpeg命令
var AipSpeechClient = require("baidu-aip-sdk").speech;
router.post('/vido', (req, res) => {
    let headers = req.headers,
		referer = headers.referer,
		reg = /(\S*):\/\//,
	    protocol = headers.referer.match(reg)[0];
    sendVido(req.files[0], protocol).then(function (vidoSrc){
        console.log(vidoSrc);
        var APP_ID = "11080604";
        var API_KEY = "Vh19GfvPyfV50dGwuPMtG7hS";
        var SECRET_KEY = "27c7eb9bd666b01df7ac9145d7411849";
        var client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);
        let voice = fs.readFileSync(`${global.dirname}/${vidoSrc}`);
        let voiceBuffer = new Buffer(voice);

        var command = ffmpeg(`${global.dirname}/${vidoSrc}`).
            save(`${global.dirname}/static/vido/aaaaaaaaaaa.pcm`).
            end('end', function (){
                console.log('successs');
            })
        // console.log(Object.keys(command));
        // command.addInput(`${global.dirname}/${vidoSrc}`)
        // .saveToFile(`${global.dirname}/static/vido.pcmn`)
        // .on('end', function(){
        //     console.log('successs');
        // })
        // .on('error', function(err){
        //     console.log(err)
        // })

        // client.recognize(voiceBuffer, 'mp3', 16000).then(function (result) {
        //     console.log('<recognize>: ' + JSON.stringify(result));
        //     console.log(result);
        //   // var data=[];
        //   // if(result.err_no===0){
        //   //   data=result.result;
        //   // }
        //   // res.json({
        //   //   ret: result.err_no,
        //   //   data: {
        //   //     data: data
        //   //   },
        //   //   msg: result.err_msg
        //   // });
        // }, function(err){
        //   console.log(err);
        // });

    }).catch(err => {
        console.log(err);
    });
});
function sendVido (fileData, protocol){
    return new Promise(function (resolve, reject){
        var	vidoPath = fileData.path,		// 存贮文件路径
            vidoExt = path.extname(fileData.originalname), // 获取上传文件后缀名;
            newPath = vidoPath + vidoExt,
            vidoName = fileData.filename + vidoExt,
            watermark = '../static/img/hcLogo.jpg';
            vidoName = 'static/vido/'+ vidoName;
        fs.rename(vidoPath, vidoName, function (err, result){
            if(!err){
                var openid = pageId.createUUID(),
                newUrl = protocol !== 'https://' ? `${global.httpPath}/${vidoName}`: `${global.httpsPath}/${vidoName}`;
                con.query('insert into vido(openid,src,title) values(?,?,?)', [openid , newUrl, fileData.originalname], function (orr,data){
                    console.log(vidoName)
                    !err && resolve(vidoName);
                })
            }else{
                reject(err);
            };
        });
    });
}



module.exports = router;
