<template>
	<div class="egg-price">
		<tab v-model="$store.state.egg_price.type">
			<tab-item @on-item-click="chanClick()">产区</tab-item>
			<tab-item @on-item-click="xiaoClick()">销区</tab-item>
		</tab>
		<sale-address></sale-address>
		<div style="margin: 10px 15px;">
			<div v-if="new_rose>0">最新报价: <span style="color: #D0021B;">{{new_price}}</span> <img class="arrow" src="../../assets/up.png" alt="" /></div>
			<div v-else-if="new_rose==0">最新报价: {{new_price}} <img class="arrow-ping" src="../../assets/ping.png" alt="" /></div>
			<div v-else>最新报价: <span style="color: #57b663;">{{new_price}}</span> <img class="arrow" src="../../assets/down.png" alt="" /></div>
		</div>
		<x-table :cell-bordered="false" :content-bordered="false">
			<thead>
				<tr class="table-title">
					<th>地区</th>
					<th>鸡蛋价格(元/斤)</th>
					<th>涨跌幅(元/斤)</th>
				</tr>
			</thead>
			<tbody>
				<template v-for="(data,index) in price_data">
					<tr :class="{'active-table':index%2!=0}" style="height: 35px;line-height: 35px;">
						<td>{{ data.name }}</td>
						<td>{{ data.price }}</td>
						<td><span :class="data.gains>0?'theme-color-red':'theme-color'" :style="{color:data.gains == 0?'#333':false}">{{ data.gains}}</span></td>
					</tr>
				</template>
			</tbody>
		</x-table>
		<div v-if="near_list.length>0">
			<h2 class="near-city" v-if="$store.state.egg_price.type!=1">周边地区蛋价</h2>
			<x-table :cell-bordered="false" v-if="$store.state.egg_price.type!=1">
				<thead>
					<tr class="table-title">
						<th>地区</th>
						<th>鸡蛋价格(元/斤)</th>
						<th>涨跌幅(元/斤)</th>
					</tr>
				</thead>
				<tbody>
					<template v-for="(data,index) in near_list">
						<tr :class="{'active-table':index%2!=0}" style="height: 35px;line-height: 35px;">
							<td>{{ data.name }}</td>
							<td>{{ data.price }}</td>
							<td><span :class="data.gains>0?'theme-color-red':'theme-color'" :style="{color:data.gains == 0?'#333':false}">{{ data.gains.toFixed(2) }}</span></td>
						</tr>
					</template>
				</tbody>
			</x-table>

			<template v-if="near_list.length == 0 && $store.state.egg_price.type!=1" style="text-align: center;padding: 20px 0;">
				<img src="https://api.danjiguanjia.com/public/image/sorry.png" class="empty-data" />
				<load-more tip="暂无数据" :show-loading="false" background-color="#fbf9fe"></load-more>
			</template>
		</div>
		<div class="h60"></div>
		<div class="tab fix-boxs">
			<div class="tab-item" @click="eggPriceClick">
				<img src="../../assets/no_price.png" class="price-icon" alt="" /><br />
				<span @click="yuceClick">价格曲线</span>
			</div>
			<router-link to="/p/price-forecast">
				<div class="price-forecast-fixed">预测</div>
			</router-link>
			<div class="tab-item selected">
				<img src="../../assets/cllck_table.png" class="price-table" alt="" /><br />
				<span @click="eggEarchtClick">表格详情</span>
			</div>
		</div>
		<div class="mask" v-if="is_search_focus"></div>
	</div>
</template>

<script>
	import { Search, Group, Cell, XButton, XTable, LoadMore, ButtonTab, ButtonTabItem, XAddress, ChinaAddressV3Data, dateFormat, Popup, Tab, TabItem } from 'vux'
	import SaleAddress from './NewSaleAddress'
	import ProducingArea from './ProducingArea'
	import 'vue-awesome/icons/map-marker'
	import Icon from 'vue-awesome/components/Icon'
	import { userAction } from '../../api/api'
	import { search, getZhuTableList, getSaleSearch, getDayEggPrice, getSaleSearchList, linkageAddress } from '../../api/EggPrice'
	//匹配汉字
	var regZH = new RegExp("[\\u4E00-\\u9FFF]+", "g");
	export default {
		components: {
			Search,
			Group,
			Cell,
			XButton,
			XTable,
			LoadMore,
			ButtonTab,
			XAddress,
			Icon,
			ProducingArea,
			SaleAddress,
			ButtonTabItem,
			Popup,
			Tab,
			TabItem
		},
		data() {
			return {
				price_data: [],
				results: [{
					title: ''
				}],
				search_text: '',
				is_search_focus: false, //因app不需要展示header,在下面会做判断
				update_time: '',
				egg_chart: true, //因app不需要展示搜索框,在下面会做判断
				city_name: '',
				near_list: [],
				new_price: '',
				new_rose: '',
			}
		},
		mounted() {
			this.$store.state.header.title = '鸡蛋价格行情';
			this.$store.state.price_type = 0;
			this.menu();
			//判断是不是在蛋鸡管家app中
			var ua = navigator.userAgent.toLowerCase();
			if(ua.indexOf('djgj_jn') > -1) {
				//如果在app中 那么header 搜索框 都隐藏
				this.$store.state.header.is_show_header = false;
				this.egg_chart = false;
				if(this.$route.query.ticket != undefined) this.$store.state.ticket = this.$route.query.ticket;
			}
			userAction({
				ticket: this.$store.state.ticket,
				module: 154,
				cur_version: this.$store.state.cur_version
			})
			this.init();
		},
		watch: {
			'$store.state.egg_price': {
				handler: function() {
					this.init();
				},
				deep: true
			}
		},
		methods: {
			toResult() {
				//				this.$router.push('/p/new-eggchart')
			},
			eggPriceClick() {
				this.$router.push('/p/new-eggchart')
			},
			menu() {
				window.scrollTo(0, 0);
			},
			init() {
				this.$vux.loading.show({
					text: '数据加载中...'
				})
				//获取当前时间
				var d = new Date();
				var str = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
				this.price_data = [];

				if(typeof this.$route.query.address != 'undefined') {
					this.$store.state.zhuchan_area = this.$route.query.address
					this.$store.state.egg_price.area = this.$route.query.address;
				}
				if(typeof this.$route.query.type != 'undefined') {
					this.$store.state.egg_price.type = parseInt(this.$route.query.type)
				}

				//判断是主产区还是主销区
				if(this.$store.state.egg_price.type == 0) {
					if(this.$route.query.num != undefined) {
						this.$store.state.egg_price.area = this.$route.query.num
					}
					getZhuTableList({
						area: this.$store.state.egg_price.area,
						ticket: this.$store.state.ticket
					}).then(rs => {
						this.new_price = rs.data.search[0].price;
						this.new_rose = rs.data.search[0].gains;
						this.price_data = rs.data.search;
						this.update_time = rs.data.saveTime;
						this.near_list = rs.data.nearby;
						this.$vux.loading.hide();
					})
				} else {
					getSaleSearch({
						area: this.$store.state.egg_price.area
					}).then(rs => {
						this.price_data = rs.data;
						if(typeof(rs.data) != 'undefined') {
							if(rs.data[0].savetime != 'undefined') {
								this.update_time = rs.data[0].savetime;
							}
						}
						this.$vux.loading.hide();
					})
					getSaleSearchList({
						area: this.$store.state.egg_price.area
					}).then(res => {
						this.new_price = res.data[0].price;
						this.new_rose = res.data[0].gains;
					})
				}
				//微信分享
				var hello_str = encodeURIComponent(this.$store.state.egg_price.area)
				this.$wechat.ready(() => {
					var title = str + '全国各地鸡蛋、原料、淘汰鸡价格';
					var link = 'https://m.danjiguanjia.com/#/p/new-eggprice?address=' + hello_str + '&type=' + this.$store.state.egg_price.type;
					var imgUrl = 'https://api.danjiguanjia.com/public/icon120.png';
					this.$wechat.onMenuShareTimeline({
						title: title,
						link: link,
						imgUrl: imgUrl
					});
					this.$wechat.onMenuShareAppMessage({
						title: title,
						desc: '天天查价格,掌握最新价格行情信息',
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
			},
			yuceClick() {
				userAction({
					ticket: this.$store.state.ticket,
					module: 1514,
					cur_version: this.$store.state.cur_version
				})
			},
			eggEarchtClick() {
				userAction({
					ticket: this.$store.state.ticket,
					module: 1515,
					cur_version: this.$store.state.cur_version
				})
			},
			chanClick() {
				this.$router.push('/p/new-eggchart')
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
				this.$router.push('/p/new-eggchart')
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
				console.log(this.$store.state.egg_price.type)
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.vux-search-box {
		height: 100%;
	}
	
	.today-egg {
		text-align: center;
		color: #57b663;
		font-size: 1rem;
		padding-bottom: 0.5rem;
	}
	
	.vux-tap-active {
		width: 90%;
		background-color: #FFFFFF;
	}
	
	.select-type {
		width: 90%;
		margin: 15px auto;
	}
	
	.update-time {
		margin-bottom: 15px;
		text-align: center;
	}
	
	.egg-price {
		background: #FFFFFF;
		.h60 {
			height: 60px;
		}
		.weui-search-bar__box {
			padding: 2px 30px;
		}
		.weui-search-bar__box .weui-icon-search {
			top: 2px;
		}
		.weui-search-bar__label {
			top: 5.5px;
		}
		.mask {
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			height: 150vh;
			background: black;
			filter: alpha(Opacity=80);
			-moz-opacity: 0.5;
			opacity: 0.5;
		}
	}
	
	.fix-boxs {
		position: fixed;
		bottom: -2px;
		width: 100%;
		border-top: 1px solid #ddd;
	}
	
	.fix-box {
		position: fixed;
		bottom: -2px;
		width: 100%;
		/*border-top: 1px solid #ddd;*/
	}
	
	.tab {
		.tab-item {
			padding-top: 8px;
			color: #333333;
			width: 50%;
			text-align: center;
			line-height: 18px;
			height: 42px;
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
		/*padding-top: 5px;*/
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
	
	.near-city {
		text-align: center;
		margin: 20px 0;
		font-size: 18px;
		color: #57B663;
	}
	
	.empty-data {
		display: block;
		margin: 0 auto;
		margin-top: 40px;
	}
</style>