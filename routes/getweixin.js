let router = require('express').Router();

router.get('/getweixin', function (req,res,next){
	console.log(req.query);
	// var signature = req.query.signature,
	// 	timestamp = req.query.timestamp,
	// 	nonce = require.nonce;
	// var tmpArr = [timestamp,nonce];
	res.send({code:true});
})




module.exports = router;
