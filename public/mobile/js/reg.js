
$(function(){
    console.log('in')
    $('#userName').blur(function(){
        userNameValidate();
    });
    $('#password').blur(function(){
        passwordValidate();
    });

    $('#confirmPwd').blur(function(){
        rePasswordValidate();
    });

    $('#telephoneN').blur(function(){
        telephoneNValidate();
    });
    $('#realName').blur(function(){
       realNameValidate();
    });

    $('#regBtn').click(function(){
        validateAll();
    });

    function userNameValidate(){
        var flag = true;
        var emailRegExp =/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if($('#userName').val() == ''){
            $('#userNameWarnSpan').addClass('warnSpan').html('邮箱不能为空');
            flag = false;
        }else if(!emailRegExp.test($('#userName').val())){
            $('#userNameWarnSpan').addClass('warnSpan').html('邮箱格式错误');
            flag = false;
        }else{
            $('#userNameWarnSpan').empty();
            flag = true;
            $.ajax({
                type: "POST",
                url: "/users/findUser",
                data: "username="+$('#userName').val(),
                success: function(msg){
                    if(msg == 'true'){
                        $('#userNameWarnSpan').addClass('warnSpan').html("邮箱已存在");
                        $("#regBtn").attr("disabled","disabled")
                    }else{
                        $("#userNameWarnSpan").empty();
                        $("#regBtn").removeAttr("disabled");
                    }
                }
            });
        };
        return flag;
    };

    function passwordValidate(){
        var passwordRegExp = /^[a-zA-Z0-9]{8}$/;
        var flag = true;
        if($('#password').val()==''){
            $('#passwordWarnSpan').addClass('warnSpan').html('密码不能为空');
            flag = false;
        }else if(!passwordRegExp.test($('#password').val())){
            $('#passwordWarnSpan').addClass('warnSpan').html('请输入字母和数字组成的8位密码');
            flag = false;
        }else{
            $('#passwordWarnSpan').empty();
            flag = true;
        };
        return flag;
    };

    function rePasswordValidate(){
        var flag = true;
        if($('#confirmPwd').val() == ''){
            $('#confirmPwdWarnSpan').addClass('warnSpan').html('密码不能为空');
        }else if($('#confirmPwd').val() !==$('#password').val()){
            $('#confirmPwdWarnSpan').addClass('warnSpan').html('密码不一致');
            flag = false;
        }else{
            $('#confirmPwdWarnSpan').empty();
            flag = true;
        };
        return flag;
    };

    function telephoneNValidate(){
        var flag = true;
        var telephoneNRegExp = /^(\w+@\w+\.\w+)|(1[3458]\d{9})$/;
        if($('#telephoneN').val() == ''){
            $('#telephoneWarnSpan').addClass('warnSpan').html('手机号码不能为空');
        }else if(!telephoneNRegExp.test($('#telephoneN').val())){
            $('#telephoneWarnSpan').addClass('warnSpan').html('手机号码格式错误');
            flag = false;
        }else{
            $('#telephoneWarnSpan').empty();
            flag = true;
        }
        return flag;
    };

    function realNameValidate(){
        var flag = true;
        var realNameRegExp = /^[\u4e00-\u9fa5]{2,4}$/;
        if($('#realName').val() == ''){
            $('#realNameWarnSpan').addClass('warnSpan').html('姓名不能为空');
        }else if(!realNameRegExp.test($('#realName').val())){
            $('#realNameWarnSpan').addClass('warnSpan').html('姓名为2-4位汉字');
            flag = false;
        }else{
            $('#realNameWarnSpan').empty();
            flag = true;
        }
        return flag;
    }

    function validateAll(){

        var usernameFlag = userNameValidate();
        var passwordFlag = passwordValidate();
        var rePasswordFlag = rePasswordValidate();
        var telephoneNFlag  = telephoneNValidate();
        var realNameFlag  = realNameValidate();

        if(usernameFlag && passwordFlag && rePasswordFlag && telephoneNFlag && realNameFlag){
            $.ajax({
                type: "POST",
                url: "/users/addUser",
                data: "username="+$('#userName').val()+"&password="+$('#password').val() +"&telephoneN=" +$('#telephoneN').val() +"&realName=" + $('#realName').val(),
                success: function(msg){
                    if(msg =='true'){
                        location.href = 'login.html'
                    }
                }
            });
        }
    }
});