
var prefix = contpath+"equip/eqType"
$(function() {
	load();
});

function load() {
	$('#exampleTable')
			.bootstrapTreeTable(
					{
						id: 'id',
		                code: 'id',
		                parentCode: 'parentId',
		                type: "GET", // 请求数据的ajax类型
		                url: prefix + '/list', // 请求数据的ajax的url
		                ajaxParams: {}, // 请求数据的ajax的data属性
		                expandColumn: '0',// 在哪一列上面显示展开按钮
		                striped: true, // 是否各行渐变色
		                bordered: true, // 是否显示边框
		                expandAll: false, // 是否全部展开
						columns : [
																{
									field : 'typeCode', 
									title : '分类编码' ,
			                        width : '8%'
								},
																{
									field : 'typeName', 
									title : '分类名称' ,
									align : 'center',
			                        valign: 'center',
			                        width : '15%'
								},
																{
									field : 'orderCode', 
									title : '排序' ,
									align : 'center',
			                        valign: 'center'
								},
																{
									field : 'remark', 
									title : '备注' ,
									align : 'center',
			                        valign: 'center',
			                        width : '20%'
								},
								{
									field : 'isUse', 
									title : '状态' ,
									align : 'center',
			                        valign: 'center',
			                        formatter : function(item, index){
										if (item.isUse == 0) {
											return '<span class="label label-danger">禁用</span>';
										} else if (item.isUse == 1) {
											return '<span class="label label-primary">启用</span>';
										}
									}
								},
								{
									title : '操作',
									field : 'id',
									align : 'center',
			                        valign: 'center',
									formatter : function(row, index) {
										var s = '<a class="btn btn-primary btn-sm" href="#" mce_href="#" title="查看" onclick="select(\''
												+ row.id
												+ '\')"><i class="fa fa-eye"></i></a> ';
										var d = '<a class="btn btn-warning btn-sm '+s_remove_h+'" href="#" title="删除"  mce_href="#" onclick="removebyid(\''
												+ row.id
												+ '\')"><i class="fa fa-remove"></i></a> ';
										var f = '<a class="btn btn-primary btn-sm" href="#" title="修改"  mce_href="#" onclick="edit(\''
												+ row.id
												+ '\')"><i class="fa fa-edit"></i></a> ';
										var g = '<a class="btn btn-primary btn-sm '+s_add_h+'" href="#" title="添加"  mce_href="#" onclick="add(\''
												+ row.id
												+ '\')"><i class="fa fa-plus"></i></a> ';
										var able = row.isUse;
										var h;
										if(able==1){
											h = '<a class="btn btn-danger btn-sm '+s_add_h+'" href="#" title="禁用"  mce_href="#" onclick="disableById(\''
												+ row.id
												+ '\')">禁用</a> ';
										}else{
											h = '<a class="btn btn-success btn-sm '+s_add_h+'" href="#" title="启用"  mce_href="#" onclick="enableById(\''
												+ row.id
												+ '\')">启用</a> ';
										}
										return g + f + d + h;
									}
								} ]
					});
}
function reLoad() {
	load();
}
function add(id) {
	layer.open({
		type : 2,
		title : '增加',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix + '/add/'+id // iframe的url
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
function select(id) {
	layer.open({
		type : 2,
		title : '查看',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix + '/select/' + id // iframe的url
	});
}
function removebyid(id) {
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
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
function getTreeData() {
	$.ajax({
		type : "GET",
		url : contpath+"equip/eqType/tree",
		success : function(tree) {
			loadTree(tree);
		}
	});
}
function loadTree(tree) {
	alert(tree);
	$('#jstree').jstree({
		'core' : {
			'data' : tree
		},
		"plugins" : [ "search" ]
	});
	$('#jstree').jstree().open_all();
}
$('#jstree').on("changed.jstree", function(e, data) {
	if (data.selected == -1) {
		var opt = {
			query : {
				id : '',
			}
		}
		$('#exampleTable').bootstrapTable('refresh', opt);
	} else {
		var opt = {
			query : {
				deptId : data.selected[0],
				searchFlg : 1,
			}
		}
		$('#exampleTable').bootstrapTable('refresh',opt);
	}

});
function disableById(id) {
	layer.confirm('该操作会同时禁用下级分类，确定进行？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefix+"/disable",
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
	})
}
function enableById(id) {
	layer.confirm('是否同时启用所有下级分类？', {
		btn : [ '是', '否' ]
	}, function() {
		$.ajax({
			url : prefix+"/enable/1",
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
	},function(){
		$.ajax({
			url : prefix+"/enable/0",
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
	})
}