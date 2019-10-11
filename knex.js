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

//rest api to update record into mysql database
app.put("/update/:id/students",function(req,res){
    
    firstname=req.body.firstname
    lastname=req.body.lastname
    email=req.body.email
    data=[firstname,lastname,email]
    var sql = "UPDATE students SET firstname = ?,lastname = ?,email=? WHERE id="+req.params.id;    
    conn.query(sql,data,function(err,result){
        if (err){
            res.send(400).send("1 record updated")
        }else{
            res.send("data updated")
        }
    })
})

//rest api to delete record from mysql database
app.delete('/:id/students', function (req, res) {
    console.log(req.body);
    conn.query('DELETE FROM students WHERE id=?', [req.body.id], function (error) {
       if (error) throw error;
        res.end('Record has been deleted!');
     });
 });



app.listen(2000, function () {
    console.log('Express server is listening on port 2000');
});