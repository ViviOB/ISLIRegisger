/*-------------------------------------------------------------------------------------------------------------------------------*/
/*
* 名称 :  change
* 功能 ： 项目切换
* 结构 ： <div><ul><li></li></ul></div>
* 作者 ： guan
* 时间 ： 2012
*/
function change(option){
	var area = (typeof option.area=="undefined")?jQuery(""):option.area;				//鼠标经过停止自动播放的区域
	var box = (typeof option.box=="undefined")?jQuery(""):option.box; 					//包含项目的容器
	var btn = (typeof option.btn=="undefined")?jQuery(""):option.btn;					//包含焦点按钮的容器
	var leftBtn = (typeof option.leftBtn=="undefined")?jQuery(""):option.leftBtn;		//左按钮
	var rightBtn = (typeof option.rightBtn=="undefined")?jQuery(""):option.rightBtn;	//右按钮
	var waitTime = (typeof option.waitTime=="undefined")?8000:option.waitTime;			//切换间隔时间
	var fadeTime = (typeof option.fadeTime=="undefined")?"slow":option.fadeTime;		//淡入淡出时间
	var autoPlay = (typeof option.autoPlay=="undefined")?true:option.autoPlay;			//是否自动播放
	
	var listNum = box.find("li").length;
	box.find("li").hide();
	box.find("li:first").addClass("active").show();
	btn.find("li:first").addClass("selected");
	
	//切换
	function changeItem(k){
		btn.find("li").removeClass("selected");
		btn.find("li").eq(k).addClass("selected");
		box.find("li").removeClass("active");
		box.find("li").eq(k).addClass("active");
		box.find("li").hide();
		box.find("li.active").fadeIn(fadeTime);
	}
	
	//点击左按钮
	leftBtn.click(function(){
		var e = box.find("li.active").index();
		if(e == 0){e = listNum;}
		e = e - 1;
		changeItem(e);
	});
	
	//点击右按钮
	rightBtn.click(function(){
		var e = box.find("li.active").index();
		if(e == listNum - 1){e = -1;}
		e = e + 1;
		changeItem(e);
	});
	
	//点击焦点按钮
	btn.find("li").click(function(){
		var e = jQuery(this).index();
		changeItem(e);
	});
	
	//自动播放
	function autoRun(){
		var e = box.find("li.active").index();
		if(e == listNum - 1){e = -1;}
		e = e + 1;
		changeItem(e);
	}
	
	if(autoPlay){    
        var intID = setInterval(autoRun,waitTime);                
        area.hover(function(){
            clearInterval(intID);
        },function(){
            intID = setInterval(autoRun,waitTime);
        });
    }
	
}
/*-------------------------------------------------------------------------------------------------------------------------------*/


//切换
$(function(){
	change({
		area : $(".scroll"),					//鼠标经过停止自动播放的区域
		box : $(".scrollImg"),					//包含项目的容器
		btn : $(".scrollBtn"),					//包含焦点按钮的容器
		leftBtn : $(".scroll a.leftBtn"),		//左按钮
		rightBtn : $(".scroll a.rightBtn"),		//右按钮
		waitTime : 5000,						//切换间隔时间
		fadeTime : "slow",						//淡入淡出时间
		autoPlay : true							//是否自动播放
	});
});

