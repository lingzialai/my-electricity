/**
 * Created by lingzi on 2016/1/10.
 */
var userDao = require('../dao/userDao');
exports.findUser = function(username,callback){
    userDao.findUser(username,function(data){
        if(data[0].cnt == 1){
            callback('true')
        }else{
            callback('false')
        }
    })
};

exports.addUser  = function(username,telephoneN,realName,password,callback){
    userDao.addUser(username,telephoneN,realName,password,function(data){
        if(data.affectedRows = 1){
            callback('true')
        }else{
            callback('false')
        }
    })
};

exports.login = function(username,password,callback){
    userDao.login(username,password,function(data){
        //if(data[0].cnt == 1){
        //    callback("true")
        //}else{
        //    callback('false')
        //}
        callback(data);
        console.log(data)
    })
};