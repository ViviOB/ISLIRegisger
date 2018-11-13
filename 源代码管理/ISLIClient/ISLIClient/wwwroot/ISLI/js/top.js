$(function() {
	 //$.ajaxSetup({ cache: false });
	
	$(".nav li ul").hide();

	var url = decodeURI(document.URL);
	var site = url.lastIndexOf("/");
	var name = url.substring(site + 1, url.length);
	
	getNavigationsRoot();
	
	$("#title li a").removeClass("current");
	$.each($("#title li a"), function(i, nav) {
		var rel = $(this).attr('navid');
		if (rel == name) {
			$(this).addClass('current');
		}
	});
	
	var parentnavid=$(".leftMenu>ul>li a").attr("parentnavid");
	$.each($("#title li a"), function(i, nav) {
		var rel = $(this).attr('navid');
		if (rel == parentnavid) {
			$(this).addClass('current');
		}
	});
	

	
	//顶部导航鼠标经过时间
	$('.navs .lifirst').hover(function() {
				var thisul = $(this).find('ul');
				var liLength = $(this).find('ul li').length;
				$(this).find('.ali').addClass('select');
				if (liLength == 0) {
				var navigationRoot = $(this).find('.ali').attr("navid");
					$.ajax({
								url : contextPath
										+ "/web/navigation/navigationsSub/"
										+ navigationRoot +"?timestamp=" + new Date().getTime(),
								type : "get",
								dataType : "json",
								async : false,
								success : function(data) {
									if (!$.isEmptyObject(data) && !$.isEmptyObject(data.data)) {
									if (data.data.length > 0) {
										var url = "";
										$.each(data.data,function(i,subNavigation) {
															url = contextPath
																	+ '/web/navigation/toNavigationPage/'
																	+ subNavigation.navigationId;
															thisul
																	.append("<li><a href='"
																			+ url
																			+ "' navId='"
																			+ subNavigation.navigationId
																			+ "' >"
																			+ subNavigation.navigationI18n.navigationName+ "</a></li>");
														});
									}
									}
								}
								
							});
				}
		

				$(this).find('ul').show().css("top","45px");
				resizeWidth($(this));
				if($('.navs .lifirst:last').find(".clearfix").width()>240){
					$('.navs .lifirst:last').find(".clearfix").css("right","0")
				}
				if($('.navs .lifirst').eq($('.navs .lifirst').length-2).find(".clearfix").width()>350){
					$('.navs .lifirst').eq($('.navs .lifirst').length-2).find(".clearfix").css("right","0")
				}
				
			}, function() {
				/* 这是鼠标移走之后的操作 */
				/*$(this).siblings('ul').slideUp();*/
				$(this).find('ul').remove('li');
				$(this).find('ul').css("display", "none");
				$(this).find('.ali').removeClass('select');
			});
	
	//校验非法字符
	$("input").attr("onblur","AntiSqlValid(this)");
	$("textarea").attr("onblur","AntiSqlValid(this)");

		
});


/**
 * 获取导航一级跟节点
 */
function getNavigationsRoot() {
	$.ajax({
		url : contextPath + "/web/navigation/navigationsRoot?timestamp=" + new Date().getTime(),
		type : "get",
		dataType : "json",
		async : false,
		success : function(data) {
			var html = "";
			var url = "";
			$.each(data.data, function(i, oneNavigation) {
				if (i<6 & oneNavigation.parentId == 0) {
					html += "<li class='lifirst'>";
					url = contextPath + '/web/navigation/toNavigationPage/'
							+ oneNavigation.navigationId;
					html += "<a href='" + url + "' class='ali' navId='"
							+ oneNavigation.navigationId + "' >"
							+ oneNavigation.navigationI18n.navigationName
							+ "</a>";
					html += "<ul class='clearfix'>";
					html += "</ul>";
					html += "</li>";

				}
			});
			$("#title").html(html);
		}
	});
}

function goToPageHome() {
	window.location.href = contextPath + "/web/navigation/toNavigationPage/1";
}
function resizeWidth(obj){
	var widthArr=[];
	obj.find("ul li").each(function(){
		widthArr.push($(this).find("a").width());
	});
	var maxWidth = getArrayMax(widthArr);
	if(maxWidth < 157)maxWidth = 157;
	obj.find("ul li,ul").css("min-width",maxWidth);


}

function getArrayMax(arr){
	var max = 0;
	if(arr && arr.length > 0){
		for(var i=0;i<arr.length;i++){
			if(arr[i] > max)
				max = arr[i];
		}
	}
	return max;
}


//防止SQL注入
function AntiSqlValid(oField){
    re= /select|update|delete|exec|count|'|"|=|;|>|<|%/i;
    var textValue = oField[0]?oField.val():oField.value;
    if ( re.test(textValue) ){ 
	    var dialogBox = '<div class="boombgSql"></div><div class="wrap-dialog">'
		+'<div class="dialog-header">'
		+	'<p class="dialog-title">'+message.defaults.tipTitle+'</p>'
		+'</div>'
		+'<div class="dialog-body">'
		+	'<p class="dialog-message">'+message.defaults.antiSql+'</p>'
		+'</div>'
		+'<div class="dialog-footer">'
		+	'<button class="btn" id="confirm">'+message.defaults.okButton+'</button>'
		+'</div>'
	    +'</div>';
	    
	    if(!$("body").find(".wrap-dialog")[0]){
	    	$("body").append(dialogBox);
	    }
	    
	    // 显示遮罩和对话框
		$('.boombgSql').show();
		$('.wrap-dialog').show();
		// 确定按钮
		$('#confirm').click(function() {
			$('.boombgSql').hide();
			$('.wrap-dialog').hide();
			yesCallback(oField);
		});	    
		
		return 'false';
		
    }
}

function yesCallback(oField){
	if(!oField[0]){
    	oField.value = "";
	    oField.focus();
    }else{
    	oField.val('');
    	oField[0].focus();
    	if(oField[0].name == "keyword" || oField.attr("id") == "bookNo2"){
    		window.location.reload();
    	}
    }
	return false;
}
