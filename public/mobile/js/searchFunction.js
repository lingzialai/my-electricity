/**
 * Created by lingzi on 2016/3/8.
 */
$(function(){
    /*������Ķ�̬��ʾ*/
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


    /*���������ť������Ʒ����ת����ҳ��*/
    $('#searchBtn').click(function(){
        searchProduct();

    });

    /*��������*/

    function searchProduct(){
        var searchText = $('#searchText').val();
        location.href = 'search.html?searchText=' + searchText;
    }
});

