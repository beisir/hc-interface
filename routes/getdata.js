var con = require('../config/sqlconfig.js');
var router = require('express').Router();
router.get('/getdata', (req,res)=>{
    res.cookie('index','indexdbdbdb');
	con.query(`select * from imgsql order by id desc`,[], (err,data)=>{
        setTimeout(opt => {
			var sendParams = {
				code:0,
				msg:'success',
				datalist:data
			};
			if (!err) {
				if (req.query.callback) {
					res.send(`${req.query.callback}(${JSON.stringify(sendParams)})`);
				} else {
					res.json(sendParams);
				}
			}
        },1000)


		// console.log(data);
	})
});
module.exports = router;
