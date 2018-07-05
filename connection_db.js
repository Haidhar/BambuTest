var mysql = require('mysql');

var con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'Profiling'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = 'CREATE TABLE user (name VARCHAR(255), saving INT, loan INT, score INT)';
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
