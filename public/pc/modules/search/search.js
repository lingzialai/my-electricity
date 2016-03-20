/**
 * Created by lingzi on 2016/3/5.
 */
var searchApp = angular.module('searchApp',[]);

searchApp.controller('searchController',function($scope,$location,$http,$rootScope){

    $rootScope.search();

    /*获取类型*/
    $scope.getPdtCategory = function(category){
        $scope.category = category;
    };

    /*按类型搜索*/
    $scope.conditionSearch = function(){
        $scope.curPage = 1;
        $scope.eachPageCnt = 15;
        var param = {
            curPage:$scope.curPage,
            eachPageCnt :$scope.eachPageCnt,
            category : $scope.category
        };
        $http.post('/product/getProductByCategoryByPage',param).success(function(data){
            $rootScope.searchProductList = data.data;
            $rootScope.searchText = $scope.category;
            $rootScope.count = data.count;
        });
    };

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
            });
        }else{
            alert('请先登录');
            $location.path('/login')
        }
    }
});





