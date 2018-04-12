var AipSpeechClient = require("baidu-aip-sdk").speech;

// 设置APPID/AK/SK
var APP_ID = "11080604";
var API_KEY = "Vh19GfvPyfV50dGwuPMtG7hS";
var SECRET_KEY = "27c7eb9bd666b01df7ac9145d7411849";


var client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);
//
//
// var HttpClient = require("baidu-aip-sdk").HttpClient;
//
// // 设置request库的一些参数,例如代理服务地址,超时时间等
// // request参数请参考 https://github.com/request/request#requestoptions-callback
// HttpClient.setRequestOptions({timeout: 5000});
//
// // 也可以设置拦截每次请求（设置拦截后,调用的setRequestOptions设置的参数将不生效）,
// // 可以按需修改request参数（无论是否修改,必须返回函数调用参数）
// // request参数请参考 https://github.com/request/request#requestoptions-callback
// HttpClient.setRequestInterceptor(function(requestOptions) {
//     // 查看参数
//     console.log(requestOptions)
//     // 修改参数
//     requestOptions.timeout = 5000;
//     // 返回参数
//     return requestOptions;
// });



// let fs = require('fs');
// let voice = fs.readFileSync('assets/voice/16k_test.pcm');
//
// let voiceBuffer = new Buffer(voice);
// // 识别本地文件
// client.recognize(voiceBuffer, 'pcm', 16000).then(function (result) {
//     console.log('<recognize>: ' + JSON.stringify(result));
// }, function(err) {
//     console.log(err);
// });


client.recognizeByUrl('wxfile://tmp_51fcb51c695ee613343ee2c3a3325cf7ed88afcf7f278e57.mp3', 'http://10.158.33.180', 'pcm', 16000).then(function(result) {
    console.log('<recognizeByUrl>: ' + JSON.stringify(result));
}, function(err) {
    console.log(err);
});


// 识别本地语音文件
// client.recognize(voiceBuffer, format, rate, {lan: 'ct', cuid: Math.random(), ptc: 1});
// 识别远程语音文件,结果回调到指定服务器
// client/**/.recognizeByUrl(url, callback, format, rate, {});
