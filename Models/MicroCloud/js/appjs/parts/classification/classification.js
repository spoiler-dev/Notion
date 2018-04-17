var prefix = contpath + "parts/classification";

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
						expandColumn : '0', // 在哪一列上面显示展开按钮
						striped : true, // 是否各行渐变色
						bordered : true, // 是否显示边框
						expandAll : false, // 是否全部展开
						columns : [
							
								{
									field : 'name', 
									title : '分类名称' 
								},
								{
									field : 'code', 
									title : '分类编码' 
								},
								{
									field : 'orderNum', 
									title : '排序' 
								},
								{
									field : 'status', 
									title : '状态' ,
									align : 'center',
									valign : 'center',
									formatter : function(item, index){
										if (item.status == 0) {
											return '<span class="label label-danger">禁用</span>';
										} else if (item.status == 1) {
											return '<span class="label label-primary">启用</span>';
										}
									}
								},
								{
									title : '操作',
									field : 'id',
									valign : 'center',
									align : 'center',
									formatter : function(item, index) {
										var s;
										if(item.status == 1){
											s = '<a class="btn btn-danger btn-sm '+s_add_h+'" href="#" mce_href="#" title="禁用" onclick="disable(\''
												+ item.id
												+ '\')">禁用</a> ';
										}else{
											s = '<a class="btn btn-primary btn-sm '+s_add_h+'" href="#" mce_href="#" title="启用" onclick="enable(\''
												+ item.id
												+ '\')">启用</a> ';
										}
										var a = '<a class="btn btn-primary btn-sm '+s_add_h+'" href="#" mce_href="#" title="添加下一级" onclick="add(\''
												+ item.id
												+ '\')"><i class="fa fa-plus"></i></a> ';
										var e = '<a class="btn btn-primary btn-sm '+s_edit_h+'" href="#" mce_href="#" title="编辑" onclick="edit(\''
												+ item.id
												+ '\')"><i class="fa fa-edit"></i></a> ';
										var d = '<a class="btn btn-warning btn-sm '+s_remove_h+'" href="#" title="删除"  mce_href="#" onclick="remove(\''
												+ item.id
												+ '\')"><i class="fa fa-remove"></i></a> ';
										return s + a + e + d ;
									}
								} ]
					});
}
function reLoad() {
	load();
}

function add(parentId) {
	layer.open({
		type : 2,
		title : '增加',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '520px' ],
		content : prefix + '/add/' + parentId
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
	//1. 先判断此ID下有没有下级分类
	$.ajax({
		url : prefix + "/queryListByParentId?parentId=" + id,
		type : "get",
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			//2. 如果有，不能删除
			if (data.length > 0) {
				layer.msg("此分类包含下级，不能删除！");
			}else{
				//3. 如果没有下级，查看当前类型有没有被备件使用
				$.ajax({
					url : prefix + "/queryPartsByClassification?id=" + id,
					type : "get",
					success : function(data) {
						//4. 如果被使用中，不能删除
						if (data.length > 0) {
							layer.msg("此分类正在被备件使用，不能删除！");
						}else{
							//5. 如果没被使用，删除当前分类
							layer.confirm('确定要删除选中的记录？', {
								btn : [ '确定', '取消' ]
							}, function() {
								$.ajax({
									url : prefix+"/remove",
									type : "POST",
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
					}
				});
			}
		}
	});
}

/**
 * 禁用类别
 * @param id
 */
function disable(id){
	var msg1 = '确定要禁用选中的记录？';
	var msg2 = '禁用该分类将同时禁用其所有启用的子分类，是否继续操作？';
	//1. 获取当前分类下所有启用状态的分类信息
	$.ajax({
		url : prefix + "/queryYChidrenById?parentId=" + id,
		type : "get",
		success : function(children) {
			//2. 如果有已经启用的分类，提示msg2，禁用当前以及所有子孙
			if (children.length > 0) {
				var ids = new Array();
				$.each(children, function(i, child) {
					ids[i] = child.id;
				});
				ids.push(id);
				layer.confirm(msg2, {btn : ['确定', '取消']}, function(){
					$.ajax({
						type : "post",
						url :  prefix + "/batchUpdateNStatus",
						data : {
							"ids" : ids
						},
						success : function(r){
							if(r.code == 0){
								layer.msg(r.msg);
								reLoad();
							}else{
								layer.msg(r.msg);
							}
						}
					});
				});
			}else{
				//3. 如果没有下级分类，提示msg1，只修改当前分类状态为禁止
				layer.confirm(msg1, {btn : ['确定', '取消']}, function(){
					$.ajax({
						type : "post",
						url :  prefix + "/update",
						data : {
							"id" : id,
							"status" : 0
						},
						success : function(r){
							if(r.code == 0){
								layer.msg(r.msg);
								reLoad();
							}else{
								layer.msg(r.msg);
							}
						}
					});
				});
			}
		}
	});
}

/**
 * 启用类别
 * @param id
 */
function enable(id){
	//1. 先修改当前选中分类的状态为启用
	layer.confirm('确定要启用选中的记录？', {btn : [ '确定', '取消' ]}, function() {
		$.ajax({
			url : prefix + "/update",
			type : "POST",
			data : {
				'id' : id,
				'status' : 1
			},
			success : function(r) {
				if (r.code == 0) {
					layer.msg(r.msg);
					reLoad();
					//2. 修改成功后，根据ID获取所有状态为禁用的下级分类
					$.ajax({
						url : prefix + "/queryNChidrenById?parentId=" + id,
						type : "get",
						success : function(children) {
							//3. 如果有下级分类，询问是否全部开启
							if (children.length > 0) {
								var ids = new Array();
								$.each(children, function(i, child) {
									ids[i] = child.id;
								});
								layer.confirm('确定要启用其所有下级分类吗？', {btn : ['确定', '取消']}, function(){
									$.ajax({
										type : "post",
										url :  prefix + "/batchUpdateYStatus",
										data : {
											"ids" : ids
										},
										success : function(r){
											if(r.code == 0){
												layer.msg(r.msg);
												reLoad();
											}else{
												layer.msg(r.msg);
											}
										}
									});
								});
							}
						}
					});
				}else{
					layer.msg(r.msg);
				}
			}
		});
	});
}