var mapdata = {'userMapList':[{'name':'北京','value':5263},{'name':'天津','value':322},{'name':'石家庄','value':345}],'actionUserMapList':[{'name':'永州','value':5263},{'name':'大理','value':322},{'name':'沈阳','value':345}]};
/*
 地图配置
 * */
option = {
	color: [
		'rgba(14, 241, 242, 1)',
		'rgba(14, 241, 242, 0.8)'
	],
	legend: {
		show: false,
		orient: 'vertical',
		x: 'left',
		data: ['不活跃', '活跃'],
		textStyle: {
			color: '#fff'
		}
	},
	toolbox: {
		show: false,
		orient: 'vertical',
		x: 'right',
		y: 'center',
		feature: {
			mark: {
				show: true
			},
			dataView: {
				show: true,
				readOnly: false
			},
			restore: {
				show: true
			},
			saveAsImage: {
				show: true
			}
		}
	},
	tooltip: {
		trigger: 'item',
		formatter: function(params) {
			var res = params.name + '<br/>';
			if(params[0] != '') {
				res = params[0] + "<br/>" + params.name + '：' + params.value;
			}
			return res;
		}
	},
	calculable: true,
	series: [{
			name: '不活跃',
			type: 'map',
			zoom:1.3,
			mapType: 'china',
			mapLocation: {
				x: 'center',
				y: 'center',
				height: '50%'
			},
			itemStyle: {
				normal: {
					borderColor: 'rgba(16,179,240,1)',
					borderWidth: 2,
					areaStyle: {
						color: 'rgba(0,0,0,0.2)'
					}
				}
			},
			data: [],
			markPoint: {
				symbol: 'circle',
				symbolSize: 3,
				large: true,
				effect: {
					show: true
				},
				data: (function() {
					var data = [];
					for(var i = 0; i < mapdata.userMapList.length; i++) {
						data.push({
							name: mapdata.userMapList[i].name,
							value: mapdata.userMapList[i].value,
							geoCoord: placeList[mapdata.userMapList[i].name]
						})
					}
					return data;
				})()
			}
		},
		{
			name: '活跃量',
			type: 'map',
			mapType: 'china',
			hoverable: false,
			roam: true,
			data: [],
			markPoint: {
				symbol: 'emptyCircle',
				symbolSize: function(v) {
					return 4 + v / 80
				},
				effect: {
					show: true,
					shadowBlur: 0
				},
				data: (function() {
					var data = [];
					for(var i = 0; i < mapdata.actionUserMapList.length; i++) {
						data.push({
							name: mapdata.actionUserMapList[i].name,
							value: mapdata.actionUserMapList[i].value,
							geoCoord: placeList[mapdata.actionUserMapList[i].name]
						})
					}
					return data;
				})()
			}
		}
	]
};


var myChart = echarts.init(document.getElementById('chainCharts'));
myChart.setOption(option);
/*
 * 获取地图数据
 * */
axios.all([
		axios.post(http + 'getDownLoadNumByCity'),
		axios.post(http + 'getActiveNumByCity')
	])
	.then(axios.spread(function(userlist, activelist) {
		// 上面两个请求都完成后，才执行这个回调方法		
		userlist = mapHandleData(userlist.data.data.data);
		activelist = mapHandleData(activelist.data.data.data);
		option={color:["rgba(14, 241, 242, 1)","rgba(14, 241, 242, 0.8)"],legend:{show:false,orient:"vertical",x:"left",data:["不活跃","活跃"],textStyle:{color:"#fff"}},toolbox:{show:false,orient:"vertical",x:"right",y:"center",feature:{mark:{show:true},dataView:{show:true,readOnly:false},restore:{show:true},saveAsImage:{show:true}}},tooltip:{trigger:"item",formatter:function(params){var res=params.name+"<br/>";if(params[0]!=""){res=params[0]+"<br/>"+params.name+"："+params.value}return res}},calculable:true,series:[{name:"不活跃",type:"map",mapType:"china",mapLocation:{x:"center",y:"center",height:"60%"},itemStyle:{normal:{borderColor:"rgba(16,179,240,1)",borderWidth:2,areaStyle:{color:"rgba(0,0,0,0.2)"}}},data:[],markPoint:{symbol:"circle",symbolSize:3,large:true,effect:{show:true},data:userlist}},{name:"活跃量",type:"map",mapType:"china",hoverable:false,roam:true,data:[],markPoint:{symbol:"emptyCircle",symbolSize:function(v){return 4+v/80},effect:{show:true,shadowBlur:0},data:activelist}}]};
		
		//初始化echarts实例		
		myChart.setOption(option);
	}));