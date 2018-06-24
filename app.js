var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    res.render("home.ejs");
});

app.get("/gen", function(req, res){
    res.render("gen.ejs");
});

app.listen(3000, function(){
    console.log("CSBL prototype server started!");
});