var white = "rgba(255,255,255,0.8)";
/*
 用户注册省份排行===========================================================
 * */
var userRegisteRankOption = {
	color: ['#59EBE8', '#FBF320'],
	tooltip: {
		trigger: 'axis',
		axisPointer: { // 坐标轴指示器，坐标轴触发有效
			type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
		}
	},
	grid: {
		borderColor: 'rgba(0,0,0,0)',
		x: 50,
		y: 10,
		x2: 20,
		y2: 40
	},
	xAxis: [{
		type: 'value',
		axisLine: {
			show: false
		},
		axisTick: {
			show: false
		},
		splitLine: {
			show: false
		},
		axisLabel: {
			textStyle: {
				color: white
			}
		}
	}],
	yAxis: [{
		type: 'category',
		itemStyle: {
			normal: {
				color: '#59EBE8',
				label: {
					show: true,
					position: 'top',
					formatter: '{b}\n{c}'
				}
			}
		},
		data: [],
		axisLine: {
			show: false
		},
		axisTick: {
			show: false
		},
		splitLine: {
			show: false
		},
		axisLabel: {
			textStyle: {
				color: white
			}
		}
	}],
	series: [{
		name: '注册量',
		type: 'bar',
		data: [],
		itemStyle: {
			normal: {
				label: {
					show: true,
					position: 'right'
				}
			}
		},
	}]
};
var userRegisteRank = echarts.init(document.getElementById('bar'));
userRegisteRank.showLoading();
userRegisteRank.setOption(userRegisteRankOption);
axios.get(http + 'getRegistByProvince')
	.then(function(res) {
		var category = [];
		var data = [];
		var res = res.data.data.data;
		var index = 9;
		var newData = []; //处理新数据，把低于一百的值改为其他
		var otherTotal = 0;
		for(var i = 0; i < res.length; i++) {
			if(i < index) {
				category.push(res[i].name);
				data.push(res[i].count);
				newData.push(res[i]);
			} else {
				if(res[i].count < 100) {
					otherTotal += res[i].count;
				} else {
					newData.push(res[i]);
				}
			}
		}
		newData.push({
			name: '其他',
			count: otherTotal
		}); //定义新数据

		userRegisteRankOption.yAxis[0].data = category.reverse();
		userRegisteRankOption.series[0].data = data.reverse();

		userRegisteRank.hideLoading();
		userRegisteRank.setOption(userRegisteRankOption);
		changeChart(userRegisteRank, newData, 2, index, 'count');
	})

/*
 生产效益录入省份排行===========================================================
 * */
userProductRankOption = {
	tooltip: {
		trigger: 'item',
		textStyle: {
			fontSize: 10
		}
	},
	grid: {
		borderWidth: 0,
		x: 0,
		y: 40,
		x2: 0,
		y2: 30
	},
	calculable: true,
	xAxis: [{
		type: 'category',
		show: false,
		data: []
	}],
	yAxis: [{
		type: 'value',
		show: false
	}],
	series: [{
		name: '省份',
		type: 'bar',
		barWidth: 20, //柱图宽度
		itemStyle: {
			normal: {
				color: '#59EBE8'
					/*new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					                        offset: 0,
					                        color: '#59EBE8'
					                    }, {
					                        offset: 1,
					                        color: '#1E92E7'
					                    }])*/
					,
				label: {
					show: true,
					position: 'top',
					formatter: '{b}\n{c}'
				}
			}
		},
		data: [],
	}]
};
var userProductRank = echarts.init(document.getElementById('bar2'));
userProductRank.setOption(userProductRankOption);
axios.get(http + 'getBroodNumByProvince')
	.then(function(res) {
		var category = [];
		var data = [];
		var res = res.data.data.data.prodNum;
		var index = 9;
		var newData = []; //处理新数据，把低于一百的值改为其他
		var otherTotal = 0;
		for(var i = 0; i < res.length; i++) {
			if(i < index) {
				category.push(res[i].name);
				data.push(res[i].count);
				newData.push(res[i]);
			} else {
				if(res[i].count < 100) {
					otherTotal += res[i].count;
				} else {
					newData.push(res[i]);
				}
			}
		}
		newData.push({
			name: '其他',
			count: otherTotal
		});

		userProductRankOption.xAxis[0].data = category;
		userProductRankOption.series[0].data = data;

		userProductRank.hideLoading();
		userProductRank.setOption(userProductRankOption);
		
		var stepTime = 2.2;//多长时间变换一次
		changeChart(userProductRank, newData,stepTime, index, 'count');
		
		fadeOut(loadingDom, 0, 6000); //关闭loading
	})

/*
文章阅读数次数===========================================================
 * 
 * */
newsOption = {
	tooltip: {
		trigger: 'axis',
		formatter: function(params) {
			return '时间：' + params[0].name + '<br/>' +
				params[0].seriesName + ' : ' + params[0].value + ' 次<br/>';
		},
		textStyle: {
			fontSize: 10
		}
	},
	grid: {
		borderWidth: 0,
		x: 30,
		y: 10,
		x2: 10,
		y2: 35,
	},
	xAxis: [{
		type: 'category',
		show: true,
		data: [],
		axisLine: {
			lineStyle: {
				color: white
			}
		},
		axisLabel: {
			textStyle: {
				color: white
			}
		},
		splitLine: {
			show: false,
		}
	}],
	yAxis: [{
		type: 'value',
		show: true,
		axisLine: {
			lineStyle: {
				color: white
			}
		},
		axisLabel: {
			textStyle: {
				color: white
			}
		},
		splitLine: {
			lineStyle: {
				color: "rgba(60,60,60,0.7)"
			}
		}
	}],
	series: [{
		name: '阅读量',
		type: 'line',
		itemStyle: {
			normal: {
				color: '#59EBE8',
				label: {
					show: true,
					position: 'top',
					formatter: '{c}'
				}
			}
		},
		data: []
	}]
};
var newsUsers = echarts.init(document.getElementById('line'));
setNewsLine(); //设置数据
function setNewsLine() {
	axios.get(http + 'getViewNumByTenMin')
		.then(function(res) {
			console.log(res)
			//console.log(res)
			var res = res.data.data.data;
			var times = [];
			var data = [];
			for(var i = 0; i < res.length; i++) {
				times.push(res[i].time_flag);
				data.push(res[i].value);
			}
			newsOption.xAxis[0].data = times.reverse();
			newsOption.series[0].data = data.reverse();
			newsUsers.setOption(newsOption, true);
		})
}
//changeChart(newsUsers, lineData, 3); // 变换数据

/*
 APP 市场占有率===========================================================
 * 
 * */
var pieData = [{
	"name": "蛋鸡管家",
	"value": 91744
}, {
	"name": "智慧蛋鸡",
	"value": 32798
}, {
	"name": "养鸡管家",
	"value": 29034
}, {
	"name": "养殖宝",
	"value": 55120
}, {
	"name": "蛋e网",
	"value": 61825
}];
var option = {
	color: ['#59EBE8', '#FBF320', '#0397D8', '#0070D8', '#26EEAD'],
	tooltip: {
		trigger: 'item',
		textStyle: {
			fontSize: 10
		}
	},
	calculable: true,
	series: [{
		name: '下载次数：',
		type: 'pie',
		center: ['50%', '55%'],
		itemStyle: {
			normal: {
				label: {
					formatter: "{d}%\n{b}"
				}
			}
		},
		data: pieData
	}]
};
var downloadShop = echarts.init(document.getElementById('shopProportion'));
downloadShop.setOption(option);
changeChart(downloadShop, pieData, 8); // 变换数据

/*
 APP 应用市场下载分布===========================================================
 * 
 * */
var downloadShopOption = {
	color: ['#59EBE8', '#FBF320', '#0397D8', '#0070D8', '#26EEAD', '#1DCEED'],
	calculable: true,
	series: [{
		name: '下载来源: / 次',
		type: 'pie',
		radius: ['40%', '50%'],
		roseType: 'radius',
		center: ['45%', '50%'],
		itemStyle: {
			normal: {
				label: {
					formatter: "{d}%\n{b}"
				}
			}
		},
		data: [1]
	}]
};
var downloadShop = echarts.init(document.getElementById('downloadShop'));
downloadShop.setOption(downloadShopOption);
axios.get(http + 'getRankByOther')
	.then(function(res) {
		downloadShopOption.series[0].data = res.data.data.data;
		downloadShop.setOption(downloadShopOption);
		changeChart(downloadShop, res.data.data.data, 5);
	})

// 获取最近10条用户使用数据，每20秒获取一次
getActionList();

function getActionList() {
	axios.get(http + 'getUserActionInfo')
		.then(function(res) {
			var userActionInfo = res.data.data.list;
			var i = 0;
			var t = setInterval(function() {
				if(i == userActionInfo.length) {
					clearInterval(t);
					return false;
				}
				//输出用户行为	
				address = userActionInfo[i].address == null ? '' : '，地址：' + userActionInfo[i].address;
				layer.open({
					content: '用户【' + userActionInfo[i].username + '】于 ' + userActionInfo[i].TIME + ' 访问了【' + userActionInfo[i].module + '】' + address,
					skin: 'msg',
					time: 2.5 //2秒后自动关闭
				});
				i++;
			}, 2000);
		})
}
setInterval('getActionList()', 20000);