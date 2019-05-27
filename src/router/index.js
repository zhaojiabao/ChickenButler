import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/common/layout' //公共组件

//const Login = r => require.ensure([], () => r(require('@/components/Login')), 'user_com')//登录页面
//const SanLogin = r => require.ensure([], () => r(require('@/views/login/SanLogin')), 'user_com')//第三方登录
//const FindPassword = r => require.ensure([], () => r(require('@/views/login/FindPassword')), 'user_com')//找回密码
//const Index = r => require.ensure([], () => r(require('@/components/Index')), 'user_com')//首页
import Index from '@/components/Index' //首页
import FindPassword from '@/views/login/FindPassword' //找回密码
import SanLogin from '@/views/login/SanLogin' //第三方登录
import Login from '@/components/Login' //登录页面
import Hello from '@/components/Hello'

//蛋价查询
import EggPrice from '@/components/EggPrice' //蛋价首页
import SearchResult from '@/views/eggprice/SearchResult' //搜索结果
import PriceForecast from '@/views/eggprice/Forecast-Price' //蛋价预测
import ForecastRecord from '@/views/eggprice/Forecast-Record' //预测记录
import ForecastActive from '@/views/eggprice/Forecast-Active' //预测活动
import PriceChart from '@/views/eggprice/Chart-Price' //价格曲线
import MaterialChart from '@/views/eggprice/Chart-Material' //原料曲线
import CullChickChart from '@/views/eggprice/Chart-CullChick' //淘汰鸡曲线
import EggPriceSearch from '@/views/eggprice/EggPriceSearch' //egg查询页面

//蛋价新模块
import EggIndex from '@/components/EggIndex' //价格行情首页
import NewEggChart from '@/views/newegg/NewEggChart' //鸡蛋价格行情曲线数据 
import NewEggPrice from '@/views/newegg/NewEggPrice' //鸡蛋价格行情表格数据 
import NewMaterialChart from '@/views/newegg/NewMaterialChart' //原料价格行情曲线数据  
import NewMaterialPrice from '@/views/newegg/NewMaterialPrice' //原料价格行情表格数据   
import NewCullChart from '@/views/newegg/NewCullChart' //淘汰鸡价格行情曲线数据    
import NewCullPrice from '@/views/newegg/NewCullPrice' //淘汰鸡价格行情表格数据    
import SearchIndex from '@/views/newegg/SearchIndex' //搜索首页  
import SearchChoose from '@/views/newegg/SearchChoose' //搜索选择页面  
import NewSearchResult from '@/views/newegg/NewSearchResult' //搜索结果页面  

//资讯
import News from '@/components/News'
import NewsDetail from '@/views/news/NewsDetail'

//论坛
import Forum from '@/components/Forum'
import PostDetail from '@/views/forum/PostDetail'
import ForumList from '@/views/forum/ForumList'
import MyForum from '@/views/forum/MyForum'
import MyMessage from '@/views/forum/MyMessage'
import CircleDetail from '@/views/forum/CircleDetail'
import PostCircleList from '@/views/forum/PostCircleList'
import PostContainer from '@/views/forum/PostContainer'
import BannerDetail from '@/views/news/BannerDetail'
import BuildCircle from '@/views/forum/BuildCircle'
import DelCircle from '@/views/forum/DelCircle'

//管家视界
import ManagerView from '@/components/ManagerView'
import BreedClass from '@/views/managerview/BreedClass'
import ChickenHouse from '@/views/managerview/ChickenHouse'
import Teacher from '@/views/managerview/Teacher'
import ShortVideo from '@/views/managerview/ShortVideo'
import VideoDetail from '@/views/managerview/VideoDetail'
import TeacherDetail from '@/views/managerview/TeacherDetail'
import ChickenDetail from '@/views/managerview/ChickenDetail'

//活动页面
import PB_coolSummer from '@/views/active/PB_coolSummer' //清凉一夏
import PB_autumn from '@/views/active/PB_autumn' //迎秋送暑
import PB_autumn_lotty from '@/views/active/PB_autumn_lotty' //迎秋送暑

//个人中心
import CooperationIndex from '@/views/personal/business/CooperationIndex' // 商业合作首页
import CooperationCompanyInfo from '@/views/personal/business/CooperationCompanyInfo' // 商家信息
import CooperationSuccess from '@/views/personal/business/CooperationSuccess' // 提交成功

//活动中心
import ActiveCenter from '@/components/ActiveCenter'
import MoreActive from '@/views/active/MoreActive'
import ActiveDetail from '@/views/news/ActiveDetail'
import GroupIndex from '@/views/group/GroupIndex'
import GroupGoodsDetail from '@/views/group/GoodsDetail'
import SeckillIndex from '@/views/seckill/SeckillIndex'
import SeckillGoodsDetail from '@/views/seckill/GoodsDetail'
import PreferenceDetail from '@/views/seckill/PreferenceDetail'

//第三版价格行情修改页面  
import NewEggIndexPrice from '@/components/NewEggIndexPrice'  //首页 
import EveryInfoDetail from '@/views/verynewegg/EveryInfoDetail'  //首页4个选项对应的详情 
import SaleList from '@/views/verynewegg/SaleList'  //首页点击销区查看详情后跳转的销区地区列表页 
import SaleDetail from '@/views/verynewegg/SaleDetail'  //销区详情  
import EggForecastIndex from '@/views/verynewegg/EggForecastIndex'  //蛋价预测页面  
import NewSearchPage from '@/views/verynewegg/NewSearchPage'  //点击搜索第一个跳转的页面

Vue.use(Router)

export default new Router({
	//mode: 'history',
	routes: [{
			path: '/',
			redirect:'/m/Main'
		}, {
			path: '/hello',
			name: 'Hello',
			component: Hello
		}, {
			path: '/new-search',
			name: 'NewSearchPage',
			component: NewSearchPage
		},{
			path: '/p',
			component: Layout,
			children: [{
					path: 'login',
					name: 'Login',
					component: Login
				}, {
					path: 'regist',
					name: 'regist',
					component: Login
				}, {
					path: 'sanlogin',
					name: 'sanlogin',
					component: SanLogin
				}, {
					path: 'findpassword',
					name: 'FindPassword',
					component: FindPassword
				}, {
					path: 'egg-price',
					name: 'EggPrice',
					component: EggPrice
				}, {
					path: 'search-result/:area',
					name: 'SearchResult',
					component: SearchResult
				}, {
					path: 'price-forecast',
					name: 'PriceForecast',
					component: PriceForecast
				}, {
					path: 'forecast-record',
					name: 'ForecastRecord',
					component: ForecastRecord
				}, {
					path: 'forecast-active',
					name: 'ForecastActive',
					component: ForecastActive
				}, {
					path: 'price-chart',
					name: 'PriceChart',
					component: PriceChart
				}, {
					path: 'price-chart/:cdate',
					name: 'PriceChartCdate',
					component: PriceChart
				}, {
					path: 'material-chart',
					name: 'MaterialChart',
					component: MaterialChart
				}, {
					path: 'cull-chick-chart',
					name: 'CullChickChart',
					component: CullChickChart
				},
				/*
				 * 价格行情第二版
				 * 各模块路由配置
				 */
				,
				{
					path: 'egg-index',
					name: 'EggIndex',
					component: EggIndex
				}, {
					path: 'new-eggprice',
					name: 'NewEggPrice',
					component: NewEggPrice
				}, {
					path: 'new-eggchart',
					name: 'NewEggChart',
					component: NewEggChart
				}, {
					path: 'new-materialchart',
					name: 'NewMaterialChart',
					component: NewMaterialChart
				}, {
					path: 'new-materialprice',
					name: 'NewMaterialPrice',
					component: NewMaterialPrice
				}, {
					path: 'new-cullchart',
					name: 'NewCullChart',
					component: NewCullChart
				}, {
					path: 'new-cullprice',
					name: 'NewCullPrice',
					component: NewCullPrice
				}, {
					path: 'search-index',
					name: 'SearchIndex',
					component: SearchIndex
				}, {
					path: 'search-choose/:search_area',
					name: 'SearchChoose',
					component: SearchChoose
				}, {
					path: 'new-search-result/:result_area',
					name: 'NewSearchResult',
					component: NewSearchResult
				},
				/*
				 * 价格行情第三版内容    
				 */
				{
					path: 'new-egg-index-price',
					name: 'NewEggIndexPrice',
					component: NewEggIndexPrice
				},{
					path: 'every-info-detail',
					name: 'EveryInfoDetail',
					component: EveryInfoDetail
				},{
					path: 'sale-list',
					name: 'SaleList',
					component: SaleList
				},{
					path: 'sale-detail/:sale_area',
					name: 'SaleDetail',
					component: SaleDetail
				},{
					path: 'egg-forecast-index',
					name: 'EggForecastIndex',
					component: EggForecastIndex
				},
				/**
				 * 团购模块
				 * @pages 商品详情    	  
				 */
				{
					path: 'group/goods-detail/:good_id',
					name: 'group-goods-detail',
					component: GroupGoodsDetail
				},
				/**
				 * banner详情
				 * @pages  
				 */
				{
					path: 'banner-detail/:ban_id',
					name: 'banner-detail',
					component: BannerDetail
				},
				/**
				 * 资讯模块
				 * @pages  资讯首页 	  
				 */
				{
					path: 'news',
					name: 'news',
					component: News
				},
				/**
				 * 资讯模块
				 * @pages 咨询详情页  
				 */
				{
					path: 'news/detail/:news_id',
					name: 'news-detail',
					component: NewsDetail
				},
				/**
				 *管家视界首页 
				 */
				{
					path: 'managerview',
					name: 'managerview',
					component: ManagerView
				},
				/**
				 * 管家视界
				 * 走进鸡场
				 */
				{
					path: 'chicken-house',
					name: 'chicken-house',
					component: ChickenHouse
				},
				/**
				 * 管家视界
				 * 养殖课堂
				 */
				{
					path: 'breed-class',
					name: 'breed-class',
					component: BreedClass
				},
				/**
				 * 管家视界
				 * 金牌名师
				 */
				{
					path: 'teacher',
					name: 'teacher',
					component: Teacher
				},
				/**
				 * 管家视界
				 * 短视频
				 */
				{
					path: 'short-video',
					name: 'short-video',
					component: ShortVideo
				},
				/**
				 * 管家视界
				 * 视频详情
				 */
				{
					path: 'video/detail/:video_id',
					name: 'video-detail',
					component: VideoDetail
				},
				/**
				 * 管家视界
				 * 讲师详情
				 */
				{
					path: 'teacher/detail/:teacher_id',
					name: 'teacher-detail',
					component: TeacherDetail
				},
				/**
				 * 管家视界
				 * 鸡场详情
				 */
				{
					path: 'chickend/detail/:chicken_id',
					name: 'chicken-detail',
					component: ChickenDetail
				},
				/**
				 * 论坛模块
				 * @pages 帖子详情     
				 */
				{ // 帖子详情
					path: 'forum/post-detail/:post_id',
					name: 'post-detail',
					component: PostDetail
				},
				/**
				 * 论坛模块
				 * @pages 帖子列表 
				 */
				{
					path: 'forum-list/:index',
					name: 'ForumList',
					component: ForumList
				},
				/**
				 * 论坛模块
				 * @pages 我的论坛	  
				 */
				{
					path: 'myforum',
					name: 'myforum',
					component: MyForum
				},
				/**
				 * 论坛模块
				 * @pages 我的消息	  CircleDetail
				 */
				{
					path: 'mymessage',
					name: 'mymessage',
					component: MyMessage
				},
				/**
				 * 论坛模块
				 * @pages 圈子列表	  
				 */
				{
					path: 'circle/detail/:circle_id',
					name: 'circle-detail',
					component: CircleDetail
				},
				/**
				 * 论坛模块
				 * @pages 创建圈子	
				 */
				{
					path: 'buildcircle',
					name: 'buildcircle',
					component: BuildCircle
				},
				/**
				 * 论坛模块
				 * @pages 删除圈子
				 */
				{
					path: 'delcircle/:delcircle_id',
					name: 'DelCircle',
					component: DelCircle
				},
				/**
				 * 个人中心商业合作
				 * @pages 首页    企业信息 	  
				 */
				{
					path: 'cooperation-index',
					name: 'CooperationIndex',
					component: CooperationIndex
				},
				{
					path: 'cooperation-company-info',
					name: 'CooperationCompanyInfo',
					component: CooperationCompanyInfo
				},
				{
					path: 'cooperation-success/:id',
					name: 'CooperationSuccess',
					component: CooperationSuccess
				},
				/**
				 * 论坛模块
				 * @pages 论坛首页
				 */
				{
					path: 'forum',
					name: 'forum',
					component: Forum
				},
				/**
				 * 论坛模块
				 * @pages 发帖
				 */
				{
					path: 'post/container/:type/:circle_id',
					name: 'post-container',
					component: PostContainer
				},
				/**
				 * 论坛模块
				 * @pages 发帖前圈子的列表 
				 */
				{
					path: 'postcircleList/:type',
					name: 'postcircleList',
					component: PostCircleList
				},
				/**
				 * 蛋价模块
				 * @pages  egg查询页面MaterialPriceSearch.vue
				 */
				{
					path: 'eggpricesearch',
					name: 'EggPriceSearch',
					component: EggPriceSearch
				},
				/**
				 * 活动中心
				 * @pages  首页 	
				 */
				{
					path: 'activecenter',
					name: 'ActiveCenter',
					component: ActiveCenter
				},
				/**
				 * 活动中心
				 * @pages  更多活动 ActiveDetail
				 */
				{
					path: 'moreactive',
					name: 'MoreActive',
					component: MoreActive
				},
				/**
				 * 活动中心
				 * @pages  活动详情页  GroupIndex.vue
				 */
				{
					path: 'active-detail/:active_id',
					name: 'ActiveDetail',
					component: ActiveDetail
				},
				/**
				 * 活动中心
				 * @pages  团购首页  GroupIndex
				 */
				{
					path: 'groupindex',
					name: 'GroupIndex',
					component: GroupIndex
				},
				/**
				 * 活动中心
				 * @pages 秒杀模块  商品详情    	  
				 */
				{
					path: 'seckill/goods-detail/:time_id/:good_id',
					name: 'seckill-goods-detail',
					component: SeckillGoodsDetail
				},
				//特惠详情  
				{
					path: 'preference-detail/:time_id/:good_id',
					name: 'preference-detail',
					component: PreferenceDetail
				},
				/**
				 * 活动中心
				 * @pages 秒杀模块  秒杀首页    	  
				 */
				{
					path: 'seckillindex',
					name: 'SeckillIndex',
					component: SeckillIndex
				}
			]
		}, {
			path: '/cool-summer',
			name: 'CoolSummer',
			component: PB_coolSummer
		}, {
			path: '/autumn',
			name: 'PBAutumn',
			component: PB_autumn_lotty
		},
		//		{
		//			path: '/pb_autumn',
		//			name: 'PB_autumn_lotty',
		//			component: PB_autumn_lotty
		//		},
		{
			path: '/active',
			name: 'PB_autumn',
			component: PB_autumn
		}
	]
})