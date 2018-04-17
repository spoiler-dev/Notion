$().ready(function() {
	validateRule();
});

$.validator.setDefaults({
	submitHandler : function() {
		save();
	}
});
function save() {
	$.ajax({
		cache : true,
		type : "POST",
		url : contpath+"check/sysDict/save",
		data : $('#signupForm').serialize(), // 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("网络超时");
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
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		rules : {
			name : {
				required : true,
			},
			value : {
				required : true,
			},
			type : {
				required : true,
			},
			description : {
				required : true,
			}
		},
		messages : {
			name : {
				required : icon + "请输入名字"
			},
			value : {
				required : icon + "请输入值"
			},
			type : {
				required : icon + "请输类型"
			},
			description : {
				required : icon + "请输描述"
			}
	
		}
	})
}
//检测手机号是否正确  
jQuery.validator.addMethod("isMobile", function(value, element) {  
    var length = value.length;  
    var regPhone = /^1([3578]\d|4[57])\d{8}$/;  
    return this.optional(element) || ( length == 11 && regPhone.test( value ) );    
}, "请正确填写您的手机号码");