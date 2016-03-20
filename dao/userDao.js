/**
 * Created by lingzi on 2016/1/10.
 */
var database = require('./database');
exports.findUser = function(username,callback){
    database.query("select count(*) cnt from t_user where u_email = ?",[username],function(data){
        callback(data);
    });
};

exports.addUser = function(username,telephoneN,realName,password,callback){
    database.query("insert into t_user (u_email,u_tele,u_realName,u_password) values(?,?,?,?)",[username,telephoneN,realName,password],function(data){
        callback(data);
    })
};
exports.login = function(username,password,callback){
    database.query("select * from t_user where u_email = ? and u_password = ?",[username,password],function(data){
        callback(data);
    })
};