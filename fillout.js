// select
// let sql = 'SELECT * FROM csbl'
// insert info
// let sql = "INSERT INTO csbl (user_name,normalObjectives) VALUES ('rose','654321')"
// update
// let sql = "UPDATE csbl SET normalObjectives ='789526' WHERE user_name='rose'";
// delete
// let sql = "DELETE FROM csbl WHERE user_name = 'rose'";

//connect database
let mysql = require('mysql');
let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'csbl12345',
	database:'csbl',
	port: '3306'
});
connection.connect(function(error,res){
	if(error){
		console.log('Connection error:'+error.message);
		return;
	}
	console.log('Connected successfully')
});

//extract data
function toObj(str){
	let ary = str.split('|');
	let len = ary.length;
	let obj = {};
	for(let i = 0;i<len;i++ ){
		let _ary = ary[i].split(':');
		let item = _ary[0]
		_ary.splice(0,1);
		obj[item] = _ary.join('');
	};
	return obj;
}

// search database
function deal(sql,fn){
	connection.query(sql, function(err, result, fields) {
		if (err) {cosole.log(err); return;};
		console.log('The solution is: ', result);
		if(fn){
			fn(JSON.stringify(result));
		}
	});
}

// add " "
function joineq(str){
	let _str = str.split(',');
	let len = _str.length;
	let res = ''
	for(let i = 0;i < len;i++){
		res = res + "'"+_str[i] + "',"
	}
	let result = res.substring(0,res.length-1);
	return result;
}


exports.catchres = function(req,fn){
	let {type, data} = req;
	data = toObj(data.data);
	switch(type){
		case 'SELECT':
			// check
			let sql = `SELECT ${data.selectItem} FROM csbl WHERE ${data.selectCol} = '${data.selectVal}'`;
			deal(sql,function(result){
				if(result === '[]'){
					fn('Not exist');
				}else{
					result = JSON.parse(result);
					if(result[0].normalObjectives === data.normalObjectives){
						fn('Selected')
					}else{
						fn('Not exist')
					}
				}}
				);
			break;
		// fillout
		case 'INSERT':
		let sql = `INSERT INTO csbl (${data.insertCol}) VALUES (${joineq(data.insertData)})`;
		deal(sql,function(){
			fn('Done!')
		});
		break;

		// delete
		case 'DELETE':

			let sql = `DELETE FROM csbl WHERE ${data.deleteCondition1}='${data.deleteVal1}' AND ${data.deleteCondition2}='${data.deleteVal2}'`
			deal(sql,function(){
				fn('Deleted successfully')
			});
			break;
		default: 
		return 0;
	}
}