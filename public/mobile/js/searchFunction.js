/**
 * Created by lingzi on 2016/3/8.
 */
$(function(){
    /*搜索框的动态显示*/
    $('#searchImg').data('flag','1');
    $('#search-a').delegate('img','click',function(){
        if($(this).data('flag') == '1'){
            $('#searchArea').css('display','block');
            $(this).attr('src','../images/btn_close.png');
            $(this).data('flag','0');
        }else{
            $('#searchArea').css('display','none');
            $(this).attr('src','../images/btn_search_g.png');
            $(this).data('flag','1');
        }
    });


    /*点击搜索按钮索搜商品并跳转搜索页面*/
    $('#searchBtn').click(function(){
        searchProduct();

    });

    /*搜索方法*/

    function searchProduct(){
        var searchText = $('#searchText').val();
        location.href = 'search.html?searchText=' + searchText;
    }
});

