/**
 * Created by lingzi on 2016/3/11.
 */
$(function(){
    /*页面加载就分页显示热门商品*/
    var curPage = 1;
    var showProductCount = 0;
    function getHotProductByPage(curPage){
        var eachPageCnt = 4;
        $.ajax({
            type: "POST",
            url: "/product/queryHotProduct",
            data : 'curPage=' + curPage + "&eachPageCnt=" + eachPageCnt,
            success: function(data){
                showProduct(data,showProductCount);
            }
        });
    };

    getHotProductByPage(curPage);

    /*点击更多时显示更多商品*/
    $('#moreProductBtn').click(function(){
        curPage+=1;
        if($('#hotProductBtn').attr('class')=='a-on'){
            getHotProductByPage(curPage);
        }else{
            showSellProduct(curPage);
        }

    });

    /*点击优惠商品时*/
    $('#sellProductBtn').click(function(){
        $('#i-bestSells-list-ul').empty();
        $('#hotProductBtn').removeClass('a-on');
        $(this).addClass('a-on');
        curPage = 1;
        showProductCount = 0;
        showSellProduct(curPage);
    });

    /*点击热门商品时*/

    $('#hotProductBtn').click(function(){
        $('#hotProductBtn').addClass('a-on');
        $('#sellProductBtn').removeClass('a-on');
        curPage = 1;
        showProductCount = 0;
        $('#i-bestSells-list-ul').empty();
        getHotProductByPage(curPage);
    });

    function showSellProduct(curPage){
        //$('#i-bestSells-list-ul').empty();
        var eachPageCnt = 4;
        $.ajax({
            type: "POST",
            url: "/product/querySaleProduct",
            data : 'curPage=' + curPage + "&eachPageCnt=" + eachPageCnt,
            success: function(data){
                showProduct(data);
            }
        });
    };

    function showProduct(data){
        var hotProductList = data.data;
        console.log(hotProductList);
        var count = 0;
        for (var i=0;i<hotProductList.length;i++){
            var productOne = hotProductList[i];
            var liEle = $('<li>');
            $('<img>').attr('src','../images/' + productOne.p_detail_img).addClass('i-list-pdt-image').data('productId',productOne.p_id).appendTo(liEle);
            $('<img>').attr('src','../images/ico_mark_best.gif').addClass('best').appendTo(liEle);
            $('<p>').addClass('i-list-pdt-name').html(productOne.p_name).appendTo(liEle);
            $('<p>').addClass('i-list-pdt-price').html("￥"+productOne.p_price).appendTo(liEle);
            $('<img>').attr('src','../images/icon_cart.png').addClass('i-list-car').data('productId',productOne.p_id).appendTo(liEle);
            liEle.appendTo($('#i-bestSells-list-ul'));
            count+=1;
        };
        showProductCount += count;
        if(count==0){
            $('#moreProductBtn span').html("没有更多商品了~")
        }else{
            $('#moreProductBtn span').html("显示更多("+showProductCount+"/"+ data.count +")");
        }
    }

    /*点击单件商品跳转详情页面*/
    $('#i-bestSells-list-ul').delegate('.i-list-pdt-image','click',function(){
        location.href = 'info.html?productId=' + $(this).data('productId');
    });

    /*添加购物车*/
    $('#i-bestSells-list-ul').delegate('.i-list-car','click',function(){
        var productId = $(this).data('productId');
        $.ajax({
            type : 'get',
            url : '/users/getUser',
            success : function(data){
                var user = data;
                if(user!=''){
                    var userId = user.u_id;
                    var productCount = 1;
                    $.ajax({
                        type : 'post',
                        url : '/product/addProductToCar',
                        data : 'userId=' + userId + '&productId=' + productId + '&productCount=' + parseInt(productCount),
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
    })
});