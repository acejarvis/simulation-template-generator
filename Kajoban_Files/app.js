/* Dependencies */

var express = require('express');
var app = express();

var ejs = require('ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var mysql = require('mysql');

/* ************************* */

app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    res.render("home.ejs");
});

app.get("/gen", function(req, res){
    res.render("gen.ejs");
});

app.get("/states", function(req, res){
    res.render("states.ejs"); 
});

app.post("/addInfo", function(req, res){
    /* some logic goes here */
    /* check that info is being sent */ console.log("The title is " + req.body.scenarioTitle);
    res.redirect("/states")
}); 

app.listen(3000, function(){
    console.log("CSBL prototype server started!");
});