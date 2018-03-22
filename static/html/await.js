var fs = require('fs');

var readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) reject(error);
      resolve(data);
    });
  });
};

var gen = function* () {
  var f1 = yield readFile('../json/gongying.json');
  var f2 = yield readFile('../json/qg.json');
  console.log(f1.toString());
  console.log(f2.toString());
};

var asyncReadFile = async function () {
  var f1 = await readFile('./canvas.html');
  var f2 = await readFile('./excel.html');
  console.log(f1.toString());
  console.log(f2.toString());
};
let genFn = gen().next();

let fileFn = asyncReadFile();
