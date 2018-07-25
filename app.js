/* Dependencies */

var express = require('express');
var app = express();

var ejs = require('ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/Public'));
var mysql = require('mysql');

/* ************************* */

app.set('view engine', 'ejs');

//home page 
//basically just a landing
app.get("/", function (req, res) {
    res.render("home.ejs");
});

//states 
//first build states
//TODO: actually building the list 
app.get("/states", function(req, res){
    res.render("states.ejs"); 
});

//aux info 
//entered AFTER building states 
app.get("/gen", function(req, res){
    res.render("gen.ejs");
});

//end page 
//option to go back to landing
//or
//option to build new scenario 
app.get("/done", function(req, res){
    res.render("done.ejs");
});
// export to a new page *
app.get("/export", function(req, res){
    res.render("export.ejs");
});


//post request 1
//move from states -> aux 
//allows user to retain data
app.post("/goToAux", function(req, res){
    res.redirect("/gen")
}); 

//post request 2
//move from aux -> done
//allows user to retain data 
app.post("/goToDone", function(req, res){
    res.redirect("/done")
}); 

//start up server
//probably need process.env for live version 
app.listen(3000, function(){
    console.log("CSBL prototype server started!");
});