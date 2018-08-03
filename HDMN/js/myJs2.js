
//树节点的定义
layui.tree({
	elem: '#tree', //传入元素选择器
	//icon: {        //三种图标样式，更改几个都可以，用的是layui的图标
	//         open: "",      //节点打开的图标
	//         close: "",    //节点关闭的图标
	//         end: "",      //末尾节点的图标
	//},
	nodes: [{ //节点数据
		name: '华电蒙能',
		checkbox: true, //默认不显示CheckBox
		spread: true,
		children: [{
			name: '包头热电',
			checkbox: true, //默认不显示CheckBox
			spread:true,//是否全部展开
			children: [{
				name: '1#机组',
			}, {
				name: '2#机组',
			}]
		}, {
			name: '河西电厂',
			spread:true,//是否全部展开
			children: [{
				name: '1#机组',
			}, {
				name: '2#机组',
			}]
		}, {
			name: '卓资发电',
			spread:true,//是否全部展开
			children: [{
				name: '1#机组',
			}, {
				name: '2#机组',
			}]
		}, {
			name: '乌达热电',
			spread:true,//是否全部展开
			children: [{
				name: '1#机组',
			}, {
				name: '2#机组',
			}]
		}]
	}],
	click: function(node) {
		console.log(node) //node即为当前点击的节点数据
	}
});


//table定义
layui.use('table', function(){
  var table = layui.table;
  
  //第一个实例
  table.render({
    elem: '#demo'
    ,height: 604
    ,url: 'table.json' //数据接口
    ,even: true //开启隔行背景
    ,size: 'lg'//用于设定表格尺寸sm
    ,limit:10 //分页条数设置
    //,page: true //开启分页
    ,cols: [[ //表头
      {field: 'num', title: '序号',  sort: false,align:'center'}
      ,{field: 'username', title: '单位名称', sort: false,align:'center'}
      ,{field: 'mCode', title: '机组编码',  sort: false,align:'center'}
      ,{field: 'mNum', title: '机组容量', align:'center'} 
      ,{field: 'mSer1', title: '机组类型',align:'center'}
      ,{field: 'press', title: '压力等级',  sort: false,align:'center'}
      ,{field: 'address', title: '机组产地', sort: false,align:'center'}
      ,{field: 'userDate', title: '投产日期',align:'center'}
      ,{field: 'stopTime', title: '停运时间', sort: false,align:'center'}
      ,{field: 'elec', title: '所属电网', sort: false,align:'center'}
      ,{field: 'mSer2', title: '机组类型2',align:'center'}
    ]]
    ,page: true
  });
  
});
/*
 cols: [[ //表头
      {field: 'id', title: 'ID', width:80, sort: true, fixed: 'left'}
      ,{field: 'username', title: '用户名', width:80}
      ,{field: 'sex', title: '性别', width:80, sort: true}
      ,{field: 'city', title: '城市', width:80} 
      ,{field: 'sign', title: '签名', width: 177}
      ,{field: 'experience', title: '积分', width: 80, sort: true}
      ,{field: 'score', title: '评分', width: 80, sort: true}
      ,{field: 'classify', title: '职业', width: 80}
      ,{field: 'wealth', title: '财富', width: 135, sort: true}
    ]]
 */