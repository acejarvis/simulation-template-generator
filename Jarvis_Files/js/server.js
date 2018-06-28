
var http = require('http');
var querystring = require('querystring');
var mysql = require('mysql');


var server = http.createServer(function(req,res){
    if(req.url !== 'favicon.ico'){
        var params;
        req.on('data',function(data){
            params = querystring.parse(decodeURIComponent(data));
        })
        req.on('end',function(){
            console.log('data collected');
            connect(params);
        })
        res.setHeader('Access-Control-Allow-Origin','*');
        res.writeHead(200,{'Content-Type' : 'application/json'});
        res.end(JSON.stringify({status : 1}));
    }
}).listen(1337,'localhost');

server.on('error',function(e){
    if(e.code == 'EADDRINUSE'){
        console.log('server address occupied');
    }
})
//server time-out
server.setTimeout(60*1000,function(socket){
    console.log('server time-out');
    console.log(socket);
})
server.on('close',function(){
    console.log('server closed');
})

//connect database
function connect(params){
    var connection = mysql.createConnection({
        host : 'localhost',
        port : 3306,
        database : 'test',
        user : 'root',
        password : ''
    });
    connection.connect(function(err){
        if(err){
            console.log('fail');
        }else{
            console.log('connected successfully');
            connection.query('insert into user set ?',{
                id : params.id,
                types : params.types,
                content : params.content
            },function(err,result){
                if(err){
                    console.log('insert-data fails');
                }else{
                    console.log('insert-data succeed');
                    connection.end();
                }
            })
        }
    })
