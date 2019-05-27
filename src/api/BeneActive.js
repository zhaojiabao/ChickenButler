import axios from 'axios';
import config from './config';
import qs from 'qs';

let base = config.base_url;
let base2 = config.test_url;

/*
 *	奖品列表 
 * */

let active = '/v6/Beneactive';
export const getGoods = params => {
	return axios.get(`${base}${active}/getGoods`, {
		//params: params
	}).then(res => res.data);
};
//是否能领取奖励
export const getUserPrize = params => {
	return axios.get(`${base}${active}/getUserPrize`, {
		params: params
	}).then(res => res.data);
};
//领取积分
export const addScores = params => {
	return axios.get(`${base}${active}/addScores`, {
		params: params
	}).then(res => res.data);
};

//领取实物
export const addPrize = params => {
	return axios.get(`${base2}${active}/addPrize`, {
		params: params
	}).then(res => res.data);
};

//领取实物
export const getPrize = params => {
	return axios.get(`${base2}${active}/addPrizes`, {
		params: params
	}).then(res => res.data);
};
//生产效益接口
export const addPrize_autumn = params => {
	return axios.get(`${base2}${active}/addPrize_autumn`, {
		params: params
	}).then(res => res.data);
};
//领取记录
export const getRecordLog = params => {
	return axios.get(`${base}${active}/getRecordLog`, {
		params: params
	}).then(res => res.data);
};

