/**
 * Created by lingzi on 2016/3/11.
 */
$(function(){
    var searchText = $.query.get('searchText');
    if(searchText!=''){
        $.ajax({
            type: "POST",
            url: "/product/fuzzyQueryByPdtName",
            data: "productName="+searchText,
            success: function(data){
                console.log(data);
                $('#searchProductName').html(searchText);
                 count = 0;
                showProduct(data);
                $('#s-pdt-quantity').html(count);
            }
        });
    };

    function showProduct(data){
        for (var i=0;i<data.length;i++){
            var liEle = $('<li>').data('productId',data[i].p_id);
            var divLeft = $('<div>').addClass('s-pdt-list-left').appendTo(liEle);
            $('<img>').attr('src','../images/' + data[i].p_index_img).appendTo(divLeft);
            var divRight = $('<div>').addClass('s-pdt-list-right').appendTo(liEle);
            $('<p>').addClass('s-pdt-list-name').html(data[i].p_name).appendTo(divRight);
            $('<p>').addClass('s-pdt-list-price').html('￥'+data[i].p_price).appendTo(divRight);
            var pEle = $('<p>').appendTo(divRight);
            $('<img>').attr('src','../images/icon_cart.png').appendTo($('<a>').addClass('s-pdt-list-car').appendTo(pEle));
            var spanEle = $('<span>').addClass('quantity-btns').appendTo(pEle);
            $('<a>').addClass('quantityOption_minus').html('-').appendTo(spanEle);
            $('<input type="text" value="1">').appendTo(spanEle);
            $('<a>').addClass('quantityOption_plus').html('+').appendTo(spanEle);
            count++;
            liEle.appendTo($('#s-pdt-list-ul'));
        };
    }

    /*根据类型进行搜索*/

    $('#categorySearchBtn').click(function(){
        $('#s-pdt-list-ul').empty();
        var category = $('#categorySelect').find('option:selected').text();
        var curPage = 1;
        var eachPageCnt = 4;
        $.ajax({
            type: "POST",
            url: "/product/getProductByCategoryByPage",
            data: "curPage="+curPage + "&eachPageCnt=" + eachPageCnt +"&category=" + category,
            success : function(data){
                var productList = data.data;
                $('#searchProductName').html(category);
                count = 0;
                showProduct(productList);
                $('#s-pdt-quantity').html(count);
            }
        })
    });

    /*点击单件商品跳转到详情页面*/
    $('#s-pdt-list-ul').delegate('li','click',function(){
        var productId = $(this).data('productId');
        location.href = 'info.html?productId=' + productId;
    })
});
