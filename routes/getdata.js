var con = require('../config/sqlconfig.js');
var router = require('express').Router();

router.get('/getdata', (req,res)=>{
	console.log(req.query)
	con.query(`select * from imgsql order by id desc`,[], (err,data)=>{
		!err && res.json({
			code:0,
			msg:'success',
			datalist:data
		});	
		// console.log(data);
	})
})


module.exports = router;