let fs = require('fs');




fs.readFile('../json/qg.json','utf8',function (err,data){
	var arrDataList = eval(data);
	let arr = [];
	arrDataList.forEach(function (item,id){
		arr.push({
			"BC_ID":item.BC_ID,
			"TITLE":item.TITLE
		})
	});

	fs.writeFile('../json/qiugou.json',JSON.stringify(arr),function (orr,res){
		console.log(orr,res);
	})
})