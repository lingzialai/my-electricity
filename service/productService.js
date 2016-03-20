/**
 * Created by lingzi on 2016/1/7.
 */
var productDao = require('../dao/productDao');


exports.getAllProductByPage = function(curPage,eachPageCnt,callback){
    productDao.getAllProductByPage(curPage,eachPageCnt,function(data){
        callback(data);
    })
};

exports.getProductByCategoryByPage = function(curPage,eachPageCnt,category,callback){
    productDao.getProductByCategoryByPage(curPage,eachPageCnt,category,function(data){
        callback(data);
    })
};

exports.getProductById = function(productId,callback){
    productDao.getProductById(productId,function(data){
        callback(data);
    })
};


exports.addProductToCar = function(productId,userId,productCount,callback){
    productDao.findProductByIdInCar(productId,userId,function(data){
        if(data.length>0){
            productCount += parseInt(data[0].sc_count);
            console.log(productCount);
            productDao.changeProductInCar(userId,productId,productCount,function(data){
                if(data.affectedRows==1){
                    callback('true');
                }else{
                    callback('false');
                }
            });
        }else{
            productDao.addProductToCar(productId,userId,productCount,function(data){
                if(data.affectedRows==1){
                    callback('true');
                }else{
                    callback('false');
                }
            });
        }
    });

};

exports.queryProductInCar = function(userId,callback){
    productDao.queryProductInCar(userId,function(data){
        callback(data);
    })
};

exports.deleteProductInCar = function(userId,productId,callback){
    console.log(userId,productId)
    productDao.deleteProductInCar(userId,productId,function(data){
        if(data.affectedRows==1){
            callback('true');
        }else{
            callback('false');
        }
    })
};

exports.changeProductInCar = function(userId,productId,productCount,callback){
    productDao.changeProductInCar(userId,productId,productCount,function(data){
        if(data.affectedRows==1){
            callback('true');
        }else{
            callback('false');
        }
    })
};

exports.fuzzyQueryByPdtName = function(productName,callback){
    productDao.fuzzyQueryByPdtName(productName,function(data){
        callback(data);
    })
};

exports.queryHotProduct = function(curPage,eachPageCnt,callback){
    productDao.queryHotProduct(curPage,eachPageCnt,function(data){
        callback(data);
    })
};

exports.querySaleProduct = function(curPage,eachPageCnt,callback){
    productDao.querySaleProduct(curPage,eachPageCnt,function(data){
        callback(data);
    })
};
