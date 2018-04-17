
var prefix3 = contpath+"check/checkItem"
$(function() {
	load3();
	//$('#chekline-item').bootstrapTable('hideColumn', 'eqName');  //隐藏列
});
var lineCode;
function clickThis3(event){
	var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length == 0) {
		layer.msg("请选择一条路线");
		event.stopPropagation();
	}else if(rows.length > 1){
		layer.msg("请仅选择一条路线,您当前选中了"+rows.length+"条");
		event.stopPropagation();
	}
	lineCode=rows[0].lineCode;
	reLoad3();
	load3();
}
function load3() {
	$('#chekline-item')
			.bootstrapTable(
					{
						method : 'get', // 服务器数据的请求方式 get or post
						url : prefix3 + "/standerlist", // 服务器数据的加载地址
						showRefresh : true,
						showToggle : true,
						showColumns : true,
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
						//search : true, // 是否显示搜索框
						striped: true,
						smartDisplay: "cardview", // 智能显示 pagination 和 cardview 等
						clickToSelect: true, // 单击行即可以选中
						showColumns : true, // 是否显示内容下拉框（选择显示的列）
						sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
						queryParams : function(params) {
							return {
								//说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
								limit: params.limit,
								offset:params.offset,
								lineCode:lineCode,
							    likeStr:$('#searchName').val(),
					           // name:$('#searchName').val(),
					           // username:$('#searchName').val()
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
							},{
								field : 'eqCode', 
								title : '设备编码' 
							},
															{
								field : 'eqName', 
								title : '设备名称',
							},
															{
								field : 'eqPosition', 
								title : '部位',
								hidden:true,
							},
															{
								field : 'checkItem', 
								title : '巡检项目' 
							},
															{
								field : 'checkType', 
								title : '巡检类别' 
							},{
								field : 'checkClasses', 
								title : '班次' 
							},
															{
								field : 'checkRate', 
								title : '巡检频率' 
							},
															{
								field : 'rateUnit', 
								title : '频率单位' 
							}
							]
					});
}
function reLoad3() {
	$('#chekline-item').bootstrapTable('refresh');
}
function showList() {
	layer.open({
		type : 2,
		title : '选择一个测点标准',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '900px', '620px' ],
		content : prefix3+"/item" // iframe的url
	});
}
//查询选择，打开可编辑页面并传值
function showedit(id) {
	if(id==undefined){
		var rows = $('#chekline-item').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
		if (rows.length == 0) {
			layer.msg("请至少选择一项您要使用的标准明细");
			return;
		}
		id=rows[0].id
	}
	var index_v = parent.layer.getFrameIndex(window.name); // 获取窗口索引
	parent.layer.open({     //打开一个新的layer窗口
		type : 2,
		title : '添加',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix3 + '/showSelected/'+id, // iframe的url
		success: function (layero, index) {
			//var linecode=$('#exampleTable').bootstrapTable('getSelections')[0].lineCode;
			var obj = $('#chekline-item').bootstrapTable('getSelections')[0]; 
			var body = parent.layer.getChildFrame('body', index);  
          //  body.contents().find("#lineCode").val('LINE201800012');  
            body.contents().find("#lineName").val(obj.eqName);  
            parent.layer.close(index_v);
		}
	});
}
//选中批量添加
function saveSelected() {
	var rows = $('#chekline-item').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	var lineCode=$('#lineCode').val();
	var lineName=$('#lineName').val();
	if (rows.length == 0) {
		layer.msg("请至少选择一项您要添加的测点标准");
		return;
	}
	var ids = new Array();
	// 遍历所有选择的行数据，取每条数据对应的ID
	$.each(rows, function(i, row) {
		ids[i] = row['id'];
	});
	$.ajax({
		type : 'POST',
		data : {
			"ids" : ids,lineCode:lineCode,lineName:lineName
		},
		url : prefix3 + '/saveSelected',
		success : function(r) {
			if (r.code == 0) {
				parent.layer.msg("保存成功");
				parent.reLoad3();
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
				parent.layer.close(index);
			} else {
				layer.msg(r.msg);
			}
		}
	});

}
function select3(id) {
	layer.open({
		type : 2,
		title : '查看',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix3 + '/select/' + id // iframe的url
	});
}
function remove3(id) {
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefix3+"/remove",
			type : "post",
			data : {
				'pointCode' : id
			},
			success : function(r) {
				if (r.code==0) {
					layer.msg(r.msg);
					reLoad3();
				}else{
					layer.msg(r.msg);
				}
			}
		});
	})
}
function add3() {
	layer.open({
		type : 2,
		title : '增加',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix3 + '/add' // iframe的url
	});
}
function resetPwd3(id) {
}
function batchRemove3() {
	var rows = $('#chekline-item').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
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
			ids[i] = row['pointCode'];
		});
		$.ajax({
			type : 'POST',
			data : {
				"ids" : ids
			},
			url : prefix3 + '/batchRemove',
			success : function(r) {
				if (r.code == 0) {
					layer.msg(r.msg);
					reLoad3();
				} else {
					layer.msg(r.msg);
				}
			}
		});
	}, function() {

	});
}