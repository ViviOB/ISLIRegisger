$(document).ready(function(){
	var bd = $("body");
	
	//分辨率宽度小雨1200清除两边padding
	if($(window).width() < 1200){
		bd.addClass("clearpad");
	}
	
	//字体放大
	$("#j_enlarge").click(function(){
		var t = $(this);
		if(t.attr("c") == "false"){
			t.attr("c","true");
			bd.addClass("font-enlarge");
		}
		else{
			t.attr("c","false")
			bd.removeClass("font-enlarge");			
		}
		return false;
	});
	
	//左栏菜单展开、收缩
	$("#j_menu").delegate(".item h3","click",function(){
		var t = $(this),obj = t.parent().parent().next();
		t.next("ul").removeClass("hidden").parent().siblings().find("ul").addClass("hidden");
		return false;
	});
	
	//焦点图片
	$("#focusText").height($("#focusImg").height());
	var focusTimeout;
	var focusAnimation =function(t){
		clearTimeout(focusTimeout);
		var obj =$("#focusText li");
		if(!t){
			var t = obj.filter(".on").next();
		}
		if(t.length == 0){
			t = obj.eq(0);
		}
		t.addClass("on").siblings().removeClass("on");
		$("#focusImg a").removeClass("on").fadeOut().eq(t.index()).addClass("on").fadeIn(600);
		focusTimeout = setTimeout(function(){focusAnimation(t.next())},4000);
	}
	
	setTimeout(focusAnimation,4000);
	
	$("#j_focus").delegate("#focusText li","mouseover",function(){
		var t = $(this);
		if(t.attr("class") != "on"){
			focusAnimation(t);
		}
		return false;
	});
	
	//弹出申请延期
	$("#j_prefixManagement").delegate(".extension,.revocation","click",function(){
		if($(this).attr("class") == "extension"){
			$.Dialog("申请延期", '<ul><li><form action="#" id="delayDescForm"><label>延期原因：</label><textarea pid="opeDesc" class="ta1" name="opeDesc" id="'+$(this).attr('pid')+'"></textarea></li><li><label>延期时长：</label><select id="days"></select></form></li></ul>', 400, 213,"apply-extension");
		}
		else{
			if ($(this).attr('title') == '取消'){
				$.Dialog("取消", '<ul><li><label>取消原因：</label><textarea class="ta1" name="applyDesc" id="'+$(this).attr('pid')+'"></textarea></li></ul>', 400, 178,"apply-revocation");
			}else{
				$.Dialog("申请撤销", '<ul><li><label>撤销原因：</label><textarea class="ta1" name="opeDesc" id="'+$(this).attr('pid')+'"></textarea></li></ul>', 400, 178,"apply-revocation");
			}
			
		}
		$.ajax({
			url:$("#contextPath").val() + '/prefixcodemanage/getDelayDays',
			type:'post',
			dataType:'json',
			cache:false,
			success: function(data) {
				var mprDeadlie =  data.split("|");
				$.each(mprDeadlie, function(i, item) {
					$('<option/>').attr('value', item)
						.text(item+'天').appendTo($('#days'));
				});
			}
		});
		return false;
	});
	
	//MPR前置码管理详情修改展开、收缩
	$("#j_prefixDetail").delegate(".expan,.less","click",function(){
		var t = $(this),obj = t.parent().parent().next();
		if(t.attr("class") == "expan"){
			t.removeClass("expan").addClass("less");
			obj.removeClass("hidden");
		}
		else{
			t.removeClass("less").addClass("expan");
			obj.addClass("hidden");
		}
		return false;
	});
});