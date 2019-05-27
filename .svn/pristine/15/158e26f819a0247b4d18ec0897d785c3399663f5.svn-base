import axios from 'axios';
import config from './config';

let base = config.base_url;
//let base = 'https://api.danji.jianong.com';

/*
 *	团购接口
 *  
 * */

let group = '/v6/Groupbuy/';

//商品详情页接口
export const goodsDetail = params => {
	return axios.get(`${base}${group}/goodsDetail`, {
		params: params
	}).then(res => res.data);
};