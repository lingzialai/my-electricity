/**
 * Created by lingzi on 2016/3/9.
 */
$(function(){
    $('#loginBtn').click(function(){
        $.ajax({
            type : 'POST',
            url : '/users/login',
            data : 'username=' + $('#username').val() +"&password=" + $('#password').val(),
            success : function(msg){
                if(msg.length>0){
                    location.href = 'index.html'
                }else{
                    alert('密码错误')
                }
            }
        })
    })
});