import axios from 'axios';
import config from './config';

let base = config.base_url;
//let base = 'https://api.danji.jianong.com';

/*
 *	秒杀接口
 *  
 * */

let seckill = '/v6/seckill/';

//商品详情页接口 getSeckillList
export const goodsDetail = params => {
	return axios.get(`${base}${seckill}/goodsDetail`, {
		params: params
	}).then(res => res.data);
};
//秒杀首页数据
export const getSeckillList = params => {
	return axios.get(`${base}${seckill}/getSeckillList`, {
		params: params
	}).then(res => res.data);
};
//秒杀场次
export const getSeckillTime = params => {
	return axios.get(`${base}${seckill}/getSeckillTime`, {
		params: params
	}).then(res => res.data);
};