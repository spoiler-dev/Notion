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
		url : contpath + "lubr/caLubrStandard/save",
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
var openCaLubrMethod = function(){
	layer.open({
		type:2,
		title:"选择润滑方式",
		area : [ '300px', '450px' ],
		content: contpath +"lubr/caLubrMethod/treeView"
	})
}
var openCaLubrOil = function(){
	layer.open({
		type:2,
		title:"选择油脂信息",
		area : [ '700px', '450px' ],
		content: contpath +"lubr/caLubrOil/oilList"
	})
}
function loadDept( deptId,deptName){
//	$("#id").val(deptId);
	$("#lubrMehtod").val(deptName);
}
function loadDept2( oilCode,oilName,oilSpec){
	$("#oilCode").val(oilCode);
	$("#oilName").val(oilName);
	$("#oilSpec").val(oilSpec);
}
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		rules : {
			standNo : {
				required:true,
                maxlength:32,
                numAndLetter:true,
			}
		},
		messages : {
			standNo : {
				required : icon + "请输入油脂编号",
				maxlength:icon +"油脂编号最长32个字符！",
			}
		}
	})
	jQuery.validator.addMethod("numAndLetter", function(value, element) {
		var numAndLetter = /^([a-zA-Z0-9]+)$/;
		return this.optional(element) || (numAndLetter.test(value));
		}, "只能输入数字和字母");
}

