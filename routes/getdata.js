var con = require('../config/sqlconfig.js');
var router = require('express').Router();
router.get('/getdata', (req,res)=>{
    res.cookie('index','indexdbdbdb');
	con.query(`select * from imgsql order by id desc`,[], (err,data)=>{
        setTimeout(opt => {
            !err && res.json({
    			code:0,
    			msg:'success',
    			datalist:data
    		});
        },5000)


		// console.log(data);
	})
});
module.exports = router;
