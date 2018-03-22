let router = require('express').Router();
let fs = require('fs');
router.get('/Getjsonp', function (request, response, next){
	let callback = request.query.callback,
        name = request.query.name;
    console.log(`${__dirname}/json/${name}.json`);
    fs.readFile(`${__dirname}/json/${name}.json`,'utf8', (err, data)=>{
		!err && response.send(`${callback}(${data})`);
	});
})


module.exports = router;
