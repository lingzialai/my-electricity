/**
 * Created by lingzi on 2016/1/7.
 */
var express = require('express');
var productService = require('../service/productService');
var router = express.Router();



router.post('/getAllProductByPage',function(req,res){
    var curPage = req.body.curPage;
    var eachPageCnt = req.body.eachPageCnt;
    //console.log(curPage,eachPageCnt);
    productService.getAllProductByPage(curPage,eachPageCnt,function(data){
        res.send(data);
    })
});

router.post('/getProductByCategoryByPage',function(req,res){
    var curPage = req.body.curPage;
    var eachPageCnt = req.body.eachPageCnt;
    var category = req.body.category;
    console.log(curPage,eachPageCnt,category);
    productService.getProductByCategoryByPage(curPage,eachPageCnt,category,function(data){
        res.send(data);
    })
});

router.post('/getProductById',function(req,res){
    var productId = req.body.productId;
    //console.log(productId);
    productService.getProductById(productId,function(data){
        res.send(data);
    })
});

router.post('/addProductToCar',function(req,res){
    var productId = req.body.productId;
    var userId = req.body.userId;
    var productCount = req.body.productCount;
    productService.addProductToCar(productId,userId,parseInt(productCount),function(data){
        res.send(data);
    });
});

router.post('/queryProductInCar',function(req,res){
    var userId = req.body.userId;
    productService.queryProductInCar(userId,function(data){
        res.send(data);
    })
});

router.post('/deleteProductInCar',function(req,res){
    var userId = req.body.userId;
    var productId = req.body.productId;
    productService.deleteProductInCar(userId,productId,function(data){
        res.send(data);
    })
});

router.post('/changeProductInCar',function(req,res){
    var userId = req.body.userId;
    var productId = req.body.productId;
    var productCount = req.body.productCount;
    productService.changeProductInCar(userId,productId,productCount,function(data){
        res.send(data);
    })
});

router.post('/fuzzyQueryByPdtName',function(req,res){
    var productName = req.body.productName;
    productService.fuzzyQueryByPdtName(productName,function(data){
        res.send(data);
    })
});

router.post('/queryHotProduct',function(req,res){
    var curPage = req.body.curPage;
    var eachPageCnt = req.body.eachPageCnt;
    productService.queryHotProduct(curPage,eachPageCnt,function(data){
        res.send(data);
    })
});

router.post('/querySaleProduct',function(req,res){
    var curPage = req.body.curPage;
    var eachPageCnt = req.body.eachPageCnt;
    productService.querySaleProduct(curPage,eachPageCnt,function(data){
        res.send(data);
    })
});
module.exports = router;