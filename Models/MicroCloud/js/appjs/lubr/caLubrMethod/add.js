$().ready(function() {
	validateRule();
});

$.validator.setDefaults({
	submitHandler : function() {
		save();
	}
});
function save() {
	var methodCode = $("#methodCode").val();
	var methodName = $("#methodName").val();
	$.ajax({
		type : "post",
		url : contpath + "lubr/caLubrMethod/checkMethodCode",
		async : false,
		data: {methodCode : methodCode},
		success : function(data) {			
			if (data == 0) {
				layer.msg("润滑方式编码不能重复",  {time:1000});
			} else {
				$.ajax({
					type : "post",
					url : contpath + "lubr/caLubrMethod/checkMethodName",
					async : false,
					data: {methodName : methodName},
					success : function(data) {			
						if (data == 0) {
							layer.msg("润滑方式名称不能重复",  {time:1000});
						} else {
							layer.confirm('润滑方式编码提交后不可修改，请确认无误后提交!', {
								btn : [ '确定', '取消' ]
							}, function() {
								$.ajax({
									cache : true,
									type : "POST",
									url : contpath + "lubr/caLubrMethod/save",
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
		}
	});	
}
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		rules : {
			methodCode:{
				 required:true,
                 maxlength:32,
                 numAndLetter:true,
			},
			methodName : {
				required : true,
				maxlength:40,
			},
			orderNum : {
				digits:true,
				maxlength:8,
			}
		},
		messages : {
			methodCode:{
				required : icon + "请输入润滑方式编号",
				maxlength:icon +"润滑方式编号最长32个字符！",
			},
			methodName : {
				required : icon + "请输入润滑方式名称",
				maxlength:icon +"最长32个字符！",
			},
			orderNum : {
				maxlength:icon +"排序最长8个字符！",
				digits: icon + "请输入整数"
			}
		}
	})
	jQuery.validator.addMethod("numAndLetter", function(value, element) {
		var numAndLetter = /^([a-zA-Z0-9]+)$/;
		return this.optional(element) || (numAndLetter.test(value));
		}, "只能输入数字和字母");
}