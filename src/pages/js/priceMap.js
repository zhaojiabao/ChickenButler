/*
 地图配置
 * */
$(function() {
	var listData2 = []
	var listDataName2 = []
	$.ajax({
		type: 'POST',
		url: 'https://api.dev.danjiguanjia.com/api/v1/Reportprice/getAllReportPrice',
		data: {
			'ticket': localStorage.getItem('ticket'),
			'type': 3
		},
		success: function(res) {
			if(res.data.area == undefined) {
				listData2 = [];
				listDataName2 = [];
			} else {
				for(var i = 0; i < res.data.area.length; i++) {
					res.data.area[i].Province = res.data.area[i].Province.substring(0, res.data.area[i].Province.length - 1)
					if(res.data.area[i].Province.indexOf('广西') > -1) {
						res.data.area[i].Province = '广西'
					}
					if(res.data.area[i].Province.indexOf('新疆') > -1) {
						res.data.area[i].Province = '新疆'
					}
					if(res.data.area[i].Province.indexOf('内蒙古') > -1) {
						res.data.area[i].Province = '内蒙古'
					}
					if(res.data.area[i].Province.indexOf('宁夏') > -1) {
						res.data.area[i].Province = '宁夏'
					}
					if(res.data.area[i].Province.indexOf('西藏') > -1) {
						res.data.area[i].Province = '西藏'
					}
					if(res.data.area[i].Province.indexOf('澳门') > -1) {
						res.data.area[i].Province = '澳门'
					}
					listData2.push({
						'name': res.data.area[i].Province,
						'selected': true
					})
					listDataName2.push({
						'name': res.data.area[i].Province
					})
				}
			}
			option = {
				tooltip: {
					trigger: 'item',
					formatter: function(params) {
						var res = params.name;
						return res;
					}
				},
				calculable: true,
				series: [{
					name: '省份',
					type: 'map',
					mapType: 'china',
					hoverable: true,
					roam: true,
					itemStyle: {
						normal: {
							borderColor: 'rgba(16,179,240,0.2)',
							borderWidth: 1,
							areaStyle: {
								color: 'rgba(0,0,0,0)'
							}
						},
						emphasis: {
							borderColor: 'rgba(0,210,254,1)',
							borderWidth: 1,
							areaStyle: {
								color: 'rgba(0,0,0,0)'
							}
						}
					},
					data: [],
					markPoint: {
						symbol: 'image://./img/star.png',
						symbolSize: 7,
						itemStyle: {
							normal: {
								borderColor: '#87cefa',
								borderWidth: 1,
								label: {
									show: false
								}
							},
							emphasis: {
								borderColor: '#1e90ff',
								borderWidth: 1,
								label: {
									show: false
								}
							}
						},
						data: [{
								name: "北京"
							}, {
								name: "上海"
							}, {
								name: "天津"
							}, {
								name: "重庆"
							}, {
								name: "西藏"
							}, {
								name: "广西"
							}, {
								name: "宁夏"
							}, {
								name: "新疆"
							}, {
								name: "内蒙古"
							}, {
								name: "河北"
							}, {
								name: "山西"
							},
							{
								name: "辽宁"
							}, {
								name: "吉林"
							}, {
								name: "河南"
							}, {
								name: "黑龙江"
							}, {
								name: "江苏"
							},
							{
								name: "贵州"
							}, {
								name: "浙江"
							}, {
								name: "安徽"
							}, {
								name: "湖北"
							}, {
								name: "湖南"
							},
							{
								name: "福建"
							}, {
								name: "江西"
							}, {
								name: "山东"
							}, {
								name: "广东"
							}, {
								name: "海南"
							},
							{
								name: "四川"
							}, {
								name: "云南"
							}, {
								name: "陕西"
							}, {
								name: "甘肃"
							}, {
								name: "青海"
							}, {
								name: "澳门"
							}
						]
					},
					geoCoord: {
						"北京": [116.46, 39.92],
						"上海": [121.48, 31.22],
						"天津": [117.2, 39.13],
						"重庆": [106.54, 29.59],
						"西藏": [91.11, 29.97],
						"广西": [108.33, 22.84],
						"宁夏": [106.27, 38.47],
						"新疆": [87.68, 43.77],
						"内蒙古": [111.65, 40.82],
						"河北": [114.48, 38.03],
						"山西": [112.53, 37.87],
						"辽宁": [123.38, 41.8],
						"吉林": [125.35, 43.88],
						"河南": [113.65, 34.76],
						"黑龙江": [126.63, 45.75],
						"江苏": [118.78, 32.04],
						"贵州": [106.71, 26.57],
						"浙江": [120.19, 30.26],
						"安徽": [117.27, 31.86],
						"湖北": [114.31, 30.52],
						"湖南": [113, 28.21],
						"福建": [119.3, 26.08],
						"江西": [115.5, 28.4],
						"山东": [117, 36.65],
						"广东": [113.23, 23.16],
						"海南": [110.35, 20.02],
						"四川": [104.06, 30.67],
						"云南": [102.73, 25.04],
						"陕西": [108.95, 34.27],
						"甘肃": [103.73, 36.03],
						"青海": [101.778915, 36.623177],
						"澳门":[113.33,22.13]
					}
				}, {
					name: '已点亮省份',
					type: 'map',
					mapType: 'china',
					hoverable: true,
					roam: true,
					itemStyle: {
						normal: {
							borderColor: 'rgba(16,179,240,0.4)',
							borderWidth: 1,
							areaStyle: {
								color: 'rgba(0,0,0,0)'
							}
						},
						emphasis: {
							borderColor: 'rgba(0,210,254,1)',
							borderWidth: 1,
							areaStyle: {
								color: 'rgba(0,0,0,0)'
							}
						}
					},
					data: listData2,
					markPoint: {
						symbol: 'image://./img/star_light.png',
						symbolSize: 7,
						itemStyle: {
							normal: {
								borderColor: '#87cefa',
								borderWidth: 1,
								label: {
									show: false
								}
							},
							emphasis: {
								borderColor: '#1e90ff',
								borderWidth: 1,
								label: {
									show: false
								}
							}
						},
						data: listDataName2
					}
				}]
			};
			// 淘汰鸡价格
			var chickenPrice = echarts.init(document.getElementById('chickenPrice'));
			chickenPrice.setOption(option);
		}
	})
	/*
	 地图配置
	 * */
	var listData1 = []
	var listDataName1 = []
	$.ajax({
		type: 'POST',
		url: 'https://api.dev.danjiguanjia.com/api/v1/Reportprice/getAllReportPrice',
		data: {
			'ticket': localStorage.getItem('ticket'),
			'type': 2
		},
		success: function(res) {
			if(res.data.area == undefined) {
				listData1 = [];
				listDataName1 = [];
			} else {
				for(var i = 0; i < res.data.area.length; i++) {
					res.data.area[i].Province = res.data.area[i].Province.substring(0, res.data.area[i].Province.length - 1)
					if(res.data.area[i].Province.indexOf('广西') > -1) {
						res.data.area[i].Province = '广西'
					}
					if(res.data.area[i].Province.indexOf('新疆') > -1) {
						res.data.area[i].Province = '新疆'
					}
					if(res.data.area[i].Province.indexOf('内蒙古') > -1) {
						res.data.area[i].Province = '内蒙古'
					}
					if(res.data.area[i].Province.indexOf('宁夏') > -1) {
						res.data.area[i].Province = '宁夏'
					}
					if(res.data.area[i].Province.indexOf('西藏') > -1) {
						res.data.area[i].Province = '西藏'
					}
					if(res.data.area[i].Province.indexOf('澳门') > -1) {
						res.data.area[i].Province = '澳门'
					}
					listData1.push({
						'name': res.data.area[i].Province,
						'selected': true
					})
					listDataName1.push({
						'name': res.data.area[i].Province
					})
				}
			}
			option = {
				tooltip: {
					trigger: 'item',
					formatter: function(params) {
						var res = params.name;
						return res;
					}
				},
				calculable: true,
				series: [{
					name: '省份',
					type: 'map',
					mapType: 'china',
					hoverable: true,
					roam: true,
					itemStyle: {
						normal: {
							borderColor: 'rgba(16,179,240,0.2)',
							borderWidth: 1,
							areaStyle: {
								color: 'rgba(0,0,0,0)'
							}
						},
						emphasis: {
							borderColor: 'rgba(0,210,254,1)',
							borderWidth: 1,
							areaStyle: {
								color: 'rgba(0,0,0,0)'
							}
						}
					},
					data: [],
					markPoint: {
						symbol: 'image://./img/star.png',
						symbolSize: 7,
						itemStyle: {
							normal: {
								borderColor: '#87cefa',
								borderWidth: 1,
								label: {
									show: false
								}
							},
							emphasis: {
								borderColor: '#1e90ff',
								borderWidth: 1,
								label: {
									show: false
								}
							}
						},
						data: [{
								name: "北京"
							}, {
								name: "上海"
							}, {
								name: "天津"
							}, {
								name: "重庆"
							}, {
								name: "西藏"
							}, {
								name: "广西"
							}, {
								name: "宁夏"
							}, {
								name: "新疆"
							}, {
								name: "内蒙古"
							}, {
								name: "河北"
							}, {
								name: "山西"
							},
							{
								name: "辽宁"
							}, {
								name: "吉林"
							}, {
								name: "河南"
							}, {
								name: "黑龙江"
							}, {
								name: "江苏"
							},
							{
								name: "贵州"
							}, {
								name: "浙江"
							}, {
								name: "安徽"
							}, {
								name: "湖北"
							}, {
								name: "湖南"
							},
							{
								name: "福建"
							}, {
								name: "江西"
							}, {
								name: "山东"
							}, {
								name: "广东"
							}, {
								name: "海南"
							},
							{
								name: "四川"
							}, {
								name: "云南"
							}, {
								name: "陕西"
							}, {
								name: "甘肃"
							}, {
								name: "青海"
							},{
								name:'澳门'
							}
						]
					},
					geoCoord: {
						"北京": [116.46, 39.92],
						"上海": [121.48, 31.22],
						"天津": [117.2, 39.13],
						"重庆": [106.54, 29.59],
						"西藏": [91.11, 29.97],
						"广西": [108.33, 22.84],
						"宁夏": [106.27, 38.47],
						"新疆": [87.68, 43.77],
						"内蒙古": [111.65, 40.82],
						"河北": [114.48, 38.03],
						"山西": [112.53, 37.87],
						"辽宁": [123.38, 41.8],
						"吉林": [125.35, 43.88],
						"河南": [113.65, 34.76],
						"黑龙江": [126.63, 45.75],
						"江苏": [118.78, 32.04],
						"贵州": [106.71, 26.57],
						"浙江": [120.19, 30.26],
						"安徽": [117.27, 31.86],
						"湖北": [114.31, 30.52],
						"湖南": [113, 28.21],
						"福建": [119.3, 26.08],
						"江西": [115.5, 28.4],
						"山东": [117, 36.65],
						"广东": [113.23, 23.16],
						"海南": [110.35, 20.02],
						"四川": [104.06, 30.67],
						"云南": [102.73, 25.04],
						"陕西": [108.95, 34.27],
						"甘肃": [103.73, 36.03],
						"青海": [101.778915, 36.623177],
						"澳门":[113.33,22.13]
					}
				}, {
					name: '已点亮省份',
					type: 'map',
					mapType: 'china',
					hoverable: true,
					roam: true,
					itemStyle: {
						normal: {
							borderColor: 'rgba(16,179,240,0.4)',
							borderWidth: 1,
							areaStyle: {
								color: 'rgba(0,0,0,0)'
							}
						},
						emphasis: {
							borderColor: 'rgba(0,210,254,1)',
							borderWidth: 1,
							areaStyle: {
								color: 'rgba(0,0,0,0)'
							}
						}
					},
					data: listData1,
					markPoint: {
						symbol: 'image://./img/star_light.png',
						symbolSize: 7,
						itemStyle: {
							normal: {
								borderColor: '#87cefa',
								borderWidth: 1,
								label: {
									show: false
								}
							},
							emphasis: {
								borderColor: '#1e90ff',
								borderWidth: 1,
								label: {
									show: false
								}
							}
						},
						data: listDataName1
					}
				}]
			};
			var chickenPrice = echarts.init(document.getElementById('materialPrice'));
			chickenPrice.setOption(option);
		}
	})

	/*
	 地图配置
	 * */
	var listData = []
	var listDataName = []
	$.ajax({
		type: 'POST',
		url: 'https://api.dev.danjiguanjia.com/api/v1/Reportprice/getAllReportPrice',
		data: {
			'ticket': localStorage.getItem('ticket'),
			'type': 1
		},
		success: function(res) {
			if(res.data.area == undefined) {
				listData = [];
				listDataName = [];
			} else {
				for(var i = 0; i < res.data.area.length; i++) {
					res.data.area[i].Province = res.data.area[i].Province.substring(0, res.data.area[i].Province.length - 1)
					if(res.data.area[i].Province.indexOf('广西') > -1) {
						res.data.area[i].Province = '广西'
					}
					if(res.data.area[i].Province.indexOf('新疆') > -1) {
						res.data.area[i].Province = '新疆'
					}
					if(res.data.area[i].Province.indexOf('内蒙古') > -1) {
						res.data.area[i].Province = '内蒙古'
					}
					if(res.data.area[i].Province.indexOf('宁夏') > -1) {
						res.data.area[i].Province = '宁夏'
					}
					if(res.data.area[i].Province.indexOf('西藏') > -1) {
						res.data.area[i].Province = '西藏'
					}
					if(res.data.area[i].Province.indexOf('澳门') > -1) {
						res.data.area[i].Province = '澳门'
					}
					listData.push({
						'name': res.data.area[i].Province,
						'selected': true
					})
					listDataName.push({
						'name': res.data.area[i].Province
					})
				}
			}
			option = {
				tooltip: {
					trigger: 'item',
					formatter: function(params) {
						var res = params.name;
						return res;
					}
				},
				calculable: true,
				series: [{
					name: '省份',
					type: 'map',
					mapType: 'china',
					hoverable: true,
					roam: true,
					itemStyle: {
						normal: {
							borderColor: 'rgba(16,179,240,0.2)',
							borderWidth: 1,
							areaStyle: {
								color: 'rgba(0,0,0,0)'
							}
						},
						emphasis: {
							borderColor: 'rgba(0,210,254,1)',
							borderWidth: 1,
							areaStyle: {
								color: 'rgba(0,0,0,0)'
							}
						}
					},
					data: [],
					markPoint: {
						symbol: 'image://./img/star.png',
						symbolSize: 7,
						itemStyle: {
							normal: {
								borderColor: '#87cefa',
								borderWidth: 1,
								label: {
									show: false
								}
							},
							emphasis: {
								borderColor: '#1e90ff',
								borderWidth: 1,
								label: {
									show: false
								}
							}
						},
						data: [{
								name: "北京"
							}, {
								name: "上海"
							}, {
								name: "天津"
							}, {
								name: "重庆"
							}, {
								name: "西藏"
							}, {
								name: "广西"
							}, {
								name: "宁夏"
							}, {
								name: "新疆"
							}, {
								name: "内蒙古"
							}, {
								name: "河北"
							}, {
								name: "山西"
							},
							{
								name: "辽宁"
							}, {
								name: "吉林"
							}, {
								name: "河南"
							}, {
								name: "黑龙江"
							}, {
								name: "江苏"
							},
							{
								name: "贵州"
							}, {
								name: "浙江"
							}, {
								name: "安徽"
							}, {
								name: "湖北"
							}, {
								name: "湖南"
							},
							{
								name: "福建"
							}, {
								name: "江西"
							}, {
								name: "山东"
							}, {
								name: "广东"
							}, {
								name: "海南"
							},
							{
								name: "四川"
							}, {
								name: "云南"
							}, {
								name: "陕西"
							}, {
								name: "甘肃"
							}, {
								name: "青海"
							},{
								name:"澳门"
							}
						]
					},
					geoCoord: {
						"北京": [116.46, 39.92],
						"上海": [121.48, 31.22],
						"天津": [117.2, 39.13],
						"重庆": [106.54, 29.59],
						"西藏": [91.11, 29.97],
						"广西": [108.33, 22.84],
						"宁夏": [106.27, 38.47],
						"新疆": [87.68, 43.77],
						"内蒙古": [111.65, 40.82],
						"河北": [114.48, 38.03],
						"山西": [112.53, 37.87],
						"辽宁": [123.38, 41.8],
						"吉林": [125.35, 43.88],
						"河南": [113.65, 34.76],
						"黑龙江": [126.63, 45.75],
						"江苏": [118.78, 32.04],
						"贵州": [106.71, 26.57],
						"浙江": [120.19, 30.26],
						"安徽": [117.27, 31.86],
						"湖北": [114.31, 30.52],
						"湖南": [113, 28.21],
						"福建": [119.3, 26.08],
						"江西": [115.5, 28.4],
						"山东": [117, 36.65],
						"广东": [113.23, 23.16],
						"海南": [110.35, 20.02],
						"四川": [104.06, 30.67],
						"云南": [102.73, 25.04],
						"陕西": [108.95, 34.27],
						"甘肃": [103.73, 36.03],
						"青海": [101.778915, 36.623177],
						"澳门":[113.33,22.13]
					}
				}, {
					name: '已点亮省份',
					type: 'map',
					mapType: 'china',
					hoverable: true,
					roam: true,
					itemStyle: {
						normal: {
							borderColor: 'rgba(16,179,240,0.4)',
							borderWidth: 1,
							areaStyle: {
								color: 'rgba(0,0,0,0)'
							}
						},
						emphasis: {
							borderColor: 'rgba(0,210,254,1)',
							borderWidth: 1,
							areaStyle: {
								color: 'rgba(0,0,0,0)'
							}
						}
					},
					data: listData,
					markPoint: {
						symbol: 'image://./img/star_light.png',
						symbolSize: 7,
						itemStyle: {
							normal: {
								borderColor: '#87cefa',
								borderWidth: 1,
								label: {
									show: false
								}
							},
							emphasis: {
								borderColor: '#1e90ff',
								borderWidth: 1,
								label: {
									show: false
								}
							}
						},
						data: listDataName
					}
				}]
			};
			// 蛋价
			var eggPrice = echarts.init(document.getElementById('eggPrice'));
			eggPrice.setOption(option);
		}
	})
})