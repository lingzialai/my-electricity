/**
 * Created by lingzi on 2016/2/26.
 */
var mainApp = angular.module('mainApp',['ui.router','indexApp','regApp','loginApp','searchApp','infoApp','carApp']);
mainApp.config(function($urlRouterProvider,$stateProvider){
    $urlRouterProvider.when('','index');
    $stateProvider.state('index',{
        url : '/index',
        templateUrl : 'modules/index/index.html',
        controller : 'indexController'
    });
    $stateProvider.state('login',{
        url : '/login',
        templateUrl : 'modules/login/login.html',
        controller : 'loginController'
    });
    $stateProvider.state('reg',{
        url : '/reg',
        templateUrl : 'modules/reg/reg.html',
        controller : 'regController'
    });
    $stateProvider.state('search',{
        url : '/search',
        templateUrl : 'modules/search/search.html',
        controller : 'searchController'
    });
    $stateProvider.state('info',{
        url : '/info',
        templateUrl : 'modules/info/info.html',
        controller : 'infoController'
    });
    $stateProvider.state('car',{
        url : '/car',
        templateUrl : 'modules/car/car.html',
        controller : 'carController'
    });
});

mainApp.controller('mainController',function($scope,$http,$rootScope,$location){
    $http.get("/users/getUser").success(function(data){
        $rootScope.user = data;
    });

    $scope.logOut = function(){
        $http.get("/users/logOut").success(function(data){
            $rootScope.user = null;
        });
    };

    $scope.showDetail  = function(productId){
        console.log('in');
        $location.search({productId:productId});
        $location.path('/info')
    };

    /*按名字模糊查询*/
    $rootScope.search = function(){
        if($scope.searchText!=undefined && $scope.searchText!=''){
            var param = {
                productName : $scope.searchText
            };

            $http.post('/product/fuzzyQueryByPdtName',param).success(function(data){
                $rootScope.searchProductList = data;
                var count = 0;
                for(var i=0;i<$rootScope.searchProductList.length;i++){
                    count++
                };
                $rootScope.count = count;
                $location.path('/search');
            })
        };
    };

    /*点击购物车图标时*/
    $scope.toCar = function(){
        if($rootScope.user){
            $location.path('/car')
        }else{
            alert('请先登录');
            $location.path('/login')
        }
    };

    /*点击导航登陆按钮*/
    $scope.login = function(){
        var param = {
            username : $scope.username,
            password : $scope.password
        };
        $http.post('/users/login',param).success(function(data){
            if(data.length>0){
                //$location.path('/index');
                $http.get("/users/getUser").success(function(data){
                    $rootScope.user = data;
                });
            }else{
                alert('密码错误')
            }
        })
    }
});



