var express = require('express');
var bodyParser = require('body-parser');
var app = express();


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(require('express-partial')());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req,res,next){
    if (req.query.method){
        req.method = req.query.method.toUpperCase();
        
    }
    next(); 
});
app.use(express.static('node_modules'));

app.use(require('./logger'));
app.use(require("./router"));



app.listen(8080, function(){
    console.log("Server is running...");
});