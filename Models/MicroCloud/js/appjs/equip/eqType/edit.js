var oldstate;
var newstate;
$().ready(function() {
	oldstate = $("input[name='isUse']:checked").val();
//	$("input[name='isUse']").bind('input propertychange', function() {  
//		newstate = $('#signupForm #isUse').val();
//	});
	validateRule();
});

$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});
function update(){
	newstate = $("input[name='isUse']:checked").val();
	if(oldstate=="1"){
		if(newstate=="0"){
			layer.confirm('该操作会同时禁用下级分类，确定进行？', {
				btn : [ '确定', '取消' ]
			},function(){
				$.ajax({
					cache : true,
					type : "POST",
					url : contpath+"equip/eqType/update/1",
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
			});
		}
	}else if(oldstate=="0"){
		if(newstate=="1"){
			layer.confirm('是否同时启用所有下级分类？', {
				btn : [ '是', '否' ]
			},function(){
				$.ajax({
					cache : true,
					type : "POST",
					url : contpath+"equip/eqType/update/3",
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
			},function(){
				$.ajax({
					cache : true,
					type : "POST",
					url : contpath+"equip/eqType/update/2",
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
			});
		}
	}
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
			typeCode : {
				required : true,
				isCode : true
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
				maxlength : icon + "最多输入80位字符"
			},
			orderCode : {
				digits : icon + "请输入整数",
				rangelength : icon + "请输入1-8位的整数"
			},
			remark : {
				maxlength : icon + "最多输入200位字符"
			}
		}
	});
}