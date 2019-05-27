/**
 * Created by ouyang on 2017/06/14.
 */
var util = {

	//深复制，去除关联性
	deepClone(initalObj) {
		var obj = JSON.parse(JSON.stringify(initalObj));
		return obj;
	},
	//重置JSON为空
	resetJson(json) {
		if(json == "" || json == null) return json;
		for(var o in json) {
			json[o] = "";
		}
		return json;
	},
	//地址数据处理
	haddleAddressData(addressData) {
		let ndata = [];
		var k = 0;
		for(var i = 0; i < addressData.length; i++) {
			k = i + 1;
			ndata.push({
				name: addressData[i].n,
				value: k.toString()
			})
			if(addressData[i]['s'] != undefined) {
				for(var j = 0; j < addressData[i]['s'].length; j++) {
					if(j == 0) {
						ndata.push({
							name: "全省",
							value: ((k * 1000) + j).toString(),
							parent: k.toString()
						})
					}
					ndata.push({
						name: addressData[i]['s'][j].n,
						value: ((k * 1000) + j + 1).toString(),
						parent: k.toString()
					})
					if(addressData[i]['s'][j]['s'] != undefined) {
						for(var l = 0; l < addressData[i]['s'][j]['s'].length; l++) {
							if(l == 0) {
								ndata.push({
									name: "全市",
									value: ((k * 100000) + (j * 1000)).toString(),
									parent: ((k * 1000) + j).toString()
								})
							}
							ndata.push({
								name: addressData[i]['s'][j]['s'][l].n,
								value: ((k * 100000) + (j * 1000) + l + 1).toString(),
								parent: ((k * 1000) + j + 1).toString()
							})
						}
					}
				}
			}
		}
		return ndata;
	},
	//获取第三级
	getThreeDate(addressData) {
		let ndata = [];
		var k = 0;
		for(var i = 0; i < addressData.length; i++) {
			for(var j = 0; j < addressData[i]['s'].length; j++) {
				if(addressData[i]['s'][j]['s'] != undefined) {
					for(var l = 0; l < addressData[i]['s'][j]['s'].length; l++) {
						if(l == 0) {
							ndata.push({
								name: "全市",
								value: ((k * 100000) + (j * 1000)).toString(),
								parent: ((k * 1000) + j).toString()
							})
						}
						ndata.push({
							name: addressData[i]['s'][j]['s'][l].n,
							value: ((k * 100000) + (j * 1000) + l + 1).toString(),
							parent: ((k * 1000) + j + 1).toString()
						})
					}
				}
			}
		}
	},
	//主产区数据处理
	haddleZhuAddressData(addressData) {
		let ndata = [];
		var k = 0;
		for(var i = 0; i < addressData.length; i++) {
			k = i + 1;
			ndata.push({
				name: addressData[i].n,
				value: k.toString()
			})
			if(addressData[i]['s'] != undefined) {
				for(var j = 0; j < addressData[i]['s'].length; j++) {
					if(j == 0) {
						ndata.push({
							name: "全省",
							value: ((k * 1000) + j).toString(),
							parent: k.toString()
						})
					}
					ndata.push({
						name: addressData[i]['s'][j].n,
						value: ((k * 1000) + j + 1).toString(),
						parent: k.toString()
					})
					if(addressData[i]['s'][j]['s'] != undefined) {
						for(var l = 0; l < addressData[i]['s'][j]['s'].length; l++) {
							if(l == 0) {
								ndata.push({
									name: "全市",
									value: ((k * 100000) + (j * 1000)).toString(),
									parent: ((k * 1000) + j).toString()
								})
							}
							ndata.push({
								name: addressData[i]['s'][j]['s'][l].n,
								value: ((k * 100000) + (j * 1000) + l + 1).toString(),
								parent: ((k * 1000) + j + 1).toString()
							})
						}
					}
				}
			}
		}
		return ndata;
	},
	//地址数据处理
	haddleAddressDataSmall(addressData) {
		let ndata = [];
		var k = 0;
		for(var i = 0; i < addressData.length; i++) {
			k = i + 1;
			ndata.push({
				name: addressData[i].n,
				value: k.toString()
			})
			if(addressData[i]['s'] != undefined) {
				for(var j = 0; j < addressData[i]['s'].length; j++) {
					ndata.push({
						name: addressData[i]['s'][j].n,
						value: ((k * 1000) + j + 1).toString(),
						parent: k.toString()
					})
					if(addressData[i]['s'][j]['s'] != undefined) {
						for(var l = 0; l < addressData[i]['s'][j]['s'].length; l++) {
							ndata.push({
								name: addressData[i]['s'][j]['s'][l].n,
								value: ((k * 100000) + (j * 1000) + l + 1).toString(),
								parent: ((k * 1000) + j + 1).toString()
							})
						}
					}
				}
			}
		}
		return ndata;
	},
	haddleSearchIndex(addressData) {
		let ndata = [];
		var k = 0;
		for(var i = 0; i < addressData.length; i++) {
			k = i + 1;
			ndata.push({
				name: addressData[i].n,
				value: k.toString()
			})
		}
		return ndata;
	},
	//原料地区数据处理
	haddleMaterAddressData(addressData) {
		let ndata = [];
		var k = 0;
		for(var i = 0; i < addressData.length; i++) {
			k = i + 1;
			ndata.push({
				name: addressData[i].n,
				value: k.toString()
			})
			if(addressData[i]['s'] != undefined) {
				for(var j = 0; j < addressData[i]['s'].length; j++) {
					//					if(j == 0) {
					//						ndata.push({
					//							name: "全省",
					//							value: ((k * 1000) + j).toString(),
					//							parent: k.toString()
					//						})
					//					}
					ndata.push({
						name: addressData[i]['s'][j].n,
						value: ((k * 1000) + j + 1).toString(),
						parent: k.toString()
					})
					if(addressData[i]['s'][j]['s'] != undefined) {
						for(var l = 0; l < addressData[i]['s'][j]['s'].length; l++) {
							if(l == 0) {
								ndata.push({
									name: "",
									value: ((k * 100000) + (j * 1000)).toString(),
									parent: ((k * 1000) + j).toString()
								})
							}
							ndata.push({
								name: addressData[i]['s'][j]['s'][l].n,
								value: ((k * 100000) + (j * 1000) + l + 1).toString(),
								parent: ((k * 1000) + j + 1).toString()
							})
						}
					}
				}
			}
		}
		return ndata;
	},
	//淘汰鸡地区数据处理
	haddleChickenAddressData(addressData) {
		let ndata = [];
		var k = 0;
		for(var i = 0; i < addressData.length; i++) {
			k = i + 1;
			ndata.push({
				name: addressData[i].n,
				value: k.toString()
			})
			if(addressData[i]['s'] != undefined) {
				for(var j = 0; j < addressData[i]['s'].length; j++) {
					if(j == 0) {
						ndata.push({
							name: "全省",
							value: ((k * 1000) + j).toString(),
							parent: k.toString()
						})
					}
					ndata.push({
						name: addressData[i]['s'][j].n,
						value: ((k * 1000) + j + 1).toString(),
						parent: k.toString()
					})
					if(addressData[i]['s'][j]['s'] != undefined) {
						for(var l = 0; l < addressData[i]['s'][j]['s'].length; l++) {
							if(l == 0) {
								ndata.push({
									name: "全市",
									value: ((k * 100000) + (j * 1000)).toString(),
									parent: ((k * 1000) + j).toString()
								})
							}
							ndata.push({
								name: addressData[i]['s'][j]['s'][l].n,
								value: ((k * 100000) + (j * 1000) + l + 1).toString(),
								parent: ((k * 1000) + j + 1).toString()
							})
						}
					}
				}
			}
		}
		return ndata;
	},
	// URL链接替换成A标签
	urlHtmlReplace(str) {
		var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
		return str.replace(reg, '<a href="$1$2">$1$2</a>');
	},
	// 创建form对象
	createFormData(params) {
		let param = new FormData(); //创建form对象		
		for(var i = 0; i < params.length; i++) {
			param.append(params[i].name, params[i].value);
		}
		return param;
	},
	//获取系统时间
	getNowTime(){
		let d = new Date();
		let str = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
		return str;
	}
}

export default util