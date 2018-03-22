let fs = require('fs'),
	path = require('path'),
	http = require('http'),
	https = require('https'),
	express = require('express');
const httpsProt = 443,
	  httpProt = 80;

let app = express();
let os = require('os'),
    iptable = {},
    ifaces = os.networkInterfaces();
for (var dev in ifaces) {
  	ifaces[dev].forEach(function(details,alias){
    	if (details.family=='IPv4') {
      		iptable[dev+(alias?':'+alias:'')] = details.address;
    	}
  	});
}

// console.log(iptable)
/**
 *	引入https的秘钥
 *
**/

let key = fs.readFileSync(path.resolve(__dirname, 'path/to/key.pem'),'utf8'),
	cert = fs.readFileSync(path.resolve(__dirname, 'path/to/cert.pem'),'utf8'),
	sshKey = { key: key, cert: cert};
let httpServer = http.createServer(app);
let httpsServer = https.createServer(sshKey, app);

require('./config/config.js')(app,httpServer);
global.httpPath = `http://${iptable['本地连接:1']}`;
global.httpsPath = `https://${iptable['本地连接:1']}`;
httpServer.listen(httpProt, ()=>{console.log('\x1B[31m%s\x1B[39m', ` Server Success ${global.httpPath} `); });
httpsServer.listen(httpsProt, ()=>{ console.log('\x1B[32m%s\x1B[39m', ` Server Success ${global.httpsPath} `); });
