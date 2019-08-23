let fs = require('fs'),
	Os = require('os'),
	path = require('path'),
	http = require('http'),
	https = require('https'),
	express = require('express');
const httpsProt = 443,
	  httpProt = 80;



let IPadress = getIPAdress(Os.networkInterfaces());
function getIPAdress(interfaces) {
    for (var devName in interfaces) {
		var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
};


let app = express();

let key = fs.readFileSync(path.resolve(__dirname, 'path/to/key.pem'),'utf8'),
	cert = fs.readFileSync(path.resolve(__dirname, 'path/to/cert.pem'),'utf8'),
	sshKey = { key: key, cert: cert};
let httpServer = http.createServer(app);
let httpsServer = https.createServer(sshKey, app);

require('./config/config.js')(app, httpServer);
let httpPath = global.httpPath = `http://${IPadress}`,
	httpsPath = global.httpsPath = `https://${IPadress}`;
httpServer.listen(httpProt, ()=>{console.log('\x1B[31m%s\x1B[39m', ` Server Success ${httpPath} `); });
httpsServer.listen(httpsProt, ()=>{ console.log('\x1B[32m%s\x1B[39m', ` Server Success ${httpsPath} `); });


let params = process.argv.splice(2);
let openBrowser = require('child_process');
if (params.length){
    openBrowser.exec(`start ${httpPath}/static/html/${params.length ? params: 'index.html'}`);
};
