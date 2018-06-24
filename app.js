var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    res.render("home.ejs");
});

app.post("/goToGen", function(req, res){
    res.redirect("/gen");
});

app.get("/gen", function(req, res){
    res.render("gen.ejs");
});

app.listen(3000, function(){
    console.log("CSBL prototype server started!");
});