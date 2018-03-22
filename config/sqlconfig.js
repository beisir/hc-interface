let mysql = require('mysql');
let con = mysql.createConnection({
	host: '127.0.0.1',
	port: '3306',
	user: 'root',
	password: '5211314',
	database: 'hc360'
});

con.connect();

module.exports = con;

