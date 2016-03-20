/**
 * Created by lingzi on 2016/3/4.
 */
var regApp = angular.module('regApp',[]);
regApp.controller('regController',function($scope,$http,$location){
    $scope.validateUserName = function(){
        if($scope.username  && /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($scope.username)){
            $http.post('/users/findUser',{username:$scope.username}).success(function(data){
                if(data == 'true'){
                    $scope.usernameWarn = '此邮箱已被注册';
                    $scope.usernamewarnSpan = true;
                    $scope.usernameFlag = false;
                }else{
                    $scope.usernameWarn = '此邮箱可用';
                    $scope.usernamewarnSpan = false;
                    $scope.usernameFlag = true;
                }
            });
        }else{
            $scope.usernameWarn = '邮箱格式错误';
            $scope.usernamewarnSpan = true;
            $scope.usernameFlag = false;
        }
    };
    $scope.validateTelephoneN = function(){
        if($scope.telephoneN && /^(\w+@\w+\.\w+)|(1[3458]\d{9})$/.test($scope.telephoneN)){
            $scope.telephoneNWarn = '手机号码格式正确';
            $scope.telephoneNWarnSpan = false;
            $scope.telephoneNFlag = true;
        }else{
            $scope.telephoneNWarn = '手机号码格式错误';
            $scope.telephoneNWarnSpan = true;
            $scope.telephoneNFlag = false;
        }
    };
    $scope.validateRealName = function(){
        if($scope.realName && /^[\u4e00-\u9fa5]{2,4}$/.test($scope.realName)){
            $scope.realNameWarn = '姓名格式正确';
            $scope.realNameWarnSpan = false;
            $scope.realNameFlag = true;
        }else{
            $scope.realNameWarn = '姓名为2-4位汉字';
            $scope.realNameWarnSpan = true;
            $scope.realNameFlag = false;
        }
    };
    $scope.pwdWarn = '请输入字母和数字组成的8位密码';
    $scope.validatePwd = function(){
        if($scope.pwd && /^[a-zA-Z0-9]{8}$/.test($scope.pwd)){
            $scope.pwdWarn = '密码格式正确';
            $scope.pwdWarnSpan = false;
            $scope.pwdFlag = true;
        }else{
            $scope.pwdWarn = '请输入字母和数字组成的8位密码';
            $scope.pwdWarnSpan = true;
            $scope.pwdFlag = false;
        }
    };
    $scope.validateConfirmPwd = function(){
        if($scope.confirmPwd && $scope.confirmPwd == $scope.pwd){
            $scope.confirmPwdWarn = '密码一致';
            $scope.confirmPwdWarnSpan = false;
            $scope.confirmPwdFlag = true;
        }else{
            $scope.confirmPwdWarn = '密码不一致';
            $scope.confirmPwdWarnSpan = true;
            $scope.confirmPwdFlag = false;
        }
    };

    $scope.validateReg = function(){
        $scope.validateUserName();
        $scope.validateTelephoneN();
        $scope.validateRealName();
        $scope.validatePwd();
        $scope.validateConfirmPwd();
        if($scope.usernameFlag && $scope.telephoneNFlag && $scope.realNameFlag && $scope.pwdFlag && $scope.confirmPwdFlag){
            //alert('注册成功');
            var param = {
                username : $scope.username,
                telephoneN : $scope.telephoneN,
                realName : $scope.realName,
                password : $scope.pwd
            };
            $http.post('/users/addUser',param).success(function(data){
                if(data == 'true'){
                    $location.path('/login')
                }
            })
        }else{
            //alert('注册失败')
        }
    }
});