var typeName = null;
var tempName = null;

$().ready(function() {
	// 获取后台数据
	tempName = $('#signupForm #name').val();
	// 为文本框绑定事件，一经修改，获取文本框的值
	$("input[name='name']").bind('input propertychange', function() {  
		typeName = $('#signupForm #name').val();
	});
//	loadSelect();
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
	// 只有名称被修改过，且不和原来的值相同，才会进行重复判断
	if(typeName != null && tempName != typeName){
		$.ajax({
			type : "get",
			url : contpath + "parts/classification/queryByName?name=" + typeName,
			async : false,
			success : function(data) {
				if (data != "") {
					layer.msg("名称不能重复",  {time:1000});
				} else {
					actionUpdateAjax();
				}
			}
		});
	}else{
		actionUpdateAjax();
	}
}

function actionUpdateAjax(){
	$.ajax({
		cache : true,
		type : "POST",
		url : contpath + "parts/classification/update",
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
				parent.layer.alert(data.msg);
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
			},
			orderNum : {
				required : true,
				digits : true,
				rangelength : [1, 8]
			}
		},
		messages : {
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