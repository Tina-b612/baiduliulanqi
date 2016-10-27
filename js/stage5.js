;(function (){

	//储存每一个图标的位置
	$(".stage_5_subIcon").each(function (index){
		let top = $(this).position().top;
		let left = $(this).position().left;
		$(this).data("top",top);
		$(this).data("left",left);
	})
	
	//转浮动为定位,添加动画
	$(".stage_5_subIcon").each(function (index){
		$(this).css({
			/*"float":"none",*/
			"position":"absolute",
			"top":"0",
			"left":"50%",
			"margin-left": "-45px",
			"animation":"bounce 1s linear"
		})
	})
	
	
	//动画完成后，运动到各自的位置
	$(".stage_5_subIcon").eq(0).on("animationend",function (){
		$(".stage_5_subIcon").each(function (index){
			$(this).css({
				"top":0,
				"left":$(this).data("left"),
				"margin-left": 0
			})
		})
	})
	var n = 0;
	$(".stage_5_subIcon").eq(0).on("transitionend",function(){
		n++;
		if(n%2 === 0){
			$(".stage_5_subIcon").each(function (index){
				console.log(1235)
				$(this).css({
					"position":"static"
				})
			})
		}
		
	})
	//
	
	//鼠标移入
	$(".stage_5_subIcon_wrap").on("mousemove",function (ev){
		var x =  ev.clientX; 	//鼠标的x轴坐标值
		
		$(".stage_5_subIcon").each(function (index){
			//图标中心x轴坐标值
			let center = $(this).offset().left + 45;
			//鼠标距离图标中心的值
			let dis = Math.abs(x - center);
			
			var scale = dis/270;
			
		})
		
		if(ev.target.nodeName === "IMG"){
			let par = $(ev.target).parent();
			$(ev.target).css({
				/*"width": 90*2+"px",
				"height": 80*2+"px"*/
			})
			par.css({
				/*"width": 90*2+"px",
				"height": 80*2+"px"*/
			})
		}
		
		
		
		
		
	})
	
	/*$(".stage_5_subIcon").each(function (index){
		$(this).on("mouseover",function (ev){
			let x =  ev.clientX;
			let left = $(this).offset().left + 45;
			let dis = Math.abs(x - left);
			console.log(dis)
		})
		$(this).on("mousemove",function (ev){
			let x =  ev.clientX;
			
			
			
		})
	})*/
	
	
	
	
	
	
	
	
	
	
	
})();

