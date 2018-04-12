let router = require('express').Router();
let axios = require('axios');



router.get('/indexData',function (requrest, response, next){
    async function getData(){
      let data1 = await axios.get('/Getserver/getdata');

      console.log(12312312312);

      let data2 = await axios.get('https://wsdetail.b2b.hc360.com/mysite/anfang01');
      return {
          a: data1.data,
          b: data2.data
      }
    }

    getData().then(function (options){
        response.json(options)

    });


});

module.exports = router;





























































// router.get('/axios', function (req,res,next){
//     async function AxiosData (){
//         let data = await axios.get('/Getserver/getdata');
//         let data2 = await axios.get('/Getserver/getdata');
//         let data3 = await axios.get('/Getserver/getdata');
//         let data4 = await axios.get('https://wsdetail.b2b.hc360.com/mysite/anfang01')
//         let data5 = await axios.get('https://wsdetail.b2b.hc360.com/mysite/anfang01')
//         let data6 = await axios.get('/Getserver/getdata');
//         let data7 = await axios.get('/Getserver/getdata');
//         return {
//             a: data,
//             b: data2,
//             c: data3,
//             d: data4,
//             e: data5,
//             f: data6,
//             g: data7
//         };
//     }
//     AxiosData().then(function(options){
//         // console.log();
//         // options.then(function (result){
//         //     console.log(result);
//             res.jsonp({
//                 a: options.a.data,
//                 b: options.b.data,
//                 c: options.c.data,
//                 d: options.d.data,
//                 e: options.e.data,
//                 f: options.f.data,
//                 g: options.g.data
//             });
//         // })
//     })
// });
//
//
//
// router.get('/indexList', function (req,res,next){
//     async function AxiosData (){
//         let data2 = await axios.get('/Getserver/getdata');
//         let data = await axios.get('/Getserver/getdata');
//         console.log(data2)
//         console.log(data)
//         return {a: data,b: data2};
//     };
//     AxiosData().then(function(options){
//         // console.log();
//         // options.then(function (result){
//         //     console.log(result);
//             res.jsonp({
//                 a: options.a.data,
//                 b: options.b.data
//             });
//         // })
//     })
// });
//
// module.exports = router;
