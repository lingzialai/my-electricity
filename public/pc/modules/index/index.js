/**
 * Created by lingzi on 2016/3/4.
 */
var indexApp = angular.module('indexApp',[]);
indexApp.controller('indexController',function($scope,$http,$rootScope,$location){


    /*查看是否登陆*/
    $http.get("/users/getUser").success(function(data){
        $rootScope.user = data;
    });

    /*查询显示所有商品*/
    $scope.curPage = 1;
    $scope.eachPageCnt = 15;

    $scope.getAllProductByPage = function(){
        var param = {
            curPage : $scope.curPage,
            eachPageCnt : $scope.eachPageCnt
        };
        $http.post('/product/getAllProductByPage',param).success(function(data){
            //console.log(data);
            $scope.productList = data.data;
            $scope.maxPage = data.maxPage;
            $scope.pageArr = [];
            for(var i = 0;i<$scope.maxPage;i++){
                $scope.pageArr.push(i+1);
            }
        });

    };

    $scope.getAllProductByPage();

    /*显示左边轮播也是热门的商品*/
    $scope.getHotProduct = function(){
        $http.post('/product/queryHotProduct',{curPage:1,eachPageCnt:20}).success(function(data){
            $scope.hotProductList = data.data;
        })
    };

    $scope.getHotProduct();

    /*显示右边轮播也是打折的商品*/

    $scope.getSaleProduct = function(){
        $http.post('/product/querySaleProduct',{curPage:1,eachPageCnt:20}).success(function(data){
            $scope.saleProductList = data.data;
        })
    };

    $scope.getSaleProduct();
    /*通过类名查询商品*/
    $scope.getProductByCategory = function(category){
        $scope.curPage = 1;
        $scope.eachPageCnt = 15;
        $scope.category = category;
        var param = {
            curPage : $scope.curPage,
            eachPageCnt : $scope.eachPageCnt,
            category : $scope.category
        };
        $http.post('/product/getProductByCategoryByPage',param).success(function(data){
            $scope.productList = data.data;
            $scope.maxPage = data.maxPage;
            $scope.pageArr = [];
            for(var i = 0;i<$scope.maxPage;i++){
                $scope.pageArr.push(i+1);
            }
        });
    };

    /*根据页数查询*/
    $scope.changePage = function(page){
        $scope.curPage = page;
        $scope.getAllProductByPage();
    };

    /*前一页*/
    $scope.pageDown = function(){
        $scope.curPage = $scope.curPage - 1;
        $scope.getAllProductByPage();
    };


    /*下一页*/
    $scope.pageUp = function(){
        $scope.curPage = $scope.curPage + 1;
        $scope.getAllProductByPage();
    };

    /*点击图片传参进入详情页面*/
    //$scope.showDetail = function(productId){
    //    $location.search({productId:productId});
    //    $location.path('/info');
    //};


    /*添加购物车*/
    $scope.productToCar = function(productId){
        if($rootScope.user){
            $scope.userId = $rootScope.user.u_id;
            var param = {
                productId : productId,
                userId : $scope.userId,
                productCount : 1
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
    }
});
