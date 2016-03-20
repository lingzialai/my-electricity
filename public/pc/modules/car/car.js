/**
 * Created by lingzi on 2016/3/6.
 */
var carApp = angular.module('carApp',[]);
carApp.controller('carController',function($scope,$http,$rootScope){

    /*页面加载查看当前用户购物车的所有内容*/

    $scope.showAllProductInCar = function(){
        $http.post('/product/queryProductInCar',{userId : $rootScope.user.u_id}).success(function(data){
            if(data.length>0){
                $scope.products = data;
                for(var i=0;i<$scope.products.length;i++){
                    $scope.products[i].checked = true;
                };
                $scope.computTotalPrice();
                $scope.computTotalQuantity();
                $scope.checkedAll = true;
                $scope.checkedAllChange();
            }else{
                $scope.products = null;
                $scope.totalQuantity = 0;
                $scope.totalPrice = 0;
            }
        });
    };
    $scope.showAllProductInCar();

    /*计算总价*/
    $scope.computTotalPrice = function(){
        $scope.totalPrice = 0;
        for(var i=0;i<$scope.products.length;i++){
            if($scope.products[i].checked){
                $scope.totalPrice += $scope.products[i].p_price * $scope.products[i].sc_count;
            }
        }

    };

    /*checkbox状态改变*/
    $scope.checkboxChange = function(){
        $scope.computTotalPrice();
        $scope.computTotalQuantity();
    };

    /*checkAllbox状态改变时*/
    $scope.checkedAllChange = function(){
        console.log(1)
        if($scope.checkedAll==true){
            for(var i=0;i<$scope.products.length;i++){
                $scope.products[i].checked = true;
                $scope.checkboxChange();
            };
            $scope.checkedAll = true;
        }else{
            for(var j=0;j<$scope.products.length;j++){
                $scope.products[j].checked = null;
                $scope.checkboxChange();
            };
            $scope.checkedAll = null;
        }
    };
    /*计算总商品数*/
    $scope.computTotalQuantity = function(){
        $scope.totalQuantity = 0;
        for(var i=0;i< $scope.products.length;i++){
            if($scope.products[i].checked){
                $scope.totalQuantity += $scope.products[i].sc_count;
            }
        }
    };


    /*增加商品数量*/
    $scope.addQuantity = function(index){
        $scope.products[index].sc_count++;
        var param = {
            userId : $rootScope.user.u_id,
            productId : $scope.products[index].sc_p_id,
            productCount : $scope.products[index].sc_count
        };
        $http.post('/product/changeProductInCar',param).success(function(data){
            $scope.computTotalPrice();
            $scope.computTotalQuantity();
        })
    };

    /*减少商品数量*/
    $scope.minusQuantity = function(index){
        if($scope.products[index].sc_count>0){
            $scope.products[index].sc_count--;
            var param = {
                userId : $rootScope.user.u_id,
                productId : $scope.products[index].sc_p_id,
                productCount : $scope.products[index].sc_count
            };
            $http.post('/product/changeProductInCar',param).success(function(data){
                $scope.computTotalPrice();
                $scope.computTotalQuantity();
            })
        }
    };

    /*直接输入商品数量时*/
    $scope.changeQuantityByInput = function(index){
        var param = {
            userId : $rootScope.user.u_id,
            productId : $scope.products[index].sc_p_id,
            productCount : $scope.products[index].sc_count
        };
        $http.post('/product/changeProductInCar',param).success(function(data){
        })
    };

    /*删除商品*/
    $scope.delProduct = function(index){
        var param = {
            userId : $rootScope.user.u_id,
            productId : $scope.products[index].sc_p_id
        };
        $http.post('/product/deleteProductInCar',param).success(function(data){
            $scope.showAllProductInCar();
        })
    };


});