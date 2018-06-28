var express = require('express');
var app = express();
//****
var url = require('url');
var bodyParser = require('body-parser');
var sql = require('./fillout.js');
//****

//****
app.set('views', path.join(__dirname, 'views'));
//****
app.set('view engine', 'ejs');

//****
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
//extract error 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.get("/", function (req, res) {
    res.render("home.ejs");
});

app.get("/gen", function(req, res){
    res.render("gen.ejs");
});

app.get("/states", function(req, res){
    res.render("states.ejs");
}); /* recent addition */ 

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Headers','x-requested-with,content-type,Access-Control-Allow-Origin');
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.post('/objectives',function(req, res){
    var query = url.parse(req.url,true).query;
    switch(query.ctr){
        case 'add':
            sql.catchres({type:'INSERT',data:req.body},function(msg){
                res.send(msg);
            });
            break;
        case 'update':
            sql.catchres({type:'UPDATE',data:req.body},function(msg){
                res.send(msg);
            });
            break;
        case 'delete':
            sql.catchres({type:'DELETE',data:req.body},function(msg){
                res.send(msg);
            });
            break;
        case 'login':
            sql.catchres({type:'SELECT',data:req.body},function(msg){
                res.send(msg);
            });
            break;
        default:
            res.send('undefined contrl!');
    }

});


app.listen(3000, function(){
    console.log("CSBL prototype server started!");
});