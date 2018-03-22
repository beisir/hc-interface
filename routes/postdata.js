let con = require('../config/sqlconfig.js');
let router = require('express').Router();



router.post('/postdata', (req,res)=>{
	console.log(req.body);
	setTimeout(()=>{
		res.json({msg:'hello'})
	},5000);
})
module.exports = router;