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
		url : contpath+"check/checkStandard/save",
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
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		rules : {
			eqCode : {
				required : true
			},
			eqName : {
				required : true
			},
			eqPosition : {
				required : true
			},
			checkItem : {
				required : true
			},
			checkType : {
				required : true
			}
		},
		messages : {
			eqCode : {
				required : icon + "请输入设备编码"
			},
			eqName : {
				required : icon + "请输入设备名称"
			},
			eqPosition : {
				required : icon + "请输入部位"
			},
			checkItem : {
				required : icon + "请输入巡检项目"
			},
			checkType : {
				required : icon + "请输入点检类型"
			},
		}
	})
}