//var myChart1 = echarts.init(document.getElementById("bar1"));
//var myChart2 = echarts.init(document.getElementById("bar2"));
//var myChart3 = echarts.init(document.getElementById("bar3"));

var option = {
	xAxis: {
		type: 'category',
		data: ['包头热电', '河西电厂', '卓资发电', '乌达热电']
	},
	yAxis: {
		type: 'value',
		name: '单位：吨',
	},
	series: [{
		name: '华电蒙能',
		type: 'bar',
		data: [500, 168, 295, 763],
		//设置柱子的宽度
		barWidth: 40,
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

//myChart1.setOption(option);
//myChart2.setOption(option);
//myChart3.setOption(option);

//var myChart4 = echarts.init(document.getElementById("yuan"));
var total1 = {
	name: '总收入',
	value: 1156
};
//myChart4.setOption({
//	title: [{
//		text: total1.name,
//		left: '49%',
//		top: '50%',
//		textAlign: 'center',
//		textBaseline: 'middle',
//		textStyle: {
//			color: '#7A758C',
//			fontWeight: 'normal',
//			fontSize: 20
//		}
//	}, {
//		text: total1.value,
//		left: '49%',
//		top: '62%',
//		textAlign: 'center',
//		textBaseline: 'middle',
//		textStyle: {
//			color: 'black',
//			fontWeight: 'normal',
//			fontSize: 20
//		}
//	}],
//	tooltip: {
//		trigger: 'item',
//
//	},
//	legend: {
//		//orient: 'vertical',垂直排列
//		x: 'center',
//		itemGap: 5,
//		top: '5%',
//		selectedMode: false, //取消点击事件
//		data: ['包头热电', '河西电厂', '卓资发电', '乌达热电']
//	},
//
//	color: ['#6278FF', '#239FFF', '#AD77FF', '#D36AFF'],
//	series: [{
//		name: '1#卸船机KB',
//		type: 'pie',
//		radius: ['45%', '65%'], //饼图的大小
//		center: ['50%', '60%'], //饼图的位置 
//		avoidLabelOverlap: false,
//		//				roseType: 'radius',
//		itemStyle: {
//			normal: {
//				borderWidth: 5, //设置border的宽度有多大
//				borderColor: 'white',
//				label: { //此处为指示线文字
//					show: true,
//					//	                        position: 'inner', //标签的位置
//					textStyle: {
//						fontWeight: 200,
//						fontSize: 10 //文字的字体大小
//					},
//					formatter: '{d}'
//				},
//				labelLine: { //指示线状态
//					show: true,
//					smooth: 0.2,
//					length: 10,
//					length2: 20
//				}
//			},
//
//		},
//		data: [{
//				name: '包头热电',
//				value: 335
//			},
//			{
//				value: 310,
//				name: '河西电厂'
//			},
//			{
//				value: 234,
//				name: '卓资发电'
//			},
//			{
//				value: 135,
//				name: '乌达热电'
//			},
//		]
//	}],
//});

//var myChart5 = echarts.init(document.getElementById("yuan1"));

//myChart5.setOption({
//	title: "",
//	tooltip: {
//		trigger: 'item',
//	},
//	legend: {
//		//orient: 'vertical',垂直排列
//		x: 'center',
//		itemGap: 5,
//		top: '4%',
//		selectedMode: false, //取消点击事件
//		data: ['包头热电', '河西电厂', '卓资发电', '乌达热电']
//	},
//
//	color: ['#6278FF', '#239FFF', '#AD77FF', '#D36AFF'],
//	series: [{
//		name: '1#卸船机KB',
//		type: 'pie',
//		avoidLabelOverlap: false,
//		roseType: 'radius',
//		itemStyle: {
//			normal: {
//				borderWidth: 0, //设置border的宽度有多大
//				borderColor: 'white',
//				label: { //此处为指示线文字
//					show: true,
//					//	                        position: 'inner', //标签的位置
//					textStyle: {
//						fontWeight: 200,
//						fontSize: 10 //文字的字体大小
//					},
//					formatter: '{d}'
//				},
//				labelLine: { //指示线状态
//					show: true,
//					smooth: 0.2,
//					length: 5,
//					length2: 10
//				}
//			},
//
//		},
//		data: [{
//				name: '包头热电',
//				value: 335
//			},
//			{
//				value: 310,
//				name: '河西电厂'
//			},
//			{
//				value: 234,
//				name: '卓资发电'
//			},
//			{
//				value: 135,
//				name: '乌达热电'
//			},
//		]
//	}],
//});

var myChart6 = echarts.init(document.getElementById("bar6"));
var myChart7 = echarts.init(document.getElementById("bar7"));

var option1 = {
	//backgroundColor: '#00265f',
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	//color: ['#6278FF','#239FFF','#AD77FF','#D36AFF'],
	legend: {
		data: ['上期', '本期'],

		textStyle: {
			color: "black"
		},
		itemWidth: 20,
		itemHeight: 10,
		itemGap: 35
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: [{
		type: 'category',

		axisLine: {
			show: true,
			lineStyle: {
				color: "rgba(122,117,140,1)",
				width: 1,
				type: "solid"
			}
		},
		axisTick: {
			show: false,
		},
		axisLabel: {
			show: true,
			textStyle: {
				color: "rgba(122,117,140,1)",
			}
		},
		data: ['包头热电', '河西电厂', '卓资发电', '乌达热电'],
	}],
	yAxis: [{
		type: 'value',
		axisLabel: {
			formatter: '{value} %'
		},
		axisTick: {
			show: false,
		},
		axisLine: {
			show: false,
			lineStyle: {
				color: "rgba(122,117,140,1)",
				width: 1,
				type: "solid"
			},
		},
		splitLine: {
			lineStyle: {
				color: "rgba(122,117,140,1)",
			}
		},
		//data: ['包头热电', '河西电厂', '卓资发电', '乌达热电'],
	}],
	series: [{
		name: '上期',
		type: 'bar',
		data: [20, 50, 80, 58],
		barWidth: 40, //柱子宽度
		barGap: 1, //柱子之间间距
		itemStyle: {
			//通常情况下：
			normal: {　　　　　　　　　　　　 //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
				color: '#9BB0FF',
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
	}, {
		name: '本期',
		type: 'bar',
		data: [50, 70, 60, 61],
		barWidth: 40,
		barGap: 0.2,
		itemStyle: {
			//通常情况下：
			normal: {　　　　　　　　　　　　 //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
				color: '#6278FF',
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
};

myChart6.setOption(option);
myChart7.setOption(option1);

var myChart8 = echarts.init(document.getElementById('bar8'));
/*指定图表的配置项和数据*/
var option2 = {
	textStyle: {
		color: '#000',
		fontSize: '16'
	},
	title: {
		textStyle: {
			color: '#000',

		},
		left: '50%',
		text: '',
		/* subtext: '数据来自网络'*/
	},
	tooltip: {
		trigger: 'axis',
		axisPointer: {
			type: 'shadow'
		}
	},
	legend: {

		textStyle: {
			color: '#000',
		},
		/* data: [titleName],*/
	},
	grid: { //设置图表位置
		left: '-10%',
		top: '0%',
		right: '4%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: {
		min: 0,
		max: 100,
		//data: ["0%","20%","40%","60%","80%","100%"],
		color: '#000',
		splitLine: { //去掉网格线
			show: false
		},
		position: 'top', //X轴位置
		type: 'value',
		boundaryGap: [0, 0.01],
		axisLabel: { //坐标轴刻度标签的相关设置
			//rotate: '45', //坐标轴文字旋转角度
			show: true,
			formatter: '{value} %',
			textStyle: {
				color: '#000',
				align: 'right',
				fontSize: 15
			}
		},
		axisLine: {

			lineStyle: {
				color: '#000'
			}
		},
		axisTick: {
			lineStyle: {
				color: '#000'
			}
		},
	},
	yAxis: {

		type: 'category', //轴的类型分两种 1.category（类别）2.value(值)
		//data:  ['本地商城', '网上营业厅', '微信营业厅', '掌上营业厅'],
		axisLabel: {
			show: true,
			textStyle: {
				color: '#000',
				align: 'right',
				fontSize: 15 /*文字大小*/
			}
		},
		axisLine: {
			lineStyle: {
				color: '#000' //轴的颜色
			}
		},
		axisTick: {
			lineStyle: {
				color: '#000' //轴上点的颜色
			}
		},

	},
	series: [{
			name: '',
			type: 'bar',
			data: /*aa*/ [10, 29, 53, 84],
			/*请求回来的数据数组*/

			label: {
				normal: {
					show: true, //显示数字
					position: 'right'
				}
			},
			barWidth: 15, //柱子宽度
			itemStyle: {
				normal: {
					color: function(params) {
						var colorList = ['#6278FF', '#239FFF', '#AD77FF', '#D36AFF'];
						return colorList[params.dataIndex];
					},
					label: {
						textStyle: {
							fontSize: '15', //柱状上的显示的文字
							color: '#6278FF'
						}
					},
					barBorderRadius: 7
				},
				emphasis: {
					barBorderRadius: 7
				},
			},

		}

	]
};
// 使用刚指定的配置项和数据显示图表。
myChart8.setOption(option2);

chart_rkk()

function chart_rkk() {
	var rkkchart = echarts.init(document.getElementById('bar9'));

	option = {
		title: {

		},
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			},
			formatter: function(params, ticket, callback) {
				console.log(params)
				var res = params[0].name;
				for(var i = 0, l = params.length; i < l; i++) {
					res += '<br/>' + params[i].seriesName + ' : ' + Math.abs(params[i].value);
				}
				setTimeout(function() {
					// 仅为了模拟异步回调
					callback(ticket, res);
				}, 500)
				return 'loading...';
			}
		},
		legend: {
			//data: ['男', '女']
		},
		grid: {
			left: '-5%',
			right: '4%',
			top: '0%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			//data: ["0%","20%","40%","60%","80%","100%"],
			min: 0,
			max: -100,
			color: '#000',
			splitLine: { //去掉网格线
				show: false
			},
			position: 'top', //X轴位置
			type: 'value',
			boundaryGap: [0, 0.01],
			axisLabel: { //坐标轴刻度标签的相关设置
				//rotate: '45', //坐标轴文字旋转角度
				show: true,
				formatter: function(v) { //设置x轴的刻度值
					if(v < 0) {
						v = -v
					}
					return v + "%"
				},
				textStyle: {
					color: '#000',
					align: 'right',
					fontSize: 15
				}
			},
			//			axisLabel: {
			//                  //设置y轴数值为%
			//                  formatter: '{value} %',
			//                  textStyle: {
			//                      color: '#fff'//y轴刻度数值颜色
			//                  }
			//              },
			axisLine: {

				lineStyle: {
					color: '#000'
				}
			},
			axisTick: {
				lineStyle: {
					color: '#000'
				}
			},
		},
		yAxis: [{
			type: 'category', //轴的类型分两种 1.category（类别）2.value(值)
			//data: /*da*/ ['本地商城', '网上营业厅', '微信营业厅', '掌上营业厅'],
			axisLabel: {
				show: true,
				textStyle: {
					color: '#000',
					position: 'right',
					fontSize: 15 /*文字大小*/
				}
			},
			axisLine: {
				lineStyle: {
					color: '#000' //轴的颜色
				}
			},
			axisTick: {
				lineStyle: {
					color: '#000' //轴上点的颜色
				}
			},
		}],
		series: {
			name: '',
			type: 'bar',
			stack: '总量',
			label: {
				normal: {
					show: true,
					position: 'left',
					formatter: function(v) {
						return Math.abs(v.data)
					}
				}
			},
			barWidth: 15, //柱子宽度
			itemStyle: {
				normal: {
					color: function(params) {
						var colorList = ['#6278FF', '#239FFF', '#AD77FF', '#D36AFF'];
						return colorList[params.dataIndex];
					},
					label: {
						textStyle: {
							fontSize: '15', //柱状上的显示的文字
							color: '#6278FF'
						}
					},
					barBorderRadius: 7
				},
				emphasis: {
					barBorderRadius: 7
				},
			},
			data: [-10, -62, -70, -34]

		}
	};
	rkkchart.setOption(option);

}

//第二页时间框定义
laydate.render({
	elem: '#time1' //指定元素
});
laydate.render({
	elem: '#time2' //指定元素
});


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
    ,height: 500
    ,even: true //开启隔行背景
    ,size: 'lg'//用于设定表格尺寸sm
    ,limit:20 //分页条数设置
    ,url: 'table.json' //数据接口
    ,page: true //开启分页
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