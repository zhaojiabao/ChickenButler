import axios from 'axios';
import http from './config';
import qs from 'qs';

let base = http.base_url;
let base2 = http.test_url;
let config = {
	headers: {
		'Content-Type': 'multipart/form-data'
	}
};
//banner获取地址
export const goodList = params => {
	return axios.get(`${base}/active/Index/goodlist`, {
		params: params
	}).then(res => res.data);
};

//活动具体数目和内容
export const activeInfo = params => {
	return axios.get(`https://www.danjiguanjia.com/api/news/getIndexActive`, {
		params: params
	}).then(res => res.data);
};



