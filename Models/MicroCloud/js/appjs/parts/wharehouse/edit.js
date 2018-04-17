$().ready(function() {
	loadSelect();
	validateRule();
});

function loadSelect(){
	var status = $("#status").val();
	if(status == 1){
		$("#op1").attr("selected" , true);
	}else{
		$("#op2").attr("selected" , true);
	}
}

$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});
function update() {
	var code = $("#code").val();
	
//	$.ajax({
//		type : "get",
//		url : contpath + "parts/wharehouse/queryStorageLocationByWharehouse/" + code,
//		async : false,
//		success : function(data) {
//			if (data.length > 0) {
//				parent.layer.msg("此仓库中有正在使用的库位，不能删除！");
//				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
//				parent.layer.close(index);
//
//			} else {
//				parent.layer.alert(data.msg)
//			}
//
//		}
//	});
	
	$.ajax({
		cache : true,
		type : "POST",
		url : contpath + "parts/wharehouse/update",
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
			name : {
				required : true
			}
		},
		messages : {
			name : {
				required : icon + "请输入名称"
			}
		}
	})
}