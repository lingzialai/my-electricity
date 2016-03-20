/**
 * Created by lingzi on 2016/3/6.
 */
var infoApp = angular.module('infoApp',[]);
infoApp.controller('infoController',function($scope,$http,$location,$rootScope){

    /*根据商品id获取商品详情并更新页面*/
    $scope.getProductById = function(){
        $scope.productId = $location.search().productId;
        $http.post('/product/getProductById',{productId:$scope.productId}).success(function(data){
            console.log(data);
            $scope.productOne = data[0];
            $scope.price = data[0].p_price;
            $scope.quantity = 1;
            $scope.countTotalPrice();
        });
    };
    $scope.getProductById();

    /*增加购买数量*/
    $scope.addQuantity = function(){
        $scope.quantity = $scope.quantity + 1;
        $scope.countTotalPrice();
    };

    /*减少购买数量*/
    $scope.minusQuantity = function(){
        if($scope.quantity>0){
            $scope.quantity -= 1;
            $scope.countTotalPrice();
        }
    };

    /*计算总价*/
    $scope.countTotalPrice = function(){
        $scope.totalPrice = $scope.price * $scope.quantity;
    };

    /*商品添加购物车*/
    $scope.addProductToCar = function(){

        if($rootScope.user){
            $scope.userId = $rootScope.user.u_id;
            //$scope.productId = $location.search().productId;
            var param = {
                productId : $scope.productId,
                userId : $scope.userId,
                productCount : $scope.quantity
            };
            $http.post('/product/addProductToCar',param).success(function(data){
                if(data == 'true'){
                    var r = confirm('添加购物车成功,查看购物车吗？');
                    if(r==true){
                        $location.path('/car');
                    }
                }
            })
        }else{
            alert('请先登录');
            $location.path('/login')
        }

    };



});