(function ($) {
//弹出框
	$.Dialog = function (t, con, w, h, cls) { //t：标题, con：嵌入内容, w：宽, h：高容, cls：模块class
        var ifr, html, dl_close, obj, mask,
        bd = $("body", window.parent.document),
        sd_h = $(window.parent.document).height(), //页面高$(window.parent.document)
        dl_ml = -w / 2,
        dl_mt = -h / 2,
		mask = $("#mask"),
		obj = $("#dialog");
		
		//关闭弹出框
        dl_close = function () {
        	bd.find("#dialog,#mask").empty().remove();
            return false;
        };
		
		if (mask.length > 0) {
			mask.height(sd_h).removeClass("hidden");
		}
		else {
			html = '<div id="mask" class="mask" style="height:' + sd_h + 'px;"></div>';
		}
		
		if (obj.length > 0) {
			//如果元素存在，则改变相应的样式与属性
			obj.attr("class","dialog " + cls).css({ "width": w + "px", "height": h + "px", "margin": dl_mt + "px 0 0 " + dl_ml + "px" }).find(".dl-hd h5").text(t).end().find(".dl-con").html(con).end().removeClass("hidden");
		}
		else {			
			html = $(html+'<div id="dialog" class="dialog ' + cls + '" style="width:' + w + 'px; height:' + h + 'px; margin: ' + dl_mt + 'px 0 0 ' + dl_ml + 'px;"><div class="dl-hd"><s class="dl-ico"></s><h5>' + t + '</h5><a class="dl-close" href="#" title="关闭"></a></div><div><div class="dl-con">' + con + '</div><div class="dl-btn"><a class="btn btn-two round" href="javascript:void(0);" title="提交"><span class="inner">提交</span></a><a class="dl-close btn btn-three round" href="javascript:void(0);" title="取消"><span class="inner">取消</span></a></div></div></div>');
			html.find(".dl-close").bind('click', dl_close);
		}
		
		if(mask.length < 1 || obj.length < 1){
			bd.prepend(html);
			// MPR申请单审批确定按钮添加事件
		}   
    };
})(jQuery);