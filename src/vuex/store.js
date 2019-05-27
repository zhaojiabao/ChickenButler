import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 创建 store 实例
export default new Vuex.Store({
	state: {
		cur_version:'1.0',
		ticket:null,
		userInfo:{
			score:0
		},
		source_url_name:'',//当前路径名称
		//头部标题栏
		header: {
			title: '',
			showBack:true,
			backText:'',
			border:true,
			is_show_header:true,
			preventGoBack:false,
			right_title:'',
			right_url:''
		},
		//鸡蛋价格
		egg_price:{
			m_type:0,
			type:0,//0主产区，1主销区
			area:'河北',//地区
			value:[],// 地区数值
			egg_sale_area:'北京,北京市',
		},
		//主产区的地址
		zhuchan_area:'河北',
		sale_area:'北京,北京市',
		//原料的地址
		mater_area:'上海',
		
		chicken_area:'上海',
		material_area:'上海',
		//预测活动
		forecast:{
			rule:''
		},
		banner_url:'',
		news_selected_categroy:0,//当前选择的分类
		forum_selected_index:0,//论坛选择分类
		price_type:0,//价格类型分类
		my_forum_index:0,//我的论坛选择分类
		my_message_index:0,//我的消息选择分类
		chart_cdate:0,//年曲线登录后跳转到本页面
		search_type:0, //在搜索结果页判断返回到自己类型的首页
		price_default_index:0,//价格行情详情页的tab默认值
		info_xdate:[],//产区淘汰鸡原料详情页x轴数据
		info_ydate:[],//产区淘汰鸡原料详情页y轴数据
		info_title:'',//产区淘汰鸡原料详情页的题目
		info_unit:'',//产区淘汰鸡原料详情页的单位
		info_random:'',//根据随机数来设置是否重新绘图
		info_sale:'',//判断销区图表是否刷新
		product_area:'',//产区实际接口传值
		curr_area:'',//当前页面显示的第三级地址
	}
})