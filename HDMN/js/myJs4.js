//table定义
layui.use('table', function(){
  var table = layui.table;
  //第一个实例
  table.render({
    elem: '#demo1'
    ,height: 240
    ,even: true //开启隔行背景
    ,size: 'sm'//用于设定表格尺寸sm
    ,limit:20 //分页条数设置
    ,url: 'table3.json' //数据接口
    //,page: false //开启分页
    ,cols: [
    	[{field: 'few', title: '机组运行情况',  sort: false,align:'center', colspan: 13}],
    	[
    		{field: 'num', title: '单位名称', sort: false,align:'center',rowspan: 2},
    		{field: 'username1', title: '运行', sort: false,align:'center',colspan: 2},
    		{field: 'username2', title: '计划检修', sort: false,align:'center',colspan: 2},
    		{field: 'username3', title: '系统原因备用', sort: false,align:'center',colspan: 2},
    		{field: 'username4', title: '设备原因停机', sort: false,align:'center',colspan: 2},
    		{field: 'username5', title: '电网原因停机', sort: false,align:'center',colspan: 2},
    		{field: 'username6', title: '缺煤停机', sort: false,align:'center',colspan: 2},
    		
    	],
	    [ 
	      {field: 'num1', title: '容量',  sort: false,align:'center'}
	      ,{field: 'username1', title: '台数', sort: false,align:'center'}
	      ,{field: 'num2', title: '容量',  sort: false,align:'center'}
	      ,{field: 'username2', title: '台数', sort: false,align:'center'}
	      ,{field: 'num3', title: '容量',  sort: false,align:'center'}
	      ,{field: 'username3', title: '台数', sort: false,align:'center'}
	      ,{field: 'num4', title: '容量',  sort: false,align:'center'}
	      ,{field: 'username4', title: '台数', sort: false,align:'center'}
	      ,{field: 'num5', title: '容量',  sort: false,align:'center'}
	      ,{field: 'username5', title: '台数', sort: false,align:'center'}
	      ,{field: 'num6', title: '容量',  sort: false,align:'center'}
	      ,{field: 'username6', title: '台数', sort: false,align:'center'}
	    ]
    ]
  });
  
  
  table.render({
    elem: '#demo2'
    ,height: 240
    ,even: true //开启隔行背景
    ,size: 'sm'//用于设定表格尺寸sm
    ,limit:20 //分页条数设置
    ,url: 'table2.json' //数据接口
    ,page: false //开启分页
    ,cols: [
    	[{field: 'two', title: '两票监督',  sort: false,align:'center', colspan: 4}],
    	[ //表头
	      {field: 'num', title: '单位名称',  sort: false,align:'center'}
	      ,{field: 'username', title: '开票数量', sort: false,align:'center'}
	      ,{field: 'mCode', title: '两票完成率(%)',  sort: false,align:'center'}
	      ,{field: 'mNum', title: '两票合格率(%)', align:'center'} 
      	]
    ]
  });
});


var barCreat = echarts.init(document.getElementById("barCreat"));
var barElec = echarts.init(document.getElementById("barElec"));
var barTime = echarts.init(document.getElementById("barTime"));

var barHour = echarts.init(document.getElementById("barHour"));
//var barAll = echarts.init(document.getElementById("barAll"));
var barFire = echarts.init(document.getElementById("barFire"));



var option6 = {
	xAxis: {
		type: 'category',
		data: ['包头热电', '河西电厂', '卓资发电', '乌达热电']
	},
	yAxis: {
		type: 'value',
		name: '单位：亿千瓦时',
	},
	series: [{
		name: '华电蒙能',
		type: 'bar',
		data: [500, 168, 295, 763],
		//设置柱子的宽度
		barWidth: 30,
		//配置样式
		itemStyle: {
			//通常情况下：
			normal: {　　　　　　　　　　　　 //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
				color: function(params) {
					var colorList = ['#6278FF', '#239FFF', '#AD77FF', '#D36AFF'];
					return colorList[params.dataIndex];
				},
				//以下为是否显示，显示位置和显示格式的设置了
				label: {
					show: true,
					position: 'top',
					textStyle: {
						color: '#4D4D4D'
					}
				}
			},

		},
	}],
};
barCreat.setOption(option6);
barElec.setOption(option6);
barTime.setOption(option6);
barHour.setOption(option6);


var barElecSeries=[{
		name: '华电蒙能',
		type: 'bar',
		data: [55, 52, 28, 29],
		//设置柱子的宽度
		barWidth: 30,
		//配置样式
		itemStyle: {
			//通常情况下：
			normal: {　　　　　　　　　　　　 //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
				color: function(params) {
					var colorList = ['#6278FF', '#239FFF', '#AD77FF', '#D36AFF'];
					return colorList[params.dataIndex];
				},
				//以下为是否显示，显示位置和显示格式的设置了
				label: {
					show: true,
					position: 'top',
					textStyle: {
						color: '#4D4D4D'
					}
				}
			},

		},
	}]
var barElecY={
		type: 'value',
		name: '单位：亿千瓦时',
	}
barElec.setOption({
			series :barElecSeries
});


var barTimeSeries=[{
		name: '华电蒙能',
		type: 'bar',
		data: [108, 112, 45, 56],
		//设置柱子的宽度
		barWidth: 30,
		//配置样式
		itemStyle: {
			//通常情况下：
			normal: {　　　　　　　　　　　　 //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
				color: function(params) {
					var colorList = ['#6278FF', '#239FFF', '#AD77FF', '#D36AFF'];
					return colorList[params.dataIndex];
				},
				//以下为是否显示，显示位置和显示格式的设置了
				label: {
					show: true,
					position: 'top',
					textStyle: {
						color: '#4D4D4D'
					}
				}
			},

		},
	}];
var barTimeY={
		type: 'value',
		name: '单位：万千瓦',
	}
barTime.setOption({
			series :barTimeSeries
});
barTime.setOption({
			yAxis :barTimeY
});


var barHourSeries=[{
		name: '华电蒙能',
		type: 'bar',
		data: [489, 473, 265, 207],
		//设置柱子的宽度
		barWidth: 30,
		//配置样式
		itemStyle: {
			//通常情况下：
			normal: {　　　　　　　　　　　　 //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
				color: function(params) {
					var colorList = ['#6278FF', '#239FFF', '#AD77FF', '#D36AFF'];
					return colorList[params.dataIndex];
				},
				//以下为是否显示，显示位置和显示格式的设置了
				label: {
					show: true,
					position: 'top',
					textStyle: {
						color: '#4D4D4D'
					}
				}
			},

		},
	}];
var barHourY={
		type: 'value',
		name: '单位：小时',
	}
barHour.setOption({
			series :barHourSeries
})
barHour.setOption({
			yAxis :barHourY
});




var pieMach = echarts.init(document.getElementById("pieMach"));
var total1 = {
	name: '总收入',
	value: 1567.3
};
pieMach.setOption({
	title: [{
		text: total1.name,
		left: '49%',
		top: '40%',
		textAlign: 'center',
		textBaseline: 'middle',
		textStyle: {
			color: '#7A758C',
			fontWeight: 'normal',
			fontSize: 20
		}
	}, {
		text: total1.value,
		left: '49%',
		top: '52%',
		textAlign: 'center',
		textBaseline: 'middle',
		textStyle: {
			color: 'black',
			fontWeight: 'normal',
			fontSize: 20
		}
	}],
	tooltip: {
		trigger: 'item',

	},
	legend: {
		//orient: 'vertical',垂直排列
		x: 'center',
		itemGap: 5,
		top: '5%',
		selectedMode: false, //取消点击事件
		data: ['包头热电', '河西电厂', '卓资发电', '乌达热电']
	},
	color: ['#6278FF', '#239FFF', '#AD77FF', '#D36AFF'],
	series: [{
		name: '1#卸船机KB',
		type: 'pie',
		radius: ['45%', '65%'], //饼图的大小
		center: ['50%', '50%'], //饼图的位置 
		avoidLabelOverlap: false,
		//roseType: 'radius',
		itemStyle: {
			normal: {
				borderWidth: 5, //设置border的宽度有多大
				borderColor: 'white',
				label: { //此处为指示线文字
					show: true,
					//position: 'inner', //标签的位置
					textStyle: {
						fontWeight: 200,
						fontSize: 10 //文字的字体大小
					},
					formatter: '{d}%'
				},
				labelLine: { //指示线状态
					show: true,
					smooth: 0.2,
					length: 15,
					length2: 20
				}
			},

		},
		data: [{
				name: '包头热电',
				value: 33
			},
			{
				value: 33,
				name: '河西电厂'
			},
			{
				value: 16.5,
				name: '卓资发电'
			},
			{
				value: 16.5,
				name: '乌达热电'
			},
		]
	}],
});


var barAll = echarts.init(document.getElementById('barAll'));
/*指定图表的配置项和数据*/
var optionBarAll = {
	xAxis: {
		type: 'category',
		data: ['包头热电', '河西电厂', '卓资发电', '乌达热电']
	},
	yAxis: {
		type: 'value',
		name: '单位：%',
	},
	series: [{
		name: '华电蒙能',
		type: 'bar',
		data: [6.3, 5.9, 6.1, 5.8],
		//设置柱子的宽度
		barWidth: 15,
		//配置样式
		itemStyle: {
			//通常情况下：
			normal: {　　　　　　　　　　　　 //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
				color: function(params) {
					var colorList = ['#6278FF', '#239FFF', '#AD77FF', '#D36AFF'];
					return colorList[params.dataIndex];
				},
				//以下为是否显示，显示位置和显示格式的设置了
				label: {
					show: true,
					position: 'top',
					textStyle: {
						color: '#4D4D4D'
					}
				},
				barBorderRadius: 10
			},

		},
	}],
};

// 使用刚指定的配置项和数据显示图表。
barAll.setOption(optionBarAll);



var barFire = echarts.init(document.getElementById("barFire"));
window.onresize = barFire.resize;
var optionBarFire = {
	xAxis: {
		type: 'category',
		data: ['包头热电', '河西电厂', '卓资发电', '乌达热电']
	},
	yAxis: {
		type: 'value',
		name: '单位: g/kwh',
	},
	series: [{
		name: '华电蒙能',
		type: 'bar',
		data: [315, 309, 319, 305],
		//设置柱子的宽度
		barWidth: 30,
		//配置样式
		itemStyle: {
			//通常情况下：
			normal: {　　　　　　　　　　　　 //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
				color: function(params) {
					var colorList = ['#6278FF', '#239FFF', '#AD77FF', '#D36AFF'];
					return colorList[params.dataIndex];
				},
				//以下为是否显示，显示位置和显示格式的设置了
				label: {
					show: true,
					position: 'top',
					textStyle: {
						color: '#4D4D4D'
					}
				}
			},

		},
	}],
};
barFire.setOption(optionBarFire);






