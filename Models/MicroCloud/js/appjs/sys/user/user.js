/*var prefix = "../../sys/user";*/
var prefix = contpath + "sys/user";
var prefixs = contpath + "system/sysDept";
//ADD START BY 李泽辉  20180316
var searchFlg = 0;
var selectTreeId = "";
//ADD END BY 李泽辉  20180316
$(function() {
	var deptId = '';
	getTreeData();
	load(deptId);
});
function load(deptId) {
	$('#exampleTable')
		.bootstrapTable(
			{
				method : 'get', // 服务器数据的请求方式 get or post
				url : prefix + '/list', // 服务器数据的加载地址
				// showRefresh : true,
				// showToggle : true,
				// showColumns : true,
				iconSize : 'outline',
				toolbar : '#exampleToolbar',
				striped : true, // 设置为true会有隔行变色效果
				dataType : "json", // 服务器返回的数据类型
				pagination : true, // 设置为true会在底部显示分页条
				// queryParamsType : "limit",
				// //设置为limit则会发送符合RESTFull格式的参数
				singleSelect : false, // 设置为true将禁止多选
				// contentType : "application/x-www-form-urlencoded",
				// //发送到服务器的数据编码类型
				pageSize : 10, // 如果设置了分页，每页数据条数
				pageNumber : 1, // 如果设置了分布，首页页码
				// search : true, // 是否显示搜索框
				showColumns : false, // 是否显示内容下拉框（选择显示的列）
				sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者
				// "server"
				queryParams : function(params) {
					return {
						// 说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
						limit : params.limit,
						offset : params.offset,
						/*UPD START BY 李泽辉 20180329*/
						/*name : $('#searchName').val(),*/
						/*deptId : deptId*/
						likeStr : $('#searchName').val(),
						searchFlg : searchFlg,
						deptId : selectTreeId
						/*UPD END BY 李泽辉 20180329*/
						
					};
				},
				// //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 如果
				// queryParamsType = 'limit' ,返回参数必须包含
				// limit, offset, search, sort, order 否则, 需要包含:
				// pageSize, pageNumber, searchText, sortName,
				// sortOrder.
				// 返回false将会终止请求
				columns : [
					{
						checkbox : true
					},
					//DEL START BY 李泽辉 20180408
/*					{
						field : 'userId', // 列字段名
						title : '序号' // 列标题
					},*/
					//DEL END BY 李泽辉 20180408
					{
						field : 'username',
						title : '账号'
					},
					{
						field : 'name',
						title : '姓名'
					},
					{
						field : 'mobile',
						title : '联系电话'
					},
					{
						field : "deptName",
						title : "所属部门"
					},
					{
						field : 'status',
						title : '状态',
						align : 'center',
						formatter : function(value, row, index) {
							if (value == '0') {
								return '<span class="label label-danger">禁用</span>';
							} else if (value == '1') {
								return '<span class="label label-primary">正常</span>';
							} else if (value == '2') {
								return '<span class="label label-default">未激活</span>';
							}
						}
					},
					{
						field : 'roleName',
						title : '角色',
						cellStyle : function (value, row, index) {
		                    return {
		                        css: {
		                            "overflow" : "hidden",
		                            "white-space" : "nowrap",
		                            "text-overflow" : "ellipsis"
		                        }
		                    };
		                }
					},
					{
						title : '操作',
						field : 'id',
						align : 'center',
						formatter : function(value, row, index) {
							// ADD START BY 李泽辉 20180327
							if(row.status == "2"){
								s_edit_h = 'hidden';
								s_remove_h = '';
								s_resetPwd_h = 'hidden';
								s_enable_h = 'hidden';
								s_disable_h = 'hidden';
							} else if(row.status == "1") {
								s_edit_h = '';
								s_remove_h = 'hidden';
								s_resetPwd_h = '';
								s_enable_h = 'hidden';
								s_disable_h = '';
							} else if(row.status == "0"){
								s_edit_h = '';
								s_remove_h = 'hidden';
								s_resetPwd_h = '';
								s_enable_h = '';
								s_disable_h = 'hidden';
							}
							// ADD END BY 李泽辉 20180327
							var e = '<a  class="btn btn-primary btn-sm ' + s_edit_h + '" href="#" mce_href="#" title="编辑" onclick="edit(\''
								+ row.userId
								+ '\')"><i class="fa fa-edit "></i></a> ';
							var d = '<a class="btn btn-danger btn-sm ' + s_remove_h + '" href="#" title="删除"  mce_href="#" onclick="remove(\''
								+ row.userId
								+ '\')"><i class="fa fa-remove"></i></a> ';
							var f = '<a class="btn btn-success btn-sm ' + s_resetPwd_h + '" href="#" title="重置密码"  mce_href="#" onclick="resetPwd(\''
								+ row.userId
								+ '\')"><i class="fa fa-key"></i></a> ';
							var en = '<a class="btn btn-primary btn-sm ' + s_enable_h + '" href="#" title="启用"  mce_href="#" onclick="enable(\''
							    + row.userId
							    + '\')"><i class="fa fa-check"></i></a> ';
							var b = '<a class="btn btn-warning btn-sm ' + s_disable_h + '" href="#" title="禁用"  mce_href="#" onclick="disable(\''
							    + row.userId
							    + '\')"><i class="fa fa-ban"></i></a> ';
							return e + d + f + en + b;
						}
					} ]
			});
}
function reLoad() {
	// ADD START BY 李泽辉  20180316
	searchFlg = 1;
	// ADD END BY 李泽辉  20180316
	$('#exampleTable').bootstrapTable('refresh');
}

function add() {
	// iframe层
	layer.open({
		type : 2,
		title : '增加用户',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix + '/add'
	});
}
function remove(id) {
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			/*url : "../../sys/user/remove",*/
			url : prefix + '/remove',
			type : "post",
			data : {
				'id' : id
			},
			success : function(r) {
				if (r.code == 0) {
					layer.msg(r.msg);
					reLoad();
				} else {
					layer.msg(r.msg);
				}
			}
		});
	})
}
function edit(id) {
	layer.open({
		type : 2,
		title : '用户修改',
		maxmin : true,
		shadeClose : false,
		area : [ '800px', '520px' ],
		content :  prefix + '/edit/' + id // iframe的url
	});
}
function resetPwd(id) {
	layer.open({
		type : 2,
		title : '重置密码',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '400px', '260px' ],
		content :  prefix + '/resetPwd/' + id // iframe的url
	});
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
			ids[i] = row['userId'];
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
	}, function() {});
}

/*ADD START BY 李泽辉 20180329*/
function batchDisable() {
	var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length == 0) {
		layer.msg("请选择要禁用的用户");
		return;
	}
	layer.confirm("确认要禁用选中的'" + rows.length + "'条数据吗?", {
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		var ids = new Array();
		// 遍历所有选择的行数据，取每条数据对应的ID
		$.each(rows, function(i, row) {
			ids[i] = row['userId'];
		});
		$.ajax({
			type : 'POST',
			data : {
				"ids" : ids
			},
			url :  prefix + '/batchDisable',
			success : function(r) {
				if (r.code == 0) {
					layer.msg(r.msg);
					reLoad();
				} else {
					layer.msg(r.msg);
				}
			}
		});
	}, function() {});
}

function disable(id) {
	layer.confirm('确定要禁用选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefix + '/disable',
			type : "post",
			data : {
				'id' : id
			},
			success : function(r) {
				if (r.code == 0) {
					layer.msg(r.msg);
					reLoad();
				} else {
					layer.msg(r.msg);
				}
			}
		});
	})
}

function enable(id) {
	layer.confirm('确定要启用选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url :  prefix + '/enable',
			type : "post",
			data : {
				'id' : id
			},
			success : function(r) {
				if (r.code == 0) {
					layer.msg(r.msg);
					reLoad();
				} else {
					layer.msg(r.msg);
				}
			}
		});
	})
}
/*ADD END BY 李泽辉 20180329*/

function getTreeData() {
	$.ajax({
		type : "GET",
		/*url : "../../system/sysDept/tree",*/
		url : prefixs + '/tree',
		success : function(tree) {
			loadTree(tree);
		}
	});
}
function loadTree(tree) {
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
				deptId : '',
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
		selectTreeId = data.selected[0];
		$('#exampleTable').bootstrapTable('refresh',opt);
	}

});