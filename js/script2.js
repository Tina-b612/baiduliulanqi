$(document).ready(function (){
/************************	初始化		*************************/	

	var n = 0;  	//记录页码
	var prev = 0;	//上一页
	var onDown = false;		//记录tansition的状态，默认为false，代表没有在运动中
	var onUp = false;		

	$(".stage_1_title > li > span").each(function (index){
		$(this).data({
			t: $(this).position().top,
			l: $(this).position().left
		})
		$(this).css("top","500px");
	})
	$(".stage_1").addClass("stage_out");
	$(".stage_1_title > li > span").each(function (index){
		$(this).css("top",$(this).data().t + "px");
	})
	$("#header").css("top","0");
	$("#footer").css("bottom","0");
	$(".slidebar").css("right","15px");
	$(".stage_1_icon").css("top","0");
	$(".stage_1_sub_title").css("top","0");
	$(".button_download").css("top","0");
	$(".button_next").css("opacity","1");
	
	function downEnd(){
		onDown = false;
		console.log("downEnd")
		if(!onDown && !onUp){
			$(".stage").eq(prev).removeClass("stage_current");	//删除上一页的class
			$(".stage").eq(n).addClass("stage_current");			//添加当前页的class
		}
	}
	function upEnd(){
		onUp = false;
		console.log("upEnd")
		if(!onDown && !onUp){
			$(".stage").eq(prev).removeClass("stage_current");	//删除上一页的class
			$(".stage").eq(n).addClass("stage_current");			//添加当前页的class
		}
	}
	
	$(".button_download").on("transitionend",upEnd)
	$(".stage_1_icon").on("transitionend",downEnd)
	
	
	
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

mouseWheel(document,upFn,downFn);	//滚轮事件调用



function upFn(){			//滚轮向上触发的函数
	if(!onUp && !onDown){		//如果没有在向上运动或者向下运动
		if(n<1)return;		
		onUp = true;	//执行过程中onUp为true
		console.log("onUp")
		n--;
		console.log(n)
		$(".slidebar > li").eq(prev).removeClass("slidebar_active");	//删除上一页的class
		$(".slidebar > li").eq(n).addClass("slidebar_active");			//添加当前页的class
		
		if( n !== 0){		//没在第一界面的时候，隐藏文字
			$(".button_next_text").fadeOut();
		}else{
			$(".button_next_text").fadeIn();
		}
		
		switch (n){
			case 0:
				stage1in();
			break;
		}
		prev = n;		//记录上一页
	}
}
function downFn(){			//滚轮向下触发的函数
	if(!onUp && !onDown){
		if(n>3)return;
		onDown = true;
		console.log("onDown")
		n++;
		console.log(n)
		$(".slidebar > li").eq(prev).removeClass("slidebar_active");
		$(".slidebar > li").eq(n).addClass("slidebar_active");
		
		if( n !== 0){		//没在第一界面的时候，隐藏文字
			$(".button_next_text").fadeOut();
		}else{
			$(".button_next_text").fadeIn();
		}
		
		switch(n){
			case 1:
				stage1out();
			break;
		}
		prev = n;
	}
}
//进入第一页
function stage1in(){
	$(".stage_1").addClass("stage_in");
	$(".stage_1").removeClass("stage_out");
	$(".stage_1_icon").css("top","0px");
	$(".stage_1_icon").css("opacity","1");
	$(".stage_1_title > li > span").each(function (index){
		$(this).css("top",$(this).data().t + "px");
		$(this).css("opacity","1")
	})
	$(".stage_1_sub_title").css("top","0");
	$(".stage_1_sub_title").css("opacity","1");
	$(".button_download").css("top","0");
	$(".button_download").css("opacity","1");
}

//离开第一页
function stage1out(){
	$(".stage_1").addClass("stage_out");
	$(".stage_1").removeClass("stage_in");
	$(".stage_1_icon").css("top","-300px");
	$(".stage_1_icon").css("opacity","0");
	$(".stage_1_title > li > span").css({
		"top":"-400px",
		"opacity":"0"
	});
	$(".stage_1_sub_title").css("top","-450px");
	$(".stage_1_sub_title").css("opacity","0");
	$(".button_download").css("top","-450px");
	$(".button_download").css("opacity","0");
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})