/**
 * Created by lingzi on 2016/3/7.
 */
$(function(){
    $('#srchOptA').click(function(){
        $('#list1').css('display','block')
    });

    $('#list1').mouseleave(function(){
        $('#list1').css('display','none')
    });

    $('#srchOptB').click(function(){
        $('#list2').css('display','block')
    });
    $('#list2').mouseleave(function(){
        $('#list2').css('display','none')
    });

});