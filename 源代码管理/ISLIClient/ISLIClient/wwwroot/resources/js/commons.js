$(document).ready(function() {
/*
 * update by wangl 添加鼠标处理事件
 */
	
	   $("form").find("input").on("keyup", function (event) {
           var e = event || window.event || arguments.callee.caller.arguments[0];
           if (e && e.keyCode == 13) {
        		if($('#searchBtn').length > 0){
		    		$('#searchBtn').click();
		    	}else{
		    		if(typeof(searchData) == "function"){
			    		searchData();//处理事件
			    	}else{
			    			return false;
			    	}
			    }
           }
       });
});
/**
 * 转化URL参数为JSON对象
 * 
 * @param tourl
 * @returns
 */
function _parserUrl(tourl)// 解析URL并转换为json形式
{
	if (!tourl)
		return;
	var paramsArr = tourl.split('?')[1].split('&');
	var args = {}, argsStr = [], param, name, value;
	args['url'] = encodeURIComponent(tourl.split('?')[0]); // 首先载入url,问号"?"前面的部分
	for ( var i = 0; i < paramsArr.length; i++) {
		param = paramsArr[i].split('=');
		name = param[0], value = param[1];
		if (name == "")
			name = "unkown";
		if (typeof args[name] == "undefined") { // 参数尚不存在
			args[name] = value;
		} else if (typeof args[name] == "string") { // 参数已经存在则保存为数组
			args[name] = [ args[name] ];
			args[name].push(value);
		} else { // 已经是数组的
			args[name].push(value);
		}
	}

	var showArg = function(x) { // 转换不同数据的显示方式
		if (typeof (x) == "string" && !/\d+/.test(x))
			return "'" + x + "'"; // 字符串
		if (x instanceof Array)
			return "[" + x + "]"; // 数组
		return x; // 数字
	}
	args.toString = function() {// 组装成json格式
		for ( var i in args)
			argsStr.push(i + ':' + showArg(args[i]));
		return '{' + argsStr.join(',') + '}';
	}
	return args; // 以json格式返回获取的所有参数
}
/**
 * 获取当天日期
 * @returns {String}
 */
function getTodayDate() {
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var date = d.getDate();
	var day = d.getDay();
	var curDateTime = year + "-";
	if (month > 9)
		curDateTime = curDateTime + month;
	else
		curDateTime = curDateTime + "0" + month;
	if (date > 9)
		curDateTime = curDateTime + "-" + date;
	else
		curDateTime = curDateTime + "-" + "0" + date;
	return curDateTime;
}
/**
 * 获取三十天之前对日期
 * @returns {String}
 */
function getPreviousDate() {
	var today = new Date();
	var todayLong = today.getTime();
	var previousMonthLong = todayLong - 2592000000;
	var previousMonth = new Date(previousMonthLong);

	var year = previousMonth.getFullYear();
	var month = previousMonth.getMonth() + 1;
	var date = previousMonth.getDate();
	var curDateTime = year + "-";
	if (month > 9)
		curDateTime = curDateTime + month;
	else
		curDateTime = curDateTime + "0" + month;
	if (date > 9)
		curDateTime = curDateTime + "-" + date;
	else
		curDateTime = curDateTime + "-" + "0" + date;
	return curDateTime;
}
/**
 * 取当前的日期
 */
function curDateTime() {
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var date = d.getDate();
	var day = d.getDay();
	var curDateTime = year + "-";
	if (month > 9)
		curDateTime = curDateTime + month;
	else
		curDateTime = curDateTime + "0" + month;
	if (date > 9)
		curDateTime = curDateTime + "-" + date;
	else
		curDateTime = curDateTime + "-" + "0" + date;

	return curDateTime;

}

// 求2个日期相差天数
function daysBetween(DateOne, DateTwo) {
	var OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'));
	var OneDay = DateOne
			.substring(DateOne.length, DateOne.lastIndexOf('-') + 1);
	var OneYear = DateOne.substring(0, DateOne.indexOf('-'));
	var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'));
	var TwoDay = DateTwo
			.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1);
	var TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'));
	var cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date
			.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000);
	return Math.abs(cha);
}


function TimesBetween(startDate,endDate){

	var date=StrToDate(endDate).getTime()-StrToDate(startDate).getTime()  //时间差的毫秒数
	var days=date/(24*3600*1000)
	return days ;
}

/*
 * 字符串和date 转换
 */
 function StrToDate  (c_date) {

    var tempArray = c_date.split("-");
    if (tempArray.length != 3) {
        alert("你输入的日期格式不正确,正确的格式:2000-05-01 02:54:12");
        return 0;
    }
    var dateArr = c_date.split(" ");
    var date = null;
    if (dateArr.length == 2) {
        var yymmdd = dateArr[0].split("-");
        var hhmmss = dateArr[1].split(":");
        date = new Date(yymmdd[0], yymmdd[1] - 1, yymmdd[2], hhmmss[0], hhmmss[1], hhmmss[2]);
    } else {
        date = new Date(tempArray[0], tempArray[1] - 1, tempArray[2], 00, 00, 01);
    }
    return date;
}

/**
 * 给 文本域添加 maxLength 属性
 * 
 * @param o
 * @param maxLength
 * @returns {Boolean}
 */
// 给文本域添加 maxLength
// -------------------------------------------------------------------------------------------
// start
 function onmyinput(o,maxLength)
 {
  if(o.value.length>= maxLength)
  {
   if(o.value.length> maxLength)
    o.value = o.value.substring(0,maxLength);
    return false;
  }
  return true;
 }
 function mygetclipdata()
 {
  if(!document.all)
  {
   netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
   var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
   var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
   trans.addDataFlavor('text/unicode');
   var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
   clip.getData(trans,clip.kGlobalClipboard);
   var str=new Object();
   var strLength=new Object();
   trans.getTransferData("text/unicode",str,strLength); 
  
   if (str)
   str=str.value.QueryInterface(Components.interfaces.nsISupportsString);
   var pastetext;
   if (str)
   pastetext=str.data.substring(0,strLength.value / 2);
   return pastetext;
  }
  else
  {
   return window.clipboardData.getData("Text");
  }
 }
 function mysetclipdata(o)
 {
  if(!document.all)
  {
   netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
   var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
   var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
   trans.addDataFlavor("text/unicode");
   var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
   str.data=o;
   trans.setTransferData("text/unicode",str,o.length*2);
   var clipid=Components.interfaces.nsIClipboard;
   clip.setData(trans,null,clipid.kGlobalClipboard);
  }
  else
  {
   window.clipboardData.setData("Text",o);
  }
 }
 function onmypaste(o, maxLength)
 {	 
  var nMaxLen=o.getAttribute? parseInt(maxLength):"";
  if(!document.all)
  {
	  return false;
  }
  else
  {
   if(document.selection.createRange().text.length>0)
   {
	   
    var ovalueandclipboarddata = o.value +window.clipboardData.getData("Text");
    if(o.getAttribute && ovalueandclipboarddata.length-document.selection.createRange().text.length>nMaxLen)
    {
     if(window.clipboardData.getData("Text").substring(0,document.selection.createRange().text.length+nMaxLen-o.value.length)!="")
      window.clipboardData.setData("Text",window.clipboardData.getData("Text").substring(0,document.selection.createRange().text.length+nMaxLen-o.value.length).replace(/(\s*$)/g, ""));
     else
      return false;
    }
   }
   else
   {
    var ovalueandclipboarddata = o.value +window.clipboardData.getData("Text");
    if(o.getAttribute && ovalueandclipboarddata.length>nMaxLen)
    {
     if(ovalueandclipboarddata.substring(0,nMaxLen-o.value.length)!=""){
         window.clipboardData.setData("Text",ovalueandclipboarddata.substring(0,nMaxLen-o.value.length).replace(/(\s*$)/g, ""));//去除尾部空格;
      }
     else{
        return false;
      }
    }
   }
   return true;
  }

 }
 function onmykeypress(o, maxLength)
 {
  if(!document.all)
  {
   var nMaxLen=o.getAttribute? parseInt(maxLength):"";

   if(onmykeypress.caller.arguments[0].ctrlKey == true)
   {
    if(onmykeypress.caller.arguments[0].which==118)
    {

     if(o.selectionStart<o.selectionEnd)
     {
      var ovalueandclipboarddata = o.value + mygetclipdata();
      if(o.getAttribute && (ovalueandclipboarddata.length-o.selectionEnd + o.selectionStart>nMaxLen))
      {
       if(mygetclipdata().substring(0,o.selectionEnd - o.selectionStart+nMaxLen-o.value.length)!="")
        mysetclipdata(mygetclipdata().substring(0,o.selectionEnd - o.selectionStart+nMaxLen-o.value.length));
       else
        return false;
      }
     }
     else
     {
      var ovalueandclipboarddata = o.value +mygetclipdata();
      if(o.getAttribute && ovalueandclipboarddata.length>nMaxLen)
      {
       if(ovalueandclipboarddata.substring(0,nMaxLen-o.value.length)!="")
        mysetclipdata(ovalueandclipboarddata.substring(0,nMaxLen-o.value.length));
       else
        return false;
      }
     }
     return true;

    }
   }


   if(onmykeypress.caller.arguments[0].which==0 || onmykeypress.caller.arguments[0].which==8)
    return true;
   if(o.value.length>= maxLength)
   {
    if(o.selectionStart<o.selectionEnd)
     return true;
    if(o.value.length> maxLength)
     o.value = o.value.substring(0, maxLength);
    return false;
   }
   else
    return true;
  
  }
  else
  {
   if(document.selection.createRange().text.length>0)
    return true;
   if(o.value.length>= maxLength)
    return false;
   else
    return true;
  }
 }
 window.onload = init_MaxLength;
 function init_MaxLength () 
 {
	
   var textAreaObj = document.getElementsByTagName("textarea");
   var maxLength;
   for (var i = 0; i < textAreaObj.length; i++) {
       maxLength = textAreaObj[i].getAttribute("maxLength") == null ? 0 : textAreaObj[i].getAttribute("maxLength");
       if (maxLength == 0) continue;
           textAreaObj[i].onpaste = function(){ return onmypaste(this,maxLength)};
           textAreaObj[i].onkeypress = function(){ return onmykeypress(this,maxLength)};
           textAreaObj[i].onpropertychange = function(){ onmyinput(this,maxLength)};
         if(!document.all){
           textAreaObj[i].setAttribute("oninput","return onmyinput(this," + maxLength + ")");
         }
   }
 }
// 给文本域添加 maxLength
// -------------------------------------------------------------------------------------------

 
 //解决js跨站脚本问题
 function getSafeString(str){
	 if(str==null || str=='') return "";
	 var nullObj = $("#nullObj");
	 if( !(nullObj.length >0) ){
	     //object not exist
	 	$("body").append('<p id="nullObj" style="display:none;"></p>');
	 	nullObj = $("#nullObj");
	 }
	 var result =  nullObj.text(str).html();
	 nullObj.html('');//reset dom text node
	 return result;
}
//只能输入数字
function myKeyDown(event) {
	var k = event.keyCode;
	if (event.shiftKey && (k > 47 && k < 58)) {
		event.returnValue = false;
	} else if ((k == 46) || (k == 8) || (k >= 48 && k <= 57) || (k >= 96 && k <= 105)
			|| (k >= 37 && k <= 40)) {
	} else if (k == 13) {
		window.event.keyCode = 9;
	} else {
		event.returnValue = false;
	}
}
//获取主机名和端口号
function getHost(){
	return window.location.host+":"+window.location.port;
}

//去左右空格
function trim(str){   
	if(str!=undefined && str!=null){
		str = str.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');  
	}
	return str;
}

/**
 * 判断字符的长度
 * @param name 字符串
 * @returns {Number}
 */
function len(name) {
	if(name=="" || name==null){
		return 0;
	}
	var l = 0;
	var names = name.split("");
	for (var i=0;i<names.length;i++) {
		if (names[i].charCodeAt(0)<299) {
			l++;
		} else {
			l+=2;
		}
	}
	return l;
}

function iframeAutoFit()
{
 	var ex;
 	try
 	{
 		if(window!=parent)
 		{
 			var a = parent.document.getElementsByTagName("IFRAME");
 			for(var i=0; i<a.length; i++) 
			{
				if(a[i].contentWindow==window)
				{
					var h1=0, h2=0;
					if(document.documentElement && document.documentElement.scrollHeight)
					{
						h1=document.documentElement.scrollHeight;
					}
					if(document.body) h2=document.body.scrollHeight;

					var h=Math.max(h1, h2);
					if(document.all) {h += 4;}
					if(window.opera) {h += 1;}
					a[i].style.height = h +"px";
				}
			}
		}
	}
	catch (ex){}
}


//设置内容iframe高度
function ifrHeight(){
	var iframe = parent.document.getElementById("j_main");
	if(undefined==iframe||null==iframe){return;};
	var iDoc = iframe.contentWindow.document;
	ifrHeight.scrollTop = getScrollTop(parent);
	iframe.height = 0; // 重设为0后才能保证取到正确的scrollHeight	
	//console.log(ifrHeight.scrollTop)
	iframe.height = Math.max(iDoc.documentElement.scrollHeight, iDoc.body.scrollHeight);
	parent.scrollBy(0,ifrHeight.scrollTop);
	ifrHeight.scrollTop = 0;
	function getScrollTop(w) {
	    return ('pageYOffset' in w) ? w.pageYOffset
	        : w.document.compatMode === "BackCompat"
	        && w.document.body.scrollTop
	        || w.document.documentElement.scrollTop ;
	}
	//var j_menu_h1 = $(window.parent.document).find('#j_menu').contents().find("body")[0].scrollHeight;
	//var j_main_h = $(window.parent.document).find('#j_main').contents().find("body").height();
	
	//var j_menu_h = $(window.parent.document).find('#j_menu').contents().find("body").height();
	
	//var height = j_main_h>(j_menu_h==undefined?630:j_menu_h)?j_main_h:j_menu_h;
	//alert("  "+j_menu_h +"  " + j_main_h);
	
	//$("#j_menu", window.parent.document).height(height);
	//$("#j_main", window.parent.document).height(height);
	
	//$("#j_menu", window.parent.document).css({"height":"auto"}).height(height);
	//$("#j_main", window.parent.document).css({"height":"auto"}).height(j_main_h);
	//$("#j_menu", window.parent.document).css({"height":"auto"}).height($(document).height());
};


/**
 * Confirm
 * @param content 内容
 * @param title	提示
 * @param callBack 回调函数
 * @param icoCss 图标样式 默认感叹号(问号：question_mark 对号：right_mark)
 * @returns 
 * 
 * example：	dynamicConfirm("确认审批这条记录？", "提示", function(res){
 *				alert(20);
 *			   //点击OK res=true 点击 Cancel res=false
 *		     });
 */
function dynamicConfirm(content, title, callBack, icoCss, okText, cancelText , okCss, cancelCss){
 
	var passCn = $(top.document.createElement("div")).addClass("passCnt"),
		pcnTi = $(top.document.createElement("h3")).addClass("pcnTit").html(checkValue(title, checkValue(dynamicConfirm.prototype.title, "title"))),
		pcnClo1 = $(top.document.createElement("span")).addClass("pcnClo1t"),
		bobgHe = $(top.document.createElement("div")).addClass("bobgHet"),
		gan_o1 = $(top.document.createElement("span")).addClass(icoCss == undefined ? "gan_o1t" : icoCss ),
		gan_o2 = $(top.document.createElement("span")).addClass("gan_o2t").html(checkValue(content, "")),
		btncal = $(top.document.createElement("div")).addClass(checkValue(cancelCss, "btnOkt btncalt")).html(checkValue(cancelText, checkValue(dynamicConfirm.prototype.cancel, "cancel"))),
		btnOk = $(top.document.createElement("div")).addClass(checkValue(okCss, "btnOkt")).html(checkValue(okText, checkValue(dynamicConfirm.prototype.ok,"ok"))),
		clear = $(top.document.createElement("div")).addClass("clear");
	
	pcnClo1.click(function(){
		$(this).parent().parent().empty().remove();
		callBack(false);
		closeCoverDiv();
	});
	btncal.click(function(){
		$(this).parent().empty().remove();
		callBack(false);
		closeCoverDiv();
	});
	btnOk.click(function(){
		$(this).parent().empty().remove();
		callBack(true);
		closeCoverDiv();
	});
	
	pcnClo1.appendTo(pcnTi);
	gan_o1.appendTo(bobgHe);
	gan_o2.appendTo(bobgHe);
	pcnTi.appendTo(passCn);
	bobgHe.appendTo(passCn);
	btncal.appendTo(passCn);
	btnOk.appendTo(passCn);
	clear.appendTo(passCn);
	passCn.appendTo($(top.document.body));
	isCoverDiv();
	objectCenter(passCn.show());
	dynamicDivHeight(passCn);
	this.callBack = function(){};
};

/**
 * dynamicConfirm 高级版本（优化传值）
 * 
 * @param params 参数对象
 * @returns 
 * var params = {content:"同步前置码废除信息到国际平台失败！", title:"提示"};
 * example：	dynamicConfirm(params, function(res){
 *				alert(20);
 *			   //点击OK res=true 点击 Cancel res=false
 *		     });
 */
function dynamicHighConfirm(params, callBack){
	
	var _params = {
			//展示内容
			content:null,
			//标题
			title:null,
			// icoCss 图标样式 默认感叹号(问号：question_mark 对号：right_mark)
			icoCss:null,
			//确定按钮内容，默认：OK
			okText:null,
			//取消按钮内容，默认：CANCEL
			cancelText:null,
			//确定按钮演示
			okCss:null,
			//取消按钮演示
			cancelCss:null
			};
	
	$.extend(true, _params, params); 
	
	var passCn = $(top.document.createElement("div")).addClass("passCnt"),
	pcnTi = $(top.document.createElement("h3")).addClass("pcnTit").html(checkValue(_params.title, checkValue(dynamicConfirm.prototype.title, "title"))),
	pcnClo1 = $(top.document.createElement("span")).addClass("pcnClo1t"),
	bobgHe = $(top.document.createElement("div")).addClass("bobgHet"),
	gan_o1 = $(top.document.createElement("span")).addClass(_params.icoCss == undefined ? "gan_o1t" : _params.icoCss ),
	gan_o2 = $(top.document.createElement("span")).addClass("gan_o2t").html(checkValue(_params.content, "")),
	btncal = $(top.document.createElement("div")).addClass(checkValue(_params.cancelCss, "btnOkt btncalt")).html(checkValue(_params.cancelText, checkValue(dynamicConfirm.prototype.cancel, "cancel"))),
	btnOk = $(top.document.createElement("div")).addClass(checkValue(_params.okCss, "btnOkt")).html(checkValue(_params.okText, checkValue(dynamicConfirm.prototype.ok,"ok"))),
	clear = $(top.document.createElement("div")).addClass("clear");
	
	pcnClo1.click(function(){
		$(this).parent().parent().empty().remove();
		callBack(false);
		closeCoverDiv();
	});
	btncal.click(function(){
		$(this).parent().empty().remove();
		callBack(false);
		closeCoverDiv();
	});
	btnOk.click(function(){
		$(this).parent().empty().remove();
		callBack(true);
		closeCoverDiv();
	});
	
	pcnClo1.appendTo(pcnTi);
	gan_o1.appendTo(bobgHe);
	gan_o2.appendTo(bobgHe);
	pcnTi.appendTo(passCn);
	bobgHe.appendTo(passCn);
	btncal.appendTo(passCn);
	btnOk.appendTo(passCn);
	clear.appendTo(passCn);
	passCn.appendTo($(top.document.body));
	isCoverDiv();
	objectCenter(passCn.show());
	dynamicDivHeight(passCn);
	this.callBack = function(){};
};


/**
 * 和Alert功能一样
 * @param content 提示内容
 * @param title	  标题
 * @param icoCss  图标样式 默认感叹号(问号：question_mark 对号：right_mark)
 */
function dynamicAlert(content, title, icoCss){
	var passCn = $(top.document.createElement("div")).addClass("passCnt"),
		pcnTi = $(top.document.createElement("h3")).addClass("pcnTit").html(checkValue(title, checkValue(dynamicAlert.prototype.title, "title"))),
		pcnClo1 = $(top.document.createElement("span")).addClass("pcnClo1t"),
		bobgHe = $(top.document.createElement("div")).addClass("bobgHet"),
		gan_o1 = $(top.document.createElement("span")).addClass(icoCss == undefined ? "gan_o1t" : icoCss ),
		gan_o2 = $(top.document.createElement("span")).addClass("gan_o2t").html(checkValue(content, "")),
		btnOk = $(top.document.createElement("div")).addClass("btnOkt").html(checkValue(dynamicAlert.prototype.ok, "ok")),
		clear = $(top.document.createElement("div")).addClass("clear");
	
	pcnClo1.click(function(){
		$(this).parent().parent().empty().remove();
		closeCoverDiv();
	});
	 
	btnOk.click(function(){
		$(this).parent().empty().remove();
		closeCoverDiv();
	});
	
	pcnClo1.appendTo(pcnTi);
	gan_o1.appendTo(bobgHe);
	gan_o2.appendTo(bobgHe);
	pcnTi.appendTo(passCn);
	bobgHe.appendTo(passCn);
	btnOk.appendTo(passCn);
	clear.appendTo(passCn);
	passCn.appendTo($(top.document.body));
	isCoverDiv();
	dynamicDivHeight(passCn);
	objectCenter(passCn.show());
};

/**
 * 描述：自定义内容弹出框
 * 注意：这个方法需要自己调关闭遮盖层方法：closeCoverDiv();（根据自己业务逻辑定）
 * @param setting 
 * title		标题
 * okText	 OK按钮显示的文字
 * key		 主键的ID和name值
 * txtAread  多文本框
 * @returns {___anonymous3784_4253}返回弹出层本身对象（jquery对象）
 */
function dynamicPopDiv(setting){
	var _setting = {
			title: null,
			okText: null,
			cancelText: null,
			key: null,
			txtAread: null,
			tip:null,
			OkCss:null,
			cancelCss:null,
			content:null
	};
	$.extend(true, _setting, setting); 
	var popDiv = {
			passCn : $(top.document.createElement("div")).addClass("passCnt"),
			h3 : $(top.document.createElement("h3")).addClass("pcnTit").html(_setting.title),
			pcnClo1 : $(top.document.createElement("span")).addClass("pcnClo1t").click(function(){
				$(this).parent().parent().empty().remove();
				closeCoverDiv();
			}),
			key : $(top.document.createElement("input")).attr("type", "hidden").attr("name", _setting.key).attr("id", _setting.key),
			btnOk : $(top.document.createElement("div")).addClass(checkValue(_setting.OkCss, "btnOkt")).html(checkValue(_setting.okText, "")),
			btnCancel : $(top.document.createElement("div")).addClass(checkValue(_setting.cancelCss, "btnOkt btncalt")).html(checkValue(_setting.cancelText, "")),
			pTipE : $(top.document.createElement("div")).addClass("pTipE"),//错误提示div
			clear : $(top.document.createElement("div")).addClass("clear"),
			form : $(top.document.createElement("form")).addClass("formD_1x"),
			element: _setting
	};
	
	popDiv.pcnClo1.appendTo(popDiv.h3);
	popDiv.h3.appendTo(popDiv.passCn);
	//判断有没有textArea元素
	if(null != _setting.txtAread){
		
		//把textArea元素加入到弹出层中
		_setting.txtAread.appendTo(popDiv.form);
		
		//给textArea设置提示语、focus事件
		_setting.txtAread.html(_setting.tip).focus(function(){

			var val = $(this);
			if(val.val() == _setting.tip){
				//获取焦点清空textArea并设置字体颜色
				val.val("").css("color","#595959");
			};
			popDiv.pTipE.empty();
		});
	};
	
	if(null != _setting.content){
		_setting.content.appendTo(popDiv.form);
	};
	popDiv.key.appendTo(popDiv.form);
	popDiv.form.appendTo(popDiv.passCn);
	if(null != _setting.cancelText){
		popDiv.btnCancel.appendTo(popDiv.passCn);
	};
	popDiv.btnOk.appendTo(popDiv.passCn);
	popDiv.pTipE.appendTo(popDiv.passCn);
	popDiv.clear.appendTo(popDiv.passCn);
	popDiv.passCn.appendTo($(top.document.body));
	objectCenter(popDiv.passCn.show());
	isCoverDiv();
	dynamicDivHeight(popDiv.passCn);
	return popDiv;
};

/**
 * 弹出DIV居中
 * @param obj Div对象
 */
function objectCenter(obj){
	var windowWidth = top.document.documentElement.clientWidth,
		windowHeight = top.document.documentElement.clientHeight,
		popupHeight = $(obj).height(),
		popupWidth = $(obj).width();
	$(obj).css({
		"position": "absolute",
		"top": (windowHeight-popupHeight)/2+$(top.document).scrollTop()
	});
};
 
/**
 * 
 * 动态设定对象高度
 * @param div
 */
function dynamicDivHeight(div){
	var windowWidth = top.document.documentElement.clientWidth,
		windowHeight = top.document.documentElement.clientHeight,
		popupHeight = div.height(),
		popupWidth = div.width();
	
	$(top.window).scroll( function() { div.animate({top:($(top.window.document).scrollTop() + (windowHeight-popupHeight)/2) }, 65)} );
};

/**
 * 判断是否存在遮盖层，存在直接显示，不存在直接生成
 */
function isCoverDiv(){
	var cover = $(top.document.createElement("div")).addClass("tanCd1").attr("id", "iscoverdiv_xxx").height($(top.document).height()).show();
	closeCoverDiv();
	cover.appendTo($(top.document.body));
};

/**
 * 关闭遮盖层
 */
function closeCoverDiv(){
	$("#iscoverdiv_xxx", top.document.body).empty().remove();
};

/**
 * 检查值是否有效，无效值返回默认值
 * @param value	检查的值
 * @param defalut 默认值
 * @returns
 */
function checkValue(value, defalut){
	return value == undefined || value == null  ? defalut : value;
};

/**
 * 让按钮失效
 * @param btn
 */
function disableButton(btn){
	btn.unbind( "click" ).css({ color: "#5a516e", cursor: "default" });
};

/**
 * 列表排序方法
 * @param thisObj 当前点击排序字段对象
 * @param sortColumn 要排序的字段
 */
function sortChageValue(thisObj,sortColumn){
	var $this = $(thisObj);
	var $span = $this.children('span');
	$this.parents('tr').find('.spanAsc, .spanDesc').not($span).remove();
	
	if ($span.size() == 0) {
		$span = $('<span/>').addClass('spanDesc').appendTo($this);
		$('#sort').val('DESC');
	} else {
		if ($span.hasClass('spanDesc')) {
			$('#sort').val('ASC');
			$span.removeClass().addClass('spanAsc');
		} else {
			$('#sort').val('DESC');
			$span.removeClass().addClass('spanDesc');
		}
	}
	$('#order').val(sortColumn);
};

/**
 * 列表排序方法
 * @param thisObj 当前点击排序字段对象
 * @param sortColumn 要排序的字段
 */
function sortChageValue2(thisObj,sortColumn){
	var $this = $(thisObj);
	var $span = $this.children('span');
	//$this.siblings('a').find('.spanAsc, .spanDesc').not($span).remove();
	
	if ($span.size() == 0) {
		$span = $('<span/>').addClass('spanDesc').appendTo($this);
		$('#sort').val('DESC');
	} else {
		if ($span.hasClass('spanDesc')) {
			$('#sort').val('ASC');
			$span.removeClass().addClass('spanAsc');
			
		} else {
			$('#sort').val('DESC');
			$span.removeClass().addClass('spanDesc');
		}
		
	}
	$this.siblings().find('span').removeClass()
	$('#order').val(sortColumn);
};

/**
 * 判断是否为汉字
 * @param obj
 * @returns
 */
function fnCheckChineseChar(obj)
{
	var reg = /^[\u0391-\uFFE5]+$/;
	return reg.test(obj);
}

/**
 * 字符截取
 * @param str 要截取的字符串
 * @param len 截取长度
 * @returns 返回截取值
 */
function fnGetLength(str,len)
{
	var strValue = "";
	var length = 0;
	for(var i=0;i<str.length;i++)
	{
		if(fnCheckChineseChar(str.charAt(i)))
		{
			length++;
		}
		else
		{
			length+=2;
		}
		if(length>=len && str.length>length){
			strValue = str.substring(0,length);
			return strValue+'...';
		}
	}
	return str;
}

/*
 * 如果字符串为空，则返回一个空白字符
 * td在IE下如果内容为空，底下的虚线不会出现
 */
function isNullOrEmpty(value){
	if(value == null || value == ""){
		return "&nbsp;";
	}
	
	return value;
}
function resizeH(removeFlag){
	   if($('.adminLeft').length && $('.adminRight').length ){
			var lefHeight=$('.adminLeft').height(),
				rightHeight =$('.adminRight').height(),
				ch=$('.adminConent').height();
			if(rightHeight>lefHeight){
				$('.adminLeft').height(rightHeight);
			}			 
			else{
				if(removeFlag)
					$('.adminLeft').height(lefHeight-34);
			}
		}
}

/**
 * 显示loading层
 */
function showLoadingDiv(){
	var img = $(top.document.createElement("div")).addClass("loadings"),
		divt = $(top.document.createElement("div")).addClass("loadingt").attr("id", "loadingt_xxx_001"),
		cover = $(top.document.createElement("div")).addClass("tanCd2").attr("id", "loading_xxx_001").height($(top.document).height()).show();
	img.appendTo(divt);
	divt.appendTo($(top.document.body));
	cover.appendTo($(top.document.body));
	objectCenter(divt);
	dynamicDivHeight(divt);
	};

/**
 * 删除loading层
 */
function hideLoadingDiv(){
	$("#loadingt_xxx_001", top.document.body).empty().remove();
	$("#loading_xxx_001", top.document.body).empty().remove();
};

/**
 * 显示loading层
 */
function showLoadingData(obj){
	var img = $(top.document.createElement("div")).addClass("loadings"),
	divt = $(top.document.createElement("div")).addClass("loadingt").attr("id", "loadingt_xxx_002");
	img.appendTo(divt);
	divt.appendTo(obj);
};

/**
 * 删除loading层
 */
function hideLoadingData(obj){
	$("#loadingt_xxx_002", obj).empty().remove();
};

/**
 * 去除input文本值的前后空格
 * @param form
 */
function trimInput(form){
	form.find('input[type=text]').each(function(i, v){
		 $(this).val($.trim($(this).val()));
	});	
}


/**
 * 前置码文件下载
 * @param o
 */
function downMprFile(publicationType,serviceFilePath,mprFileName,row){
	//日志记录
	
	var urlPart = $(window.parent.document).find('#contextPath').val();
	if(!urlPart){
		urlPart = $(window.parent.document).find('#contextPathHead').val();
	}
	var	downloadPath = urlPart + '/mcrs-upload/mvc/fileupload/download?',
		params = 'fp=' + encodeURI(serviceFilePath) + '&fn=' + encodeURI(mprFileName);
		window.open(downloadPath + params); 
		/*
		 * 关闭遮罩   
		 * wangl 2014年4月30日14:36:19
		 */
		closeCoverDiv();
	    //passCn.hide();
		hideLoadingDiv();
		switch (publicationType) {
		case "1":
			
			downloadMprFileLog(1, row.find("td[name=bookId]").html());
			break;
		case "2":
			
			downloadMprFileLog(2, row.find("td[name=periodicalId]").html());
			break;
		case "3":
			
			downloadMprFileLog(3, row.find("td[name=newspaperId]").html());
			break;
		case "4":
			
			downloadMprFileLog(4, row.find("td[name=audioId]").html());
			break;
		}
};


/**
 * 前置码文件日志记录
 * @param publicationType 出版物类型编号
 * @param publicationId	  出版物编号
 */
function downloadMprFileLog(publicationType, publicationId){
	var urlPart = $(window.parent.document).find('#contextPath').val();
	if(!urlPart){
		urlPart = $(window.parent.document).find('#contextPathHead').val();
	}
	$.ajax({
		url:urlPart +'/mcrs-perecode/mvc/commonmanager/downloadMprFileLog.json',
		type:'post',
		dataType : 'json',
		data:[
		      {name:"publicationType",value:publicationType},
		      {name:"publicationId",value:publicationId}
		      ],
		cache:true,
		async: false,
		success:function(result) {
		},
		error : function() {
		}
	});
}
/**
 * 格式化数字 如15987458 格式化为 15,987,458
 * @param s
 * @returns
 */
function fnumber(s) {
	var len = s.toString().length;

	if (len < 3 || isNaN(s)) {
		return s;
	}

	var t = '';
	var str = s.toString().split("").reverse().join("");
	for (i = 0; i < len; i ++ ) {
		t += str[i] + ((i+1) % 3 == 0 && (i + 1) != len ? "," : "");
	}
	return t.split("").reverse().join("");
}
