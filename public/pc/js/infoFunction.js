/**
 * Created by lingzi on 2016/3/7.
 */
$(function(){
    $('#select').change(function(){
        var optValue = $(this).find('option:selected').text();
        var liEle = $('<li>').addClass('opts');
        var p1 = $('<p>').addClass('dt').html(optValue).appendTo(liEle);
        var p2 = $('<p>').addClass('quantityFrom').appendTo(liEle);
        $('<input>').addClass('input-text').appendTo(p2);

        $('<input type="button">').addClass('btn_quantityUp').appendTo(p2);
        $('<input type="button">').addClass('btn_quantityDown').appendTo(p2);
        $('<p>').addClass('q').html('个').appendTo(liEle);
        var price = $('#price').html();
        $('<p>').addClass('w').html(price).appendTo(liEle);
        var p5 = $('<p>').addClass('btn').appendTo(liEle);
        $('<input type="button">').addClass('optionRemove').appendTo(p5);
        liEle.appendTo($('#options'));
    });
    $('#options').delegate('.btn','click',function(){
        $(this).parents('li').empty();
    })
});