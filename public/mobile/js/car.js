/**
 * Created by lingzi on 2016/3/14.
 */
$(function(){

    /*查看当前用户购物车中的所有商品*/
    function showAllProduct(){
        $.ajax({
            type : 'get',
            url : '/users/getUser',
            success : function(data){
                userId = data.u_id;
                $.ajax({
                    type : 'post',
                    url : '/product/queryProductInCar',
                    data : 'userId=' + userId,
                    success : function(data){
                        $('#c-list-main').empty();
                        var products = data;
                        for(var i=0;i<products.length;i++){
                            var divContainerEle = $('<div>').addClass('c-list-main-li');
                            $('<img>').attr('src','../images/' + products[i].p_car_img).appendTo($('<div>').addClass('c-list-main-img').appendTo(divContainerEle));
                            var divRightEle = $('<div>').addClass('c-list-main-detail').appendTo(divContainerEle);
                            var p1 = $('<p>').addClass('c-pdt-name').html(products[i].p_name).appendTo(divRightEle);
                            $('<input type="checkbox">').addClass('c-list-main-li-check').attr('checked','checked').appendTo(p1);
                            var p2 = $('<p>').appendTo(divRightEle);
                            $('<label>').html('金额').appendTo(p2);
                            $('<span>').addClass('c-pdt-price').html('￥' + products[i].p_price).appendTo(p2);
                            var p3 = $('<p>').addClass('c-pdt-quantity').appendTo(divRightEle);
                            $('<label>').html('购买数量').appendTo(p3);
                            var spanEle = $('<span>').addClass('quantity-btns').data('productId',products[i].p_id).appendTo(p3);
                            $('<a>').addClass('quantityOption_minus').html('-').appendTo(spanEle);
                            $('<input type="text">').addClass('quantityText').val(products[i].sc_count).appendTo(spanEle);
                            $('<a>').addClass('quantityOption_plus').html('+').appendTo(spanEle);
                            var p4 = $('<p>').addClass('c-pdt-total-price-p').appendTo(divRightEle);
                            $('<label>').html('总计').appendTo(p4);
                            $('<span>').addClass('c-pdt-total-price').html('￥'+products[i].sc_count * products[i].p_price).appendTo(p4);
                            divContainerEle.appendTo($('#c-list-main'));
                            computTotalPrice();
                            computTotalCount();
                        }
                    }
                })
            }
        })
    };

    showAllProduct();

    /*计算总价*/
    function computTotalPrice(){
        var totalPrice = 0;
        $('#c-list-main input:checkbox:checked').each(function(index,domEle){
            var oneTotalPrice = $(domEle).parent().parent().children('.c-pdt-total-price-p').children('span').html();
            totalPrice += parseInt(oneTotalPrice.substring(1));
        });
        $('#totalPrice').html('￥' + totalPrice);
    };


    /*计算总数*/
    function computTotalCount(){
        var TotalCount = 0;
        $('#c-list-main input:checkbox:checked').each(function(index,domEle){
            var oneProductCount = $(domEle).parent().parent().children('.c-pdt-quantity').children('span').children('input').val();
            TotalCount += parseInt(oneProductCount);
        });
        $('#totalCount').html(TotalCount + '件');
    };

    /*全选和反选按钮*/
    $('#chooseAllBtn').data('flag','true');
    $('#chooseAllBtn').change(function(){
        if($('#chooseAllBtn').data('flag') == 'false'){
            $('#c-list input:checkbox').prop('checked','checked');
            $('#chooseAllBtn').data('flag','true');
        }else{
            $('#c-list input:checkbox').removeProp('checked');
            $('#chooseAllBtn').data('flag','false');
        };
        computTotalPrice();
        computTotalCount();
    });

    /*单选勾选一个checkbox时*/
    $('#c-list-main').delegate(':checkbox','change',function(){
        computTotalPrice();
        computTotalCount();
    });

    /*增加商品数量时*/
    $('#c-list-main').delegate('.quantityOption_plus','click',function(){
        var quantity = parseInt($(this).prev().val()) +1;
        $(this).prev().val(quantity);
        $.ajax({
            type : 'post',
            url : '/product/changeProductInCar',
            data : 'userId=' + userId + '&productId=' + $(this).parent().data('productId') + '&productCount=' + $(this).prev().val(),
            success : function(data){
                if(data == 'true'){
                    showAllProduct();
                }
            }
        })
    });

    /*减少商品数量时*/
    $('#c-list-main').delegate('.quantityOption_minus','click',function(){
        if(parseInt($(this).next().val())>0){
            var quantity = parseInt($(this).next().val()) -1;
            $(this).next().val(quantity);
            $.ajax({
                type : 'post',
                url : '/product/changeProductInCar',
                data : 'userId=' + userId + '&productId=' + $(this).parent().data('productId') + '&productCount=' + $(this).next().val(),
                success : function(data){
                    if(data == 'true'){
                        showAllProduct();
                    }
                }
            })
        }
    });

    /*直接修改商品数量时*/
    $('#c-list-main').delegate('.quantityText','blur',function(){
        $.ajax({
            type : 'post',
            url : '/product/changeProductInCar',
            data : 'userId=' + userId + '&productId=' + $(this).parent().data('productId') + '&productCount=' + $(this).val(),
            success : function(data){
                if(data == 'true'){
                    showAllProduct();
                }
            }
        })
    });

    /*删除商品时*/
    $('#delCheckedBtn').click(function(){
        $('#c-list-main input:checkbox:checked').each(function(index,domEle){
            var productId = $(domEle).parent().parent().children('.c-pdt-quantity').children('span').data('productId');
            console.log($(domEle).parent().parent().children('.c-pdt-quantity').children('span').data('productId'));
            $.ajax({
                type : 'post',
                url : '/product/deleteProductInCar',
                data : 'userId=' + userId + '&productId=' + productId,
                success : function(data){
                    if(data == 'true'){
                        showAllProduct();
                    }
                }
            })
        })
    })

});