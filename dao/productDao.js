/**
 * Created by lingzi on 2016/1/7.
 */
var database = require('./database');

exports.getAllProductByPage = function(curPage,eachPageCnt,callback){
    database.queryByPage("select * from t_product",curPage,eachPageCnt,[],function(data){
        callback(data);
    });
};
exports.getProductByCategoryByPage = function(curPage,eachPageCnt,category,callback){
    database.queryByPage("select * from t_product p,t_type t where t.t_id = p.p_t_id and t.t_name = ?",curPage,eachPageCnt,[category],function(data){
        callback(data);
    });
};

exports.getProductById = function(productId,callback){
    database.query('SELECT * FROM t_type t,t_product p WHERE t.t_id = p.p_t_id AND p.p_id= ?',[productId],function(data){
        callback(data);
    })
};

exports.findProductByIdInCar = function(productId,userId,callback){
    database.query('SELECT * FROM t_shopcar sc JOIN t_product p ON sc.sc_p_id = p.p_id WHERE sc.sc_u_id = ? AND sc.sc_p_id = ?',[userId,productId],function(data){
        callback(data);
    })
};

exports.addProductToCar = function(productId,userId,productCount,callback){
    database.query('insert into t_shopCar (sc_u_id,sc_p_id,sc_count) values (?,?,?)',[userId,productId,productCount],function(data){
        callback(data);
    })
};

exports.queryProductInCar = function(userId,callback){
    database.query('SELECT * FROM t_product p ,t_user u, t_shopCar s WHERE p.p_id = s.sc_p_id AND s.sc_u_id = u.u_id AND u.u_id = ?',[userId],function(data){
        callback(data);
    })
};

exports.deleteProductInCar = function(userId,productId,callback){
    database.query('DELETE FROM t_shopcar  WHERE t_shopcar.sc_u_id = ? AND t_shopcar.sc_p_id = ?',[userId,productId],function(data){
        callback(data);
    })
};

exports.changeProductInCar = function(userId,productId,productCount,callback){
    database.query('UPDATE t_shopcar s SET s.sc_count = ? WHERE s.sc_u_id = ? AND s.sc_p_id = ?',[productCount,userId,productId],function(data){
        callback(data);
    })
};

exports.fuzzyQueryByPdtName = function(productName,callback){
    database.query("SELECT * FROM t_product p JOIN t_type t ON p.p_t_id = t.t_id WHERE p.p_name LIKE '%" +productName+"%' OR t.t_name LIKE '%"+productName+"%'",[],function(data){
        callback(data);
    })
};

exports.queryHotProduct = function(curPage,eachPageCnt,callback){
    database.queryByPage("SELECT * FROM t_product p,t_hot h WHERE p.p_id = h.h_p_id",curPage,eachPageCnt,[],function(data){
        callback(data);
    })
};

exports.querySaleProduct = function(curPage,eachPageCnt,callback){
    database.queryByPage("SELECT * FROM t_product p,t_sale s WHERE p.p_id = s.s_p_id",curPage,eachPageCnt,[],function(data){
        callback(data);
    })
};

