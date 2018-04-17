$().ready(function() {
	validateRule();
});

$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});
function update() {
	$.ajax({
		cache : true,
		type : "POST",
		url : contpath+"equip/equipIn/update",
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
$.validator.addMethod("isStanNum", function(value, element) {
    var code = /^(([1-9]{1}\d*)|([0]{1}))(\.(\d){0,2})?$/;
    if(value == '' || value == null){
    	return true;
    }
    return code.test(value);
}, "请输入正确的数字");
$.validator.addMethod("isPrice", function(value, element) {
    var code = /^(([1-9]{1}\d*)|([0]{1}))(\.(\d){2,2})?$/;
    if(value == '' || value == null){
    	return true;
    }
    return code.test(value);
}, "请输入正确的数字");
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
			eqCode : {
				required : true,
				maxlength : 40,
				isCode : true
			},
			eqName : {
				required : true,
				maxlength : 80
			},
			eqType : {
				required : true
			},
			eqSpec : {
				maxlength : 50
			},
			model : {
				maxlength : 50
			},
			manufacturer : {
				maxlength : 80
			},
			facNumber : {
				maxlength : 40
			},
			eqNum : {
				required : true,
				isStanNum : true,
				maxlength : 10
			},
			unit : {
				required : true
			},
			price : {
				maxlength : 15,
				isPrice : true
			},
			useDept : {
				required : true
			},
			useAddress : {
				maxlength : 100
			},
			startDate : {
				required : true
			},
			eqState : {
				required : true
			},
			healthState : {
				required : true
			},
			mainParams : {
				maxlength : 200
			},
			runTime : {
				isStanNum : true
			},
			outageTime : {
				isStanNum : true
			},
			outageNumber : {
				digits : true
			}
		},
		messages : {
			eqCode : {
				required : icon + "请输入设备编码",
				maxlength : icon + "最多输入40个字符",
				isCode : icon + "编码只能包含字母和数字"
			},
			eqName : {
				required : icon + "请输入设备名称",
				maxlength : icon + "最多输入80个字符"
			},
			eqType : {
				required : icon + "请输入设备分类"
			},
			eqSpec : {
				maxlength : icon + "最多输入50个字符"
			},
			model : {
				maxlength : icon + "最多输入50个字符"
			},
			manufacturer : {
				maxlength : icon + "最多输入80个字符"
			},
			facNumber : {
				maxlength : icon + "最多输入40个字符"
			},
			eqNum : {
				required : icon + "请输入数量",
				isStanNum : icon + "请输入正确的数字，最多保留2位小数",
				maxlength : icon + "最多输入10个字符"
			},
			unit : {
				required : icon + "请输入计量单位"
			},
			price : {
				maxlength : icon + "最多输入15个字符",
				isPrice : icon + "请输入正确的数值，且保留两位小数"
			},
			useDept : {
				required : icon + "请输入使用部门"
			},
			useAddress : {
				maxlength : icon + "最多输入100个字符"
			},
			startDate : {
				required : icon + "请输入开始使用日期"
			},
			eqState : {
				required : icon + "请输入设备状态"
			},
			healthState : {
				required : icon + "请输入完好状态"
			},
			mainParams : {
				maxlength : icon + "最多输入100个字符"
			},
			runTime : {
				isStanNum : icon + "请输入正确的数字，最多保留2位小数"
			},
			outageTime : {
				isStanNum : icon + "请输入正确的数字，最多保留2位小数"
			},
			outageNumber : {
				digits : icon + "请输入整数"
			}
		}
	})
}
var TypeSelect = function(){
	layer.open({
		type:2,
		title:"选择分类",
		area : [ '300px', '450px' ],
		content:contpath+"equip/eqType/typeTreeView"
	})
}
function loadEqType(typeId,typeName){
	$("#eqType").val(typeId);
	$("#eqTypeName").val(typeName);
}
var deptSelect = function(){
	layer.open({
		type:2,
		title:"选择机构",
		area : [ '300px', '450px' ],
		content:contpath+"system/sysDept/orgTreeView"
	})
}
function loadDept(deptId,deptName){
	$("#useDept").val(deptId);
	$("#useDeptName").val(deptName);
}