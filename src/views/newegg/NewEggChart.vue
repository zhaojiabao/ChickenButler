<template>
	<!--蛋价曲线-->
	<div class="price-chart">
		<tab v-model="$store.state.egg_price.type">
			<tab-item @on-item-click="chanClick()">产区</tab-item>
			<tab-item @on-item-click="xiaoClick()">销区</tab-item>
		</tab>
		<sale-address></sale-address>
		<div class="price-new" style="margin: 10px 0 10px 15px;">
			<span v-if="new_rose>0">最新报价: <span style="color: #D0021B;">{{new_price.toFixed(2)}}</span> <img class="arrow" src="../../assets/up.png" alt="" /></span>
			<span v-else-if="new_rose==0">最新报价: {{new_price.toFixed(2)}} <img class="arrow-ping" src="../../assets/ping.png" alt="" /></span>
			<span v-else>最新报价: <span style="color: #57b663;">{{new_price.toFixed(2)}}</span> <img class="arrow" src="../../assets/down.png" alt="" /></span>
			<span class="type-name" @click="clickSelect">{{type_name}}</span>
		</div>
		<div class="price-company">单位:元 / 斤</div>
		<iframe width="100%" border="no" :src="url" class="ifr-egg-price" style="margin-bottom: 10px;"></iframe>
		<div class="egg-chart-article" v-for="(egg,index) in egg_new_list" @click="eggNewClick(egg.url)">
			{{egg.title}}
		</div>
		<div class="tab fix-box">
			<div class="tab-item selected">
				<img src="../../assets/click_price.png" class="price-icon" alt="" /><br />
				<span>价格曲线</span>
			</div>
			<router-link to="/p/price-forecast">
				<div class="price-forecast-fixed">预测</div>
			</router-link>
			<div class="tab-item" @click="eggChartClick">
				<img src="../../assets/no_table.png" class="price-table" alt="" /><br />
				<span>表格详情</span>
			</div>
		</div>
		<actionsheet v-model="egg_chart_choose" :menus="egg_chart_list" @on-click-menu="clickhaha"></actionsheet>
	</div>
</template>

<script>
	import { ButtonTab, ButtonTabItem, XAddress, Group, Actionsheet, Tab, TabItem } from 'vux'
	import { userAction } from '../../api/api'
	import SaleAddress from './NewSaleAddress'
	import ProducingArea from './ProducingArea'
	import { eggMouthPrice, getChartNew, getDayEggPrice, getBazaarMonthPrice, getChanNav } from '../../api/EggPrice'

	let base = "https://api.danjiguanjia.com/map/chart/price/";
	let cdate_arr = ['m', 'q', 'y'];
	export default {
		components: {
			ProducingArea,
			SaleAddress,
			ButtonTab,
			ButtonTabItem,
			XAddress,
			Group,
			Actionsheet,
			Tab,
			TabItem
		},
		data() {
			return {
				cdate: 0,
				url: '',
				egg_chart_choose: false,
				egg_chart_list: {
					0: '月',
					1: '季',
					2: '年'
				},
				type_name: '月',
				new_price: 0.00,
				new_rose: '',
				egg_new_title: '',
				egg_new_id: '',
				egg_new_list: []
			}
		},
		watch: {
			'cdate': 'init',
			'$store.state.egg_price': {
				handler: function() {
					this.init()
				},
				deep: true
			}
		},
		mounted() {
			this.menu();
			this.$store.state.header.title = '鸡蛋价格行情';
			if(this.$route.params.cdate != undefined) {
				this.cdate = parseInt(this.$route.params.cdate);
			}
			if(typeof this.$route.query.address != 'undefined') {
				this.$store.state.zhuchan_area = this.$route.query.address
				this.$store.state.egg_price.area = this.$route.query.address;
			}
			if(typeof this.$route.query.type != 'undefined') {
				this.$store.state.egg_price.type = parseInt(this.$route.query.type)
			}
			this.init();
			userAction({
				ticket: this.$store.state.ticket,
				module: 15155,
				cur_version: this.$store.state.cur_version
			})
			getChartNew({
				type_id: 1
			}).then(res => {
				this.egg_new_list = res.data;
				console.log(res.data)
			})
		},
		methods: {
			eggChartClick() {
				this.$router.push('/p/new-eggprice')
			},
			eggNewClick(id) {
				this.$router.push('/p/news/detail/' + id)
			},
			menu() {
				window.scrollTo(0, 0);
			},
			clickSelect() {
				this.egg_chart_choose = true
			},
			clickhaha(menuKey) {
				this.cdate = menuKey;
				if(menuKey == 0) {
					this.type_name = '月'
				} else if(menuKey == 1) {
					this.type_name = '季'
				} else {
					this.type_name = '年'
				}
			},
			init() {
				let cdate = cdate_arr[this.cdate];
				//判断是否是年价格曲线并且有没有通行证,如果没有就跳转到登录页面			
				if(this.cdate == 2 && this.$store.state.ticket == null) {
					this.$store.state.chart_cdate = 2;
					this.$vux.toast.text('请登录后查看鸡蛋年价格曲线!');
					this.$router.push('/p/login');
				}
				if(typeof this.$route.query.address != 'undefined') {
					this.$store.state.egg_price.area = this.$route.query.address;
				}
				if(this.$route.query.num != undefined) {
					this.$store.state.egg_price.area = this.$route.query.num
				}
				if(typeof this.$route.query.type != 'undefined') {
					this.$store.state.egg_price.type = parseInt(this.$route.query.type)
				}
				this.url = `${base}type/${this.$store.state.egg_price.type}/area/${this.$store.state.egg_price.area}/date/${cdate}`;
				if(this.$store.state.egg_price.type == 0) {
					eggMouthPrice({
						area: this.$store.state.egg_price.area
					}).then(res => {
						this.new_price = parseFloat(res.data.price[29])
						this.new_rose = res.data.price[29] - res.data.price[28]
					})
				} else {
					getBazaarMonthPrice({
						area: this.$store.state.egg_price.area
					}).then(res => {
						this.new_price = parseFloat(res.data.price[29])
						this.new_rose = res.data.price[29] - res.data.price[28]
					})
				}
				var d = new Date();
				var str = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
				var hello_str = encodeURIComponent(this.$store.state.egg_price.area)
				var links = 'https://m.danjiguanjia.com/#/p/new-eggchart?address=' + hello_str + '&type=' + this.$store.state.egg_price.type;
				this.$wechat.ready(() => {
					var title = str + '全国各地 鸡蛋、原料、淘汰鸡价格';
					var link = links;
					var imgUrl = 'https://api.danjiguanjia.com/public/icon120.png';
					this.$wechat.onMenuShareTimeline({
						title: title,
						link: link,
						imgUrl: imgUrl
					});
					this.$wechat.onMenuShareAppMessage({
						title: title,
						desc: '蛋价曲线了解最新行情动态',
						link: link,
						imgUrl: imgUrl
					});
					this.$wechat.onMenuShareQQ({
						title: title,
						link: link,
						imgUrl: imgUrl
					});
					this.$wechat.onMenuShareWeibo({
						title: title,
						link: link,
						imgUrl: imgUrl
					});
				});
				console.log(this.$store.state.egg_price.area)
			},
			chanClick() {
				if(this.$route.name == "PriceChart") {
					userAction({
						ticket: this.$store.state.ticket,
						module: 15151,
						cur_version: this.$store.state.cur_version
					})
				} else {
					userAction({
						ticket: this.$store.state.ticket,
						module: 1511,
						cur_version: this.$store.state.cur_version
					})
				}
			},
			xiaoClick() {
				if(this.$route.name == "PriceChart") {
					userAction({
						ticket: this.$store.state.ticket,
						module: 15152,
						cur_version: this.$store.state.cur_version
					})
				} else {
					userAction({
						ticket: this.$store.state.ticket,
						module: 1512,
						cur_version: this.$store.state.cur_version
					})
				}
			}
		}
	}
</script>

<style lang="less">
	@theme-color: #56b563;
	.scroller-mask {
		background-color: red;
		display: none;
	}
	
	.scroller-indicator {
		background-color: rgba(0, 0, 0, 0.1);
	}
	
	.price-chart {
		background: #FFFFFF;
		padding-bottom: 70px;
		.ifr-egg-price {
			border: none;
			height: 65vh;
		}
		.select-date {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			.vux-button-group {
				a {
					height: 45px;
					line-height: 46px;
				}
				a.vux-button-tab-item-first {
					border-radius: 0;
					&:after {
						border-radius: 0;
						border: none;
						border-top: 1px solid @theme-color;
						border-right: 1px solid @theme-color;
					}
				}
				a.vux-button-tab-item-last {
					border-radius: 0;
					&:after {
						border-radius: 0;
						border: none;
						border-top: 1px solid @theme-color;
						border-left: 1px solid @theme-color;
					}
				}
				a.vux-button-tab-item-middle:after {
					border: none;
					border-top: 1px solid @theme-color;
				}
			}
		}
	}
	
	.fix-box {
		position: fixed;
		bottom: -2px;
		width: 100%;
		border-top: 1px solid #ddd;
	}
	
	.tab {
		.tab-item {
			padding-top: 5px;
			color: #333333;
			width: 50%;
			text-align: center;
			line-height: 20px;
			height: 50px;
			float: left;
			background: #fff;
			font-size: 14px;
		}
		.tab-item.selected {
			color: #57b663;
			background: #fff;
			border-top: none;
		}
	}
	
	.price-icon {
		display: inline-block;
		width: 24px;
		height: 15px;
	}
	
	.price-table {
		display: inline-block;
		width: 18px;
		height: 15px;
	}
	
	.price-forecast-fixed {
		bottom: 0;
		left: 42%;
		width: 60px;
		height: 60px;
		position: fixed;
		border-radius: 30px;
		background: #57B663;
		line-height: 60px;
		text-align: center;
		z-index: 1000;
		color: #FFF;
	}
	
	.arrow {
		display: inline-block;
		height: 10px;
		width: 8px;
	}
	
	.price-new {
		margin-left: 15px;
	}
	
	.price-company {
		margin-top: 15px;
		margin-left: 15px;
		font-family: PingFangSC-Regular;
		font-size: 10px;
		color: #999999;
	}
	
	.type-name {
		float: right;
		padding-right: 10%;
		color: #57b663;
	}
</style>