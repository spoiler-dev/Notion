$().ready(function() {
	validateRule();
});

$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});
function update() {
	var methodName = $("#methodName").val();
	$.ajax({
		type : "post",
		url : contpath + "lubr/caLubrMethod/checkMethodName",
		async : false,
		data: {methodName : methodName},
		success : function(data) {			
			if (data == 0) {
				layer.msg("润滑方式名称不能重复",  {time:1000});
			} else {
				$.ajax({
					cache : true,
					type : "POST",
					url : contpath + "lubr/caLubrMethod/update",
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
		}
	});	


}
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		rules : {
			name : {
				required : true
			}
		},
		messages : {
			name : {
				required : icon + "请输入名字"
			}
		}
	})
}