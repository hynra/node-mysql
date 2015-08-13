#!/usr/bin/env node

express = require('express');
http = require('http');
var mysql = require('mysql');

app = express();
 app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res, next){		
  res.render('/public/index.html');
});

server = http.createServer(app)
server.listen(8082);
console.log('Server running at http://localhost:8082/');

//mysql setup
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database: 'svc_lskk'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected to MySQL as id ' + connection.threadId);
});

connection.query('SELECT * FROM stream_captured', function(err, rows, fields) {
  if (err) throw err;

  console.log('stream_captured table: \n', rows);
  
  var post = {file_name : '987654321.jpg', file_size : '180', file_date : "20091991"};
  var query = connection.query('INSERT INTO stream_captured SET ?', post, function(err, result) {
  // Neat!
  if (err) throw err;
	});
	console.log(query.sql+'\n');
	
	connection.end(function(err) {
	  console.log('Connection to MySQL Terminated');
	});
  
});




