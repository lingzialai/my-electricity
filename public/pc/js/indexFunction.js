/**
 * Created by lingzi on 2016/3/7.
 */
$(function(){

    /*����ֲ�*/
    $('#imgList>li:first').addClass('imgOn');
    var curIndex = 0; //��ǰindex
    //  alert(imgLen);
    // ��ʱ���Զ��任2.5��ÿ��
    var autoChange = setInterval(function(){
        if(curIndex < $(".imgList li").length-1){
            curIndex ++;
        }else{
            curIndex = 0;
        }
        //���ñ任������
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
                //���ñ任������
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
            //���ñ任������
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
        //���ñ任������
        changeTo(curIndex);
    });

    function changeTo(num){
        $(".imgList").find("li").removeClass("imgOn").hide().eq(num).fadeIn().addClass("imgOn");
        $(".infoList").find("li").removeClass("infoOn").eq(num).addClass("infoOn");
        $(".indexList").find("li").removeClass("indexOn").eq(num).addClass("indexOn");
    }

});

/*�ұ��ֲ�*/

$(function(){
    //$('#i-banner-right-ul>li:first').css("left",'0px');
    var d=0;//��ǰ�������li
    var z=0;//�������֮ǰ��
    var time=0;//��Ŷ�ʱ������
    var flag=0;//����һ�����ر���
    $(".main").hover(function(){
        $("#prev").css("display","block");
        $("#next").css("display","block");
    },function(){
        $("#prev").css("display","none");
        $("#next").css("display","none");
    });
    //���nav�����li�л����ݿ�ʼ
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
    //���nav�����li�л����ݽ���
    //�Զ����ſ�ʼ
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
    //�Զ����Ž���
    //���ŵ�li������ͣ���ſ�ʼ
    $(".con").hover(function(){
        clearInterval(time);
    },function(){
        if(flag==0)
            time=setInterval(function(){
                junmper()
            },4000);
    });
    //���ŵ�li������ͣ���Ž���

    //�����л���ʼ
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
    //�����л�����
});