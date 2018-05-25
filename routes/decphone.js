let router = require('express').Router();
let xcxPhone = require('../wechat/xcx-phone/index.js')



router.post('/decphone', function (req, res){
    console.log(req.body)
    if (req.body.encryptedData !== ''){
        res.json(xcxPhone(req.body));
    } else {
        res.json({
            'err': 'fail'
        })
    };
})


module.exports = router;
