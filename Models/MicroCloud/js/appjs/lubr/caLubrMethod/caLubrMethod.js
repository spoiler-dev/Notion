
var prefix = contpath + "lubr/caLubrMethod";

$(function() {
	load();
});

function load() {
	$('#exampleTable')
	.bootstrapTreeTable(
			{
				id : 'id',
				code : 'id',
				parentCode : 'parentId',
				type : "GET", // 请求数据的ajax类型
				url : prefix + '/list', // 请求数据的ajax的url
				ajaxParams : {}, // 请求数据的ajax的data属性
				expandColumn : '0', // 在哪一列上面显示展开按钮
				striped : true, // 是否各行渐变色
				bordered : true, // 是否显示边框
				clickToSelect: true, // 单击行即可以选中
				expandAll : false, // 是否全部展开
				// toolbar : '#exampleToolbar',

				columns : [
					{
						checkbox : true,
					},
					{
						field : 'methodCode', 
						title : '润滑方式编码' 
					},
					{
						field : 'methodName', 
						title : '润滑方式' 
					},
					{
						field : 'orderNum', 
						title : '排序' 
					},
					{
						title : '操作',
						field : 'id',
						align : 'center',
						formatter : function(item, index) {
							var s = '<a class="btn btn-primary btn-sm ' + s_add_h + '" href="#" mce_href="#" title="增加下级" onclick="add(\''
							+ item.id
							+ '\')"><i class="fa fa-plus"></i></a> ';
							var e = '<a class="btn btn-primary btn-sm '+s_edit_h+'" href="#" mce_href="#" title="编辑" onclick="edit(\''
							+ item.id
							+ '\')"><i class="fa fa-edit"></i></a> ';
							var d = '<a class="btn btn-warning btn-sm '+s_remove_h+'" href="#" title="删除"  mce_href="#" onclick="remove(\''
							+ item.id
							+ '\')"><i class="fa fa-remove"></i></a> ';
							var f = '<a class="btn btn-success btn-sm" href="#" title="备用"  mce_href="#" onclick="resetPwd(\''
								+ item.id
								+ '\')"><i class="fa fa-key"></i></a> ';
							return s + e + d ;
						}
					} ]
			});

}
function reLoad() {
	load();
}
function add(pId) {
	layer.open({
		type : 2,
		title : '增加',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix + '/add/' + pId // iframe的url
	});
}
function edit(id) {
	layer.open({
		type : 2,
		title : '编辑',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix + '/edit/' + id // iframe的url
	});
}

function remove(id) {
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {	
		$.ajax({
			type : "post",
			url : contpath + "lubr/caLubrMethod/checkMethodParentId",
			async : false,
			data: {parentId : id},
			success : function(data) {			
				if (data == 0) {
					layer.msg("此润滑方式有子类不能删除",  {time:1500});
				} else {
					$.ajax({
						type : "post",
						url : contpath + "lubr/caLubrMethod/checkMethodUse",
						async : false,
						data: {id : id},
						success : function(data) {			
							if (data == 0) {
								layer.msg("此润滑方式已在润滑标准中使用不能删除",  {time:1500});
							} else {
								$.ajax({
									url : prefix+"/remove",
									type : "post",
									data : {
										'id' : id
									},
									success : function(r) {
										if (r.code==0) {
											layer.msg(r.msg);
											reLoad();
										}else{
											layer.msg(r.msg);
										}
									}
								});
							}
						}
					});	
				}
			}
		});	
	})
}

function resetPwd(id) {
}
function batchRemove() {
	var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length == 0) {
		layer.msg("请选择要删除的数据");
		return;
	}
	layer.confirm("确认要删除选中的'" + rows.length + "'条数据吗?", {
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		var ids = new Array();
		// 遍历所有选择的行数据，取每条数据对应的ID
		$.each(rows, function(i, row) {
			ids[i] = row['id'];
		});
		$.ajax({
			type : 'POST',
			data : {
				"ids" : ids
			},
			url : prefix + '/batchRemove',
			success : function(r) {
				if (r.code == 0) {
					layer.msg(r.msg);
					reLoad();
				} else {
					layer.msg(r.msg);
				}
			}
		});
	}, function() {

	});
}