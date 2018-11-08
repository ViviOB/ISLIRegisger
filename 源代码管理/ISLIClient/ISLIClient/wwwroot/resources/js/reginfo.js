/**
 * 出版单位名称重复校验
 */
var show = true;

/**
 * 是否选择出版物分类
 */
var checkboxint = true;
/**
 * js即时验证开始
 */
$(document).ready(function() {
	
	$(document).keypress(function(e){
	    if(e.keyCode==13) {
	    	return false;
	     }
	});
	
	
	$("#regno").on("focusout",function() {
        var regnoSpan = $.trim($('#regno').val());
        var str =/^[a-zA-Z0-9]{15,18}$/;
		if(str.test(regnoSpan)==false){
			$('#regnoSpan').removeClass().html('');
			$('#regnoSpan').addClass("error").html(message.reginfo.onlyNumber18);
		}
    });
	$("#regno").on("focusin",function(){
		$('#regnoSpan').removeClass("error").addClass("red").html(message.reginfo.regnoSpan);
	});
	
	loadRegno();
	
	dynamicAlert.prototype.ok = message.defaults.okButton;
	dynamicAlert.prototype.cancel = message.defaults.cancelButton;
	var data = $("#publisherApplyForm");
	data.find("input[type=checkbox]").attr("checked", false);
	$(".passwordReset ul li").css("height", "inherit");
	// 验证出版单位中文名称是否已注册
	$.validator.addMethod('isCnReg', function(value, element){
		value = $.trim(value);
		var msgHtml = '';
		var regstr =/\s+/g;
		if(regstr.test(value)){
			show = false;
			msgHtml = "出版单位名称中文不能包含空格";
		}else{
			var groupPro = $("#groupProperty").val();
			var groupId = $("#groupId").val();
			if (groupPro == "2") {
				$.ajax({
					url : 'checkGroupNamecn.json',
					type : 'post',
					data : { groupCn : value,"groupId":groupId },
					dataType : 'json',
					cache : false,
					async: false,
					success : function(r) {
						if(r.status!=null && r.status!=''){
							if (r.isExist) {
								//注册状态：0未注册
								show = true;
								$('#publisherEn').val(r.publisherEn).attr('readOnly',true);
								$('#publisherCn').next('label').remove();
							}else{
								//注册状态：1已注册
								show = false;
								$('#publisherEn').val('');
								msgHtml = message.reginfo.checkGroupnameExist;
								$('#publisherCn').next('label').remove();
								$('#publisherCn').last().after($("<label class='error' for='publisherCn'/>").html(msgHtml));
							}
						}else{
							//不存在
							show = false;
							$('#publisherEn').val('');
							msgHtml = message.reginfo.checkGroupname;
							$('#publisherCn').next('label').remove();
							$('#publisherCn').last().after($("<label class='error' for='publisherCn'/>").html(msgHtml));
						}
					},
					error : function() {
						show = false;
						dynamicAlert(message.reginfo.serverBusy,message.defaults.tipTitle);
					}
				});
			} else if (groupPro == "1" || groupPro == "0") {
				$.ajax({
					url : 'checkPublisherCn.json',
					type : 'post',
					data : { publisherCn : value },
					dataType : 'json',
					cache : false,
					async: false,
					success : function(r) {
						if(r.result=="0000000"){
							if (r!=null && r.isExist) {
								show = true;
							} else {
								show = false;
								if (r!=null && r.publisherId !== undefined) {
									msgHtml = message.reginfo.resendMailMsg.replace('{0}', r.publisherId);
								} else {
									msgHtml = message.reginfo.havePublisherCnName;
								}
							}
						}else{
							show = false;
							dynamicAlert(message.reginfo.serverBusy,message.defaults.tipTitle);
						}
					},
					error : function() {
						show = false;
						dynamicAlert(message.reginfo.serverBusy,message.defaults.tipTitle);
					}
				});
			}
		}
		$.validator.messages['isCnReg'] = msgHtml;
		return show || this.optional(element);
	}, '');
	
	
	// 重发激活邮件
	$('.resend').live('click', function(){
		var id = $(this).attr('pid');
		$.ajax({
			type: 'post',
			url: 'resendActivateMail.json',
			data: { 'id': id },
			dataType: 'json',
			success: function(result) {
				if (result.resultCode=='0000001') {
					dynamicAlert(message.reginfo.resendMailSuccess, message.defaults.tipTitle);
				} else {
					dynamicAlert(result.msg, message.defaults.tipTitleError);
				}
			},
			error : function() {
				dynamicAlert(message.reginfo.serverBusy,message.defaults.tipTitle);
			}
		});
	});
	
	// 获得省份
	$.ajax({
		type : 'post',
		url : 'getProve.json',
		dataType : 'json',
		async : false,
		success : function(data) {
			//var language=$('#language').val();
			$.each(data, function(i, item) {
				$("#provinceId").addClass("select-cls");
				if(language=='en_US'){
					$('<option/>').attr('value', item.provinceId).text(
							item.provinceName_en_US).appendTo($('#provinceId'));
				}else if(language=='zh_TW'){
					$('<option/>').attr('value', item.provinceId).text(
							item.provinceName_zh_TW).appendTo($('#provinceId'));
				}else{
					//zh_CN
					$('<option/>').attr('value', item.provinceId).text(
							item.provinceName).appendTo($('#provinceId'));
				}
				
			});
		},
		error : function() {
			dynamicAlert(message.reginfo.serverBusy,message.defaults.tipTitle);
		}
	});
	
	var form = $("#publisherApplyForm");
	formValied(form);
	
	//加载数据
	$.ajax({
	    url : 'searchPublisherApply',
		type:'get',
		dataType:'json',
		cache:false,
		async: false,
		success:function(result){
			if(result.resultCode=='210000'){
				var item = result.data;
				$('#applyUserMail').val(null == item.applyUserMail ? '' : item.applyUserMail);
				$('#applyUserName').val(null == item.applyUserName ? '' : item.applyUserName);
				var atels = item.applyUserTelOffice != null ? item.applyUserTelOffice.split("-") : "";
				if(atels.length>1){
					$('input[name=applyUserTelOffice]:eq(0)').val(atels[0]);
					$('input[name=applyUserTelOffice]:eq(1)').val(atels[1]);
				}
				$('#applyUserTelPhone').val(null == item.applyUserTelPhone ? '' : item.applyUserTelPhone);
				$('#provinceId').val(item.provinceId);
				$('#groupProperty').val(item.groupProperty);
				$('#publisherCn').val(null == item.publisherCn ? '' : item.publisherCn);
				$('#publisherEn').val(null == item.publisherEn ? '' : item.publisherEn);
				$('#regno').val(null == item.regno ? '' : item.regno);
				$('#bookrange').val(null == item.bookrange ? '' : item.bookrange);
				$('#address').val(null == item.address ? '' : item.address);
				$('#zipCode').val(null == item.zipCode ? '' : item.zipCode);
				$('#website').val(null == item.website ? '' : item.website);
				$('#zbdw').val(null == item.zbdw ? '' : item.zbdw);
				$('#zgdw').val(null == item.zgdw ? '' : item.zgdw);
				$('#legalPersonName').val(null == item.legalPersonName ? '' : item.legalPersonName);
				var ptels = item.legalPersonTel != null ? item.legalPersonTel.split("-") : "";
				if(ptels.length>1){
					$('input[name=legalPersonTel]:eq(0)').val(ptels[0]);
					$('input[name=legalPersonTel]:eq(1)').val(ptels[1]);
				}
				$('#legalPersonMobile').val(null == item.legalPersonMobile ? '' : item.legalPersonMobile);
				$('#legalPersonPost').val(null == item.legalPersonPost ? '' : item.legalPersonPost);
				$('#legalPersonFax').val(null == item.legalPersonFax ? '' : item.legalPersonFax);
				$('#legalPersonMail').val(null == item.legalPersonMail ? '' : item.legalPersonMail);
				$('#contactName').val(null == item.contactName ? '' : item.contactName);
				var ctels = item.contactTel != null ? item.contactTel.split("-") : "";
				if(ctels.length>1){
					$('input[name=contactTel]:eq(0)').val(ctels[0]);
					$('input[name=contactTel]:eq(1)').val(ctels[1]);
				}
				$('#contactMobile').val(null == item.contactMobile ? '' : item.contactMobile);
				$('#contactPost').val(null == item.contactPost ? '' : item.contactPost);
				$('#contactFax').val(null == item.contactFax ? '' : item.contactFax);
				$('#contactMail').val(null == item.contactMail ? '' : item.contactMail);
				
				var num=parseInt(item.publicationTypeId);
				//选择出版物分类
				var typeobj = document.getElementsByName('publicationTypeId');
				for (var i = 0; i < typeobj.length; i++) {
					if (typeobj[i].value == item.publicationTypeId) {
						typeobj[i].checked = true;
					}
				}
				
				//根据所属集团类型，获取级联数据
				chubanshe(item.groupId);
				
				//出版物资质
				var publicationTypeId=item.publicationTypeId;
				if(publicationTypeId.indexOf('1') >= 0){
					
					
					$('#tushu').attr('checked',true);
					checkboxint = true;
					$("#msgshow").text("");
					$("#msgshow").hide();
					
					var isbn = item.isbn.split("-");
					for (i = 0; i < isbn.length; i++) {
						if (isbn[i].indexOf("book:") >= 0) {
							var isbntushu = isbn[i].substring(isbn[i].indexOf('book:') + 5, isbn[i].length).split(',');
							var index = 0;
							for (j = 0; j < isbntushu.length / 3; j++) {
								if (j == 0) {
									var bookIsbn = $('<dl class="createtushuli" id="createtushuli1"><dt>ISBN前缀(图书)：</dt><dd>'
											+ '<input type="text" onblur="checkIsbn(this,1)" name="isbntushu" class="width55"  /><input type="text" onblur="checkIsbn(this,1)" name="isbntushu" class="width55"  /><input type="text" onblur="checkIsbn(this,1)" name="isbntushu" class="width55"  />'
											+ '<span class="regAdd" onclick="createBookIsbn();">.</span></dd></dl>');
									bookIsbn.insertAfter("#hiddenIsbn");
									$('input[name=isbntushu]:eq(0)').val(isbntushu[0]);
									$('input[name=isbntushu]:eq(1)').val(isbntushu[1]);
									$('input[name=isbntushu]:eq(2)').val(isbntushu[2]);
									index += 3;
								} else {
									var bookClass = $('.createtushuli');
									var length = bookClass.length;
									var bookIsbn = $('<dl class="createtushuli" id="createtushuli'+ (length + 1)+ '"><dt>ISBN前缀(图书)：</dt><dd>'
											+ '<input type="text" onblur="checkIsbn(this,'+ (length + 1)+ ')" name="isbntushu" class="width55" value="'+ isbntushu[index]+ '"/>'
											+ '<input type="text" onblur="checkIsbn(this,'+ (length + 1)+ ')" name="isbntushu" class="width55" value="'+ isbntushu[index + 1]+ '" />'
											+ '<input type="text" onblur="checkIsbn(this,'+ (length + 1)+ ')" name="isbntushu" class="width55" value="'+ isbntushu[index + 2]+ '" />'
											+ '<span class="regAdd regAddDg regRemove" onclick="deleteBookIsbn(this);"></span></dd></dl>');
									bookIsbn.insertAfter("#createtushuli" + length);
									index += 3;
								}
							}
							
						}
						
					}
				}
				if(publicationTypeId.indexOf('2') >= 0){
					$('#qikan').attr('checked',true);
					
					$("#msgshow").text("");
					$("#msgshow").hide();
					
					var issnArray = item.issn.split(","),
					forL = issnArray.length / 2;
					var index = 0;
					for (j = 0; j < forL; j++) {
						if (j == 0) {
							var qikanIssn = $('<dl class="createqikanli" id="createqikanli1"><dt>ISSN：</dt><dd>'
									+ '<input type="text"  name="issn1" class="width55"  onblur="checkISSN(this,1)"/>'
									+ '<input type="text"  name="issn1" class="width55"  onblur="checkISSN(this,1)"/>'
									+ '<span class="regAdd" onclick="createIssn();">.</span></dd></dl>');
							qikanIssn.insertAfter("#hiddenIsbn");
							$('input[name=issn1]:eq(0)').val(issnArray[0]);
							$('input[name=issn1]:eq(1)').val(issnArray[1]);
							index += 2;
						} else {
							
							var issnClass = $('.createqikanli');
							var length = issnClass.length;
							var issn = $('<dl class="createqikanli" id="createqikanli'+ (length + 1)
									+ '"><dt>ISSN：</dt><dd>'
									+ '<input type="text" name="issn1" class="width55"  onblur="checkISSN(this,'+ (length + 1)+ ')" value="'+ issnArray[index]+ '"  />'
									+ '<input type="text" name="issn1" class="width55"   onblur="checkISSN(this,'+ (length + 1)+ ')" value="'+ issnArray[index + 1]+ '"/>'
									+ '<span class="regAdd regAddDg regRemove" onclick="deleteIssn(this);"></span></dd></dl>');
							issn.insertAfter("#createqikanli" + length);
							index += 2;
						}
					}
				
				}
				if(publicationTypeId.indexOf('3') >= 0){
					$('#baozhi').attr('checked',true);
					
					$("#msgshow").text("");
					$("#msgshow").hide();
					
					//因为报纸cn和电子cn可能合一起
					var itemcn=item.cn;
					var newcn="";
					if (itemcn.indexOf("-eletroniccn:") >= 0) {
						newcn = itemcn.substring(0,itemcn.indexOf('-eletroniccn:'));
					}else{
						newcn=itemcn;
					}
					
					var cnArray = newcn.split(",");
					var index = 0;
					for (j = 0; j < cnArray.length / 2; j++) {
						if (j == 0) {
							var baozhiCn = $('<dl class="createbaozhili" id="createbaozhili1"><dt>CN：</dt><dd>'
									+ '<input type="text"  name="cn1" class="width55"  onblur="checkCN(this,1)"/>'
									+ '<input type="text"  name="cn1"class="width55"  onblur="checkCN(this,1)"/>'
									+ '<span class="regAdd" onclick="createPcn();">.</span></dd></dl>');
							baozhiCn.insertAfter("#hiddenIsbn");
							$('input[name=cn1]:eq(0)').val(cnArray[0]);
							$('input[name=cn1]:eq(1)').val(cnArray[1]);
							index += 2;
						} else {
							var cnClass = $('.createbaozhili');
							var length = cnClass.length;
							var pCn = $('<dl class="createbaozhili" id="createbaozhili'+ (length + 1)+ '"><dt>CN：</dt><dd>'
									+ '<input type="text"  name="cn1" class="width55 fl" value="'+ cnArray[index]+ '" onblur="checkCN(this,'+ (length + 1)+ ');" />'
									+ '<input type="text"  name="cn1" class="width55 fl" value="'+ cnArray[index + 1]+ '" onblur="checkCN(this,'+ (length + 1)+ ');"/>'
									+ '<span class="regAdd regAddDg regRemove" onclick="deletePcn(this);"></span></dd></dl>');
									
									pCn.insertAfter("#createbaozhili" + length);
							index += 2;
						}
					}
				
				}
				if(publicationTypeId.indexOf('4') >= 0){
					$('#yinxiang').attr('checked',true);
				
					$("#msgshow").text("");
					$("#msgshow").hide();

					var isbn = item.isbn.split("-");
					for (i = 0; i < isbn.length; i++) {
						if (isbn[i].indexOf("music:") >= 0) {
							var isbnmusic = isbn[i].substring(isbn[i].indexOf('music:') + 6, isbn[i].length).split(',');
							var index = 0;
							for (j = 0; j < isbnmusic.length / 3; j++) {
								if (j == 0) {
									var musicIsbn = $('<dl class="createyinxiangli" id="createyinxiangli1"><dt>ISBN前缀(音像)：</dt><dd>'
											+ '<input type="text"  name="isbnyinxiang" class="width55" onblur="checkyinxiangIsbn(this,1)" />'
											+ '<input type="text"  name="isbnyinxiang" class="width55"  onblur="checkyinxiangIsbn(this,1)"/>'
											+ '<input type="text"  name="isbnyinxiang" class="width55"  onblur="checkyinxiangIsbn(this,1)"/>'
											+ '<span class="regAdd" onclick="createMusicIsbn();">.</span></dd></dl>');
									
									var isbnBookLength = $('.createtushuli').length;
									if(isbnBookLength==0){
										musicIsbn.insertAfter("#hiddenIsbn");
									}else{			
										musicIsbn.insertAfter("#createtushuli"+isbnBookLength);
									}
									
									$('input[name=isbnyinxiang]:eq(0)').val(isbnmusic[0]);
									$('input[name=isbnyinxiang]:eq(1)').val(isbnmusic[1]);
									$('input[name=isbnyinxiang]:eq(2)').val(isbnmusic[2]);
									index += 3;
								} else {
									var musicClass = $('.createyinxiangli');
									var length = musicClass.length;
									var musicIsbn = $('<dl class="createyinxiangli" id="createyinxiangli'+ (length + 1)+ '"><dt>ISBN前缀(音像)：</dt><dd>'
											+ '<input type="text" name="isbnyinxiang" value="'+ isbnmusic[index]+ '" class="width55 fl" onblur="checkyinxiangIsbn(this,'+ (length + 1)+ ')" /> '
											+ '<input type="text" name="isbnyinxiang" value="'+ isbnmusic[index + 1]+ '" class="width55 fl"  onblur="checkyinxiangIsbn(this,'+ (length + 1)+ ')"/>'
											+ '<input type="text" name="isbnyinxiang" value="'+ isbnmusic[index + 2]+ '" class="width55 fl" onblur="checkyinxiangIsbn(this,'+ (length + 1)+ ')" />'
											+ '<span class="regAdd regAddDg regRemove" onclick="deleteMusicIsbn(this);"></span></dd></dl>')
											musicIsbn.insertAfter("#createyinxiangli" + length);
									index += 3;
								}
							}
							
						}
						
					}
				
				}
				if(publicationTypeId.indexOf('5') >= 0){
					
					$('#dianzi').attr('checked',true);
					$("#msgshow").text("");
					$("#msgshow").hide();

					var isbn = item.isbn.split("-");
					for (i = 0; i < isbn.length; i++) {
						if (isbn[i].indexOf("power:") >= 0) {
							var isbnpower = isbn[i].substring(isbn[i].indexOf('power:') + 6, isbn[i].length).split(',');
							var index = 0;
							for (j = 0; j < isbnpower.length / 3; j++) {
								if (j == 0) {
									var dianziISBN = $('<dl class="createdianzili" id="createdianzili1"><dt>ISBN前缀(电子)：</dt><dd>'
											+ '<input type="text"  name="isbndianzi" class="width55"  onblur="checkdianziIsbn(this,1)"/>'
											+ '<input type="text"  name="isbndianzi" class="width55" onblur="checkdianziIsbn(this,1)"/>'
											+ '<input type="text"  name="isbndianzi" class="width55"  onblur="checkdianziIsbn(this,1)"/>'
											+ '<span class="regAdd" onclick="createPowerIsbn();">.</span></dd></dl>');
									
									var isbnBookLenght = $('.createtushuli').length;
									var isbnQiKanLenght = $('.createqikanli').length;
									var isbnBaoZhiLenght = $('.createbaozhili').length;
									var isbnDianZiLenght = $('.createyinxiangli').length;
									
									if(isbnQiKanLenght!=0){
										dianziISBN.insertAfter("#createqikanli"+isbnQiKanLenght);
									}else if(isbnBaoZhiLenght!=0){
										dianziISBN.insertAfter("#createbaozhili"+isbnBaoZhiLenght);
									}else if(isbnDianZiLenght!=0){
										dianziISBN.insertAfter("#createyinxiangli"+isbnDianZiLenght);
									}else if(isbnBookLenght!=0&&isbnDianZiLenght==0){
										dianziISBN.insertAfter("#createtushuli"+isbnBookLenght);
									}else{
										dianziISBN.insertAfter("#hiddenIsbn");
									}
									
									$('input[name=isbndianzi]:eq(0)').val(isbnpower[0]);
									$('input[name=isbndianzi]:eq(1)').val(isbnpower[1]);
									$('input[name=isbndianzi]:eq(2)').val(isbnpower[2]);
									index += 3;
								} else {
									var dianziClass = $('.createdianzili');
									var length = dianziClass.length;
									var powerIsbn = $('<dl class="createdianzili" id="createdianzili'+ (length + 1)+ '"><dt>ISBN前缀(电子)：</dt><dd>'
											+ '<input type="text" name="isbndianzi" value="'+ isbnpower[index]+ '" class="width55" onblur="checkdianziIsbn(this,'+ (length + 1)+ ')"/>'
											+ '<input type="text" name="isbndianzi" value="'+ isbnpower[index + 1]+ '" class="width55" onblur="checkdianziIsbn(this,'+ (length + 1)+ ')" />'
											+ '<input type="text" name="isbndianzi" value="'+ isbnpower[index + 2]+ '" class="width55" onblur="checkdianziIsbn(this,'+ (length + 1)+ ')" />'
											+ '<span class="regAdd regAddDg regRemove" onclick="deletePowerIsbn(this);"></span></dd></dl>')
											powerIsbn.insertAfter("#createdianzili" + length);
									index += 3;
								}
							}
							
						}
						
					}//end
					
					//因为报纸cn和电子cn可能合一起
					var itemcn=item.cn;
					var newcn="";
					if (itemcn.indexOf("-eletroniccn:") >= 0) {
						newcn = itemcn.substring(itemcn.indexOf('-eletroniccn:')+13,itemcn.length);
					
						var cnArray = newcn.split(",");
						var index = 0;
						for (j = 0; j < cnArray.length / 2; j++) {
							if (j == 0) {
								var baozhiCn = $('<dl class="createdianzicn" id="createdianzicn1"><dt>'+message.reginfo.eletroniccn+'：</dt><dd>'
										+ '<input type="text"  name="eletroniccn1" class="width55"  onblur="checkDianziCn(this,1)"/>'
										+ '<input type="text"  name="eletroniccn1"class="width55"  onblur="checkDianziCn(this,1)"/>'
										+ '<span class="regAdd" onclick="createDianziCn();">.</span></dd></dl>');
								
								var dianziClass = $('.createdianzili');
								var length = dianziClass.length;
								baozhiCn.insertAfter("#createdianzili"+length);
								$('input[name=eletroniccn1]:eq(0)').val(cnArray[0]);
								$('input[name=eletroniccn1]:eq(1)').val(cnArray[1]);
								index += 2;
							} else {
								var cnClass = $('.createdianzicn');
								var length = cnClass.length;
								var pCn = $('<dl class="createdianzicn" id="createdianzicn'+ (length + 1)+ '"><dt>'+message.reginfo.eletroniccn+'：</dt><dd>'
										+ '<input type="text"  name="eletroniccn1" class="width55 fl" value="'+ cnArray[index]+ '" onblur="checkDianziCn(this,'+ (length + 1)+ ');" />'
										+ '<input type="text"  name="eletroniccn1" class="width55 fl" value="'+ cnArray[index + 1]+ '" onblur="checkDianziCn(this,'+ (length + 1)+ ');"/>'
										+ '<span class="regRemove regAdd" onclick="deleteDianziCn(this);"></span></dd></dl>');
										
										pCn.insertAfter("#createdianzicn" + length);
								index += 2;
							}
						}
					}//end
					
				
				}
				if(publicationTypeId.indexOf('6') >= 0){
					$('#internet').attr('checked',true);
					$("#msgshow").text("");
					$("#msgshow").hide();
				}
			}
		},
		error: function () {   
		    	dynamicAlert(message.business.dberror, message.defaults.error);
		 }
	});
	
});

//统一社会信用代码提示
function loadRegno() {
	var regnoSpan=$.trim($('#regnoSpan').html());
	if(regnoSpan==''){
		$('#regnoSpan').removeClass().html('');
		$('#regnoSpan').addClass("red").html(message.reginfo.regnoSpan);
	}
}


function formValied(form){

	//修改原生的邮箱验证方法
	$.validator.methods.email = function(value, element) {
		//var reg = new RegExp("^[a-zA-Z0-9_-]+@[a-z0-9]+.[a-z]+$");
		//现校验包含@和.即可
		var obj=false;
		var index1=value.indexOf("@");
		var index2=value.lastIndexOf(".");
		 if(index1>-1 && index2>-1){
		 	if(index2-index1>1){
				obj=true;
			}
		 }
		return this.optional(element) || obj;
	}
	//修改原生的URL验证方法
	$.validator.methods.url = function(value, element) {
		var strRegex = "^((https|http|ftp|rtsp|mms)?://)"      
            + "?(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?" //ftp的user@     
            + "(([0-9]{1,3}.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184     
            + "|" // 允许IP和DOMAIN（域名）     
            + "([0-9a-zA-Z_!~*'()-]+.)*" // 域名- www.     
            + "([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z]." // 二级域名     
            + "[a-zA-Z]{2,6})" // first level domain- .com or .museum     
            + "(:[0-9]{1,4})?" // 端口- :80     
            + "((/?)|"      
            + "(/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+/?)$";    
		var reg = new RegExp(strRegex);
		return this.optional(element) || reg.test($.trim(value));
	}
	
	form.validate(
			{
				rules : {
					groupId:{
						required : true
					},
					provinceId : {
						required : true
					},
					groupProperty : {
						required : true
					},
					applyUserMail : {
						required : true,
						email : true,
						maxlength : 50,
						remote : {
							type : 'post',
							url : 'checkEmail',
							data : {
								applyUserMail : function() {
									return $.trim($('input[name="applyUserMail"]').val());
								}
							}
						}
					},
					applyUserName : {
						required : true,
						maxlength : 20
					},
					/*applyUserTelOffice : {
						isFax : true,
						maxlength : 50
					},*/
					applyUserTelPhone : {
						required : true,
						isMobile : true,
						maxlength : 20
					},

					provinceId : {
						required : true
					},
					publisherCn : {
						required : true,
						//isCn : true,
						maxlength : 100,
						isCnReg: true
					},

					publisherEn : {
						required : true,
						isEn:true,
						maxlength : 500
					},
					regno : {
						required : true
					},
					address : {
						required : true,
						maxlength : 100
					},

					zipCode : {
						required : true,
						isZipCode : true
					},

					website : {
						url : true,
						maxlength : 2048
					},

					zbdw : {
						required : true,
						maxlength : 100
					},
					zgdw : {
						required : true,
						maxlength : 100
					},

					bookrange : {
						maxlength : 200
					},

					legalPersonName : {
						required : true,
						maxlength : 20
					},
					/*legalPersonTel : {
						isFax : true,
						maxlength : 50
					},*/
					legalPersonMobile : {
						isMobile : true,
						maxlength : 20
					},
					legalPersonPost : {
						maxlength : 20
					},
					legalPersonFax : {
						isFax : true,
						maxlength : 50
					},
					legalPersonMail : {
						email : true,
						maxlength : 50
					},
					contactName : {
						required : true,
						maxlength : 20
					},
					/*contactTel : {
						required : true,
						isFax : true,
						maxlength : 50
					},*/
					contactMobile : {
						required : true,
						isMobile : true,
						maxlength : 20
					},
					contactPost : {
						maxlength : 20
					},
					contactFax : {
						isFax : true,
						maxlength : 50

					},
					contactMail : {
						required : true,
						email : true,
						maxlength : 50
					}

				},
				messages : {
					groupId:{
						required : message.reginfo.pleaseCheckgroup
					},
					provinceId : {
						required : message.reginfo.pleaseCheckPublisherPro
					},
					groupProperty : {
						required : message.reginfo.pleaseCheckPublisherGro
					},
					applyUserMail : {
						required : message.reginfo.pleaseEntEmail,
						email : message.reginfo.errorEmail,
						maxlength :message.reginfo.moreLengthEmail,
						remote : message.reginfo.regedEmail
					},
					applyUserName : {
						required : message.reginfo.pleaseEntAppUserName,
						maxlength :message.reginfo.moreLengthAppUserName
					},
					/*applyUserTelOffice : {
						isFax : message.reginfo.errorCantTel,
						maxlength : message.reginfo.moreLengthTel
					},*/
					applyUserTelPhone : {
						required : message.reginfo.pleaseEntCatMobile,
						isMobile : message.reginfo.errorCntMobile,
						maxlength :message.reginfo.moreLengthMobile
					},
					publisherCn : {
						required : message.reginfo.pleaseEntCanPublisherName,
						//isCn : message.reginfo.onlyCn,
						maxlength : message.reginfo.moreLengthPublisherNameCn
					},

					publisherEn : {
						required : message.reginfo.pleaseEntCanPublisherEn,
						isEn : message.reginfo.onlyEn,
						maxlength : message.reginfo.moreLengthPublisherEn
					},
					regno : {
						required : message.reginfo.pleaseEntRegno
					},

					address : {
						required:message.reginfo.pleaseEntAddress,
						maxlength :message.reginfo.moreLengthAddress
					},

					zipCode : {
						required: message.reginfo.pleaseEntZipcode,
						isZipCode: message.reginfo.errorZipcode
					},

					website : {
						url : message.reginfo.errorUrl,
						maxlength : message.reginfo.moreLengthUrl
					},

					zbdw : {
						required : message.reginfo.pleaseEntZbdw,
						maxlength : message.reginfo.moreLengthZbdw
					},
					zgdw : {
						required : message.reginfo.pleaseEntZgdw,
						maxlength : message.reginfo.morelengthZgdw
					},

					bookrange : {
						maxlength : message.reginfo.moreLengthBookrang
					},

					legalPersonName : {
						required : message.reginfo.pleaseEntFaRenName,
						maxlength : message.reginfo.moreLengthFaRenName
					},
					/*legalPersonTel : {
						isFax : message.reginfo.errorFaRenTel,
						maxlength : message.reginfo.moreLengthFaRenTel
					},*/
					legalPersonMobile : {
						isMobile : message.reginfo.errorFaRenMobile,
						maxlength : message.reginfo.moreLegthFaRenMobile
					},
					legalPersonPost : {
						maxlength : message.reginfo.moreLengrhfaRenPost
					},
					legalPersonFax : {
						isFax : message.reginfo.errorFaRenFax,
						maxlength : message.reginfo.moreLengthFaRenFax
					},
					legalPersonMail : {
						email : message.reginfo.errorFaRenEmail,
						maxlength : message.reginfo.moreLengthFaRenEmail
					},
					contactName : {
						required : message.reginfo.pleaseEntLianXiName,
						maxlength : message.reginfo.moreLengthLianXiName
					},
					/*contactTel : {
						required : message.reginfo.pleaseEntTelName,
						isFax : message.reginfo.errorLianXiTel,
						maxlength : message.reginfo.moreLengthLianXiTel
					},*/
					contactMobile : {
						required : message.reginfo.pleaseEntMobileName,
						isMobile : message.reginfo.errorLianXiMobile,
						maxlength : message.reginfo.moreLegthLianXiMobile
					},
					contactPost : {
						maxlength : message.reginfo.moreLengrhLianXiPost
					},
					contactFax : {
						isFax : message.reginfo.errorLianXiFax,
						maxlength : message.reginfo.moreLengthLianXiFax

					},
					contactMail : {
						required : message.reginfo.pleaseEntMailName,
						email : message.reginfo.errorLianXiEmail,
						maxlength : message.reginfo.moreLengthLianXiEmail
					}
				},
				errorPlacement : function(error, element) {
					error.appendTo( element.parent());
				},
				success : function(label) {
					label.empty().remove();
				}

		});
}

/**
 * 判断出版单位名称
 * @param value 出版单位归属范围值
 */
function checkPublisher(groupPro,groupId){
	var value = $.trim($('#publisherCn').val());
	var msgHtml = '';
	if(value!=""){
		if (groupPro == "2") {
			$.ajax({
				url : 'checkGroupNamecn.json',
				type : 'post',
				data : { groupCn : value,"groupId":groupId },
				dataType : 'json',
				cache : false,
				async: false,
				success : function(r) {
					if(r.status!=null && r.status!=''){
						if (r.isExist) {
							//注册状态：0未注册
							show = true;
							$('#publisherEn').val(r.publisherEn).attr('readOnly',true);
							$('#publisherCn').next('label').remove();
						}else{
							//注册状态：1已注册
							show = false;
							$('#publisherEn').val('');
							msgHtml = message.reginfo.checkGroupnameExist;
							$('#publisherCn').next('label').remove();
							$('#publisherCn').last().after($("<label class='error' for='publisherCn'/>").html(msgHtml));
						}
					}else{
						//不存在
						show = false;
						$('#publisherEn').val('');
						msgHtml = message.reginfo.checkGroupname;
						$('#publisherCn').next('label').remove();
						$('#publisherCn').last().after($("<label class='error' for='publisherCn'/>").html(msgHtml));
					}
					
				},
				error : function() {
					show = false;
					dynamicAlert(message.reginfo.serverBusy,message.defaults.tipTitle);
				}
			});
		} else if (groupPro == "1" || groupPro == "0") {
			$.ajax({
				url : 'checkPublisherCn.json',
				type : 'post',
				data : { publisherCn : value },
				dataType : 'json',
				cache : false,
				async: false,
				success : function(r) {
					if(r.result=="0000000"){
						if (r!=null && r.isExist) {
							show = true;
							$('#publisherCn').next('label').remove();
						} else {
							show = false;
							if (r!=null && r.publisherId !== undefined) {
								msgHtml = message.reginfo.resendMailMsg.replace('{0}', r.publisherId);
								$('#publisherCn').next('label').remove();
								$('#publisherCn').last().after($("<label class='error' for='publisherCn'/>").html(msgHtml));
							} else {
								msgHtml = message.reginfo.havePublisherCnName;
								$('#publisherCn').next('label').remove();
								$('#publisherCn').last().after($("<label class='error' for='publisherCn'/>").html(msgHtml));
							}
						}
					}else{
						show = false;
						dynamicAlert(message.reginfo.serverBusy,message.defaults.tipTitle);
					}
				},
				error : function() {
					dynamicAlert(message.reginfo.serverBusy,message.defaults.tipTitle);
				}
			});
		}
		
	}
}



/**
 * 检查isbn图书
 * 
 * @param obj
 * @param index
 */
function checkIsbn(obj, index) {
	var thisObj = $(obj);
	var thisID = $('#createtushuli' + index)
	var sibLength = thisObj.siblings('input').length;
	var objAllLength = sibLength + 1;
	var name = thisObj.attr('name');
	var isbns1 = $.trim(thisID.find('input[name=' + name + ']:eq(0)').val());
	var isbns2 = $.trim(thisID.find('input[name=' + name + ']:eq(1)').val());
	var isbns3 = $.trim(thisID.find('input[name=' + name + ']:eq(2)').val());
	$("#createtushuliisbns" + index).empty().remove();
	thisID.find('input[name=' + name + ']:eq(2)').siblings().last().after(
			$("<span>").attr("id", "createtushuliisbns" + index));
	if (isbns1 != "" || isbns2 != "" || isbns3 != "") {
		if (isbns1 != "" && isbns2 != "" && isbns3 != "") {
			if ("978" != isbns1 && "979" != isbns1) {
				$("#createtushuliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorIsbnBooke1);
				flagIsbn = false;
			} else if (!isEqueNumberValid(isbns2, 1)) {
				$("#createtushuliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorIsbnBooke2);
				flagIsbn = false;
			} else if (!isNewNumber(isbns3) || isbns3.length < 2 || isbns3.length > 7) {
				$("#createtushuliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorIsbnBooke3);
				flagIsbn = false;
			}else{
				$("#createtushuliisbns" + index).empty().remove();
				flagIsbn = true;
			}

		}
		if (isbns1 != "" && (isbns2 == "" || isbns3 == "")) {
			if ("978" != isbns1 && "979" != isbns1) {
				$("#createtushuliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorIsbnBooke1);
				flagIsbn = false;
			} else {
				$("#createtushuliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.pleaseEntIsbnBookAll);
				flagIsbn = false;
			}
		}
		if (isbns2 != "" && (isbns1 == "" || isbns3 == "")) {
			if (!isEqueNumberValid(isbns2, 1)) {
				$("#createtushuliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorIsbnBooke2);
				flagIsbn = false;
			} else {
				$("#createtushuliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.pleaseEntIsbnBookAll);
				flagIsbn = false;
			}
		}
		if (isbns3 != "" && (isbns1 == "" || isbns2 == "")) {
			if (!isNewNumber(isbns3) || isbns3.length < 2 || isbns3.length > 7) {
				$("#createtushuliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorIsbnBooke3);
				flagIsbn = false;
			} else {
				$("#createtushuliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.pleaseEntIsbnBookAll);
				flagIsbn = false;
			}
		}
	} else if (isbns1 == "" && isbns2 == "" && isbns3 == "") {
		//如果是集团下属出版单位，则不要做非空校验
		if($("#groupProperty").val()==1){
			$("#createtushuliisbns" + index).removeClass("error").html("");
		}else{
			$("#createtushuliisbns" + index).removeClass("right").addClass("error").html(message.reginfo.notBeNullIsbnBook);
			flagIsbn = false;
			}
	}
}

/**
 * 检查isbn音响
 * 
 * @param obj
 * @param index
 */
function checkyinxiangIsbn(obj, index) {
	var thisObj = $(obj);
	var thisID = $('#createyinxiangli' + index)
	var sibLength = thisObj.siblings('input').length;
	var objAllLength = sibLength + 1;
	var name = thisObj.attr('name');
	var isbns1 = $.trim(thisID.find('input[name=' + name + ']:eq(0)').val());
	var isbns2 = $.trim(thisID.find('input[name=' + name + ']:eq(1)').val());
	var isbns3 = $.trim(thisID.find('input[name=' + name + ']:eq(2)').val());
	$("#createyinxiangliisbns").empty().remove();
	thisID.find('input[name=' + name + ']:eq(2)').siblings().last().after(
			$("<span>").attr("id", "createyinxiangliisbns" + index));
	if (isbns1 != "" || isbns2 != "" || isbns3 != "") {
		if (isbns1 != "" && isbns2 != "" && isbns3 != "") {
			if ("978" != isbns1 && "979" != isbns1) {
				$("#createyinxiangliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorIsbnBooke1);
				flagYinxiangIsbn = false;
			} else if (!isEqueNumberValid(isbns2, 1)) {
				$("#createyinxiangliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorIsbnBooke2);
				flagYinxiangIsbn = false;
			} else if (!isNewNumber(isbns3) || isbns3.length < 2 || isbns3.length > 7) {
				$("#createyinxiangliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorIsbnBooke3);
				flagYinxiangIsbn = false;
			}else{
				$("#createyinxiangliisbns" + index).empty().remove();
				flagYinxiangIsbn = true;
			}

		}
		if (isbns1 != "" && (isbns2 == "" || isbns3 == "")) {
			if ("978" != isbns1 && "979" != isbns1) {
				$("#createyinxiangliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorIsbnBooke1);
				flagYinxiangIsbn = false;
			} else {
				$("#createyinxiangliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.pleaseEntIsbnMusicAll);
				flagYinxiangIsbn = false;
			}
		}
		if (isbns2 != "" && (isbns1 == "" || isbns3 == "")) {
			if (!isEqueNumberValid(isbns2, 1)) {
				$("#createyinxiangliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorIsbnBooke2);
				flagYinxiangIsbn = false;
			} else {
				$("#createyinxiangliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.pleaseEntIsbnMusicAll);
				flagYinxiangIsbn = false;
			}
		}
		if (isbns3 != "" && (isbns1 == "" || isbns2 == "")) {
			if (!isNewNumber(isbns3) || isbns3.length < 2 || isbns3.length > 7) {
				$("#createyinxiangliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorIsbnBooke3);
				flagYinxiangIsbn = false;
			} else {
				$("#createyinxiangliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.pleaseEntIsbnMusicAll);
				flagYinxiangIsbn = false;
			}
		}
	} else if (isbns1 == "" && isbns2 == "" && isbns3 == "") {
		//如果是集团下属出版单位，则不要做非空校验
		if($("#groupProperty").val()==1){
			$("#createyinxiangliisbns" + index).removeClass("error").html("");
		}else{
			$("#createyinxiangliisbns" + index).removeClass("right").addClass("error").html(message.reginfo.notBeNullIsbnMusic);
			flagYinxiangIsbn = false;
		}
	}
}

/**
 * 检查isbn电子
 * 
 * @param obj
 * @param index
 */
function checkdianziIsbn(obj, index) {
	var thisObj = $(obj);
	var thisID = $('#createdianzili' + index)
	var sibLength = thisObj.siblings('input').length;
	var objAllLength = sibLength + 1;
	var name = thisObj.attr('name');
	var isbns1 = $.trim(thisID.find('input[name=' + name + ']:eq(0)').val());
	var isbns2 = $.trim(thisID.find('input[name=' + name + ']:eq(1)').val());
	var isbns3 = $.trim(thisID.find('input[name=' + name + ']:eq(2)').val());
	$("#createdianziliisbns").empty().remove();
	thisID.find('input[name=' + name + ']:eq(2)').siblings().last().after(
			$("<span>").attr("id", "createdianziliisbns" + index));
	if (isbns1 != "" || isbns2 != "" || isbns3 != "") {
		if (isbns1 != "" && isbns2 != "" && isbns3 != "") {
			if ("978" != isbns1 && "979" != isbns1) {
				$("#createdianziliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorIsbnBooke1);
			} else if (!isEqueNumberValid(isbns2, 1)) {
				$("#createdianziliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorIsbnBooke2);
			} else if (!isNewNumber(isbns3) || isbns3.length < 2 || isbns3.length > 7) {
				$("#createdianziliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorIsbnBooke3);
			}else{
				$("#createdianziliisbns" + index).empty().remove();
			}

		}
		if (isbns1 != "" && (isbns2 == "" || isbns3 == "")) {
			if ("978" != isbns1 && "979" != isbns1) {
				$("#createdianziliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorIsbnBooke1);
			} else {
				$("#createdianziliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.pleaseEntIsbnPowerAll);
			}
		}
		if (isbns2 != "" && (isbns1 == "" || isbns3 == "")) {
			if (!isEqueNumberValid(isbns2, 1)) {
				$("#createdianziliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorIsbnBooke2);
			} else {
				$("#createdianziliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.pleaseEntIsbnPowerAll);
			}
		}
		if (isbns3 != "" && (isbns1 == "" || isbns2 == "")) {
			if (!isNewNumber(isbns3) || isbns3.length < 2 || isbns3.length > 7) {
				$("#createdianziliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorIsbnBooke3);
			} else {
				$("#createdianziliisbns" + index).removeClass("right").addClass("error")
						.html(message.reginfo.pleaseEntIsbnPowerAll);
			}
		}
	} else if (isbns1 == "" && isbns2 == "" && isbns3 == "") {
		if($("#groupProperty").val()==1){
			$("#createdianziliisbns" + index).removeClass("error").html("");
		}else{
			$("#createdianziliisbns" + index).removeClass("right").addClass("error").html(message.reginfo.notBeNullIsbnPower);
			
		}
	}
}
/**
 * 检查ISSN
 * 
 * @param obj
 * @param index
 */
function checkISSN(obj, index) {
	var thisObj = $(obj);
	var thisID = $('#createqikanli' + index)
	var sibLength = thisObj.siblings('input').length;
	var objAllLength = sibLength + 1;
	var name = thisObj.attr('name');
	var issn1 = $.trim(thisID.find('input[name=' + name + ']:eq(0)').val());
	var issn2 = $.trim(thisID.find('input[name=' + name + ']:eq(1)').val());
	$("#issnshow" + index).empty().remove();
	thisID.find('input[name=' + name + ']:eq(1)').siblings().last().after($("<span>").attr("id", "issnshow" + index));
	if (issn1 != "" || issn2 != "") {
		if (issn1 != "" && issn2 != "") {
			if (isEqueNumberValid(issn1, 4) && isCheckNumberValid(issn2, 4)) {
				var newissn2=getLastIssnCode(issn1,issn2);
				if(newissn2==issn2){
					$("#issnshow" + index).empty().remove();
				}else{
					$("#issnshow" + index).removeClass("right").addClass("error").html(message.reginfo.errorCheckIssn2);
				}
			} else if (!isEqueNumberValid(issn1, 4)) {
				$("#issnshow" + index).removeClass("right").addClass("error").html(message.reginfo.errorIssn1);
			} else if (!isCheckNumberValid(issn2, 4)) {
				$("#issnshow" + index).removeClass("right").addClass("error").html(message.reginfo.errorNewIssn2);
			}
		}
		if (issn1 != "" && issn2 == "") {
			if (!isEqueNumberValid(issn1, 4)) {
				$("#issnshow" + index).removeClass("right").addClass("error").html(message.reginfo.errorIssn1);
			} else {
				$("#issnshow" + index).removeClass("right").addClass("error").html(message.reginfo.pleaseEntIssnAll);
			}
		}
		if (issn2 != "" && issn1 == "") {
			if (!isCheckNumberValid(issn2, 4)) {
				$("#issnshow" + index).removeClass("right").addClass("error").html(message.reginfo.errorNewIssn2);
			} else {
				$("#issnshow" + index).removeClass("right").addClass("error").html(message.reginfo.pleaseEntIssnAll);
			}
		}
	} else if (issn1 == "" && issn2 == "") {
		if($("#groupProperty").val()==1){
			$("#issnshow" + index).removeClass("error").html("");
		}else{
			$("#issnshow" + index).removeClass("right").addClass("error").html(message.reginfo.pleaseEntIssnAll);;
		}
	}
}

/**
 * 检查CN
 * 
 * @param obj
 * @param index
 */
function checkCN(obj, index) {
	var thisObj = $(obj);
	var thisID = $('#createbaozhili' + index)
	var sibLength = thisObj.siblings('input').length;
	var objAllLength = sibLength + 1;
	var name = thisObj.attr('name');
	var cn1 = $.trim(thisID.find('input[name=' + name + ']:eq(0)').val());
	var cn2 = $.trim(thisID.find('input[name=' + name + ']:eq(1)').val());
	$("#cnshow" + index).empty().remove();
	thisID.find('input[name=' + name + ']:eq(1)').siblings().last().after(
			$("<span>").attr("id", "cnshow" + index));
	if (cn1 != "" || cn2 != "") {
		if (cn1 != "" && cn2 != "") {
			if (isEqueNumberValid(cn1, 2) && isEqueNumberValid(cn2, 4)) {
				$("#cnshow" + index).empty().remove();
			} else if (!isEqueNumberValid(cn1, 2)) {
				$("#cnshow" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorCn1);
			} else if (!isEqueNumberValid(cn2, 4)) {
				$("#cnshow" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorIssn2);
			}
		}
		if (cn1 != "" && cn2 == "") {
			if (!isEqueNumberValid(cn1, 2)) {
				$("#cnshow" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorCn1);
			} else {
				$("#cnshow" + index).removeClass("right").addClass("error")
						.html(message.reginfo.pleaseEntCnAll);
			}
		}
		if (cn2 != "" && cn1 == "") {
			if (!isEqueNumberValid(cn2, 4)) {
				$("#cnshow" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorIssn2);
			} else {
				$("#cnshow" + index).removeClass("right").addClass("error")
						.html(message.reginfo.pleaseEntCnAll);
			}
		}
	} else if (cn1 == "" && cn2 == "") {
		if($("#groupProperty").val()==1){
			$("#cnshow" + index).removeClass("error").html("");
		}else{
			$("#cnshow" + index).removeClass("right").addClass("error").html(message.reginfo.notBeNullCn);
		}
	}
}

//统一社会信用代码提示
function checkRegno() {
	$('#regnoSpan').removeClass().html('');
	var regno=$.trim($('#regno').val());
	if(regno==''){
		$('#regnoSpan').addClass("error").html(message.reginfo.onlyNumber18);
		return false;
	}else{
		var str =/^[a-zA-Z0-9]{15,18}$/;
		if(str.test(regno)){
			$('#regnoSpan').removeClass("error").addClass("red").html(message.reginfo.regnoSpan);
		}else{
			$('#regnoSpan').addClass("error").html(message.reginfo.onlyNumber18);
			return false;
		}
	}
	return true;
}


function saveApply() {
	var result = $("#publisherApplyForm").valid();
	checkboxonemore("publicationTypeId");
	if (checkCNValid(result) && checkISSNValid(result) && checkEletronicCNValid(result)
			&& checkDianziIsbnValid(result) && checkMusicIsbnValid(result)
			&& checkIsbnValid(result) && checkboxint && show && checkRegno()) {
	
		var isbn = "book:";
		$.each($('input[name=isbntushu]'), function(i, item) {
			isbn += $(this).val() + ',';
		});

		if (isbn.length > 0) {
			isbn = isbn.substring(0, isbn.length - 1) + "-";
		}

		isbn += "music:";
		$.each($('input[name=isbnyinxiang]'), function(i, item) {
			isbn += $(this).val() + ',';
		});
		if (isbn.length > 0) {
			isbn = isbn.substring(0, isbn.length - 1) + "-";
		}

		isbn += "power:";
		$.each($('input[name=isbndianzi]'), function(i, item) {
			isbn += $(this).val() + ',';
		});
		if (isbn.length > 0) {
			isbn = isbn.substring(0, isbn.length - 1);
		}
		$('input[name=isbn]').val(isbn);
		var issn = "";
		$.each($('input[name=issn1]'), function(i, item) {
			issn += $(this).val() + ',';
		});
		if (issn.length > 0) {
			issn = issn.substring(0, issn.length - 1);
		}
		$('input[name=issn]').val(issn);
		var cn = "";
		$.each($('input[name=cn1]'), function(i, item) {
			cn += $(this).val() + ',';
		});
		if (cn.length > 0) {
			cn = cn.substring(0, cn.length - 1);
		}
		
		var eletronicCn = "";
		$.each($('input[name=eletroniccn1]'), function(i, item) {
			eletronicCn += $(this).val() + ',';
		});
		if (eletronicCn.length > 0) {
			eletronicCn = eletronicCn.substring(0, eletronicCn.length - 1);
		}
		
		if (cn.length > 2 && eletronicCn.length > 2) {
			$('input[name=cn]').val(cn+"-eletroniccn:"+eletronicCn);
		}else if (cn.length > 2) {
			$('input[name=cn]').val(cn);
		}else if (eletronicCn.length > 2) {
			$('input[name=cn]').val("-eletroniccn:"+eletronicCn);
		}
		console.log("cn:"+$('input[name=cn]').val());
		
		$('#publisherApplyForm').find("input[type=checkbox]").removeAttr("disabled");
		$('#publisherApplyForm').find("select").removeAttr("disabled");
		$('#publisherApplyForm').find('input:text').each(function() {
	        this.value = $.trim(this.value);
	    });
		var data = $('#publisherApplyForm').serializeArray();
		$.ajax({
			url : 'add.json',
			type : 'post',
			data : data,
			dataType : 'json',
			cache : false,
			success : function(r) {
				
				if (r.resultCode=='0000000') {
					window.location.href = "toGetpublisherapply";
				}else if (r.resultCode=='9200001') {
					dynamicAlert(message.reginfo.auditOk,message.defaults.tipTitle);
				}
				else {
					dynamicAlert(message.reginfo.serverBusy,message.defaults.tipTitle);
					
				}
			},
			error : function() {
				dynamicAlert(message.reginfo.serverBusy,message.defaults.tipTitle);

			}
		});
	}

	else {

		return;
	}
}

/**
 * 检查isbn图书
 * 
 * @param obj
 * @param index
 */
function checkIsbnValid(result) {
	var thisClass = $('.createtushuli');
	var length = thisClass.length;
	if (length == 0) {
		return result;
	}
	thisClass.each(function(k, v) {
		var index = k + 1
		var thisObj = $('#createtushuli' + index).children();
		var sibLength = thisObj.children('input').length;
		var objAllLength = sibLength + 1;
		var name = thisObj.children('input').first().attr('name');
		var isbns1 = $.trim(thisObj.find('input[name=' + name + ']:eq(0)')
				.val());
		var isbns2 = $.trim(thisObj.find('input[name=' + name + ']:eq(1)')
				.val());
		var isbns3 = $.trim(thisObj.find('input[name=' + name + ']:eq(2)')
				.val());
		$("#createtushuliisbns" + index).empty().remove();
		thisObj.find('input[name=' + name + ']:eq(2)').siblings().last().after(
				$("<span>").attr("id", "createtushuliisbns" + index));
		if (isbns1 != "" || isbns2 != "" || isbns3 != "") {
			if (isbns1 != "" && isbns2 != "" && isbns3 != "") {
				if ("978" != isbns1 && "979" != isbns1) {
					$("#createtushuliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorIsbnBooke1);
					result = false;
				} else if (!isEqueNumberValid(isbns2, 1)) {
					$("#createtushuliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorIsbnBooke2);
					result = false;
				} else if (!isNewNumber(isbns3) || isbns3.length < 2 || isbns3.length > 7) {
					$("#createtushuliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorIsbnBooke3);
					result = false;
				}else{
					$("#createtushuliisbns" + index).empty().remove();
				}

			}
			if (isbns1 != "" && (isbns2 == "" || isbns3 == "")) {
				if ("978" != isbns1 && "979" != isbns1) {
					$("#createtushuliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorIsbnBooke1);
					result = false;
				} else {
					$("#createtushuliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.pleaseEntIsbnBookAll);
					result = false;
				}
			}
			if (isbns2 != "" && (isbns1 == "" || isbns3 == "")) {
				if (!isEqueNumberValid(isbns2, 1)) {
					$("#createtushuliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorIsbnBooke2);
					result = false;
				} else {
					$("#createtushuliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.pleaseEntIsbnBookAll);
					result = false;
				}
			}
			if (isbns3 != "" && (isbns1 == "" || isbns2 == "")) {
				if (!isNewNumber(isbns3) || isbns3.length < 2 || isbns3.length > 7) {
					$("#createtushuliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorIsbnBooke3);
					result = false;
				} else {
					$("#createtushuliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.pleaseEntIsbnBookAll);
					result = false;
				}
			}
		} else if (isbns1 == "" && isbns2 == "" && isbns3 == "") {
			//如果是集团下属出版单位，则不要做非空校验
			$("#createtushuliisbns" + index).removeClass("error").html("");
		}
	});
	return result;
}

/**
 * 检查isbn音像
 * 
 * @param obj
 * @param index
 */
function checkMusicIsbnValid(result) {
	var thisClass = $('.createyinxiangli');
	var length = thisClass.length;
	if (length == 0) {
		return result;
	}

	thisClass.each(function(k, v) {
		var index = k + 1
		var thisObj = $('#createyinxiangli' + index).children();
		var sibLength = thisObj.children('input').length;
		var objAllLength = sibLength + 1;
		var name = thisObj.children('input').first().attr('name');
		var isbns1 = $.trim(thisObj.find('input[name=' + name + ']:eq(0)')
				.val());
		var isbns2 = $.trim(thisObj.find('input[name=' + name + ']:eq(1)')
				.val());
		var isbns3 = $.trim(thisObj.find('input[name=' + name + ']:eq(2)')
				.val());
		$("#createyinxiangliisbns" + index).empty().remove();
		thisObj.find('input[name=' + name + ']:eq(2)').siblings().last().after(
				$("<span>").attr("id", "createyinxiangliisbns" + index));
		if (isbns1 != "" || isbns2 != "" || isbns3 != "") {
			if (isbns1 != "" && isbns2 != "" && isbns3 != "") {
				if ("978" != isbns1 && "979" != isbns1) {
					$("#createyinxiangliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorIsbnBooke1);
					result = false;
				} else if (!isEqueNumberValid(isbns2, 1)) {
					$("#createyinxiangliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorIsbnBooke2);
					result = false;
				} else if (!isNewNumber(isbns3) || isbns3.length < 2 || isbns3.length > 7) {
					$("#createyinxiangliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorIsbnBooke3);
					result = false;
				}else{
					$("#createyinxiangliisbns" + index).empty().remove();
				}

			}
			if (isbns1 != "" && (isbns2 == "" || isbns3 == "")) {
				if ("978" != isbns1 && "979" != isbns1) {
					$("#createyinxiangliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorIsbnBooke1);
					result = false;
				} else {
					$("#createyinxiangliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.pleaseEntIsbnBookAll);
					result = false;
				}
			}
			if (isbns2 != "" && (isbns1 == "" || isbns3 == "")) {
				if (!isEqueNumberValid(isbns2, 1)) {
					$("#createyinxiangliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorIsbnBooke2);
					result = false;
				} else {
					$("#createyinxiangliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.pleaseEntIsbnBookAll);
					result = false;
				}
			}
			if (isbns3 != "" && (isbns1 == "" || isbns2 == "")) {
				if (!isNewNumber(isbns3) || isbns3.length < 2 || isbns3.length > 7) {
					$("#createyinxiangliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorIsbnBooke3);
					result = false;
				} else {
					$("#createyinxiangliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.pleaseEntIsbnBookAll);
					result = false;
				}
			}
		} else if (isbns1 == "" && isbns2 == "" && isbns3 == "") {
			$("#createyinxiangliisbns" + index).removeClass("error").html("");
		}
	});
	return result;
}

/**
 * 检查isbn电子
 * 
 * @param obj
 * @param index
 */
function checkDianziIsbnValid(result) {
	var thisClass = $('.createdianzili');
	var length = thisClass.length;
	if (length == 0) {
		return result;
	}

	thisClass.each(function(k, v) {
		var index = k + 1
		var thisObj = $('#createdianzili' + index).children();
		var sibLength = thisObj.children('input').length;
		var objAllLength = sibLength + 1;
		var name = thisObj.children('input').first().attr('name');
		var isbns1 = $.trim(thisObj.find('input[name=' + name + ']:eq(0)')
				.val());
		var isbns2 = $.trim(thisObj.find('input[name=' + name + ']:eq(1)')
				.val());
		var isbns3 = $.trim(thisObj.find('input[name=' + name + ']:eq(2)')
				.val());
		$("#createdianziliisbns" + index).empty().remove();
		thisObj.find('input[name=' + name + ']:eq(2)').siblings().last().after(
				$("<span>").attr("id", "createdianziliisbns" + index));
		if (isbns1 != "" || isbns2 != "" || isbns3 != "") {
			if (isbns1 != "" && isbns2 != "" && isbns3 != "") {
				if ("978" != isbns1 && "979" != isbns1) {
					$("#createdianziliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorIsbnBooke1);
					result = false;
				} else if (!isEqueNumberValid(isbns2, 1)) {
					$("#createdianziliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorIsbnBooke2);
					result = false;
				} else if (!isNewNumber(isbns3) || isbns3.length < 2 || isbns3.length > 7) {
					$("#createdianziliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorIsbnBooke3);
					result = false;
				}else{
					$("#createdianziliisbns" + index).empty().remove();
				}

			}
			if (isbns1 != "" && (isbns2 == "" || isbns3 == "")) {
				if ("978" != isbns1 && "979" != isbns1) {
					$("#createdianziliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorIsbnBooke1);
					result = false;
				} else {
					$("#createdianziliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.pleaseEntIsbnPowerAll);
					result = false;
				}
			}
			if (isbns2 != "" && (isbns1 == "" || isbns3 == "")) {
				if (!isEqueNumberValid(isbns2, 1)) {
					$("#createdianziliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorIsbnBooke2);
					result = false;
				} else {
					$("#createdianziliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.pleaseEntIsbnPowerAll);
					result = false;
				}
			}
			if (isbns3 != "" && (isbns1 == "" || isbns2 == "")) {
				if (!isNewNumber(isbns3) || isbns3.length < 2 || isbns3.length > 7) {
					$("#createdianziliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorIsbnBooke3);
					result = false;
				} else {
					$("#createdianziliisbns" + index).removeClass("right").addClass("error")
							.html(message.reginfo.pleaseEntIsbnPowerAll);
					result = false;
				}
			}
		} else if (isbns1 == "" && isbns2 == "" && isbns3 == "") {
			$("#createdianziliisbns" + index).removeClass("error").html("");
		}
	});
	return result;
}

/**
 * 检查ISSN
 * 
 * @param obj
 * @param index
 */
function checkISSNValid(result) {
	var thisClass = $('.createqikanli');
	var length = thisClass.length;
	if (length == 0) {
		return result;
	}

	thisClass
			.each(function(k, v) {
				var index = k + 1
				var thisObj = $('#createqikanli' + index).children();
				var sibLength = thisObj.children('input').length;
				var objAllLength = sibLength + 1;
				var name = thisObj.children('input').first().attr('name');
				var issn1 = $.trim(thisObj.find(
						'input[name=' + name + ']:eq(0)').val());
				var issn2 = $.trim(thisObj.find(
						'input[name=' + name + ']:eq(1)').val());
				$("#issnshow" + index).empty().remove();
				thisObj.find('input[name=' + name + ']:eq(1)').siblings()
						.last().after(
								$("<span>").attr("id", "issnshow" + index));
				if (issn1 != "" || issn2 != "") {
					if (issn1 != "" && issn2 != "") {
						if (isEqueNumberValid(issn1, 4) && isCheckNumberValid(issn2, 4)) {
							var newissn2=getLastIssnCode(issn1,issn2);
							if(newissn2==issn2){
								$("#issnshow" + index).empty().remove();
							}else{
								$("#issnshow" + index).removeClass("right").addClass("error").html(message.reginfo.errorCheckIssn2);
								result = false;
							}
						} else if (!isEqueNumberValid(issn1, 4)) {
							$("#issnshow" + index).removeClass("right")
									.addClass("error").html(message.reginfo.errorIssn1);
							result = false;
						} else if (!isCheckNumberValid(issn2, 4)) {
							$("#issnshow" + index).removeClass("right")
									.addClass("error").html(message.reginfo.errorNewIssn2);
							result = false;
						}
					}
					if (issn1 != "" && issn2 == "") {
						if (!isEqueNumberValid(issn1, 4)) {
							$("#issnshow" + index).removeClass("right").addClass("error").html(message.reginfo.errorIssn1);
							result = false;
						} else {
							$("#issnshow" + index).removeClass("right").addClass("error").html(message.reginfo.pleaseEntIssnAll);
							result = false;
						}
					}
					if (issn2 != "" && issn1 == "") {
						if (!isCheckNumberValid(issn2, 4)) {
							$("#issnshow" + index).removeClass("right").addClass("error").html(message.reginfo.errorNewIssn2);
							result = false;
						} else {
							$("#issnshow" + index).removeClass("right").addClass("error").html(message.reginfo.pleaseEntIssnAll);
							result = false;
						}
					}
				} else if (issn1 == "" && issn2 == "" ) {
					$("#issnshow" + index).removeClass("error").html("");
				}
			});
	return result;
}

/**
 * 检查CN
 * 
 * @param obj
 * @param index
 */
function checkCNValid(result) {
	var thisClass = $('.createbaozhili');
	var length = thisClass.length;
	if (length == 0) {
		return result;
	}
	thisClass.each(function(k, v) {
		var index = k + 1
		var thisObj = $('#createbaozhili' + index).children();
		var sibLength = thisObj.children('input').length;
		var objAllLength = sibLength + 1;
		var name = thisObj.children('input').first().attr('name');
		var cn1 = $.trim(thisObj.find('input[name=' + name + ']:eq(0)').val());
		var cn2 = $.trim(thisObj.find('input[name=' + name + ']:eq(1)').val());
		$("#cnshow" + index).empty().remove();
		thisObj.find('input[name=' + name + ']:eq(1)').siblings().last().after(
				$("<span>").attr("id", "cnshow" + index));
		
		if (cn1 != "" || cn2 != "") {
			if (cn1 != "" && cn2 != "") {
				if (isEqueNumberValid(cn1, 2) && isEqueNumberValid(cn2, 4)) {
					$("#cnshow" + index).empty().remove();
				} else if (!isEqueNumberValid(cn1, 2)) {
					$("#cnshow" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorCn1);
					result = false;
				} else if (!isEqueNumberValid(cn2, 4)) {
					$("#cnshow" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorIssn2);
					result = false;
				}
			}
			if (cn1 != "" && cn2 == "") {
				if (!isEqueNumberValid(cn1, 2)) {
					$("#cnshow" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorCn1);
					result = false;
				} else {
					$("#cnshow" + index).removeClass("right").addClass("error")
							.html(message.reginfo.pleaseEntCnAll);
					result = false;
				}
			}
			if (cn2 != "" && cn1 == "") {
				if (!isEqueNumberValid(cn2, 4)) {
					$("#cnshow" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorIssn2);
					result = false;
				} else {
					$("#cnshow" + index).removeClass("right").addClass("error")
							.html(message.reginfo.pleaseEntCnAll);
					result = false;
				}
			}
		} else if (cn1 == "" && cn2 == "" ) {
			//如果是集团下属出版单位，则不要做非空校验
			$("#cnshow" + index).removeClass("error").html("");
		}
	});
	return result;
}

/**
 * 重新设置索引值
 * 
 * @param className
 */
function restartIndex(className) {
	$('.' + className).each(function(k, v) {
		$(this).attr('id', className + (k + 1));
	});
}

/**
 * 获取出版物分类
 */
$(function() {
	// 获得出版物分类
	$.ajax({
		type : 'post',
		url : 'getType.json',
		dataType : 'json',
		async : false,
		success : function(data) {
			$.each(data, function(i, item) {
				$("#publicationTypeId").addClass("select-cls");
				$('<option/>').attr('value', item.publicationTypeId).text(
						item.publicationTypeName).appendTo(
						$('#publicationTypeId'));
			});
		},
		error : function() {
			dynamicAlert(message.reginfo.serverBusy,message.defaults.tipTitle);
		}
	});
});


function xxx() {
	var val = $("#publicationTypeId").val();
	if (val == 1) {
		$("#tushu").removeClass("hidden");
		$("#issnqikang").addClass("hidden");
		$("#baozhicn").addClass("hidden");
	} else if (val == 2) {
		$("#issnqikang").removeClass("hidden");
		$("#baozhicn").addClass("hidden");
		$("#tushu").addClass("hidden");
	} else if (val == 3) {
		$("#baozhicn").removeClass("hidden");
		$("#tushu").addClass("hidden");
		$("#issnqikang").addClass("hidden");
	} else if (val == 4) {
		$("#tushu").removeClass("hidden");
		$("#issnqikang").addClass("hidden");
		$("#baozhicn").addClass("hidden");
	} else if (val == 5) {
		$("#tushu").removeClass("hidden");
		$("#issnqikang").addClass("hidden");
		$("#baozhicn").addClass("hidden");
	}

}
/**
 * 拿到集团下属名称为确认出版者注册信息页面传值
 */
function getNval() {
	$("#grouptName").val($("#select2 option:selected").text());
}
/**
 * 拿到省份名字为确认出版者注册信息页面传值
 */
function getPval() {
	$("#provi").val($("#provinceId option:selected").text());
}

/**
 * 根据所属集团类型，获取级联数据
 */
function chubanshe(groupId) {
	var val = $("#groupProperty").val();
	$("#groupName").val($("#groupProperty option:selected").text());
	if (val == 1) {
		$('#publisherEn').removeAttr('readOnly');
		$("#select2").show();
		$(function() {
			// 获得出版单位归属信息
			$.ajax({
				type : 'post',
				url : 'getPress.json',
				dataType : 'json',
				async : false,
				success : function(data) {
					var select = $("#select2").addClass("select-cls");
					$("<option value=''>" + message.feedback.select+ "</option>").appendTo(select);
					var optionEnd='';
					$.each(data, function(i, item) {
						if(item.groupEn=='ce shi' || item.groupCn=='测试'){
							if(language=='en_US'){
								optionEnd=$('<option/>').attr('value', item.id).text(item.groupEn);
							}else{
								optionEnd=$('<option/>').attr('value', item.id).text(item.groupCn);
							}
						}else{
							if(language=='en_US'){
								if(groupId!=null&&parseInt(groupId)>0){
									if(item.id==parseInt(groupId)){
										$('<option/>').attr('selected', true).attr('value', item.id).text(item.groupEn).appendTo(select);
									}else{
										$('<option/>').attr('value', item.id).text(item.groupEn).appendTo(select);
									}
								}else{
									$('<option/>').attr('value', item.id).text(item.groupEn).appendTo(select);
								}
							}else{
								if(groupId!=null&&parseInt(groupId)>0){
									if(item.id==parseInt(groupId)){
										$('<option/>').attr('selected', true).attr('value', item.id).text(item.groupCn).appendTo(select);
									}else{
										$('<option/>').attr('value', item.id).text(item.groupCn).appendTo(select);
									}
								}else{
									$('<option/>').attr('value', item.id).text(item.groupCn).appendTo(select);
								}
							}
						}
					});
					optionEnd.appendTo(select);
				}
			});
		});
	} else if (val == 2) {
		$('#publisherEn').attr('readOnly',true);
		$("#select2").hide();
		$("#select2").empty();
		$("#groupProperty").parent().find("label:last").remove();
	} else if (val == 0) {
		$('#publisherEn').removeAttr('readOnly');
		$("#select2").hide();
		$("#select2").empty();
		$("#groupProperty").parent().find("label:last").remove();
	}
	//cleanPublicationType();
	checkPublisher(val,groupId);
}

function cleanPublicationType(){
	$("input[name='publicationTypeId']").attr("checked",false);
	$("input[name='publicationTypeId']").attr("disabled",false);
	$(".createtushuli").empty().remove();
	$(".createqikanli").empty().remove();
	$(".createbaozhili").empty().remove();
	$(".createyinxiangli").empty().remove();
	$(".createdianzili").empty().remove();
}

// 新增图书isbn前缀输入框
function createBookIsbn() {
	var bookClass = $('.createtushuli');
	var length = bookClass.length;
	v='';
	var bookIsbn = $('<dl class="createtushuli" id="createtushuli'
			+ (length + 1)
			+ '"><dt>'+v+message.reginfo.preBook+'：</dt><dd>'
			+ '<input type="text" onblur="checkIsbn(this,'+ (length + 1)+ ')" name="isbntushu" class="width55"  /> <input type="text" onblur="checkIsbn(this,'
			+ (length + 1)
			+ ')" name="isbntushu" class="width55"  /><input type="text" onblur="checkIsbn(this,'
			+ (length + 1)
			+ ')" name="isbntushu" class="width55"  />'
			+ '<span class="regRemove regAdd" onclick="deleteBookIsbn(this);">.</span></dd></dl>');
	bookIsbn.insertAfter("#createtushuli" + length);
}

// 新增音像isbn前缀输入框
function createMusicIsbn() {
	var musicClass = $('.createyinxiangli');
	var length = musicClass.length;
	v='';
	var musicIsbn = $('<dl class="createyinxiangli" id="createyinxiangli'
			+ (length + 1)
			+ '"><dt>'+v+message.reginfo.preMusic+'：</dt><dd>'
			+ '<input type="text" name="isbnyinxiang" class="width55" onblur="checkyinxiangIsbn(this,'
			+ (length + 1)
			+ ')" /> <input type="text" name="isbnyinxiang" class="width55"  onblur="checkyinxiangIsbn(this,'
			+ (length + 1)
			+ ')"/><input type="text"  name="isbnyinxiang" class="width55" onblur="checkyinxiangIsbn(this,'
			+ (length + 1)
			+ ')" />'
			+ '<span class="regRemove regAdd" onclick="deleteMusicIsbn(this);">.</span> </dd></dl>')
	musicIsbn.insertAfter("#createyinxiangli" + length);
}

// 新增电子isbn前缀输入框
function createPowerIsbn() {
	var dianziClass = $('.createdianzili');
	var length = dianziClass.length;
	v='';
	var powerIsbn = $('<dl class="createdianzili" id="createdianzili'
			+ (length + 1)
			+ '"><dt>'+v+message.reginfo.prePower+'：</dt><dd>'
			+ '<input type="text"   name="isbndianzi" class="width55"  onblur="checkdianziIsbn(this,'
			+ (length + 1)
			+ ')"/> <input type="text"   name="isbndianzi" class="width55" onblur="checkdianziIsbn(this,'
			+ (length + 1)
			+ ')" /><input type="text"  name="isbndianzi"  class="width55" onblur="checkdianziIsbn(this,'
			+ (length + 1)
			+ ')" />'
			+ '<span class="regRemove regAdd" onclick="deletePowerIsbn(this);">.</span></dd></dl>')
	powerIsbn.insertAfter("#createdianzili" + length);
}

// 新增报纸cn前缀输入框
function createPcn() {
	var cnClass = $('.createbaozhili');
	var length = cnClass.length;
	v='';
	var pCn = $('<dl class="createbaozhili" id="createbaozhili'
			+ (length + 1)
			+ '"><dt>'+v+'CN：</dt><dd>'
			+ '<input type="text"  name="cn1" class="width55" onblur="checkCN(this,'
			+ (length + 1)
			+ ');" /><input type="text"  name="cn1" class="width55"   onblur="checkCN(this,'
			+ (length + 1)
			+ ');"/>'
			+ '<span class="regRemove regAdd" onclick="deletePcn(this);">.</span> <span id="cntest"></span></dd></dl>')
	pCn.insertAfter("#createbaozhili" + length);
}

// 新增ISSN前缀输入框
function createIssn() {
	var issnClass = $('.createqikanli');
	var length = issnClass.length;
	v='';
	var issn = $('<dl class="createqikanli" id="createqikanli'
			+ (length + 1)
			+ '"><dt>'+v+'ISSN：</dt><dd>'
			+ '<input type="text" name="issn1" class="width55"  onblur="checkISSN(this,'
			+ (length + 1)
			+ ')"/><input type="text" name="issn1" class="width55"   onblur="checkISSN(this,'
			+ (length + 1)
			+ ')"/>'
			+ '<span class="regRemove regAdd" onclick="deleteIssn(this);">.</span></dd></dl>')
	issn.insertAfter("#createqikanli" + length);
}

// 删除音响isbn前缀输入框
function deleteMusicIsbn(obj) {
	$(obj).parent().parent().empty().remove();
	restartIndex('createyinxiangli');
}
// 删除图书isbn前缀输入框
function deleteBookIsbn(obj) {
	//$(obj).parent().empty().remove();
	$(obj).parent().parent().empty().remove();
	restartIndex('createtushuli');
}

// 删除电子isbn前缀输入框
function deletePowerIsbn(obj) {
	$(obj).parent().parent().empty().remove();
	restartIndex('createdianzili');
}
// 删除报纸cn前缀输入框
function deletePcn(obj) {
	$(obj).parent().parent().empty().remove();
	restartIndex('createbaozhili');
}

// 删除ISSN前缀输入框
function deleteIssn(obj) {
	$(obj).parent().parent().empty().remove();
	restartIndex('createqikanli');
}

// 跳转到注册信息确认页面
function toConfirmation() {

	window.location.href = "toConfirmation";
}

/**
 * 是否有选择出版物分类
 */
function checkboxonemore(objname) {
	var obj = document.getElementsByName(objname);
	var objLen = obj.length;
	var objYN;
	var i;
	objYN = false;
	for (i = 0; i < objLen; i++) {
		if (obj[i].checked == true) {
			objYN = true;
			checkboxint = true;
			$("#msgshow").text("");
			$("#msgshow").hide();
			break;
		} else {
			checkboxint = false;
			$("#msgshow").text(message.reginfo.pleaseCheckPublictionType);
			$("#msgshow").show();
		}
	}
	return objYN;
}

/**
 * 点击期刊
 */
function dianjicheckqikan() {
	if ($("#qikan").attr("checked") == "checked") {
		
		checkboxint = true;
		$("#msgshow").text("");
		$("#msgshow").hide();
		v='';
		var qikanIssn = $('<dl class="createqikanli" id="createqikanli1"><dt>'+v+'ISSN：</dt><dd>'
				+ '<input type="text"  name="issn1" class="width55"  onblur="checkISSN(this,1)"/>'
				+ '<input type="text"  name="issn1" class="width55"  onblur="checkISSN(this,1)"/>'
				+ '<span class="regAdd" onclick="createIssn();">.</span></dd></dl>');
		qikanIssn.insertAfter("#hiddenIsbn");
	} else {
		
		checkboxonemore("publicationTypeId");
		$(".createqikanli").remove();
		
	}

}

/**
 * 点击报纸
 */
function dianjicheckbaozhi() {
	if ($("#baozhi").attr("checked") == "checked") {
		
		checkboxint = true;
		$("#msgshow").text("");
		$("#msgshow").hide();
		v='';
		var baozhiCn = $('<dl class="createbaozhili" id="createbaozhili1"><dt>'+v+'CN：</dt><dd>'
				+ '<input type="text"  name="cn1" class="width55"  onblur="checkCN(this,1)"/>'
				+ '<input type="text"  name="cn1"class="width55"  onblur="checkCN(this,1)"/>'
				+ '<span class="regAdd" onclick="createPcn();">.</span></dd></dl>');
		baozhiCn.insertAfter("#hiddenIsbn");

	} else {
		
		checkboxonemore("publicationTypeId");
		$(".createbaozhili").empty().remove();
		
	}

}

/**
 * 点击电子
 */
function dianjicheckissn() {
	if ($("#dianzi").attr("checked") == "checked") {
		checkboxint = true;
		$("#msgshow").text("");
		$("#msgshow").hide();
		v='';
		var dianziISBN = $('<dl class="createdianzili" id="createdianzili1"><dt>'+v+message.reginfo.prePower+'：</dt><dd>'
				+ '<input type="text"  name="isbndianzi" class="width55"  onblur="checkdianziIsbn(this,1)"/>'
				+ '<input type="text"  name="isbndianzi" class="width55" onblur="checkdianziIsbn(this,1)"/>'
				+ '<input type="text"  name="isbndianzi" class="width55"  onblur="checkdianziIsbn(this,1)"/>'
				+ '<span class="regAdd" onclick="createPowerIsbn();">.</span></dd></dl>');
		
		var dianziCn = $('<dl class="createdianzicn" id="createdianzicn1"><dt>'+v+message.reginfo.eletroniccn+'：</dt><dd>'
				+ '<input type="text"  name="eletroniccn1" class="width55"  onblur="checkDianziCn(this,1)"/>'
				+ '<input type="text"  name="eletroniccn1"class="width55"  onblur="checkDianziCn(this,1)"/>'
				+ '<span class="regAdd" onclick="createDianziCn();">.</span></dd></dl>');
		
		var isbnBookLenght = $('.createtushuli').length;
		var isbnQiKanLenght = $('.createqikanli').length;
		var isbnBaoZhiLenght = $('.createbaozhili').length;
		var isbnDianZiLenght = $('.createyinxiangli').length;
		
		if(isbnQiKanLenght!=0){
			dianziISBN.insertAfter("#createqikanli"+isbnQiKanLenght);
		}else if(isbnBaoZhiLenght!=0){
			dianziISBN.insertAfter("#createbaozhili"+isbnBaoZhiLenght);
		}else if(isbnDianZiLenght!=0){
			dianziISBN.insertAfter("#createyinxiangli"+isbnDianZiLenght);
		}else if(isbnBookLenght!=0&&isbnDianZiLenght==0){
			dianziISBN.insertAfter("#createtushuli"+isbnBookLenght);
		}else{
			dianziISBN.insertAfter("#hiddenIsbn");
		}
		dianziCn.insertAfter(".createdianzili");

	} else {
		checkboxonemore("publicationTypeId");
		$(".createdianzili").remove();
		$(".createdianzicn").remove();
	}

}

/**
 * 点击图书
 */
function dianjichectushu() {
	if ($("#tushu").attr("checked") == "checked") {
		
		
		
		checkboxint = true;
		$("#msgshow").text("");
		$("#msgshow").hide();
		v='';
		var bookIsbn = $('<dl class="createtushuli" id="createtushuli1"><dt>'+v+message.reginfo.preBook+'：</dt><dd>'
				+ '<input type="text" onblur="checkIsbn(this,1)" name="isbntushu" class="width55"  /><input type="text" onblur="checkIsbn(this,1)" name="isbntushu" class="width55"  /><input type="text" onblur="checkIsbn(this,1)" name="isbntushu" class="width55"  />'
				+ '<span class="regAdd" onclick="createBookIsbn();">.</span></dd></dl>');
		bookIsbn.insertAfter("#hiddenIsbn");
	} else {
		
		checkboxonemore("publicationTypeId");
		$('.createtushuli').remove();
		
	}
}

/**
 * 点击音响
 */
function dianjicheckyinxiang() {
	if ($("#yinxiang").attr("checked") == "checked") {
		
		checkboxint = true;
		$("#msgshow").text("");
		$("#msgshow").hide();
		v='';
		var musicIsbn = $('<dl class="createyinxiangli" id="createyinxiangli1"><dt>'+v+message.reginfo.preMusic+'：</dt><dd>'
				+ '<input type="text"  name="isbnyinxiang" class="width55" onblur="checkyinxiangIsbn(this,1)" />'
				+ '<input type="text"  name="isbnyinxiang" class="width55"  onblur="checkyinxiangIsbn(this,1)"/>'
				+ '<input type="text"  name="isbnyinxiang" class="width55"  onblur="checkyinxiangIsbn(this,1)"/>'
				+ '<span class="regAdd" onclick="createMusicIsbn();">.</span></dd></dl>');
		var isbnBookLength = $('.createtushuli').length;
		if(isbnBookLength==0){
			musicIsbn.insertAfter("#hiddenIsbn");
		}else{			
			musicIsbn.insertAfter("#createtushuli"+isbnBookLength);
		}
	} else {
		
		checkboxonemore("publicationTypeId");
		$(".createyinxiangli").remove();
		
	}
}

/**
 * 点击网络出版
 */
function dianjiinternet() {
	if ($("#internet").attr("checked") == "checked") {
		checkboxint = true;
		$("#msgshow").text("");
		$("#msgshow").hide();

	} else {
		checkboxonemore("publicationTypeId");
	}

}

function isillegalchar(str) {
	var reg = /^[^@\/\'\\\"#$%&\^\*\(\)\[\]\{\}\<\>\~\`\·\（\）]+$/;
	return reg.test(str);
}

function isNumber(str) {
	if (str.length == 0) {
		return true;
	}
	if (str.length > 5) {
		return false;
	}
	var reg = /^[0-9]*$/;
	return reg.test(str);
}

function isNewNumber(str) {
	if (str.length == 0) {
		return true;
	}
	
	var reg = /^[0-9]*$/;
	return reg.test(str);
}

/**
 * 验证必须有效的数字
 * 
 * @param str
 *            字符
 * @param length
 *            有效最大长度
 * @returns
 */
function isEqueNumberValid(str, length) {
	if (len(str) == 0) {
		return true;
	}
	if (len(str) != length) {
		return false;
	}
	var reg = /^[0-9]*$/;
	return reg.test(str);
}

/**
 * 验证必须有效的数字或者尾数为X
 * 
 * @param str
 *            字符
 * @param length
 *            有效最大长度
 * @returns
 */
function isCheckNumberValid(str, length) {
	if (len(str) == 0) {
		return true;
	}
	if (len(str) != length) {
		return false;
	}
	var reg =/^[0-9]{4}$|^[0-9]{3}X$/;
	return reg.test(str);
}

/**
 * 生成最后一位issn检验位
 */
function getLastIssnCode(issn1,issn2) {
	if (len(issn1) == 0 || isNaN(issn1) || len(issn2) == 0 || isNaN(issn2.substring(0,3))) {
		return;
	}
	if (len(issn2) > 3) {
		issn2 = issn2.substring(0, 3);
	}
	var issn = issn1 + issn2;
	var total = parseInt(issn.charAt(0)) * 8 + parseInt(issn.charAt(1)) * 7
			+ parseInt(issn.charAt(2)) * 6 + parseInt(issn.charAt(3)) * 5
			+ parseInt(issn.charAt(4)) * 4 + parseInt(issn.charAt(5)) * 3
			+ parseInt(issn.charAt(6)) * 2;
	var validChar = "";
	var less = total % 11;
	if (less == 0) {
		validChar = "0";
	} else if (less == 1) {
		validChar = "X";
	} else {
		validChar += (11 - less);
	}
	return issn2 + validChar;
}


/**
 * 验证必须有效的数字或者尾数为X
 * 
 * @param str
 *            字符
 * @param length
 *            有效最大长度
 * @returns
 */
function isCheckIssnSecondValid(str, length) {
	if (len(str) == 0) {
		return true;
	}
	if (len(str) != length) {
		return false;
	}
	var reg =/^[0-9]{3,}$|^[0-9]{3}X$/;
	return reg.test(str);
}

/**
 * 验证有效的数字
 * 
 * @param str
 *            字符
 * @param length
 *            有效最大长度
 * @returns
 */
function isNumberValid(str, length) {
	if (len(str) == 0) {
		return true;
	}
	if (len(str) > length) {
		return false;
	}
	var reg = /^[0-9]*$/;
	return reg.test(str);
}

/**
 * 判断是否是数字或字母
 * 
 * @param str
 *            字符
 * @param length
 *            有效最大长度
 * @returns
 */
function isNumberLetter(str, length) {
	if (len(str) == 0) {
		return true;
	}
	if (len(str) > length) {
		return false;
	}
	var reg = /^[a-zA-Z0-9]+$/g;
	return reg.test(str);
}

/**
 * 判断是否是数字或字母
 * 
 * @param str
 *            字符
 * @param length
 *            有效最大长度
 * @returns
 */
function isNumberLetterNotIO(str, length) {
	if (len(str) == 0) {
		return true;
	}
	if (len(str) > length) {
		return false;
	}

	if (str.indexOf('I') >= 0 || str.indexOf('O') >= 0 || str.indexOf('i') >= 0
			|| str.indexOf('o') >= 0) {
		return false;
	}

	var reg = /^[a-zA-Z0-9]+$/g;
	return reg.test(str);
}

/**
 * 判断ISBN第三第四位数字
 * 
 * @param str1
 *            字符
 * @param str2
 *            字符
 * @param length
 *            最大长度
 * @returns {Boolean}
 */
function isIsbnVlaid(str1, str2, length) {
	if (len(str1) == 0 || len(str2) == 0) {
		return false;
	}
	if ((len(str1) + len(str2)) != length) {
		return false;
	}
	var reg = /^[0-9]*$/;
	return reg.test(str1) && reg.test(str2);
}

/**
 * 判断字母
 * 
 * @param str
 *            字符
 * @param length
 *            最大长度
 * @returns {Boolean}
 */
function isLetter(str, length) {
	if (len(str) > length) {
		return false;
	}
	var reg = /^[A-Za-z]+$/;
	return reg.test(str);
}

function isMonth(str) {
	if (str.length == 0) {
		return true;
	}
	var reg = /^(0?[1-9]|1[0-2])$/;
	return reg.test(str);
}

function isYear(str) {
	if (str.length == 0) {
		return true;
	}
	var reg = /^(19|20|21|22)[0-9]{2}$/;
	return reg.test(str);
}

function isMinute(str) {
	if (str.length == 0) {
		return true;
	}
	if (str > 59 || str < 0) {
		return false;
	}
	var reg = /^[0-9]*$/;
	return reg.test(str);
}

function isCip(str, length) {
	if (str.length == 0) {
		return true;
	}
	if (str.length > length) {
		return false;
	}
	var reg = /^[0-9]*$/;
	return reg.test(str);
}

/**
 * 判断字符的长度
 * 
 * @param name
 *            字符串
 * @returns {Number}
 */
function len(name) {
	if (name == "" || name == null) {
		return 0;
	}
	var l = 0;
	var names = name.split("");
	for ( var i = 0; i < names.length; i++) {
		if (names[i].charCodeAt(0) < 299) {
			l++;
		} else {
			l += 2;
		}
	}
	return l;
}

/**
 * 预览确认注册信息
 */
function previewInfo() {
	 var result = $("#publisherApplyForm").valid();
	 var flag = checkCNValid(result) +" "+ checkISSNValid(result) +" "+ checkDianziIsbnValid(result) +" "+ checkMusicIsbnValid(result)+" "+checkIsbnValid(result);
	 checkboxonemore("publicationTypeId");
	 if(checkCNValid(result)&& checkISSNValid(result)&&
	 checkDianziIsbnValid(result)&& checkMusicIsbnValid(result)&&
	 checkIsbnValid(result) && checkboxint && show){
	 //if(result){
		var data = $("#publisherApplyForm"),prveName = new Array();
		data.find("input[type=text]").each(function(k, v) {
			prveName.push(v.name);
			$(v).hide().after("<span tip='t' class='tips16'>" + v.value + "</span>");
			$(".tips16").parents(".wid8").addClass("wid16D");
			if(prveName[k-1] == v.name){
				$(v).after("<span tip='t'>-</span>");
				if($(v).prev("span").html().indexOf(":") > -1){
					$(v).next().empty().remove();
				};
			};
		});
		$("#movetitle").removeClass().addClass("regNav regNav3");
		$("#tips").hide();
		data.find(".regNav > a").each(function(k, v) {
			switch (k) {
			case 0:
				$(v).removeClass().addClass("regNava1");
				break;
			case 1:
				$(v).removeClass().addClass("regNava3");
				break;
			case 2:
				$(v).removeClass().addClass("regNava1 regNava2 regNava1Hov");
				break;
			case 3:
				$(v).removeClass().addClass("regNava1 regNava3");
				break;
			}
		});
		data.find(".regAdd").hide();
		data.find("input[type=checkbox]").attr("disabled", "disabled");
		data.find("select").attr("disabled", "disabled");
		//$("#show1").hide();
		//$("#show2").show();
	 }	
};


/**
 * 返回修改
 */
function backUpdate(){
	var data = $("#publisherApplyForm") ;
	data.find("input[type=text]").show();
	data.find("span[tip=t]").empty().remove();
	data.find("select").each(function(k, v){
		 $(v).removeAttr("disabled").removeClass("disabled");
	}); 
	$("#movetitle").removeClass().addClass("regNav regNav2");
	$("#tips").show();
	data.find(".regNav > a").each(function(k, v) {
		switch (k) {
		case 0:
			$(v).removeClass().addClass("regNava1");
			break;
		case 1:
			$(v).removeClass().addClass("regNava1 regNava1Hov");
			break;
		case 2:
			$(v).removeClass().addClass("regNava1 regNava2");
			break;
		case 3:
			$(v).removeClass().addClass("regNava1 regNava3");
			break;
		}
	});
	data.find(".regAdd").show();
	data.find("input[type=checkbox]").attr("disabled", false);
	
	
	//清除样式至验证提示原有类
	$("#publisherApplyForm").find("div").each(function(k, v) {
		$(v).children("p").removeClass("wid16D");
		$(v).removeClass("wid16D");
	});
	
};

/**
 * 取消按钮事件
 */
function btnCancle(){
	window.location.href = "${rc.contextPath}/web/provider/toRegment";
}

function goToPageHome() {
	window.location.href = contextPath + "/web/navigation/toNavigationPage/1";
}

/**
 * 检查电子CN
 * 
 * @param obj
 * @param index
 */
function checkDianziCn(obj, index) {
	var thisObj = $(obj);
	var thisID = $('#createdianzicn' + index);
	var sibLength = thisObj.siblings('input').length;
	var objAllLength = sibLength + 1;
	var name = thisObj.attr('name');
	var cn1 = $.trim(thisID.find('input[name=' + name + ']:eq(0)').val());
	var cn2 = $.trim(thisID.find('input[name=' + name + ']:eq(1)').val());
	$("#electroniccnshow" + index).empty().remove();
	thisID.find('input[name=' + name + ']:eq(1)').siblings().last().after(
			$("<span>").attr("id", "electroniccnshow" + index));
	if (cn1 != "" || cn2 != "") {
		if (cn1 != "" && cn2 != "") {
			if (isEqueNumberValid(cn1, 2) && isEqueNumberValid(cn2, 4)) {
				$("#electroniccnshow" + index).empty().remove();
			} else if (!isEqueNumberValid(cn1, 2)) {
				$("#electroniccnshow" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorCn1);
			} else if (!isEqueNumberValid(cn2, 4)) {
				$("#electroniccnshow" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorIssn2);
			}
		}
		if (cn1 != "" && cn2 == "") {
			if (!isEqueNumberValid(cn1, 2)) {
				$("#electroniccnshow" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorCn1);
			} else {
				$("#electroniccnshow" + index).removeClass("right").addClass("error")
						.html(message.reginfo.pleaseEntCnAll);
			}
		}
		if (cn2 != "" && cn1 == "") {
			if (!isEqueNumberValid(cn2, 4)) {
				$("#electroniccnshow" + index).removeClass("right").addClass("error")
						.html(message.reginfo.errorIssn2);
			} else {
				$("#electroniccnshow" + index).removeClass("right").addClass("error")
						.html(message.reginfo.pleaseEntCnAll);
			}
		}
	} else if (cn1 == "" && cn2 == "") {
		if($("#groupProperty").val()==1){
			$("#electroniccnshow" + index).removeClass("error").html("");
		}else{
			$("#electroniccnshow" + index).removeClass("right").addClass("error").html(message.reginfo.notBeNullCn);
		}
	}
}


//新增电子cn前缀输入框
function createDianziCn() {
	var cnClass = $('.createdianzicn');
	var length = cnClass.length;
	v='';
	var pCn = $('<dl class="createdianzicn" id="createdianzicn'+ (length + 1)+ '"><dt>'+v+message.reginfo.eletroniccn+'：</dt><dd>'
			+ '<input type="text"  name="eletroniccn1" class="width55" onblur="checkDianziCn(this,'+ (length + 1)
			+ ');" /><input type="text"  name="eletroniccn1" class="width55"   onblur="checkDianziCn(this,'+ (length + 1)+ ');"/>'
			+ '<span class="regRemove regAdd" onclick="deleteDianziCn(this);">.</span> <span id="electroniccntest"></span></dd></dl>')
	pCn.insertAfter("#createdianzicn" + length);
}

//删除ISSN前缀输入框
function deleteDianziCn(obj) {
	$(obj).parent().parent().empty().remove();
	restartIndex('createdianzicn');
}


/**
 * 检查电子CN
 * 
 * @param obj
 * @param index
 */
function checkEletronicCNValid(result) {
	var thisClass = $('.createdianzicn');
	var length = thisClass.length;
	if (length == 0) {
		return result;
	}
	thisClass.each(function(k, v) {
		var index = k + 1;
		var thisObj = $('#createdianzicn' + index).children();
		var sibLength = thisObj.children('input').length;
		var objAllLength = sibLength + 1;
		var name = thisObj.children('input').first().attr('name');
		var cn1 = $.trim(thisObj.find('input[name=' + name + ']:eq(0)').val());
		var cn2 = $.trim(thisObj.find('input[name=' + name + ']:eq(1)').val());
		$("#electroniccnshow" + index).empty().remove();
		thisObj.find('input[name=' + name + ']:eq(1)').siblings().last().after(
				$("<span>").attr("id", "electroniccnshow" + index));
		
		if (cn1 != "" || cn2 != "") {
			if (cn1 != "" && cn2 != "") {
				if (isEqueNumberValid(cn1, 2) && isEqueNumberValid(cn2, 4)) {
					$("#electroniccnshow" + index).empty().remove();
				} else if (!isEqueNumberValid(cn1, 2)) {
					$("#electroniccnshow" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorCn1);
					result = false;
				} else if (!isEqueNumberValid(cn2, 4)) {
					$("#electroniccnshow" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorIssn2);
					result = false;
				}
			}
			if (cn1 != "" && cn2 == "") {
				if (!isEqueNumberValid(cn1, 2)) {
					$("#electroniccnshow" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorCn1);
					result = false;
				} else {
					$("#electroniccnshow" + index).removeClass("right").addClass("error")
							.html(message.reginfo.pleaseEntCnAll);
					result = false;
				}
			}
			if (cn2 != "" && cn1 == "") {
				if (!isEqueNumberValid(cn2, 4)) {
					$("#electroniccnshow" + index).removeClass("right").addClass("error")
							.html(message.reginfo.errorIssn2);
					result = false;
				} else {
					$("#electroniccnshow" + index).removeClass("right").addClass("error")
							.html(message.reginfo.pleaseEntCnAll);
					result = false;
				}
			}
		} else if (cn1 == "" && cn2 == "" ) {
			$("#electroniccnshow" + index).removeClass("error").html("");
			//$("#electroniccnshow" + index).removeClass("right").addClass("error").html(message.reginfo.pleaseEntCnAll);
			//result = false;
		}
	});
	return result;
}


function applyUserTelOfficeBlur(){
	var result = true;
	var tel1 = $.trim($('input[name=applyUserTelOffice]:eq(0)').val());
	var tel2 = $.trim($('input[name=applyUserTelOffice]:eq(1)').val());
	if(tel1!=""||tel2!=""){
		if(tel1!=""&&tel2!=""){
			if(checkNumber1(tel1)&&checkNumber2(tel2)){
				$("#applyUserTelOfficeSpanId").removeClass("error").html('');
			}else if(!checkNumber1(tel1)){
				$("#applyUserTelOfficeSpanId").removeClass("right").addClass("error").html("请输入1~4位数字");
				result = false;
			}else if(!checkNumber2(tel2)){
				$("#applyUserTelOfficeSpanId").removeClass("right").addClass("error").html("请输入6~11位数字");
				result = false;
			}
		}
		if(tel1!=""&&tel2==""){
			if(!checkNumber1(tel1)){
				$("#applyUserTelOfficeSpanId").removeClass("right").addClass("error").html("请输入1~4位数字");
				result = false;
			}else{
				$("#applyUserTelOfficeSpanId").removeClass("right").addClass("error").html("请输入完整的固话");
				result = false;
			}
		}
		if(tel2!=""&&tel1==""){
			if(!checkNumber2(tel2)){
				$("#applyUserTelOfficeSpanId").removeClass("right").addClass("error").html("请输入6~11位数字");
				result = false;
			}else{
				$("#applyUserTelOfficeSpanId").removeClass("right").addClass("error").html("请输入完整的固话");
				result = false;
			}
		}
	}
	return result;
}

function legalPersonTelBlur(){
	var result = true;
	var tel1 = $.trim($('input[name=legalPersonTel]:eq(0)').val());
	var tel2 = $.trim($('input[name=legalPersonTel]:eq(1)').val());
	if(tel1!=""||tel2!=""){
		if(tel1!=""&&tel2!=""){
			if(checkNumber1(tel1)&&checkNumber2(tel2)){
				$("#legalPersonTelSpanId").removeClass("error").html('');
			}else if(!checkNumber1(tel1)){
				$("#legalPersonTelSpanId").removeClass("right").addClass("error").html("请输入1~4位数字");
				result = false;
			}else if(!checkNumber2(tel2)){
				$("#legalPersonTelSpanId").removeClass("right").addClass("error").html("请输入6~11位数字");
				result = false;
			}
		}
		if(tel1!=""&&tel2==""){
			if(!checkNumber1(tel1)){
				$("#legalPersonTelSpanId").removeClass("right").addClass("error").html("请输入1~4位数字");
				result = false;
			}else{
				$("#legalPersonTelSpanId").removeClass("right").addClass("error").html("请输入完整的固话");
				result = false;
			}
		}
		if(tel2!=""&&tel1==""){
			if(!checkNumber2(tel2)){
				$("#legalPersonTelSpanId").removeClass("right").addClass("error").html("请输入6~11位数字");
				result = false;
			}else{
				$("#legalPersonTelSpanId").removeClass("right").addClass("error").html("请输入完整的固话");
				result = false;
			}
		}
	}
	return result;
}

function contactTelBlur(){
	var result = true;
	var tel1 = $.trim($('input[name=contactTel]:eq(0)').val());
	var tel2 = $.trim($('input[name=contactTel]:eq(1)').val());
	if(tel1==""&&tel2==""){
		$("#contactTelSpanId").removeClass("right").addClass("error").html("请输入完整的固话");
		result = false;
	}
	else if(tel1!=""||tel2!=""){
		if(tel1!=""&&tel2!=""){
			if(checkNumber1(tel1)&&checkNumber2(tel2)){
				$("#contactTelSpanId").removeClass("error").html('');
			}else if(!checkNumber1(tel1)){
				$("#contactTelSpanId").removeClass("right").addClass("error").html("请输入1~4位数字");
				result = false;
			}else if(!checkNumber2(tel2)){
				$("#contactTelSpanId").removeClass("right").addClass("error").html("请输入6~11位数字");
				result = false;
			}
		}
		if(tel1!=""&&tel2==""){
			if(!checkNumber1(tel1)){
				$("#contactTelSpanId").removeClass("right").addClass("error").html("请输入1~4位数字");
				result = false;
			}else{
				$("#contactTelSpanId").removeClass("right").addClass("error").html("请输入完整的固话");
				result = false;
			}
		}
		if(tel2!=""&&tel1==""){
			if(!checkNumber2(tel2)){
				$("#contactTelSpanId").removeClass("right").addClass("error").html("请输入6~11位数字");
				result = false;
			}else{
				$("#contactTelSpanId").removeClass("right").addClass("error").html("请输入完整的固话");
				result = false;
			}
		}
	}
	return result;
}

function checkNumber1(obj){
	var pattern = /^[0-9]{1,4}$/;
	return pattern.test(obj);
}

function checkNumber2(obj){
	var pattern = /^[0-9]{6,11}$/;
	return pattern.test(obj);
}