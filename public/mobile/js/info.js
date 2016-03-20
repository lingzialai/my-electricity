/**
 * Created by lingzi on 2016/3/13.
 */
$(function(){

    /*根据id查询商品*/

    function getProductById(){
        var productId = $.query.get('productId');
        $.ajax({
            type :'post',
            url : '/product/getProductById',
            data : 'productId=' + productId,
            success : function(data){
                showProduct(data[0]);
            }
        });
    };

    getProductById();

    /*显示商品*/
    function showProduct(data){
        $('#in-pdt-name').html(data.p_name);
        $('#in-pdt-img').attr('src','../images/'+data.p_detail_img);
        $('#in-pdt-describe').html(data.p_describe);
        $('#priceSingle').html('￥'+data.p_price);
        $('#integral').html(data.p_integral);
        $('#detailsImg').attr('src','../images/'+data.p_introM_img);
        //var quantity = $('#quantity').val();
        //var totalPrice = quantity*parseInt(data.p_price);
        //$('#totalPrice').html('￥' + totalPrice);
        countTotalMoney();
    };

    /*计算总价*/

    function countTotalMoney(){
        var quantity = $('#quantity').val();
        var totalPrice = quantity*($('#priceSingle').html().substring(1));/*substring参数第一位为要截取的字符串的第一位在原字符串中的下标*/
        //console.log('￥100,000.00'.replace(/[^\d.]/g,''));
        $('#totalPrice').html('￥'+totalPrice);
    }
    /*点击数量加号按钮时*/
    $('#quantityOption_plus').click(function(){
        $('#quantity').val(parseInt($('#quantity').val())+1);
        countTotalMoney();
    });

    /*点击数量减号按钮时*/
    $('#quantityOption_minus').click(function(){
        if(parseInt($('#quantity').val())>1){
            $('#quantity').val(parseInt($('#quantity').val())-1);
            countTotalMoney();
        }
    });

    /*数量输入框值改变时*/
    $('#quantity').blur(function(){
        countTotalMoney();
    });

    /*加入购物车*/
    $('#toCarBtn').click(function(){
        $.ajax({
            type : 'get',
            url : '/users/getUser',
            success : function(data){
                var user = data;
                if(user!=''){
                    var userId = user.u_id;
                    var productId = $.query.get('productId');
                    var productCount = $('#quantity').val();
                    $.ajax({
                        type : 'post',
                        url : '/product/addProductToCar',
                        data : 'userId=' + userId + '&productId=' + productId + '&productCount=' + productCount,
                        success : function(data){
                            if(data == 'true'){
                                var r = confirm('添加购物车成功，到购物车结算？');
                                if(r == true){
                                    location.href = 'car.html'
                                }else{

                                }
                            }
                        }
                    })
                }else{
                    alert('请先登录');
                    location.href = 'login.html'
                }
            }
        });


    });

});