/**
 * Created by lingzi on 2016/3/7.
 */
$(function(){

    /*左边轮播*/
    $('#imgList>li:first').addClass('imgOn');
    var curIndex = 0; //当前index
    //  alert(imgLen);
    // 定时器自动变换2.5秒每次
    var autoChange = setInterval(function(){
        if(curIndex < $(".imgList li").length-1){
            curIndex ++;
        }else{
            curIndex = 0;
        }
        //调用变换处理函数
        changeTo(curIndex);
    },2500);

    $(".indexList").find("li").each(function(item){
        $(this).hover(function(){
            clearInterval(autoChange);
            changeTo(item);
            curIndex = item;
        },function(){
            autoChange = setInterval(function(){
                if(curIndex < $(".imgList li").length-1){
                    curIndex ++;
                }else{
                    curIndex = 0;
                }
                //调用变换处理函数
                changeTo(curIndex);
            },2500);
        });
    });

    $('#banner1').hover(function(){
        clearInterval(autoChange);
    },function(){
        autoChange = setInterval(function(){
            if(curIndex < $(".imgList li").length-1){
                curIndex ++;
            }else{
                curIndex = 0;
            }
            //调用变换处理函数
            changeTo(curIndex);
        },2500);
    });

    $('.leftBtn').click(function(){
        if(curIndex > 0){
            curIndex --;
        }else if(curIndex == 0){
            curIndex = 8;
        }
        changeTo(curIndex);
    });
    $('.rightBtn').click(function(){
        if(curIndex < $(".imgList li").length-1){
            curIndex ++;
        }else{
            curIndex = 0;
        }
        //调用变换处理函数
        changeTo(curIndex);
    });

    function changeTo(num){
        $(".imgList").find("li").removeClass("imgOn").hide().eq(num).fadeIn().addClass("imgOn");
        $(".infoList").find("li").removeClass("infoOn").eq(num).addClass("infoOn");
        $(".indexList").find("li").removeClass("indexOn").eq(num).addClass("indexOn");
    }

});

/*右边轮播*/

$(function(){
    //$('#i-banner-right-ul>li:first').css("left",'0px');
    var d=0;//当前鼠标点击的li
    var z=0;//鼠标点击的之前点
    var time=0;//存放定时函数的
    var flag=0;//定义一个开关变量
    $(".main").hover(function(){
        $("#prev").css("display","block");
        $("#next").css("display","block");
    },function(){
        $("#prev").css("display","none");
        $("#next").css("display","none");
    });
    //点击nav里面的li切换内容开始
    $("#nav ul li").click(function(){
        $(this).addClass("bg").siblings().removeClass("bg");
        d=$(this).index();
        if(d>z){
            $(".con ul li").eq(z).animate({left:"-100%"},300);
            $(".con ul li").eq(d).css("left","100%");
            $(".con ul li").eq(d).animate({left:"0"},300);
            z=d;
        }
        else if(d<z){
            $(".con ul li").eq(z).animate({left:"100%"},300);
            $(".con ul li").eq(d).css("left","-100%");
            $(".con ul li").eq(d).animate({left:"0"},300);
            z=d;
        }
    });
    //点击nav里面的li切换内容结束
    //自动播放开始
    function junmper(){
        d++;
        if(d>2)
            d=0;
        $(".con ul li").eq(z).animate({left:"-100%"},300);
        $(".con ul li").eq(d).css("left","100%");
        $(".con ul li").eq(d).animate({left:"0"},300);
        z=d;
        $("#nav ul li").eq(d).addClass("bg").siblings().removeClass("bg");
    }
    time=setInterval(function(){
        junmper();
    },4000);
    //自动播放结束
    //鼠标放到li上是暂停播放开始
    $(".con").hover(function(){
        clearInterval(time);
    },function(){
        if(flag==0)
            time=setInterval(function(){
                junmper()
            },4000);
    });
    //鼠标放到li上是暂停播放结束

    //左右切换开始
    $("#next").click(function(){
        d++;
        if(d>2)
            d=0;
        $(".nav ul li").eq(d).addClass("bg").siblings().removeClass("bg");
        $(".con ul li").eq(z).animate({left:"-100%"},300);
        $(".con ul li").eq(d).css("left","100%");
        $(".con ul li").eq(d).animate({left:"0"},300);
        z=d;
    });
    $("#next").hover(function(){
        clearInterval(time);
    },function(){
        if(flag==0)
            time=setInterval(function(){
                junmper()
            },4000);
    });

    $("#prev").click(function(){
        d--;
        if(d<0)
            d=2;
        $("#nav ul li").eq(d).addClass("bg").siblings().removeClass("bg");
        $(".con ul li").eq(z).animate({left:"100%"},300);
        $(".con ul li").eq(d).css("left","-100%");
        $(".con ul li").eq(d).animate({left:"0"},300);
        z=d;
    });
    $("#prev").hover(function(){
        clearInterval(time);
    },function(){
        if(flag==0)
            time=setInterval(function(){
                junmper()
            },4000);
    });
    //左右切换结束
});