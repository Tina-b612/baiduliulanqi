$(document).ready(function (){
/************************	初始化		*************************/	

	var n = 0;  	//记录页码
	var prev = 0;	//上一页
	var onTransition = false;



	
	
/************************	滚轮控制		*************************/

//滚轮事件函数
    function mouseWheel(element,upFn,downFn){
	element.onmousewheel = wheelFn
	if( element.addEventListener ){
		element.addEventListener("DOMMouseScroll",wheelFn,false);
	}

	function wheelFn(ev){
		var direction = true;
		if(ev.wheelDelta){  //ie和chrome
			direction = ev.wheelDelta > 0 ? true : false;
		}else if(ev.detail){ //FF
			direction = ev.detail < 0 ? true : false;
		}

		if( direction ){  //向上
			typeof upFn === "function" && upFn();
		}else{  //向下
			typeof downFn === "function" && downFn();
		}

		ev.preventDefault();
	}
}

    $(".stage_1 .button_download").one("animationend",function (){
        console.log('to stage_1 end');
        mouseWheel(document,upFn,downFn);	//滚轮事件调用
    });


//滚轮向下触发的函数
    function downFn(){
        if(!onTransition){
            if(n>3)return;
            onTransition = true;
            n++;
            $(".slidebar > li").eq(prev).removeClass("slidebar_active");    //导航栏切换
            $(".slidebar > li").eq(n).addClass("slidebar_active");


            switch (n){
                case 1 :
                    clearClass();
                    $(".stage_1").addClass("stage_out");
                    $(".stage_1_button-download").one("animationend", function () {
                        console.log("leave 1 end,to stage_2");
                        $(".stage_1").css('display','none');
                        clearClass();
                        $(".stage_2").addClass("stage_in");
                        $(".stage_2").css('display','block');
                        setTimeout(function () {
                            $(".stage_2_title").animate({
                                top: 0,
                                opacity: 1
                            },600);
                            $(".stage_2_text").animate({
                                top: 0,
                                opacity: 1
                            },700);
                            $(".stage_2_button_download").animate({
                                top: 0,
                                opacity: 1
                            },800, function () {
                                    onTransition = false;
                                    console.log("to stage_2 end")
                            });
                        },500);
                    });
                    break;
                case 2 :
                    clearClass();
                    $(".stage_2").addClass("stage_out");
                    $(".stage_2_icon_cover").one("animationend", function (){
                        $(".stage_2_title").animate({
                            top: -600,
                            opacity: 0
                        },500);
                        $(".stage_2_text").animate({
                            top: -600,
                            opacity: 0
                        },600);
                        $(".stage_2_button_download").animate({
                            top: -600,
                            opacity: 0
                        },700,function () {
                            console.log("leave stage_2 end,to stage_3");
                            clearClass();
                            $(".stage_3").addClass("stage_in");
                            $(".stage_2").css('display',"none");
                            $(".stage_3").css('display',"block");
                                $(".stage_3_title").animate({
                                    top: 0,
                                    opacity: 1
                                },600);
                                $(".stage_3_text").animate({
                                    top: 0,
                                    opacity: 1
                                },700);
                                $(".stage_3_button_download").animate({
                                    top: 0,
                                    opacity: 1
                                },800, function () {
                                    onTransition = false;
                                    console.log("to stage_3 end")
                                });
                        });
                    });
                    break;
                case 3 :
                    clearClass();
                    $(".stage_3").addClass("stage_out");
                    setTimeout(function (){
                        $('.stage_3_title').animate({
                            top: -600,
                            opacity: 0
                        },600);
                        $('.stage_3_text').animate({
                            top: -600,
                            opacity: 0
                        },700);
                        $('.stage_3_button_download').animate({
                            top:-600,
                            opacity: 0
                        },800,function (){
                            console.log("leave stage_3 end , to stage_4");
                            clearClass();
                            $(".stage_4").addClass("stage_in");
                            $('.stage_3').css('display','none');
                            $('.stage_4').css('display','block');
                            $('.stage_4_title').animate({
                                top: 0,
                                opacity: 1
                            },600);
                            $('.stage_4_text').animate({
                                top: 0,
                                opacity: 1
                            },700);
                            $('.stage_4_button_download').animate({
                                top: 0,
                                opacity: 1
                            },800,function(){
                                console.log("to stage_4 end");
                                onTransition = true;
                            })
                        });
                    },600);
                    break;
            }





            if( n !== 0){
                $(".button_next_text").fadeOut();
            }else{
                $(".button_next_text").fadeIn();
            }   //没在第一界面的时候，隐藏文字
            prev = n;
        }
    }

    function clearClass(){
        $(".stage").each(function (index,item) {
            $(item).removeClass("stage_in");
            $(item).removeClass("stage_out");
        });
    }


//滚轮向上触发的函数
    function upFn(){
        if(!onTransition){		//如果没有在向上运动或者向下运动
            if(n<1)return;
            onTransition = true;
            n--;
            $(".slidebar > li").eq(prev).removeClass("slidebar_active");	//删除导航上一页的class
            $(".slidebar > li").eq(n).addClass("slidebar_active");			//添加导航当前页的class

            switch (n){
                case 0 :
                    $(".stage_2_title").animate({
                        top: 500,
                        opacity: 0
                    },800);
                    $(".stage_2_text").animate({
                        top: 500,
                        opacity: 0
                    },700);
                    $(".stage_2_button_download").animate({
                        top: 500,
                        opacity: 0
                    },600, function () {
                        clearClass();
                        $(".stage_2").addClass("stage_out");
                        $(".stage_2_icon_cover").one("animationend",function (){
                            console.log("leave stage_2 end，to stage_1");   //进入第一页
                            clearClass();
                            $(".stage_1").addClass("stage_in");     //给前一页添加out class
                            $(".stage_2").css('display','none');
                            $(".stage_1").css('display','block');
                            onTransition = false;
                        });
                    });
                    break;
                case 1 :
                    clearClass();
                    $(".stage_3").addClass('stage_out');
                    setTimeout(function (){
                        $(".stage_3_title").animate({
                            top: 500,
                            opacity: 0
                        },700);
                        $(".stage_3_text").animate({
                            top: 500,
                            opacity: 0
                        },600);
                        $(".stage_3_button_download").animate({
                            top: 500,
                            opacity: 0
                        },500, function () {
                            $(".stage_3").css('display','none');
                            $(".stage_2").css('display','block');
                            $(".stage_2_icon_cover").css('animation-play-state','paused');
                            $(".stage_2_title").animate({
                                top: 0,
                                opacity: 1
                            },700,function (){
                                clearClass();
                                $(".stage_2").addClass('stage_in');
                                $(".stage_2_icon_cover").css('animation-play-state','running');
                                onTransition = false;
                            });
                            $(".stage_2_text").animate({
                                top: 0,
                                opacity: 1
                            },600);
                            $(".stage_2_button_download").animate({
                                top: 0,
                                opacity: 1
                            },500);
                        });
                    },600);
                    break;


            }



            if( n !== 0){
                $(".button_next_text").fadeOut();
            }else{
                $(".button_next_text").fadeIn();
            }   //没在第一界面的时候，隐藏文字
            prev = n;		//记录上一页
        }
    }


	
/************************	footer	*************************/
    $(".nav_highlight").css({
        "width":$(".nav_home > a ").width(),
        "left":$(".nav_home > a ").offset().left
    });
    $("ul.nav").on("mouseover","a",function (){
        $(".nav_highlight").css({
            "width":$(this).width(),
            "left":$(this).offset().left
        });
    });
    $("ul.nav").on("mouseleave",function (){
        $(".nav_highlight").css({
            "width":$(".nav_home > a ").width(),
            "left":$(".nav_home > a ").offset().left
        });
    });

});