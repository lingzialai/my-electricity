/**
 * Created by lingzi on 2016/3/6.
 */
var carApp = angular.module('carApp',[]);
carApp.controller('carController',function($scope,$http,$rootScope){

    /*ҳ����ز鿴��ǰ�û����ﳵ����������*/

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

    /*�����ܼ�*/
    $scope.computTotalPrice = function(){
        $scope.totalPrice = 0;
        for(var i=0;i<$scope.products.length;i++){
            if($scope.products[i].checked){
                $scope.totalPrice += $scope.products[i].p_price * $scope.products[i].sc_count;
            }
        }

    };

    /*checkbox״̬�ı�*/
    $scope.checkboxChange = function(){
        $scope.computTotalPrice();
        $scope.computTotalQuantity();
    };

    /*checkAllbox״̬�ı�ʱ*/
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
    /*��������Ʒ��*/
    $scope.computTotalQuantity = function(){
        $scope.totalQuantity = 0;
        for(var i=0;i< $scope.products.length;i++){
            if($scope.products[i].checked){
                $scope.totalQuantity += $scope.products[i].sc_count;
            }
        }
    };


    /*������Ʒ����*/
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

    /*������Ʒ����*/
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

    /*ֱ��������Ʒ����ʱ*/
    $scope.changeQuantityByInput = function(index){
        var param = {
            userId : $rootScope.user.u_id,
            productId : $scope.products[index].sc_p_id,
            productCount : $scope.products[index].sc_count
        };
        $http.post('/product/changeProductInCar',param).success(function(data){
        })
    };

    /*ɾ����Ʒ*/
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