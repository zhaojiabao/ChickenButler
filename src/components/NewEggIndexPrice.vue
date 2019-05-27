<template>
	<div class="newegg-price" :class="{'if-loading':index_loading}">
		<indexloading v-if='index_loading'></indexloading>
		<div class="newegg-title common-margin-lr clear-float">
			<span>基本行情</span>
			<span @click="addressShow" class="draw-aquare">
				<!--{{$store.state.curr_area.district}}-->
				<x-address :title="title" @click='alert(11)' style='' @on-hide="logHide" v-model="value" value-text-align="left" :list="addressData" :placeholder="$store.state.curr_area"></x-address>
			</span>
		</div>
		<div class="newegg-info common-margin-lr clear-float" @click="goDetail(0)">
			<img class="newegg-go-detail" src="../assets/jiantou.png" alt="" />
			<div>
				<template v-if="egg_price!=0">
					<img v-if="egg_gains>0" class="arrow egg-price-info" src="../assets/up.png" />
					<img v-else-if="egg_gains==0" class="arrow-ping egg-price-info-down" src="../assets/ping.png" />
					<img v-else class="arrow egg-price-info" src="../assets/down.png" />
				</template>
				<p v-if="egg_price!=0">
					<span v-if="egg_gains>0" class="up-color">{{egg_price}}</span>
					<span v-else-if="egg_gains==0" class="flat-color">{{egg_price}}</span>
					<span v-else class="down-color">{{egg_price}}</span>
				</p>
				<p v-else>待报价</p>
				<p>（元／斤）</p>
			</div>
			<div>
				<p>鸡蛋价格（产区）</p>
				<template v-if="egg_price!=0">
					<p v-if="egg_gains>0">同比上涨{{egg_gains}}元／斤</p>
					<p v-else-if="egg_gains==0">持平</p>
					<p v-else>同比下降{{egg_gains*-1}}元／斤</p>
				</template>
				<template v-else>
					<p style="color: #57B663;" @click.stop="goFeedback(1)">去反馈</p>
				</template>
			</div>
		</div>
		<div class="newegg-info common-margin-lr clear-float" @click="goDetail(1)">
			<img class="newegg-go-detail" src="../assets/jiantou.png" alt="" />
			<div>
				<template v-if="out_chicken_price!=0">
					<img v-if="out_chicken_gains>0" class="arrow egg-price-info" src="../assets/up.png" />
					<img v-else-if="out_chicken_gains==0" class="arrow-ping egg-price-info-down" src="../assets/ping.png" />
					<img v-else class="arrow egg-price-info" src="../assets/down.png" />
				</template>
				<p v-if="out_chicken_price!=0">
					<span v-if="out_chicken_gains>0" class="up-color">{{out_chicken_price}}</span>
					<span v-else-if="out_chicken_gains==0" class="flat-color">{{out_chicken_price}}</span>
					<span v-else class="down-color">{{out_chicken_price}}</span>
				</p>
				<p v-else>待报价</p>
				<p>（元／斤）</p>
			</div>
			<div>
				<p>淘汰鸡价格</p>
				<template v-if="out_chicken_price!=0">
					<p v-if="out_chicken_gains>0">同比上涨{{out_chicken_gains}}元／斤</p>
					<p v-else-if="out_chicken_gains==0">持平</p>
					<p v-else>同比下降{{out_chicken_gains*-1}}元／斤</p>
				</template>
				<template v-else>
					<p style="color: #57B663;" @click.stop="goFeedback(2)">去反馈</p>
				</template>
			</div>
		</div>
		<div class="newegg-info common-margin-lr clear-float" @click="goDetail(2)">
			<img class="newegg-go-detail" src="../assets/jiantou.png" alt="" />
			<div>
				<template v-if="corn_price!=0">
					<img v-if="corn_gains>0" class="arrow egg-price-info" src="../assets/up.png" />
					<img v-else-if="corn_gains==0" class="arrow-ping egg-price-info-down" src="../assets/ping.png" />
					<img v-else class="arrow egg-price-info" src="../assets/down.png" />
				</template>
				<p v-if="corn_price!=0">
					<span v-if="corn_gains>0" class="up-color">{{corn_price}}</span>
					<span v-else-if="corn_gains==0" class="flat-color">{{corn_price}}</span>
					<span v-else class="down-color">{{corn_price}}</span>
				</p>
				<p v-else>待报价</p>
				<p>（元／吨）</p>
			</div>
			<div>
				<p>玉米价格</p>
				<template v-if="corn_price!=0">
					<p v-if="corn_gains>0">同比上涨{{corn_gains}}元／吨</p>
					<p v-else-if="corn_gains==0">持平</p>
					<p v-else>同比下降{{corn_gains*-1}}元／吨</p>
				</template>
				<template v-else>
					<p style="color: #57B663;" @click.stop="goFeedback(3)">去反馈</p>
				</template>
			</div>
		</div>
		<div class="newegg-info common-margin-lr clear-float" style="border-bottom: 1px solid #EEEEEE;" @click="goDetail(3)">
			<img class="newegg-go-detail" src="../assets/jiantou.png" alt="" />
			<div>
				<template v-if="meal_price!=0">
					<img v-if="meal_gains>0" class="arrow egg-price-info" src="../assets/up.png" />
					<img v-else-if="meal_gains == 0" class="arrow-ping egg-price-info-down" src="../assets/ping.png" />
					<img v-else class="arrow egg-price-info" src="../assets/down.png" />
				</template>
				<p v-if="meal_price!=0">
					<span v-if="meal_gains>0" class="up-color">{{meal_price}}</span>
					<span v-else-if="meal_gains==0" class="flat-color">{{meal_price}}</span>
					<span v-else  class="down-color">{{meal_price}}</span>
				</p>
				<p v-else>待报价</p>
				<p>（元／吨）</p>
			</div>
			<div>
				<p>豆粕价格</p>
				<template v-if="meal_price!=0">
					<p v-if="meal_gains>0">同比上涨{{meal_gains}}元／吨</p>
					<p v-else-if="meal_gains==0">持平</p>
					<p v-else>同比下降{{meal_gains*-1}}元／吨</p>
				</template>
				<template v-else>
					<p style="color: #57B663;" @click.stop="goFeedback(3)">去反馈</p>
				</template>
			</div>
		</div>
		<div class="newegg-update-time common-padding-lr">
			更新时间：{{update_time}}
		</div>
		<div class="cut"></div>
		<div class="newegg-saleprice common-margin-lr">
			<img class="newegg-go-sale-detail" src="../assets/jiantou.png" alt="" />
			<span>鸡蛋销区行情</span>
			<span @click="goSaleList" style="font-size: 1rem;">查看更多</span>
		</div>
		<div class="newegg-saleprice-main common-padding-lr">
			<div v-for="(data,index) in sale_date" :key="index" v-if='index<3' @click="goSaleDetail(data)">
				<p v-if="data.gains==0" class="flat-color">{{data.bazzar_price}} <img class="arrow-ping egg-price-info-down" src="../assets/ping.png" /></p>
				<p v-else-if="data.gains>0" class="up-color">{{data.bazzar_price}} <img class="arrow egg-price-info" src="../assets/up.png" /></p>
				<p v-else class="down-color">{{data.bazzar_price}} <img class="arrow egg-price-info" src="../assets/down.png" /></p>

				<p>（元／斤）</p>
				<p>{{data.bazaar}}</p>
			</div>
		</div>
		<div class="cut"></div>
		<!--分隔线-->
		<div class="quotion-analysis common-margin-lr">
			<p class="analysis-title">
				行情分析
			</p>
			<div class="analysis-content clear-float" v-for="(news,index) in news_list" @click="goNewDetail(news.id)">
				<img :src="news.path" alt="" />
				<div>
					<p v-text="news.cms_title">始</p>
					<p>
						<span v-text="news.author">11</span>
						<span> <img src="../assets/eye.png" alt="" />{{news.view}}</span>
					</p>
				</div>
			</div>
		</div>
		<div class="cut"></div>
		<div class="local">
			<div class="local-price">
				<div class="local-price-title common-margin-lr clear-float">
					<span style="float: left;font-size: 1.1rem;">当地走势</span>
					<div class="local-price-type" style="font-size: 1.1rem;" :class="{'price-select':egg.done}" v-for="(egg,index) in loca_egg_price" :key='index' @click="localClickPriceTab(index)">
						{{egg.name}}
					</div>
				</div>
			</div>
			<div class="local-price-chart loading-warp common-margin-lr">
				<chart :xdate='local_xdate' :ydate='local_ydate' :chartitle='local_chart_title' :change='tab_type'></chart>
				<div class="loading-main" v-if='is_show'>
					<img src="../assets/timg.gif" alt="" />
				</div>
			</div>
			<ul class="ul-date">
				<li v-for='(date,index) in local_date_tab' :key='index' :class="{'date-select':date.done}" @click="localClickDateTab(index,date.day)">{{date.name}}</li>
			</ul>
		</div>
		<div class="cut"></div>
		<div class="china common-margin-lr" @click.stop>
			<iframe :src="url" class="china-iframe"></iframe>
		</div>
		<!--<popup v-model='address_show' position='bottom' height="55%" style='background-color: #FFFFFF'>
			<div class="common-margin-lr">
				<div class="address-title clear-float">
					定位 : {{$store.state.curr_area}}
					<span @click="rePosition">重新定位</span>
				</div>
			</div>
		</popup>-->

		<x-dialog v-model="feedback" :hide-on-blur='true' :dialog-style="{'border-radius':'10px','height':'50%','margin-top':'12%'}">
			<p class="feedback-title">反馈</p>
			<textarea name="feedback" class="feedtextarea" v-model="feedback_content" placeholder="当前地区暂无报价，反馈后我们会努力为您查询报价，下次可能就有了哦～"></textarea>
			<div class="feedback-submit" @click="submitFeedback">
				提交
			</div>
		</x-dialog>

	</div>
</template>

<script>
	import { Popup, Tab, TabItem, XAddress, XDialog } from 'vux'
	import chart from '../common/chart'
	import indexloading from '../common/loading'
	import { getChanNav, getDefaultArea, getCitys, getIndexPrice, daySaleEggPrice, getIndexPriceDetail, materialDayAvgPriceDetail, allDayEggAvgPrice, allDayAvgPrice, getNewAllProdNav, getPriceMarketArticle, areaPriceFeedback, isAreaFeekback } from '../api/EggPrice'
	export default {
		components: {
			chart,
			Popup,
			Tab,
			TabItem,
			XAddress,
			XDialog,
			indexloading,
		},
		data() {
			return {
				feedback: false, //反馈页面是否出现
				loca_egg_price: [{
					name: '原料走势',
					done: false
				}, {
					name: '蛋价走势',
					done: true
				}],
				china_egg_price: [{
					name: '原料走势',
					done: false
				}, {
					name: '蛋价走势',
					done: true
				}],
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
				china_date_tab: [{
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
				lonlat: '', //经纬度
				egg_price: '', //鸡蛋价格
				egg_gains: '', //鸡蛋涨幅
				out_chicken_price: "", //首页淘汰鸡价格
				out_chicken_gains: "", //首页淘汰鸡价格波动
				corn_price: "", //玉米价格
				corn_gains: "", //玉米价格波动
				meal_price: "", //豆粕价格
				meal_gains: "", //豆粕价格波动
				update_time: '', //更新时间
				sale_date: [], //销区数据
				local_day: 30,
				local_xdate: [], //本地鸡蛋x轴数据
				local_ydate: [], //本地鸡蛋y轴数据
				local_chart_title: ['鸡蛋价格'],
				tab_type: 1,
				china_day: 30,
				chinaxdate: [], //全国鸡蛋x轴数据
				chinaydate: [], //全国鸡蛋y轴数据
				all_price: [], //首页所有数据集合
				address_show: false,
				address_one: [],
				address_two: [],
				address_thr: [],
				curr_address: [],
				div_address: [],
				curr_index: '',

				value: [],
				area: '',
				addressData: [],
				title: '',
				news_list: [],
				url: '',
				feedback_index: '',
				feedback_content: '',
				is_show: false,
				index_loading:true,
			}
		},
		mounted() {
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
			this.$nextTick(() => {
				this.$store.state.header.title = '价格行情';
				this.getLonlat();
				this.getSaleData();
				this.getChinaEggChart();
				this.getAllAdress();
				this.getIndexNewList();
				getChanNav().then(rs => {
					this.addressData = this.util.haddleAddressData(rs.data);
				})
				this.url = 'https://m.danjiguanjia.com/pages/neweggcharts/chinaChart.html?ticket' + localStorage.getItem('ticket')
			})
			this.$wechat.ready(() => {
				var title = this.util.getNowTime() + '全国各地鸡蛋、原料、淘汰鸡价格';
				var link = 'https://m.danjiguanjia.com/newH5/#/p/new-egg-index-price';
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
		watch: {
			'$store.state.product_area': function() {
				this.getIndexDate();
				if(this.tab_type == 2) {
					this.getMaterialChart();
				} else {
					this.getLocalChart();
				}
			}
		},
		methods: {
			//去销区详情
			goSaleDetail(data) {
				this.$router.push('/p/sale-detail/' + data.bazaar)
			},
			//提交反馈
			submitFeedback() {
				if(this.feedback_content.trim() == '') {
					this.$vux.toast.text('反馈内容不能为空!');
					return;
				}
				if(this.feedback_content.trim().length>200) {
					this.$vux.toast.text('反馈内容不能大于200个字符!');
					return;
				}
				areaPriceFeedback({
					ticket: localStorage.getItem('ticket'),
					tyep: this.feedback_index,
					area: this.$store.state.curr_area,
					content: this.feedback_content
				}).then(res => {
					if(res.retcode == 2000) {
						this.$vux.toast.text(res.msg);
						this.feedback = false;
						this.feedback_content = "";
					} else {
						this.$vux.toast.text(res.msg);
					}
				})
			},
			//点击去反馈
			goFeedback(index) {
				isAreaFeekback({
					ticket: localStorage.getItem('ticket'),
					tyep: index,
					area: this.$store.state.curr_area,
				}).then(res => {
					if(res.retcode == 2000) {
						this.feedback = true;
					} else {
						this.$vux.toast.text(res.msg);
					}
				})
				this.feedback_index = index;
			},
			//重新定位
			rePosition() {
				this.getNearCity();
			},
			//去新闻详情页
			goNewDetail(id) {
				this.$router.push('/p/news/detail/' + id)
			},
			//获取首页新闻列表
			getIndexNewList() {
				getPriceMarketArticle({
					ticket: localStorage.getItem('ticket')
				}).then(res => {
					this.news_list = res.data;
				})
			},
			//获取所有地址数据
			getAllAdress() {
				getNewAllProdNav({
					ticket: localStorage.getItem('ticket')
				}).then(res => {
					res.data.forEach((item, index) => {
						if(item.level == 1) {
							this.address_one.push(item)
						} else if(item.level == 2) {
							this.address_two.push(item)
						} else {
							this.address_thr.push(item)
						}
					})
				})
			},
			//点击按钮弹出内容
			addressShow() {
				this.address_show = true;
			},
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
							this.$store.state.product_area = res.data.province + ',' + res.data.city + ',' + res.data.district;
						}
						this.$store.state.curr_area = this.$store.state.product_area.split(',')[this.$store.state.product_area.split(',').length - 1];
						this.getIndexDate();
						this.getLocalChart();
						this.curr_address.push(res.data.province)
						this.curr_address.push(res.data.city)
						this.curr_address.push(res.data.district)
					})
				})
			},
			//获取到当前的经纬度 以及就近城市的名称
			getLonlat() {
				getCitys().then(res => {
					this.lonlat = res.content.point.x + ',' + res.content.point.y;
					getDefaultArea({
						ticket: localStorage.getItem('ticket'),
						lonlat: this.lonlat
					}).then(res => {
						if(this.$store.state.product_area == '') {
							if(res.data.province.indexOf("北京") > -1 || res.data.province.indexOf("上海") > -1 || res.data.province.indexOf("天津") > -1 || res.data.province.indexOf("重庆") > -1) {
								this.$store.state.product_area = res.data.province.slice(0, -1) + ',' + res.data.district;
							} else {
								if(res.data.province.indexOf('省')>-1){
									res.data.province=res.data.province.slice(0, -1);
								}
								this.$store.state.product_area = res.data.province + ',' + res.data.city + ',' + res.data.district;
							}
						}
						this.$store.state.curr_area = this.$store.state.product_area.split(',')[this.$store.state.product_area.split(',').length - 1];
						this.getIndexDate();
						this.getLocalChart();
						this.curr_address.push(res.data.province)
						this.curr_address.push(res.data.city)
						this.curr_address.push(res.data.district)
					})
				})
			},
			//获取首页4条数据
			getIndexDate() {
				this.index_loading=true;
				getIndexPrice({
					area: this.$store.state.product_area
				}).then(res => {
					this.egg_price = res.data.egg_price.dayPrice;
					this.egg_gains = res.data.egg_price.gains;
					this.update_time = res.data.egg_price.savetime;
					this.out_chicken_price = res.data.out_egg_price.dayPrice;
					this.out_chicken_gains = res.data.out_egg_price.gains;
					this.corn_price = parseInt(res.data.cornprice_price.cornprice);
					this.corn_gains = res.data.cornprice_price.cornprice_gains;
					this.meal_price = parseInt(res.data.mealprice_price.mealprice);
					this.meal_gains = res.data.mealprice_price.mealprice_gains;
					this.index_loading=false;
				})
			},
			//获取主销区数据
			getSaleData() {
				daySaleEggPrice({
					ticket: localStorage.getItem('ticket')
				}).then(res => {
					console.log(res.data)
					this.sale_date = res.data;
				})
			},
			//本地蛋价原料选显卡切换
			localClickPriceTab(index) {
				this.local_xdate = [];
				this.local_ydate = [];
				this.loca_egg_price.forEach((item, index) => {
					item.done = false;
				})
				this.loca_egg_price[index].done = true;
				if(index == 0) {
					this.getMaterialChart();
					this.local_chart_title = ['玉米价格', '豆粕价格']
					this.tab_type = 2;
				} else {
					this.getLocalChart();
					this.local_chart_title = ['鸡蛋价格'];
					this.tab_type = 1;
				}
			},
			//全国蛋价原料选显卡切换
			chinaClickPriceTab(index) {
				this.china_egg_price.forEach((item, index) => {
					item.done = false;
				})
				this.china_egg_price[index].done = true;
				this.local_chart_title = ['鸡蛋价格'];
			},
			//获取本地蛋价曲线
			getLocalChart() {
				this.is_show = true;
				getIndexPriceDetail({
					ticket: localStorage.getItem('ticket'),
					area: this.$store.state.product_area,
					day: this.local_day
				}).then(res => {
					this.local_xdate = res.data.date;
					this.local_ydate = res.data;
					this.is_show = false;
				})
			},
			//获取本地原料曲线
			getMaterialChart() {
				this.is_show = true;
				materialDayAvgPriceDetail({
					ticket: localStorage.getItem('ticket'),
					area: this.$store.state.product_area,
					day: this.local_day
				}).then(res => {
					this.local_xdate = res.data.time;
					this.local_ydate = res.data;
					this.is_show = false;
				})
			},
			//获取全国蛋价曲线
			getChinaEggChart() {
				allDayEggAvgPrice({
					ticket: localStorage.getItem('ticket'),
					day: this.china_day
				}).then(res => {
					this.chinaxdate = res.data.date;
					this.chinaydate = res.data;
					localStorage.setItem('chinaxdate', res.data.date)
					localStorage.setItem('chinaydate', res.data.price)
				})
			},
			//本地日期切换
			localClickDateTab(index, day) {
				this.local_date_tab.forEach((item, index) => {
					item.done = false;
				})
				this.local_day = day;
				if(this.tab_type == 2) {
					this.getMaterialChart();
				} else {
					this.getLocalChart();
				}
				this.local_date_tab[index].done = true;
			},
			//全国日期切换
			chinaClickDateTab(index, day) {
				this.china_date_tab.forEach((item, index) => {
					item.done = false;
				})
				this.china_date_tab[index].done = true;
			},
			//去4个选项卡的详情页
			goDetail(index) {
				if(index == 0 && this.egg_price == 0) {
					return;
				} else if(index == 1 && this.out_chicken_price == 0) {
					return;
				} else if(index == 2 && this.corn_price == 0) {
					return;
				} else if(index == 3 && this.meal_price == 0) {
					return;
				} else {
					this.$router.push('/p/every-info-detail');
					if(index == 0) {
						this.$store.state.price_default_index = 0
					} else if(index == 1) {
						this.$store.state.price_default_index = 1
					} else if(index == 2) {
						this.$store.state.price_default_index = 2
					} else {
						this.$store.state.price_default_index = 3
					}
				}
			},
			//去销区列表页
			goSaleList() {
				this.$router.push('/p/sale-list');
			},
			logHide(str) {
				//添加全省全市数据
				if(str) {
					this.address_show = false;
					var area_arr = [];
					var address_name = '';
					for(var i = 0; i < this.value.length; i++) {
						address_name = this.getAddressName(this.value[i]);
						if(address_name != '全省' && address_name != '全市') area_arr.push(this.getAddressName(this.value[i]));
					}
					this.$store.state.product_area = area_arr.join(',')
					this.$store.state.curr_area = area_arr[area_arr.length - 1];
					this.addressData.forEach((item, index) => {
						if(item.name == address_name) {
							this.value = [];
							this.value.push(item.value);
						}
					})
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
					if(this.$store.state.product_area.indexOf('上海市') > -1) {
						this.$store.state.product_area = this.$store.state.product_area.replace('上海市', '上海')
					}
				} else {
					this.address_show = false;
				}

			},
			getAddressName(value) {
				for(var i = 0; i < this.addressData.length; i++) {
					if(value == this.addressData[i].value) return this.addressData[i].name;
				}
			},
		}
	}
</script>

<style lang="less">
	.feedback-title {
		text-align: center;
		font-size: 1.2rem;
		height: 5rem;
		line-height: 5rem;
		color: #333;
	}
	
	.feedtextarea {
		width: 78%;
		margin: 0 6%;
		height: 40%;
		border: 1px solid #EEEEEE;
		padding: 0.5rem 1rem;
		outline: none;
	}
	
	.feedback-submit {
		width: 25%;
		height: 2rem;
		font-size: 0.81rem;
		line-height: 2rem;
		background-color: #57B663;
		color: #FFFFFF;
		border-radius: 3px;
		margin-top: 3vh;
		float: right;
		margin-right: 6%;
	}
	
	.china-iframe {
		width: 100%;
		height: 450px;
		border: none;
	}
	
	.address-title {
		height: 3rem;
		line-height: 3rem;
		border-bottom: 1px solid #EEEEEE;
		font-size: 1rem;
		span {
			float: right;
			color: #57b663;
		}
	}
	
	.newegg-info {
		border-top: 1px solid #eee;
		padding: 0.5rem 0;
		position: relative;
		.newegg-go-detail {
			position: absolute;
			display: block;
			width: 0.5rem;
			height: 1rem;
			top: 2.5rem;
			right: 0;
		}
		div {
			height: 5rem;
		}
		div:first-of-type {
			box-sizing: border-box;
			border-right: 1px solid #EEEEEE;
			width: 40%;
			float: left;
			position: relative;
			.egg-price-info {
				position: absolute;
				right: 1rem;
				top: 1.8rem;
			}
			.egg-price-info-down {
				position: absolute;
				right: 1rem;
				top: 1.9rem;
			}
			p {
				text-align: center;
			}
			p:first-of-type {
				font-size: 1.5rem;
				margin-top: 1rem;
			}
			p:last-of-type {
				font-size: 1rem;
				color: #999999;
			}
		}
		div:last-of-type {
			width: 55%;
			float: left;
			padding-left: 5%;
			p:first-of-type {
				font-size: 1.1rem;
				margin-top: 1rem;
				margin-bottom: 0.5rem;
			}
			p:last-of-type {
				font-size: 1rem;
				color: #999999;
			}
		}
	}
	
	.vux-popup-picker-header {
		background: #FFF;
		margin: 0 5%;
	}
	
	.vux-popup-picker-header-menu-right,
	.vux-popup-picker-header-menu {
		padding: 0;
	}
	
	.newegg-update-time {
		height: 3rem;
		line-height: 3rem;
		text-align: center;
		font-size: 1rem;
		color: #CCCCCC;
	}
	
	.newegg-saleprice {
		height: 3rem;
		line-height: 3rem;
		border-bottom: 1px solid #EEEEEE;
		position: relative;
		.newegg-go-sale-detail {
			position: absolute;
			display: block;
			width: 0.5rem;
			height: 1rem;
			top: 1rem;
			right: 0;
		}
		span:first-of-type {
			font-size: 1rem;
		}
		span:last-of-type {
			font-size: 0.75rem;
			color: #999999;
			float: right;
			padding-right: 1rem;
		}
	}
	
	.newegg-saleprice-main {
		height: 6rem;
		margin: 0.5rem 0;
		display: flex;
		div {
			flex: 1;
			text-align: center;
			border-right: 1px solid #EEEEEE;
			p:nth-of-type(1) {
				font-size: 1.5rem;
				margin-top: 0.5rem;
			}
			p:nth-of-type(2) {
				font-size: 1rem;
				color: #999999;
				padding: 0.2rem 0;
			}
			p:nth-of-type(3) {
				font-size: 1rem;
			}
		}
		div:last-of-type {
			border: none;
		}
	}
	
	.quotion-analysis {
		.analysis-title {
			height: 3rem;
			line-height: 3rem;
			font-size: 1rem;
			border-bottom: 1px solid #EEEEEE;
		}
		.analysis-content {
			padding: 1rem 0;
			img {
				display: block;
				width: 40%;
				height: 5rem;
				float: left;
				border-radius: 0.5rem;
			}
			div {
				padding-left: 5%;
				width: 55%;
				height: 5rem;
				float: left;
				p:first-of-type {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					font-size: 1.1rem;
					line-height: 1.5rem;
					height: 3rem;
				}
				p:last-of-type {
					color: #CCCCCC;
					font-size: 0.75rem;
					margin-top: 0.5rem;
					span {
						position: relative;
					}
					span:last-of-type {
						padding-left: 1.1rem;
						margin-left: 1rem;
						img {
							position: absolute;
							top: 0.1rem;
							left: 0;
							display: inline-block;
							height: 1rem;
							width: 1rem;
						}
					}
				}
			}
		}
	}
	
	.local-price-title {
		height: 3rem;
		line-height: 3rem;
		font-size: 1rem;
		border-bottom: 1px solid #EEEEEE;
		.local-price-type {
			float: right;
			width: 4.7rem;
			text-align: center;
		}
		.local-price-type:last-of-type {
			margin-right: 0.5rem;
		}
	}
	
	.price-select {
		/*transition: 0.3s;*/
		color: #57B663;
		box-sizing: border-box;
		border-bottom: 4px solid #57b663;
	}
	
	.date-select {
		color: #57B663;
	}
	
	.font-color {
		color: #57b663;
	}
	
	.up-color {
		color: #D0021B;
		font-size: 1.5rem;
	}
	
	.down-color {
		color: #57B663;
		font-size: 1.5rem;
	}
	
	.flat-color {
		color: #333333;
		font-size: 1.5rem;
	}
	.if-loading{
		height: 88vh;
		width: 100%;
		overflow: hidden;
	}
</style>