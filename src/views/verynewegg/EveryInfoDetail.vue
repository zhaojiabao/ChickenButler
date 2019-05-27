<template>
	<div class="every-detail">
		<div class="detail-main-title common-margin-lr">
			<tab>
				<tab-item v-for='(item,index) in tab_list' :key='index' :selected="$store.state.price_default_index == index" @on-item-click="clickTab(item,index)">{{item}}</tab-item>
			</tab>
			<div class="title-back">
				<p v-text="day_unit"></p>
				<template v-if="day_price!=0">
					<p>{{day_price}}
						<span v-if="day_gains>0"><img src="../../assets/white-jian-up.png" class="upanddown" alt="" /> {{day_gains}}</span>
						<span v-else-if="day_gains==0"><img src="../../assets/white-jian-flat.png" class="ping" alt="" /></span>
						<span v-else><img src="../../assets/white-jian-down.png" class="upanddown" alt="" /> {{day_gains*-1}}</span>
					</p>
				</template>
				<template v-else>
					<p>
						待报价
					</p>
				</template>
				<x-address :title="title" style='' @on-hide="logHide" v-model="value" value-text-align="left" :list="addressData" :placeholder="$store.state.curr_area"></x-address>
			</div>
			<div class="forecast-button" @click="goEggForecastIndex" v-if="$store.state.price_default_index == 0">
				明日蛋价预测>>
			</div>
		</div>
		<div class="cut"></div>
		<div class="common-margin-lr">
			<div class="price-title">
				{{curr_title}}
			</div>
			<div class="local-price-chart loading-warp">
				<infochart @getdate='getEggData'></infochart>
				<div class="loading-main" v-if='is_show'>
					<img src="../../assets/timg.gif" alt="" />
				</div>
			</div>
			<ul class="ul-date">
				<li v-for='(date,index) in local_date_tab' :key='index' :class="{'date-select':date.done}" @click="localClickDateTab(index,date.day)">{{date.name}}</li>
			</ul>
		</div>
		<div class="cut"></div>
		<div class="detail-table">
			<div class="price-title common-margin-lr clear-float" style="border: none;">
				周边地区价格
				<span class="position-city"><img src="../../assets/address_bo.png" alt="" /> <span v-text="$store.state.curr_area"></span></span>
			</div>
		</div>
		<x-table :cell-bordered="false" style="background-color:#fff;">
			<thead>
				<tr style="background-color: #F7F7F7">
					<th>地区</th>
					<th>价格（元／斤）</th>
					<th>涨跌幅</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in around_city" class="clear-float table-border">
					<td>{{item.area}}</td>
					<td style="font-weight: bold;">{{item.now_price}}</td>
					<td>
						<span class="gains-info">
							<template v-if="item.gains>0">
								<span style="color:#D0021B;font-weight: bold;">+{{parseFloat(item.percent).toFixed(1)}}%</span>
								<span style="color:#999;">+{{item.gains}}</span>
</template>
<template v-else-if="item.gains==0">
	<span style="color:#333;font-weight: bold;">{{parseFloat(item.percent).toFixed(1)}}%</span>
	<span style="color:#999;">{{item.gains}}</span>
</template>
<template v-else>
	<span style="color:#57b663;font-weight: bold;">{{parseFloat(item.percent).toFixed(1)}}%</span>
	<span style="color:#999;">{{item.gains}}</span>
</template>
</span>
</td>
</tr>
</tbody>
</x-table>
</div>
</template>

<script>
	import { Tab, TabItem, XTable, XAddress } from 'vux'
	import infochart from '../../common/infochart'
	import { getChanNav, getCitys, getDefaultArea, getIndexPrice, getIndexPriceDetail, aroundAreaEggPrice, outChickenDayAvgPriceDetail, materialDayAvgPriceDetail, aroundAreaMaterialPrice } from '../../api/EggPrice'
	export default {

		data() {
			return {
				tab_list: ['鸡蛋（产）', '淘汰鸡', '玉米', '豆粕'],
				local_date_tab: [{
					name: '近1月',
					done: true,
					day: 30
				}, {
					name: '近3月',
					done: false,
					day: 90
				}, {
					name: '近6月',
					done: false,
					day: 180
				}, {
					name: '近1年',
					done: false,
					day: 365
				}],
				day_price: '',
				day_unit: '',
				day_gains: '',
				curr_index: '',
				curr_day: 30,
				xdate: [],
				ydate: [],
				around_city: [], //周边地区数据集合

				value: [],
				area: '',
				addressData: [],
				title: '',

				change_number: 0,
				is_show: false,
				curr_title: ''
			}
		},
		mounted() {
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
			this.$store.state.header.title = '价格行情';

			getChanNav().then(rs => {
				this.addressData = this.util.haddleAddressData(rs.data);
			})

			if(typeof this.$route.query.address != 'undefined') {
				this.$store.state.product_area =  this.$route.query.address;
				this.$store.state.price_default_index = this.$route.query.type;
			}
			console.log(this.$store.state.product_area)
			if(this.$store.state.product_area == '') {
				this.getNearCity();
			}
			this.getEggData();

			var links = 'https://m.danjiguanjia.com/newH5/#/p/every-info-detail?address=' + encodeURI(this.$store.state.product_area) + '&type=' + this.$store.state.price_default_index;
			this.$wechat.ready(() => {
				var title = this.util.getNowTime() + this.$store.state.product_area + '鸡蛋、原料、淘汰鸡价格';
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
		},
		methods: {
			//获取就进地区
			getNearCity() {
				getCitys().then(res => {
					this.lonlat = res.content.point.x + ',' + res.content.point.y;
					getDefaultArea({
						ticket: localStorage.getItem('ticket'),
						lonlat: this.lonlat
					}).then(res => {
						if(res.data.province.indexOf("北京") > -1 || res.data.province.indexOf("上海") > -1 || res.data.province.indexOf("天津") > -1 || res.data.province.indexOf("重庆") > -1) {
							this.$store.state.product_area = res.data.province.slice(0, -1) + ',' + res.data.district;
						} else {
							if(res.data.province.indexOf('省') > -1) {
								res.data.province = res.data.province.slice(0, -1);
							}
							this.$store.state.product_area = res.data.province + ',' + res.data.city + ',' + res.data.district;
						}
						this.$store.state.curr_area = this.$store.state.product_area.split(',')[this.$store.state.product_area.split(',').length - 1];
					})
				})
			},
			logHide(str) {
				//添加全省全市数据
				if(str) {
					var area_arr = [];
					var address_name = '';
					for(var i = 0; i < this.value.length; i++) {
						address_name = this.getAddressName(this.value[i]);
						if(address_name != '全省' && address_name != '全市') area_arr.push(this.getAddressName(this.value[i]));
					}
					this.addressData.forEach((item, index) => {
						if(item.name == address_name) {
							this.value = [];
							this.value.push(item.value);
						}
					})
					this.$store.state.product_area = area_arr.join(',');
					if(this.$store.state.product_area.indexOf('北京,北京') > -1) {
						this.$store.state.product_area = this.$store.state.product_area.replace('北京,北京', '北京')
					}
					if(this.$store.state.product_area.indexOf('北京县') > -1) {
						this.$store.state.product_area = this.$store.state.product_area.replace('北京县', '北京')
					}
					if(this.$store.state.product_area.indexOf('天津,天津市') > -1) {
						this.$store.state.product_area = this.$store.state.product_area.replace('天津,天津市', '天津')
					}
					if(this.$store.state.product_area.indexOf('天津,天津县') > -1) {
						this.$store.state.product_area = this.$store.state.product_area.replace('天津,天津县', '天津')
					}
					if(this.$store.state.product_area.indexOf('重庆,重庆') > -1) {
						this.$store.state.product_area = this.$store.state.product_area.replace('重庆,重庆', '重庆')
					}
					if(this.$store.state.product_area.indexOf('上海,上海') > -1) {
						this.$store.state.product_area = this.$store.state.product_area.replace('上海,上海', '上海')
					}
				}

			},
			getAddressName(value) {
				for(var i = 0; i < this.addressData.length; i++) {
					if(value == this.addressData[i].value) return this.addressData[i].name;
				}
			},
			clickTab(tab, index) {
				this.$store.state.price_default_index = index;
			},
			localClickDateTab(index, day) {
				this.local_date_tab.forEach((item, index) => {
					item.done = false;
				})
				this.curr_day = day;
				this.local_date_tab[index].done = true;
				if(index == 1) {
					this.local_date_tab[3].day = 295;
				}
			},
			//去鸡蛋预测页面
			goEggForecastIndex() {
				if(localStorage.getItem('ticket') == '' || localStorage.getItem('ticket') == null) {
					console.log(111)
					this.$router.push('/p/login')
				} else {
					this.$router.push('/p/egg-forecast-index')
				}
			},
			//获取鸡蛋产区的相关数据
			getEggData() {
				this.is_show = true;
				getIndexPrice({
					ticket: localStorage.getItem('ticket'),
					area: this.$store.state.product_area
				}).then(res => {
					if(this.$store.state.price_default_index == 0) {
						this.curr_title = "蛋价走势";
						this.day_price = res.data.egg_price.dayPrice;
						this.day_gains = res.data.egg_price.gains;
						this.day_unit = '今日蛋价（元／斤）'
						getIndexPriceDetail({
							ticket: localStorage.getItem('ticket'),
							area: this.$store.state.product_area,
							day: this.curr_day
						}).then(res => {
							this.$store.state.info_xdate = res.data.date;
							this.$store.state.info_ydate = res.data.price;
							this.$store.state.info_title = '鸡蛋价格';
							this.$store.state.info_unit = '单位（元／斤）';
							this.$store.state.info_random = this.curr_day + 1;
						})
						aroundAreaEggPrice({
							ticket: localStorage.getItem('ticket'),
							area: this.$store.state.product_area,
							type: 1
						}).then(res => {
							this.around_city = res.data
						})
					} else if(this.$store.state.price_default_index == 1) {
						this.curr_title = "淘汰鸡价格走势";
						this.day_price = res.data.out_egg_price.dayPrice;
						this.day_gains = res.data.out_egg_price.gains;
						this.day_unit = '今日淘汰鸡价格（元／斤）';
						outChickenDayAvgPriceDetail({
							ticket: localStorage.getItem('ticket'),
							area: this.$store.state.product_area,
							day: this.curr_day
						}).then(res => {
							this.$store.state.info_xdate = res.data.date;
							this.$store.state.info_ydate = res.data.price;
							this.$store.state.info_title = '淘汰鸡价格';
							this.$store.state.info_unit = '单位（元／斤）';
							this.$store.state.info_random = this.curr_day + 2;
						})
						aroundAreaEggPrice({
							ticket: localStorage.getItem('ticket'),
							area: this.$store.state.product_area,
							type: 2
						}).then(res => {
							this.around_city = res.data
						})

					} else if(this.$store.state.price_default_index == 2) {
						this.curr_title = "玉米价格走势";
						this.day_price = parseInt(res.data.cornprice_price.cornprice);
						this.day_gains = res.data.cornprice_price.cornprice_gains;
						this.day_unit = '今日玉米价格（元／吨）'
						materialDayAvgPriceDetail({
							ticket: localStorage.getItem('ticket'),
							area: this.$store.state.product_area,
							day: this.curr_day
						}).then(res => {
							this.$store.state.info_xdate = res.data.time;
							this.$store.state.info_ydate = res.data.cornPrice_price;
							this.$store.state.info_title = '玉米价格';
							this.$store.state.info_unit = '单位（元／吨）';
							this.$store.state.info_random = this.curr_day + 3;
						})
						aroundAreaMaterialPrice({
							ticket: localStorage.getItem('ticket'),
							area: this.$store.state.product_area,
							type: 1
						}).then(res => {
							this.around_city = res.data;
						})
					} else {
						this.curr_title = "豆粕价格走势";
						this.day_price = parseInt(res.data.mealprice_price.mealprice);
						this.day_gains = res.data.mealprice_price.mealprice_gains;
						this.day_unit = '今日豆粕价格（元／吨）';
						materialDayAvgPriceDetail({
							ticket: localStorage.getItem('ticket'),
							area: this.$store.state.product_area,
							day: this.curr_day
						}).then(res => {
							this.$store.state.info_xdate = res.data.time;
							this.$store.state.info_ydate = res.data.mealprice_price;
							this.$store.state.info_title = '豆粕价格';
							this.$store.state.info_unit = '单位（元／吨）';
							this.$store.state.info_random = this.curr_day + 4;
						})
						aroundAreaMaterialPrice({
							ticket: localStorage.getItem('ticket'),
							area: this.$store.state.product_area,
							type: 2
						}).then(res => {
							this.around_city = res.data;
						})
					}
					this.is_show = false;
				})
			}
		},
		watch: {
			'$store.state.price_default_index': 'getEggData',
			'curr_day': 'getEggData',
			'$store.state.product_area': function() {
				this.$store.state.info_random = Math.random();
			}
		},
		components: {
			Tab,
			TabItem,
			infochart,
			XTable,
			XAddress
		}
	}
</script>

<style lang="less">
	.detail-main-title {
		.title-back {
			margin: 1rem 0;
			width: 100%;
			height: 9rem;
			padding-top: 2rem;
			background-image: linear-gradient(-180deg, #FFAF58 0%, #FF4F43 100%);
			border-radius: 5px;
			p:first-of-type {
				font-size: 0.75rem;
				text-align: center;
				color: #FFFFFF;
			}
			p:nth-of-type(2) {
				text-align: center;
				color: #FFFFFF;
				font-size: 3rem;
				margin: 0.5rem 0;
				position: relative;
				span {
					position: absolute;
					bottom: 0.5rem;
					left: 65%;
					font-size: 0.81rem;
					.upanddown {
						width: 0.5rem;
						height: 0.8rem;
					}
					.ping {
						width: 1rem;
						height: 0.4rem;
					}
				}
			}
			/*p:last-of-type {
				font-size: 0.81rem;
				span {
					position: relative;
				}
			}*/
		}
		.forecast-button {
			width: 100%;
			height: 2.5rem;
			line-height: 2.5rem;
			background-color: #EEFFF0;
			border-radius: 1.25rem;
			margin: 1rem 0;
			text-align: center;
			color: #57B663;
			font-size: 0.88rem;
		}
	}
	
	.position-city {
		float: right;
		font-size: 0.88rem;
		img {
			display: inline-block;
			height: 1.2rem;
			width: 1rem;
			float: left;
			margin-top: 0.9rem;
			margin-right: 0.3rem;
		}
	}
	
	.vux-popup-picker-placeholder,
	.vux-popup-picker-value {
		color: #FFF;
	}
	
	.vux-popup-picker-placeholder:after,
	.vux-popup-picker-value:after {
		position: absolute;
		margin-top: 5px;
		margin-left: 5px;
		width: 0;
		height: 0;
		content: " ";
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-top: 8px solid #fff;
	}
	
	.vux-tap-active,
	.vux-popup-picker-select {
		text-align: center !important;
	}
</style>