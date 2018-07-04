var xhr = new XMLHttpRequest();

function request({type,data}){
    var url = 'http://localhost:3000/user?ctr=' + type;
    xhr.open('POST',url,true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=UTF-8");
    xhr.setRequestHeader("X-Requested-With","Access-Control-Allow-Headers");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                var text = xhr.responseText;
                document.getElementById('result').innerText = text;
            }
        }
    };
    xhr.send(data)
};

// buttons
var check = document.getElementById('check');
var add = document.getElementById('add');
var del = document.getElementById('del');
var update = document.getElementById('update');
var updateCtr = document.getElementById('updateCtr');
var back = document.getElementById('back');

check.onclick = function(){
    var objectiveID = document.getElementById('objectiveID').value;
    var objective = document.getElementById('objective').value;
    var data = `data=selectItem:normalObjectives|selectCol:user_name|selectVal:${objectiveID}|normalObjectives:${objective}`;
    request({type:'check',data:data})
};
add.onclick = function(){
    var objectiveID = document.getElementById('objectiveID').value;
    var objective = document.getElementById('objective').value;
    var data = `data=insertCol:user_name,normalObjectives|insertData:${objectiveID},${objective}`
    request({type:'add',data:data})
};
del.onclick = function(){
    console.log('del');
    var objectiveID = document.getElementById('objectiveID').value;
    var objective = document.getElementById('objective').value;
    var data = `data=deleteCondition1:user_name|deleteVal1:${objectiveID}|deleteCondition2:normalObjectives|deleteVal2:${objective}`;
    request({type:'delete',data:data});
};

};
back.onclick = function(){
    document.getElementById('inputBox').style.display = 'block';
    document.getElementById('updateBox').style.display = 'none';
    document.getElementById('title').innerText = 'Form';
    document.getElementById('result').innerText = '';
};

// 释放内存
check = null;
add = null;
del = null;
update = null;
updateCtr = null;
back = null;