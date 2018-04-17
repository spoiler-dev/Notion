$().ready(function() {
	validateRule();
});

$.validator.setDefaults({
	submitHandler : function() {
		save();
	}
});
function save() {
	var oilCode = $("#oilCode").val();
	$.ajax({
		type : "post",
		url : contpath + "lubr/caLubrOil/checkOilCode",
		async : false,
		data: {oilCode : oilCode},
		success : function(data) {			
			if (data == 0) {
				layer.msg("编码不能重复",  {time:1000});
			} else {
				layer.confirm('油脂编码及油脂名称提交后不可修改，请确认无误后提交!', {
					btn : [ '确定', '取消' ]
				}, function() {
					$.ajax({
						cache : true,
						type : "POST",
						url : contpath +"lubr/caLubrOil/save",
						data : $('#signupForm').serialize(),// 你的formid
						async : false,
						error : function(request) {
							parent.layer.alert("Connection error");
						},
						success : function(data) {
							if (data.code == 0) {
								parent.layer.msg("操作成功");
								parent.reLoad();
								var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
								parent.layer.close(index);

							} else {
								parent.layer.alert(data.msg)
							}

						}
					});
				})
				}
		}
	});	
}



function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		rules : {
			oilCode:{   
                  required:true,
                  maxlength:32,
                  numAndLetter:true,                
            },
			oilName : {
				required : true,
				maxlength:80,
			},
			oilSpec : {
				maxlength:32,
			},
			refReference : {
				maxlength:120,
			},
			oilFactory : {
				maxlength:120,
			},
			density15 : {
				maxlength:120,
			},
			mViscosity40 : {
				maxlength:120,
			},
			bViscosity40 : {
				maxlength:120,
			},
			viscosityIndex : {
				maxlength:120,
			},
			color : {
				maxlength:120,
			},
			flashPoint : {
				maxlength:120,
			},
			lightPoint : {
				maxlength:120,
			},
			pourPoint : {
				maxlength:120,
			},
			dropPoint : {
				maxlength:120,
			},
			needlePenetration : {
				maxlength:120,
			},
			remark : {
				maxlength:120,
			}
		},
		messages : {			
			oilCode : {
				required : icon + "请输入油脂编号",
				maxlength:icon +"油脂编号最长32个字符！",
				
			},
			oilName : {
				required : icon + "请输入油脂名称",
				maxlength:icon +"油脂编号最长80个字符！",
			},
			oilSpec : {
				maxlength:icon +"油脂型号最长80个字符！",
			},
			refReference : {
				maxlength:icon +"加油参考最长120个字符！",
			},
			oilFactory : {
				maxlength:icon +"生产厂商最长100个字符！",
			},
			density15 : {
				maxlength:icon +"密度15℃最长20个字符！",
			},
			mViscosity40 : {
				maxlength:icon +"运动粘度40℃最长20个字符！",
			},
			bViscosity40 : {
				maxlength:icon +"基础油粘度40℃最长20个字符！",
			},
			viscosityIndex : {
				maxlength:icon +"粘度指数最长20个字符！",
			},
			color : {
				maxlength:icon +"颜色最长20个字符！",
			},
			flashPoint : {
				maxlength:icon +"闪点最长20个字符！",
			},
			lightPoint : {
				maxlength:icon +"燃点最长20个字符！",
			},
			pourPoint : {
				maxlength:icon +"倾点最长20个字符！",
			},
			dropPoint : {
				maxlength:icon +"滴点最长20个字符！",
			},
			needlePenetration : {
				maxlength:icon +"针入度25℃最长20个字符！",
			},
			remark : {
				maxlength:icon +"备注最长400个字符！",
			}
		}
	})
	jQuery.validator.addMethod("numAndLetter", function(value, element) {
		var numAndLetter = /^([a-zA-Z0-9]+)$/;
		return this.optional(element) || (numAndLetter.test(value));
		}, "只能输入数字和字母");
}