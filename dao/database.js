/**
 * Created by Administrator on 16-1-6.
 */
var mysql = require("mysql");
//获取数据库连接
function getConn() {
    return mysql.createConnection({
        host: "localhost",
        port: "3306",
        user: "root",
        password: "bbmm315",
        database: "electricity"
    });
}

var query = function(sql, params, callback) {
    var conn = getConn();
    conn.query(sql, params, function(err, data) {
        if(err) {
            console.log(err);
        } else {
            //调用dao回调函数
            callback(data);
        }
    });
    conn.end();
};

var queryByPage = function(sql,curPage,eachPageCnt,params,callback){
    var conn = getConn();
    conn.query("select count(*) cnt from (" + sql + ") e",params,function(err,data){
        //console.log(data);
        var count = data[0].cnt;
        var maxPage = Math.ceil(count/eachPageCnt);
        //console.log(maxPage);
       sql += " limit " + (curPage-1)*eachPageCnt + "," + eachPageCnt;
        conn.query(sql,params,function(err,data){
            //console.log(data);
            var page = {
                count:count,
                maxPage : maxPage,
                curPage : curPage,
                eachPageCnt :eachPageCnt,
                data : data
            };
            //console.log(page);
            callback(page);
            conn.end();
        })
    })
};

exports.query = query;
exports.queryByPage = queryByPage;
