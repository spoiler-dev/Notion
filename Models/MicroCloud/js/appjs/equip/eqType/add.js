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
		url : contpath+"equip/eqType/save",
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

}
$.validator.addMethod("isCode", function(value, element) {
    var code = /^[0-9a-zA-Z]{0,40}$/;
    if(value == '' || value == null){
    	return true;
    }
    return code.test(value);
}, "请正确填写编码");
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		rules : {
			typeCode : {//maxlength:5
				required : true,
				isCode : true//检测合法性的同时限制了长度
			},
			typeName : {
				required : true,
				maxlength : 80
			},
			orderCode : {
				digits : true,
				rangelength : [1, 8]
			},
			remark : {
				maxlength : 200
			}
		},
		messages : {
			typeCode : {
				required : icon + "请输入分类编号",
				isCode : icon + "只允许字母或数字组成，限40位"
			},
			typeName : {
				required : icon + "请输入分类名称",
				maxlength : icon + "最多输入80个字符"
			},
			orderCode : {
				digits : icon + "请输入整数",
				rangelength : icon + "请输入1-8位的整数"
			},
			remark : {
				maxlength : icon + "最多输入200个字符"
			}
		}
	})
}