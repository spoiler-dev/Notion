$().ready(function() {
	validateRule();
});

$.validator.setDefaults({
	submitHandler : function() {
		save();
	}
});

function save() {
	var code = $('#signupForm #code').val();
	var name = $('#signupForm #name').val();
	
	$.ajax({
		type : "get",
		url : contpath + "parts/classification/queryByCode?code=" + code,
		async : false,
		success : function(data) {
			if (data != "") {
				layer.msg("编码不能重复",  {time:1000});
			} else {
				$.ajax({
					type : "get",
					url : contpath + "parts/classification/queryByName?name=" + name,
					async : false,
					success : function(data) {
						if (data != "") {
							layer.msg("名称不能重复",  {time:1000});
						} else {
							$.ajax({
								cache : true,
								type : "POST",
								url : contpath + "parts/classification/save",
								data : $('#signupForm').serialize(),
								async : false,
								error : function(request) {
									parent.layer.alert("Connection error");
								},
								success : function(data) {
									if (data.code == 0) {
										parent.layer.msg("操作成功");
										parent.reLoad();
										var index = parent.layer.getFrameIndex(window.name);
										parent.layer.close(index);
									} else {
										parent.layer.alert(data.msg)
									}
								}
							});
						}
					}
				});
			}
		}
	});
}

$.validator.addMethod("isCode", function(value, element) {
    var code = /^[0-9a-zA-Z]{0,32}$/;
    return code.test(value);
}, "请正确填写编码");

function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		rules : {
			code : {
				required : true,
				isCode : true
			},
			name : {
				required : true
			},
			orderNum : {
				required : true,
				digits : true,
				rangelength : [1, 8]
			}
		},
		messages : {
			code : {
				required : icon + "请输入字母，数字或字母数字组合，最大长度为32",
				isCode: icon + "请输入字母，数字或字母数字组合，最大长度为32"
			},
			name : {
				required : icon + "请输入名称"
			},
			orderNum : {
				required : icon + "请输入长度为1-8位的整数",
				digits : icon + "请输入长度为1-8位的整数",
				rangelength : icon + "请输入长度为1-8位的整数"
			}
		}
	})
}