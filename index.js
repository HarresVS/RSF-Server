const express = require('express');
const app = express();
const path = require("path");
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');
var bodyParser = require('body-parser');
var cors = require('cors');
db.serialize(function() {
    db.run("CREATE TABLE user (username TEXT, password TEXT, name TEXT)");
    db.run("INSERT INTO user VALUES ('admin', 'eu', 'App Administrator')");
    db.run("INSERT INTO user VALUES ('user', '1234', 'default')");
  });


app.use( express.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({origin: "*"}))

app.listen( 3030,() => console.log (`\x1b[36mNode Server initialized! booted on: http://localhost:3030 \x1b[0m`) )
app.use(express.static('public'));
app.get('/', (request,response) =>{
    response.status(200)
    response.sendFile(path.join(__dirname, "/public/index.html" ));
});

app.post('/login', function (req, res) {
    var username = req.body.username; // user valid 'admin'
    var password = req.body.password; // parola valida 'eu'
    var query = "SELECT name FROM user where username = '" + username + "' and password = '" + password + "' LIMIT 1";

    console.log("username: " + username);
    console.log("password: " + password);
    console.log('query: ' + query);
    db.get(query , function(err, row) {

        if(err) {
            console.log('ERROR', err);
            res.redirect("/#error");
        } else if (!row) {
            res.redirect("/#unauthorized");
        } else {
            if (row.name == 'App Administrator'){ 
            res.status(200)
            res.sendFile(path.join(__dirname, `/public/admin.html` ));
            } else{
                res.send('Unknown user')
                res.status(400)
            }
        }
    });

});

app.get('*', (request,response) =>{
    response.status(404)
    response.send('404 Not Found...');
});