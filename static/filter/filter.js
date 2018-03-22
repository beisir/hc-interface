var fs = require('fs');

fs.readFile('../html/newhomepage.htm','utf8',function (err,data){
	var reg = / onclick="return hcclick(.*")/g;
	var newStr = data.replace(reg,'');

	console.log(data.match(reg).length);
	fs.writeFile('../html/newhomepage2.htm',newStr, function (orr,res){
		// console.log(reg.exec(data));
	})
});