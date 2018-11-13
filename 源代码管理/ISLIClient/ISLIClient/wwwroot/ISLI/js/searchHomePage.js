var serviceCodeLengthMap = new Map(); //存放serviceCode长度
$(function() {
	var back=true;
    // 在官网首页点击检索 显示检索页
/*	
    $(".spageshow").on("click",function() {
        loadSearchResult($(this));
    })*/

    // 输入框获得焦点时，错误提示消失
    $(".bookNo").on("focus",
    function() {
        $(this).parents(".search").siblings(".errortip").html("");
    });
    //回车键
    $(".bookNo").on("keydown",
    function(event) {
        var obj = $(this).siblings(".spageshow");
        if (event.keyCode == 13) {
        	searchFromKeyword();
            return false;
        }
    })
    /***********统一输入框的提示样式************/
    $('input, password, textarea').placeholder();

    //搜索联想   
    $('.autocomplete-input').autoComplete({
        minChars: 3,
        source: function(code, suggest) {
            var regex = /^\d{3,5}$/;
            var suggestions = [];
            if (code && code.match(regex)) {
                $.ajax({
                    url: contextPath + "/web/search/serviceCodes/" + code,
                    type: "GET",
                    dataType: "json",
                    success: function(data) {
                        suggestions = data ? data: [];
                        suggest(suggestions);
                    },
                    error: function() {
                        suggest(suggestions);
                    }
                });
            } else {
                suggest(suggestions);
            }
        },
        onSelect: function(event, term, item) {}
    });

    var keyEvent = "input";//IE不兼容
    if(navigator.appName == "Microsoft Internet Explorer") {
    	keyEvent = "keyup";
    }
    
    //自动分隔   
    $('.autocomplete-input').bind(keyEvent,function() {
        var code = $(this).val();
        var inputObj = $(this);
        if (code.match(/^\d{6,}(-\d{1,})?(-\d+)?$/)) { //六位以上
            var serviceCode = code.substring(0, 6);
            var length = serviceCodeLengthMap.get(serviceCode);
            if (length && length > 0) { //存在
                if ((code.length > 6 && code.substring(1).match(/\d+/))) {
                    code = formatCode(code, length);
                    inputObj.val(code);
                }
            } else {
                $.ajax({
                    url: contextPath + "/web/search/linkCodeLength/" + serviceCode,
                    type: "GET",
                    dataType: "json",
                    success: function(data) {
                        if (data && data > 0) {
                            serviceCodeLengthMap.put(serviceCode, data);
                            if ((code.length > 6 && code.substring(1).match(/\d+/))) {
                                code = formatCode(code, data);
                                inputObj.val(code);
                            }
                        }
                    },
                    error: function() {}
                });
            }
        }
    });
});

function searchFromKeyword(){
	$('p.errortip').html('');
	$('#returnSpan').hide();
	var keyword =$("#search1 input[name='bookNo']").val();
	keyword = keyword.replace(/(^\s*)|(\s*$)/g, ""); //去掉前后空格
	if(keyword!=null||keyword!=''){
		 var now=new Date().getTime();
		 location.href='/irap/web/navigation/toSearch?utf8=√&q='+keyword+'&_='+now;
	}
}

function formatCode(code) {
    //清楚非数据 长度>8
    var ss = insertChar(code.replace(/[^0-9]/g, ""), 6, '-');
    return insertChar(ss, ss.length - 1, '-');
}

function formatCode(code, length) {
    //清楚非数据 长度>8
    var ss = code.replace(/[^0-9]/g, "");
    if ((code.length > 6 && code.substring(1).match(/\d+/))) {
        ss = insertChar(ss, 6, '-');
    }
    if (ss.length > 7 + length) {
        ss = insertChar(ss, length + 7, '-');
    }
    return ss;
}

function insertChar(code, index, str) {
    var retobj = '';
    if (code.length < index) {
        return code;
    }
    retobj = code.substring(0, index) + str + code.substring(index);
    return retobj;
}

function loadSearchResult($searchBtn,pageNo,perPage) {

    var bookid = $searchBtn.attr("bookId");
    var code = $("#search" + bookid + " input[name='bookNo']").val();
    if(bookid==1){
    	$("#bookNo2").val(code);
    }
   /* if (!code) {
        return false;
    }*/
    code = code.replace(/(^\s*)|(\s*$)/g, ""); //去掉前后空格
    if (!code) {
    	$searchBtn.parents('form.search').siblings('p.errortip').html(message.homepage.keywordnotnull);
        return false;
    }
    code = code.replace(/(^\\)|(\/)/g, "#-#-#"); //日期 / \用 -代替
    code=encodeURIComponent(code);
    if (code.match(/^\d{6}-?$/) || code.match(/^\d+(-\d+)?(-\d+)?$/)) { //编码
        searchCode(code, bookid);
   } else { //关键字
        searchKeywords(code,pageNo,perPage);
       $(".analysis-content").hide();
        $(".search-content").show();
    }
}




//去掉html标签
function delHtmlTag(str){ 
	 var title = str.replace(/<[^>]+>/g,"");//去掉所有的html标记
	 if(title.length > 150) {
	  title = title.substring(0,150);
	 }
	 return title;
}

function formatField(str,keyword){
	str=delHtmlTag(str);
	str=str.replace(keyword,'<font color=red>'+keyword+'</font>');
	return str;
}

function isValueNull(val){
	val=val.replace(/(^\s*)|(\s*$)|/g, "").replace("-","");
	return val==null||val=='';
}

function getfilterValue(val){
	if(val==''||val==null){
		return '-';
	}
	return val;
}


function getSCSourceTypesName(array){
	return array.join(',').replace(1,'图书').replace(2,'期刊').replace(3,'报纸').replace(4,'音像')
}






function getPropValue(prop){
	if(prop && prop != 'null'){
		return prop;
	}else{
		return "";
	}
}

//返回关键字检索
function returnToSearchContent() {
	history.go(-1);
	$(".searchbox").show();
    $(".analysis-content").hide();
    $(".search-content").show();
}



function isUrl(value){
	if(value) value=$.trim(value);
	return /^((https?|ftp):\/\/)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
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