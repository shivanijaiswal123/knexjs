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


app.post("/post/students",function(req,response){
    firstname=req.body.firstname
    lastname=req.body.lastname
    email=req.body.email
    data=[firstname,lastname,email]
    var sql = "INSERT INTO students(firstname,lastname,email) VALUES (?,?,?)";
    conn.query(sql,data, function(err, result){
    if (err){
            res.send(400).send("1 record inserted");
        }else{
            response.send("data inserted")
        }
    })
});


app.listen(2000, function () {
    console.log('Express server is listening on port 2000');
});