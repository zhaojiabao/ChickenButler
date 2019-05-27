<template>
	<!--大部分页面的头部-->
	<div class="header" v-if="$store.state.header.is_show_header">
		<x-header :left-options="left_option" @on-click-back="clickBack" @on-click-title="clickTitle" :class="{'header-border':$store.state.header.border}">
			{{ this.$store.state.header.title }}
			<span v-if="new_search" @click="goSearchPage" style="display: inline-block;height: 18px;width: 18px;padding-top: 10px;position: absolute;top:-1px;right:5%;"><img style="width: 100%;" src="../../assets/search-icon.png" alt="" /></span>
			<a slot="right" class="right_header" @click="rightClick" v-show="$store.state.header.right_title != ''">{{ $store.state.header.right_title }} </a>
		</x-header>
	</div>
</template>

<script>
	import { XHeader, Popup } from 'vux'
	import { userInfo, userScore, getWeixinSign, userAction } from "../../api/api"
	//导入头部弹出图片
	import egg_price1 from '../../assets/egg_price.png'
	import egg_price2 from '../../assets/material_price.png'
	import egg_price3 from '../../assets/chicken_price.png'
	export default {
		components: {
			XHeader,
			Popup
		},
		data() {
			return {
				left_option: {
					preventGoBack: true,
					showBack: this.$store.state.header.showBack,
					backText: this.$store.state.header.backText
				},
				price_state: false,
				/*该属性代表弹窗是否出现*/
				access: ["EggPrice", "MaterialChart", "CullChickChart"],
				price_types: [{
					img: egg_price1,
					title: '鸡蛋价格查询'
				}, {
					img: egg_price2,
					title: '原料价格查询'
				}, {
					img: egg_price3,
					title: '淘汰鸡价格查询'
				}],
				return_index: ['Login', 'forum', 'managerview', 'banner-detail','EggIndex'],
				new_egg_list: ['NewEggPrice', 'NewEggChart', 'NewMaterialChart', 'NewMaterialPrice', 'NewCullChart', 'NewCullPrice','NewEggIndexPrice','EveryInfoDetail'],
				new_search: false
			}
		},
		mounted() {
			this.$store.state.header.title = '鸡蛋价格查询'
			
			this.$store.state.ticket = localStorage.getItem('ticket');
//			this.$store.state.ticket = sessionStorage.getItem('ticket');
			
			if(this.$store.state.ticket != null || this.$route.name!='EggIndex') this.getUserInfo();
			
			var ua = navigator.userAgent.toLowerCase();
			if(ua.match(/djgj_jn/) && this.$route.query.ticket != undefined) {
				this.$store.state.ticket = this.$route.query.ticket;
			}
			//判断是否在首页 如果在就删除header
			if(this.$route.name == "Index") {
				this.$store.state.header.is_show_header = false;
			}
			// 判断是否在蛋鸡管家中			
			if(ua.indexOf('djgj_jn') > -1) {
				this.$store.state.header.is_show_header = false;
				if(this.$route.query.ticket != undefined) this.$store.state.ticket = this.$route.query.ticket;
			}
			// 分割当前页面数组获取#号前的链接
			var url_arr = window.location.href.split("#");
			//微信配置
			getWeixinSign({
				url: url_arr[0]
			}).then(rs => {
				this.$wechat.config({
					debug: false,
					appId: rs.data.appId,
					timestamp: rs.data.timestamp,
					nonceStr: rs.data.nonceStr,
					signature: rs.data.signature,
					jsApiList: [
						'checkJsApi',
						'onMenuShareTimeline',
						'onMenuShareAppMessage',
						'onMenuShareQQ',
						'onMenuShareWeibo',
						'onMenuShareQZone'
					]
				});

				this.$wechat.error(function(res) {
					console.log(res);
				});
			})
			this.$store.state.header.right_title = "";

			//制作倒三角形
			var xheader = document.querySelector(".vux-header-title");
			if(this.access.indexOf(this.$route.name) > -1) {
				xheader.classList.add('title-after');
			} else {
				xheader.classList.remove('title-after');
			}
			this.getNowRouter();
		},
		watch:{
			'$route.name':'getNowRouter'
		},
		methods: {
			goSearchPage(){
				this.$router.push('/new-search')
			},
			getNowRouter() {
				if(this.new_egg_list.indexOf(this.$route.name) > -1) {
					this.new_search = true;
				}else{
					this.new_search = false;
				}
			},
			getUserInfo() {
				var params = {
					ticket: this.$store.state.ticket
				};
				userInfo(params).then(rs => {
					if(rs.data.real_name == "") rs.data.real_name = rs.data.mobile;
					this.$store.state.userInfo = rs.data;
				});
				userScore(params).then(rs => {
					this.$store.state.userInfo.score = rs.data.score;
				});
			},
			rightClick() {
				this.$router.push(this.$store.state.header.right_url);
				if(this.$store.state.header.right_url == '/p/myforum') {
					userAction({
						ticket: this.$store.state.ticket,
						module: 55,
						cur_version: this.$store.state.cur_version
					})
				}
			},
			//重写后退按钮
			clickBack() {
				//点击后退时,根据不同的路由name来判断返回到哪个页面
				var sear_ty = this.$store.state.search_type;
				if(this.$route.name == "PriceChart") {
					this.$router.push("/p/egg-price");
				} else if(this.access.indexOf(this.$route.name) > -1) {
					this.$router.push("/");
				} else if(this.return_index.indexOf(this.$route.name) > -1) {
					this.$router.push("/");
				} else if(this.$route.name == "ForumList") {
					this.$router.push("/p/forum");
				} else if(this.$route.name == "video-detail") {
					this.$router.push('/p/managerview')
				} else if(this.$route.name == "SearchResult" && sear_ty == 0) {
					this.$router.push('/p/egg-price')
				} else if(this.$route.name == "SearchResult" && sear_ty == 1) {
					this.$router.push('/p/material-chart')
				} else if(this.$route.name == "SearchResult" && sear_ty == 2) {
					this.$router.push('/p/cull-chick-chart')
				}
//				else if(this.new_egg_list.indexOf(this.$route.name) > -1){
//					this.$router.push('/p/new-egg-index-price')
//				}
				else if(this.$route.name=='NewSearchResult'&& sear_ty == 0){
					this.$router.push('/p/new-eggchart')
				}else if(this.$route.name=='NewSearchResult'&& sear_ty == 1){
					this.$router.push('/p/new-materialchart')
				}else if(this.$route.name=='NewSearchResult'&& sear_ty == 2){
					this.$router.push('/p/new-cullchart')
				} else if(window.location.href.indexOf('weixinshare')>-1){
					this.$router.push('/')
				} else if(this.$route.name=='EveryInfoDetail'){
					this.$router.push('/p/new-egg-index-price')
				}else if(this.$route.name=='NewEggIndexPrice'){
					this.$router.push('/')
				}else{
					this.$router.go(-1);
				}
			},
			//x-header点击title时触发的事件
			clickTitle() {
				if(this.access.indexOf(this.$route.name) > -1) {
					this.price_state = true;
				} else {
					this.price_state = false;
				}

			},
			//以下三个方法是分别点击popup时出现的弹框内容分别的点击事件
			eggPriceClick(index) {
				var path_name = '';
				switch(index) {
					case 0:
						userAction({
							ticket: this.$store.state.ticket,
							module: 151,
							cur_version: this.$store.state.cur_version
						})
						path_name = '/p/egg-price';
						break;
					case 1:
						userAction({
							ticket: this.$store.state.ticket,
							module: 152,
							cur_version: this.$store.state.cur_version
						})
						path_name = '/p/material-chart';
						break;
					case 2:
						userAction({
							ticket: this.$store.state.ticket,
							module: 153,
							cur_version: this.$store.state.cur_version
						})
						path_name = '/p/cull-chick-chart';
						break;
				}
				this.$router.push(path_name);
				this.$store.state.price_type = index;
				this.price_state = false;
			}
		}
	}
</script>

<style lang="less">
	ul:after {
		display: table;
		content: " ";
		clear: both;
	}
	
	.header {
		height: 47px;
		position: relative;
		z-index: 10000;
	}
	
	.header .vux-header {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		background: #FFFFFF;
		z-index: 99999;
	}
	
	.header-border {
		border-bottom: 1px solid #ddd;
	}
	
	.right_header {
		font-size: 1rem;
	}
	
	.popup_title {
		ul {
			width: 90%;
			margin: 0 auto;
			li {
				float: left;
				width: 31%;
				padding: 5% 1%;
				text-align: center;
				img {
					display: inline-block;
					width: 3rem;
					height: 3rem;
				}
				span {
					padding-top: 0.5rem;
					display: block;
					text-align: center;
				}
			}
		}
	}
	
	.title-after:after {
		width: 0;
		height: 0;
		content: "";
		position: absolute;
		top: 1.4rem;
		right: 27%;
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-top: 8px solid #57B663;
	}
</style>