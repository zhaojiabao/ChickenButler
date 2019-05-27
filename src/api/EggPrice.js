import axios from 'axios';
import config from './config';
import qs from 'qs';

let base = config.base_url;
let base2 = config.test_url;
/*
 *	蛋价查询 
 * */

let price = '/v2/price';
//首页搜索结果
export const search = params => {
	return axios.get(`${base}${price}/search`, {
		params: params
	}).then(res => res.data);
};
//搜索地区
export const sreachArea = params => {
	return axios.get(`${base}${price}/sreachArea`, {
		params: params
	}).then(res => res.data);
};
//获取地址 主产区
export const productAddress = params => {
	return axios.get(`${base}${price}/address`, {
		params: params
	}).then(res => res.data);
};

//获取地址 
let sales = '/v2/sales/';

//获取地址 主销区
export const salesAddress = params => {
	return axios.get(`${base}${sales}/address`, {
		params: params
	}).then(res => res.data);
};

//主销区首页
export const getSaleSearch = params => {
	return axios.get(`${base}${sales}/getSearch`, {
		params: params
	}).then(res => res.data);
};

//预测接口
//获取地址 
let prizes = '/v2/prizes/';

//预测进度
export const progressBar = params => {
	return axios.get(`http://api.danjiguanjia.com/v2/prizes/progressBar`, {
		params: params
	}).then(res => res.data);
};

//预测饼图
export const predict = params => {
	return axios.get(`${base}${price}/predict`, {
		params: params
	}).then(res => res.data);
};
//点击预测蛋价
export const toPredict = params => {
	return axios.get(`${base}${price}/toPredict`, {
		params: params
	}).then(res => res.data);
};
//点击预测蛋价
export const getPredict = params => {
	return axios.get(`${base}${price}/getPredict`, {
		params: params
	}).then(res => res.data);
};

//获取活动礼品 
export const prizesDisplay = params => {
	return axios.get(`${base}${prizes}/prizesDisplay`, {
		params: params
	}).then(res => res.data);
};

//获取活动的的礼品 积蛋
export const getGift = params => {
	return axios.get(`${base}/v2/Prizes/addScores`, {
		params: params
	}).then(res => res.data);
};

//预测接口
//获取地址 
let material_chart = '/v6/feedprice/';
let action = ['weekPrice', 'mouthPrice', 'quarterPrice', 'yearPrice'];
export const MaterialData = params => {
	return axios.get(`${base}${material_chart}/` + action[params.type], {
		params: params.data
	}).then(res => res.data);
};

//搜索原料
export const searchMaterial = params => {
	return axios.get(`${base}${material_chart}/searchMaterial`, {
		params: params
	}).then(res => res.data);
};

//淘汰鸡
let price_chick = '/v6/price/';
export const searchCullchick = params => {
	return axios.get(`${base}${price_chick}getOutIndex`, {
		params: params
	}).then(res => res.data);
};

export const chickoutAddress = params => {
	return axios.get(`${base2}${price_chick}chickoutAddress `, {
		params: params
	}).then(res => res.data);
};

//获取地区数据
export const McArea = () => {
	return axios.get(`${base}/map/chart/getCityData`).then(res => res.data);
}

//价格行情首页->主产区导航地址
export const linkageAddress = () => {
	return axios.get(`https://api.rls.danjiguanjia.com/api/v1/PriceSearch/ProdAddress`).then(res => res.data);
}
//鸡蛋价格行情-产区导航地址  
export const getChanNav = () => {
	return axios.get(`https://api.rls.danjiguanjia.com/api/v1/PriceMarketNav/getAllProdNav`).then(res => res.data);
}
//价格行情首页->主产区搜索
export const getDayEggPrice = params => {
	return axios.get(`https://api.rls.danjiguanjia.com/v1/price/getDayEggPrice`, {
		params: params
	}).then(res => res.data);
};
//价格行情首页->主产区数据
export const productData = params => {
	let param = new FormData(); //创建form对象	
	//	param.append('ticket', params.ticket);
	param.append('area', params.area);
	return axios.post(`https://api.rls.danjiguanjia.com/api/v1/PriceSearch/getProdEggPrice`, param).then(res => res.data);
};

//价格行情首页->主销区导航地址
export const getSaleAddressList = () => {
	return axios.get(`https://api.rls.danjiguanjia.com/api/v1/PriceSearch/SaleAddress`).then(res => res.data);
}
//价格行情首页->主销区搜索
//export const getSaleSearchList = params => {
//	return axios.get(`https://api.dev.danjiguanjia.com/api/v1/PriceSearch/getSaleEggPrice`, {
//		params: params
//	}).then(res => res.data);
//};
export const getSaleSearchList = params => {
	let param = new FormData(); //创建form对象	
//	param.append('ticket', params.ticket);
	param.append('area', params.area);
	return axios.post(`https://api.rls.danjiguanjia.com/api/v1/PriceSearch/getSaleEggPrice`, param).then(res => res.data);
};
//价格行情首页->原料数据
export const getMaterList = () => {
	return axios.get(`https://api.rls.danjiguanjia.com/api/v1/PriceMarketNav/getAllCronNav`).then(res => res.data);
}
//价格行情首页->原料数据搜索
//export const newSearchMaterial = params => {
//	return axios.get(`https://api.dev.danjiguanjia.com/v1/feedprice/searchMaterial`, {
//		params: params
//	}).then(res => res.data);
//};
export const marSearchList = params => {
	let param = new FormData(); //创建form对象	
	param.append('type', params.type);
	param.append('area', params.area);
	return axios.post(`https://api.rls.danjiguanjia.com/api/v1/feedprice/searchMaterial`, param).then(res => res.data);
};
//价格行情首页->淘汰鸡数据
export const getChickenList = () => {
	return axios.get(`https://api.rls.danjiguanjia.com/api/v1/PriceMarketNav/getAllCronNav`).then(res => res.data);
}
//价格行情首页->淘汰鸡价格搜索  
//export const getChickenPrice = params => {
//	return axios.get(`https://api.dev.danjiguanjia.com/v1/price/getOutIndex`, {
//		params: params
//	}).then(res => res.data);
//};
export const getChickenPrice = params => {
	return axios.get(`https://api.rls.danjiguanjia.com/api/v1/price/getOutIndex`, {
		params: params
	}).then(res => res.data);
};
//鸡蛋主产区价格曲线数据  
export const eggMouthPrice = params => {
	return axios.get(`https://api.danjiguanjia.com/v2/price/eggMouthPrice`, {
		params: params
	}).then(res => res.data);
};
//鸡蛋主销区价格曲线数据 
export const getBazaarMonthPrice = params => {
	return axios.get(`https://api.danjiguanjia.com/v2/sales/getBazaarMonthPrice`, {
		params: params
	}).then(res => res.data);
};
//原料价格曲线数据  
export const feedMouthPrice = params => {
	return axios.get(`https://api.danjiguanjia.com/v6/feedprice/mouthPrice`, {
		params: params
	}).then(res => res.data);
};
//淘汰鸡价格曲线数据
export const cullMouthPrice = params => {
	return axios.get(`https://api.danjiguanjia.com/v6/price/outMonthPrice`, {
		params: params
	}).then(res => res.data);
};
//主产区鸡蛋价格表格数据
//export const getZhuTableList = params => {
//	return axios.get(`https://api.dev.danjiguanjia.com/v1/price/search`, {
//		params: params
//	}).then(res => res.data);
//};
export const getZhuTableList = params => {
	return axios.get(`https://api.rls.danjiguanjia.com/api/v1/PriceSearch/search`, {
		params: params
	}).then(res => res.data);
};
//获取每个图表数据下的新闻标题
export const getChartNew = params => {
	return axios.get(`https://api.rls.danjiguanjia.com/api/v1/PriceMarketNav/getPriceMarketTitle`, {
		params: params
	}).then(res => res.data);
};
//新版蛋价查询 获取主产区地址数据
export const getAllProdNav = () => {
	return axios.get(`https://api.rls.danjiguanjia.com/v1/Pricemarket/getAllProdNav`).then(res => res.data);
}
//新版价格行情淘汰鸡图表数据
export const getCullData = params => {
	return axios.get(`https://api.rls.danjiguanjia.com/api/v1/price/getOutIndex`, {
		params: params
	}).then(res => res.data);
};
//获取新版的价格行情搜索首页的接口
export const getProdEggPrice = params => {
	let param = new FormData(); //创建form对象	
	//	param.append('ticket', params.ticket);
	param.append('area', params.area);
	return axios.post(`https://api.rls.danjiguanjia.com/api/v1/PriceSearch/getProdEggPrice`, param).then(res => res.data);
};
//获取新版表格数据
export const getMarList = params => {
	let param = new FormData(); //创建form对象	
	param.append('type', params.type);
	param.append('area', params.area);
	return axios.post(`https://api.rls.danjiguanjia.com/api/v1/feedprice/searchMaterial`, param).then(res => res.data);
};

//获取定位后的城市
export const getCitys = params => {
	return axios.get(`https://app.jianong.com/api/ips/getRegion`, qs.stringify(params)).then(res => res.data);
};
//获取主产区和主销区的就近城市  type为0主产  type为1是主销
export const getChanquAddress = params => {
	return axios.get(`https://api.dev.danjiguanjia.com/api/v1/PriceSearch/getIndex`, {
		params: params
	}).then(res => res.data);
};


const three_path='https://api.dev.danjiguanjia.com/'
const three_version='api/v2/PriceSearch/'
//第三版价格行情改版相关接口 
export const getDefaultArea = params => {
	let param = new FormData(); //创建form对象	
	param.append('ticket', params.ticket);
	param.append('lonlat', params.lonlat);
	return axios.post(`${three_path}${three_version}getDefaultArea`, param).then(res => res.data);
};
//首页鸡蛋的平均价格 https://api.dev.danjiguanjia.com/api/v2/PriceSearch/getIndexPrice
export const getIndexPrice = params => {
	let param = new FormData(); //创建form对象	
	param.append('area', params.area);
	return axios.post(`${three_path}${three_version}getIndexPrice`, param).then(res => res.data);
};
//首页注销区价格 
export const daySaleEggPrice = params => {
	let param = new FormData(); //创建form对象	
	param.append('ticket', params.ticket);
	return axios.post(`${three_path}${three_version}daySaleEggPrice`, param).then(res => res.data);
};
//主销区列表 
export const daySaleEggPriceList = params => {
	let param = new FormData(); //创建form对象	
	param.append('ticket', params.ticket);
	return axios.post(`${three_path}${three_version}daySaleEggPriceList`, param).then(res => res.data);
};
//主销区价格详情
export const daySaleEggPriceDetail = params => {
	let param = new FormData(); //创建form对象	
	param.append('ticket', params.ticket);
	param.append('area', params.area);
	param.append('day', params.day);
	return axios.post(`${three_path}${three_version}daySaleEggPriceDetail`, param).then(res => res.data);
};
//首页本地鸡蛋价格曲线
export const getIndexPriceDetail = params => {
	let param = new FormData(); //创建form对象	
	param.append('ticket', params.ticket);
	param.append('area', params.area);
	param.append('day', params.day);
	return axios.post(`${three_path}${three_version}getIndexPriceDetail`, param).then(res => res.data);
};
//首页本地原料价格曲线
export const materialDayAvgPriceDetail = params => {
	let param = new FormData(); //创建form对象	
	param.append('ticket', params.ticket);
	param.append('area', params.area);
	param.append('day', params.day);
	return axios.post(`${three_path}${three_version}materialDayAvgPriceDetail`, param).then(res => res.data);
};
//首页全国鸡蛋价格曲线
export const allDayEggAvgPrice = params => {
	let param = new FormData(); //创建form对象	
	param.append('ticket', params.ticket);
	param.append('day', params.day);
	return axios.post(`${three_path}${three_version}allDayEggAvgPrice`, param).then(res => res.data);
};
//首页全国原料价格曲线
export const allDayAvgPrice = params => {
	let param = new FormData(); //创建form对象	
	param.append('ticket', params.ticket);
	param.append('day', params.day);
	return axios.post(`${three_path}${three_version}allDayAvgPrice`, param).then(res => res.data);
};
//首页联动效果
export const getNewAllProdNav = params => {
	let param = new FormData(); //创建form对象	
	param.append('ticket', params.ticket);
	return axios.post(`${three_path}${three_version}getAllProdNav`, param).then(res => res.data);
};
//预测
export const eggPricePorecast = params => {
	let param = new FormData(); //创建form对象	
	param.append('ticket', params.ticket);
	param.append('area', params.area);
	return axios.post(`https://api.dev.danjiguanjia.com/api/v1/PriceSearch/predict`, param).then(res => res.data);
};
//鸡蛋及淘汰鸡周边地区
export const aroundAreaEggPrice = params => {
	let param = new FormData(); //创建form对象	
	param.append('ticket', params.ticket);
	param.append('area', params.area);
	param.append('type', params.type);
	return axios.post(`${three_path}${three_version}aroundAreaEggPrice`, param).then(res => res.data);
};
//淘汰鸡曲线数据
export const outChickenDayAvgPriceDetail = params => {
	let param = new FormData(); //创建form对象	
	param.append('ticket', params.ticket);
	param.append('area', params.area);
	param.append('day', params.day);
	return axios.post(`${three_path}${three_version}outChickenDayAvgPriceDetail`, param).then(res => res.data);
};
//周边地区原料价格
export const aroundAreaMaterialPrice = params => {
	let param = new FormData(); //创建form对象	
	param.append('ticket', params.ticket);
	param.append('area', params.area);
	param.append('type', params.type);
	return axios.post(`${three_path}${three_version}aroundAreaMaterialPrice`, param).then(res => res.data);
};
//首页新闻列表
export const getPriceMarketArticle = params => {
	let param = new FormData(); //创建form对象	
	param.append('ticket', params.ticket);
	return axios.post(`${three_path}${three_version}getPriceMarketArticle`, param).then(res => res.data);
};
//销区的三级导航   http://api.dev.danjiguanjia.com/api/v2/pricesearch/saleH5Area
export const saleH5Area = params => {
	return axios.get(`https://api.dev.danjiguanjia.com/api/v2/pricesearch/saleH5Area`, {
		params: params
	}).then(res => res.data);
};
//搜索页面热门地区 以及历史地区  https://api.dev.danjiguanjia.com/api/v2/PriceSearch/searchHotAndHistoryArea
export const searchHotAndHistoryArea = params => {
	let param = new FormData(); //创建form对象	
	param.append('ticket', params.ticket);
	return axios.post(`${three_path}${three_version}searchHotAndHistoryArea`, param).then(res => res.data);
};
//建价格行情首页反馈 
export const areaPriceFeedback = params => {
	let param = new FormData(); //创建form对象	
	param.append('ticket', params.ticket);
	param.append('area', params.area);
	param.append('content', params.content);
	param.append('type', params.type);
	return axios.post(`${three_path}${three_version}areaPriceFeedback`, param).then(res => res.data);
};
//反馈之前判断是够有反馈过  https://api.dev.danjiguanjia.com/api/v2/PriceSearch/isAreaFeekback
export const isAreaFeekback = params => {
	let param = new FormData(); //创建form对象	
	param.append('ticket', params.ticket);
	param.append('area', params.area);
	param.append('type', params.type);
	return axios.post(`${three_path}${three_version}isAreaFeekback`, param).then(res => res.data);
};
//在搜索完成后添加到历史地区  https://api.rls.danjiguanjia.com/api/v2/PriceSearch/searchCallBack
export const searchCallBack = params => {
	let param = new FormData(); //创建form对象	
	param.append('ticket', params.ticket);
	param.append('area', params.area);
	return axios.post(`${three_path}${three_version}searchCallBack`, param).then(res => res.data);
};
//点击预测提交预测数据
export const newToPredict = params => {
	let param = new FormData(); //创建form对象	
	param.append('ticket', params.ticket);
	param.append('area', params.area);
	param.append('predict', params.predict);
	return axios.post(`https://api.dev.danjiguanjia.com/api/v1/task/toPredict`, param).then(res => res.data);
};
