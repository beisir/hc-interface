let router = require('express').Router();
let fs = require('fs');
router.get('/*',function (request, response, next){
    // console.log(request.url)
	var serverString = request.url.split('/')[1];
	// fs.readFile(`${__dirname}/json/${serverString}.json`,'utf8', (err, data)=>{
	// 	!err && response.jsonp(data);
	// });
    console.log(request.url)
    fs.readFile(`${__dirname}/json/${serverString}.html`,'utf8', (err, data)=>{
		!err && response.jsonp('('+JSON.stringify({html: data})+')');
	});
    // next();
});

module.exports = router;
