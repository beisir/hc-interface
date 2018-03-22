let fs = require('fs');




fs.readFile('./gy.json','utf8',function (err,data){
	var arrDataList = eval(data);
	let arr = [];
	arrDataList.forEach(function (item,id){
		arr.push({
			"BC_ID":item.BC_ID,
			"TITLE":item.TITLE
		})
	});

	fs.writeFile('./gy2.json',JSON.stringify(arr),function (orr,res){
		console.log(orr,res);
	})
})