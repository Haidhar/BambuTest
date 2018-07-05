var mysql = require('mysql');
var express = require('express');
var app = express();

var con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'Profiling'
});

app.use(express.static('public'));
app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   var dataName = req.query.name;

   var dataSaving = req.query.saving;
   var scoreSaving = 0;

   var dataLoan = req.query.loan;
   var scoreLoan = 0;

   scoreSaving = dataSaving / 2000;
   scoreLoan = 5 - (dataLoan / 2000);

   var totalScore = scoreSaving + scoreLoan;

   response = {
      name: dataName,
      saving: dataSaving,
      loan: dataLoan,
      score: totalScore
   };
   console.log(response);

   con.query('INSERT INTO user SET ?', response, (err, res) => {
      if(err) throw err;

      console.log('Last insert ID:', res.insertId);
    });

   res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

})
