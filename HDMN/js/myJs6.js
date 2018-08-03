var lineChart = echarts.init(document.getElementById('lineChart'));
var optionChart = {
                    tooltip: {
                        trigger: "axis"
                    },
                    legend: {
						//orient: 'vertical',垂直排列
						x: 'center',
						itemGap: 25,
						top: '5%',
						selectedMode: false, //取消点击事件
						data: ['来煤量', '耗煤量', '库存量']
					},
                    color: ['#6278FF','#239FFF','#D36AFF'],
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#666666"
                            }
                        },
                        data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                    },
                    yAxis: {
                        type: 'value',
                        name: "单位:万吨",
                        nameTextStyle: {
                            color: "#7A758C" // y轴单位标签颜色
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#7A758C" // y轴单位坐标文字颜色
                            }
                        },
                        max: 100000,
                        min: 0,
                        axisLabel: {
                            show: true,
                            interval: 'auto',
                            formatter: '{value}'
                            //formatter: '{value} %'
                            },
                        show: true,
                        splitLine: {
                            // 网格线
                            show: true,
                            lineStyle: {
                                width: 1,
                                color: "#D5DAE6"
                            }
                        }
                    },
                    series: [
                        {
                            name: '来煤量',
                            data: [62000, 68000, 70000, 74000, 70600, 80000, 70000, 75000, 85000, 74000, 70000, 80000],
                            type: 'line',
                            smooth: true,
                            // itemStyle: {
                            //     normal: {
                            //         label: {
                            //             show: true,
                            //             position: 'top',
                            //             formatter: '{b}\n{c}%'
                            //         }
                            //     }
                            // },
                        },
                        {
                            name: '耗煤量',
                            data: [50000, 45000, 50000, 40000, 50000, 30000, 46000, 40000, 45000, 50000, 40000, 53000],
                            type: 'line',
                            smooth: true,
                        },
                        {
                            name: '库存量',
                            data: [25000, 40000, 30000, 45000, 30000, 40000, 30000, 50000, 30000, 40000, 36000, 40000],
                            type: 'line',
                            smooth: true,
                        }

                    ]
                };
            // 使用刚指定的配置项和数据显示图表。
 lineChart.setOption(optionChart);
 




var barLeft = echarts.init(document.getElementById("barLeft"));
var barRight = echarts.init(document.getElementById("barRight"));
var barYear = echarts.init(document.getElementById("barYear"));
var optionBarLeft = {
	xAxis: {
		type: 'category',
		
		axisLabel:{
			formatter: function(val) {
				var strs = val.split(''); //字符串数组
				var str = ''
				for (var i = 0, s; s = strs[i++];) { //遍历字符串数组
				str += s;
				if (!(i % 3)) str += '\n'; //按需要求余
				}
				return str
			}
		},
		data: ['日累 耗煤量', '月报 耗煤量', '耗煤量调整']
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true
	},
	yAxis: {
		type: 'value',
		name: '单位：吨',
	},
	series: [{
		name: '华电蒙能',
		type: 'bar',
		data: [11200, 10780, 420],
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
barLeft.setOption(optionBarLeft);
barRight.setOption(optionBarLeft);
barYear.setOption(optionBarLeft);

var barRightSeries=[{
		name: '华电蒙能',
		type: 'bar',
		data: [5100, 5300, 200],
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
var barRightX={
		type: 'category',
		
		axisLabel:{
			formatter: function(val) {
				var strs = val.split(''); //字符串数组
				var str = ''
				for (var i = 0, s; s = strs[i++];) { //遍历字符串数组
				str += s;
				if (!(i % 3)) str += '\n'; //按需要求余
				}
				return str
			}
		},
		data: ['日累入炉热值', '日累入炉热值', '热值 调整量']
	}
var barRightY={
		type: 'value',
		name: '单位：千卡/千克',
	}
barRight.setOption({
			series :barRightSeries
});
barRight.setOption({
			xAxis :barRightX
});
barRight.setOption({
			yAxis :barRightY
});



var barYearSeries=[{
		name: '华电蒙能',
		type: 'bar',
		data: [84.85, 98.92, 67.88],
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
var barYearX={//单位：万吨
		type: 'category',
		axisLabel:{
			formatter: function(val) {
				var strs = val.split(''); //字符串数组
				var str = ''
				for (var i = 0, s; s = strs[i++];) { //遍历字符串数组
				str += s;
				if (!(i % 3)) str += '\n'; //按需要求余
				}
				return str
			}
		},
		data: ['来煤', '耗煤', '库存']
	}
barYear.setOption({
			series :barYearSeries
});
barYear.setOption({
			xAxis :barYearX
});



var panYear = echarts.init(document.getElementById("panYear"));
var panMonth= echarts.init(document.getElementById("panMonth"));
var  optionPanYear= {
         series: [
             
             {
                 type : "gauge",
                 //center: ["50%", "45%"], // 默认全局居中
                 radius : "80%",
                 min:0,
                 max:0.36,
                  "center": ["25%", "50%"], //整体的位置设置
                 startAngle: 225, //开始角度
                 endAngle: -45, //结束角度
                 axisLine : {
                     show : true,
                     lineStyle : { // 属性lineStyle控制线条样式
                         color : [ //表盘颜色
                             [ 0.5, "#6278FF" ],//0-50%处的颜色
                             [ 0.7, "#D36AFF" ],//51%-70%处的颜色
                             [ 0.9, "#D36AFF" ],//70%-90%处的颜色
                             [ 1,"#D36AFF" ]//90%-100%处的颜色
                         ],
                         width : 10//表盘宽度
                     }
                 },
                 splitLine : { //分割线样式（及10、20等长线样式）
                     length : 10,
                     lineStyle : { // 属性lineStyle控制线条样式
                         width : 2
                     }
                 },
                 axisTick : { //刻度线样式（及短线样式）
                      length : 10
                 },
                 axisLabel : { //文字样式（及“10”、“20”等文字样式）
                     color : "gray",
                     distance : 5 //文字离表盘的距离
                 },
                 detail: {
                     formatter : "{score|\n\n年累计\n(兆焦/千克)}",
                     offsetCenter: [0, "50%"],
                     //backgroundColor: '#FFEC45',
                     height:50,
                     rich : {
                         score : {
                             color : "black",
                             fontFamily : "微软雅黑",
                             fontSize : 15
                         }
                     }
                 },
                 data: [{
                     value: 0.15,
                     label: {
                         textStyle: {
                             fontSize: 12
                         }
                     },
                     name:'\n\n\n\n热差值\n0.15'
                 }]
             },
             {
                 type : "gauge",
                 center: ["75%", "50%"], // 默认全局居中
                 radius : "80%",
                 min:0,
                 max:540,
                 // "center": ["60%", "60%"], //整体的位置设置
                 startAngle: 225, //开始角度
                 endAngle: -45, //结束角度
                 axisLine : {
                     show : true,
                     lineStyle : { // 属性lineStyle控制线条样式
                         color : [ //表盘颜色
                             [ 0.5, "#6278FF" ],//0-50%处的颜色
                             [ 0.7, "#D36AFF" ],//51%-70%处的颜色
                             [ 0.9, "#D36AFF" ],//70%-90%处的颜色
                             [ 1,"#D36AFF" ]//90%-100%处的颜色
                         ],
                         width : 10//表盘宽度
                     }
                 },
                 splitLine : { //分割线样式（及10、20等长线样式）
                     length : 10,
                     lineStyle : { // 属性lineStyle控制线条样式
                         width : 2
                     }
                 },
                 axisTick : { //刻度线样式（及短线样式）
                      length : 10
                 },
                 axisLabel : { //文字样式（及“10”、“20”等文字样式）
                     color : "gray",
                     distance : 5 //文字离表盘的距离
                 },
                 detail: {
                     formatter : "{score|\n\n年累计\n(元/吨)}",
                     offsetCenter: [0, "50%"],
                     //backgroundColor: '#FFEC45',
                     height:50,
                     rich : {
                         score : {
                             color : "black",
                             fontFamily : "微软雅黑",
                             fontSize : 15
                         }
                     }
                 },
                 data: [{
                     value: 330,
                     label: {
                         textStyle: {
                             fontSize: 12
                         }
                     },
                     name:'\n\n\n\n入炉标煤单价\n330'
                 }]
             }
         ]
     };

panYear.setOption(optionPanYear);


var panMonth= echarts.init(document.getElementById("panMonth"));
var  optionPanMonth= {
         series: [
             
             {
                 type : "gauge",
                 //center: ["50%", "45%"], // 默认全局居中
                 radius : "80%",
                 min:0,
                 max:0.36,
                  "center": ["25%", "50%"], //整体的位置设置
                 startAngle: 225, //开始角度
                 endAngle: -45, //结束角度
                 axisLine : {
                     show : true,
                     lineStyle : { // 属性lineStyle控制线条样式
                         color : [ //表盘颜色
                             [ 0.5, "#6278FF" ],//0-50%处的颜色
                             [ 0.7, "#D36AFF" ],//51%-70%处的颜色
                             [ 0.9, "#D36AFF" ],//70%-90%处的颜色
                             [ 1,"#D36AFF" ]//90%-100%处的颜色
                         ],
                         width : 10//表盘宽度
                     }
                 },
                 splitLine : { //分割线样式（及10、20等长线样式）
                     length : 10,
                     lineStyle : { // 属性lineStyle控制线条样式
                         width : 2
                     }
                 },
                 axisTick : { //刻度线样式（及短线样式）
                      length : 10
                 },
                 axisLabel : { //文字样式（及“10”、“20”等文字样式）
                     color : "gray",
                     distance : 5 //文字离表盘的距离
                 },
                 detail: {
                     formatter : "{score|\n\n月累计\n(兆焦/千克)}",//{score|{value}\n\n月累计\n(兆焦/千克)}
                     offsetCenter: [0, "50%"],
                     //backgroundColor: '#FFEC45',
                     height:50,
                     rich : {
                         score : {
                             color : "black",
                             fontFamily : "微软雅黑",
                             fontSize : 15
                         }
                     }
                 },
                 data: [{
                     value: 0.21,
                     label: {
                         textStyle: {
                             fontSize: 12
                         }
                     },
                     name:'\n\n\n\n热差值\n0.21'
                 }]
             },
             {
                 type : "gauge",
                 center: ["75%", "50%"], // 默认全局居中
                 radius : "80%",
                 min:0,
                 max:540,
                 // "center": ["60%", "60%"], //整体的位置设置
                 startAngle: 225, //开始角度
                 endAngle: -45, //结束角度
                 axisLine : {
                     show : true,
                     lineStyle : { // 属性lineStyle控制线条样式
                         color : [ //表盘颜色
                             [ 0.5, "#6278FF" ],//0-50%处的颜色
                             [ 0.7, "#D36AFF" ],//51%-70%处的颜色
                             [ 0.9, "#D36AFF" ],//70%-90%处的颜色
                             [ 1,"#D36AFF" ]//90%-100%处的颜色
                         ],
                         width : 10//表盘宽度
                     }
                 },
                 splitLine : { //分割线样式（及10、20等长线样式）
                     length : 10,
                     lineStyle : { // 属性lineStyle控制线条样式
                         width : 2
                     }
                 },
                 axisTick : { //刻度线样式（及短线样式）
                      length : 10
                 },
                 axisLabel : { //文字样式（及“10”、“20”等文字样式）
                     color : "gray",
                     distance : 5 //文字离表盘的距离
                 },
                 detail: {
                     formatter : "{score|\n\n月累计\n(元/吨)}",
                     offsetCenter: [0, "50%"],
                     //backgroundColor: '#FFEC45',
                     height:50,
                     rich : {
                         score : {
                             color : "black",
                             fontFamily : "微软雅黑",
                             fontSize : 15
                         }
                     }
                 },
                 data: [{
                     value: 360,
                     label: {
                         textStyle: {
                             fontSize: 8
                         }
                     },
                     name:'\n\n\n\n入炉标煤单价\n360'
                 }]
             }
         ]
     };

panMonth.setOption(optionPanMonth);
