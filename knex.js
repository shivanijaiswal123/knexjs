var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());

var mysql = require('mysql');

var conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'students'
});

conn.connect();
app.get('/get', function(request, response){
    conn.query('select * from students', function(error, results){
        if ( error ){
            response.status(400).send('Error in database operation');
        } else {
            response.send(results);
        }
    });
});


app.listen(2000, function () {
    console.log('Express server is listening on port 2000');
});