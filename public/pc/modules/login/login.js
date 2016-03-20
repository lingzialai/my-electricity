/**
 * Created by lingzi on 2016/3/4.
 */
var loginApp = angular.module('loginApp',[]);
loginApp.controller('loginController',function($scope,$http,$location){
    $scope.login = function(){
        var param = {
            username : $scope.username,
            password : $scope.password
        };
        $http.post('/users/login',param).success(function(data){
            if(data.length>0){
                $location.path('/index')
            }else{
                alert('密码错误')
            }
        })
    }
});