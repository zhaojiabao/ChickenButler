<template>
	<!--原料价格曲线-->
	<div class="material-chart">
		<search v-if="material_search" placeholder="请输入您要查询的地区" @on-change="getResult" cancel-text=" " @on-focus="onFocus" @on-cancel="is_search_focus = false" @result-click="resultClick" :results="results" v-model="search_text" position="absolute" auto-scroll-to-top top="46px" @on-submit="onSearch" ref="search"></search>
		<div class="select-type">
			<button-tab v-model="type">
				<button-tab-item v-for="(tab,index) in tabArr" @on-item-click="buttonClick(index)">{{ tab }}</button-tab-item>
			</button-tab>
		</div>
		<div class="line"></div>
		<group>
			<x-address :title="title" @on-hide="logHide" v-model="value" value-text-align="left" :list="addressData" :placeholder="area" :hide-district="false">
				<template slot="title" scope="props">
					<div :class="props.labelClass" :style="props.labelStyle" style="height:24px;line-height: 24px;width: 70px;">
						<icon name="map-marker" scale="1.3" class="l" style="width: 24px;"></icon>
						<div class="l">定位：</div>
					</div>
				</template>
			</x-address>
		</group>

		<iframe width="100%" border="no" :src="url"></iframe>

		<div class="h60"></div>
		<footer class="ui-footer ui-footer-stable ui-border-t">
			<ul class="ui-tiled">
				<template v-for="(date,i) in dates">
					<li :class="{active:i==cdate}" @click="cdate = i">{{ date }}</li>
				</template>
			</ul>
		</footer>

		<div class="mask" v-if="is_search_focus"></div>
	</div>
</template>

<script>
	import { Cell, ButtonTab, ButtonTabItem, XAddress, Group, Search } from 'vux'
	import { McArea, sreachArea } from '../../api/EggPrice'
	import { userAction } from "../../api/api"
	import 'vue-awesome/icons/map-marker'
	import Icon from 'vue-awesome/components/Icon'

	let base = "https://api.danjiguanjia.com/map/chart/feed_price/";
	let cdate_arr = ['w', 'm', 'q', 'y'];
	//匹配汉字
	var regZH = new RegExp("[\\u4E00-\\u9FFF]+", "g");
	export default {
		components: {
			Cell,
			ButtonTab,
			ButtonTabItem,
			XAddress,
			Group,
			Icon,
			Search
		},
		mounted() {
			this.$store.state.header.title = '原料价格查询';
			this.$store.state.price_type = 1;
			var xheader = document.querySelector(".vux-header-title");
			xheader.classList.add('title-after');
			//如果在蛋鸡管家app中那么就让header和搜索框都不显示
			var ua = navigator.userAgent.toLowerCase();
			if(ua.indexOf('djgj_jn') > -1) {
				this.$store.state.header.is_show_header = false;
				this.material_search = false;
				if(this.$route.query.ticket != undefined) this.$store.state.ticket = this.$route.query.ticket;
			}
			this.area = this.util.deepClone(this.$store.state.egg_price.area);
			if(this.$route.query.area != undefined) {
				this.area = decodeURI(this.$route.query.area);
//				this.$store.state.header.is_show_header = false;
			}
			McArea().then(rs => {
				this.addressData = this.util.haddleAddressData(rs);
			})
			userAction({
				ticket: this.$store.state.ticket,
				module: 1523,
				cur_version: this.$store.state.cur_version
			})
		},
		watch: {
			'area': 'init',
			'type': 'init',
			'cdate': 'init',

		},
		methods: {
			init() {
				var d = new Date();
				var str = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
				var ua = navigator.userAgent.toLowerCase();
				//当跳转的时候会触发init,回到上一页的年数据
				if(this.$store.state.chart_cdate != 0) {
					this.cdate = this.$store.state.chart_cdate;
					this.$store.state.chart_cdate = 0;
				}

				let cdate = cdate_arr[this.cdate];
				//判断是否是年价格曲线并且有没有通行证,如果没有就跳转到登录页面,并且要看这个是不是在app中
				if(ua.indexOf('djgj_jn') == -1 && this.cdate == 3 && this.$store.state.ticket == null) {
					this.$store.state.chart_cdate = 3;
					this.$vux.toast.text('请登录后查看原料年价格曲线!')
					this.$router.push('/p/login')
				}
				this.url = `${base}type/${this.type}/area/${this.area}/date/${cdate}`;

				this.$wechat.ready(() => {
					//					var title = str + this.area + '鸡蛋、原料、淘汰鸡价格';
					var title = str + '全国各地鸡蛋、原料、淘汰鸡价格';
					var link = 'https://m.danjiguanjia.com/#/p/material-chart';
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
//			onReady(instance) {
//				this.echart = instance;
//				this.init();
//			},
//			onClick(event, instance, echarts) {
//				console.log(arguments);
//			},
			logHide(str) {
				if(str) {
					var area_arr = [];
					var address_name = '';
					//添加全省全市数据
					for(var i = 0; i < this.value.length; i++) {
						address_name = this.getAddressName(this.value[i]);
						if(address_name != '全省' && address_name != '全市') area_arr.push(this.getAddressName(this.value[i]));
					}
					this.area = area_arr.join(',');
				}
			},
			logShow(str) {
				console.log('on-show')
			},
			getAddressName(value) {
				for(var i = 0; i < this.addressData.length; i++) {
					if(value == this.addressData[i].value) return this.addressData[i].name;
				}
			},
			getResult() {
				//只有汉字才能搜索
				if(regZH.test(this.search_text)) {
					sreachArea({
						area: this.search_text
					}).then(rs => {
						if(rs.data.length > 0) {
							this.results = [];
							for(var i = 0; i < rs.data.length; i++) this.results.push({
								title: rs.data[i]
							});
						}
					})
				}
			},
			resultClick(item) {
				this.title = item.title;
				this.is_search_focus = false;
				//跳转搜索结果页面
				this.$router.push('/p/search-result/' + item.title);
			},
			onFocus() {
				this.is_search_focus = true;
				var xheader = document.querySelector(".vux-header-title");
				xheader.classList.remove('title-after');
				sreachArea().then(rs => {
					if(rs.data.length > 0) {
						this.results = [];
						for(var i = 0; i < rs.data.length; i++) this.results.push({
							title: rs.data[i]
						});
					}
				})

			},
			onSearch() {
				this.$refs.search.setBlur();
			},
			//点击主产区和注销区时,是不同的用户行为模块
			buttonClick(index) {
				if(index == 0) {
					userAction({
						ticket: this.$store.state.ticket,
						module: 1521,
						cur_version: this.$store.state.cur_version
					})
				} else {
					userAction({
						ticket: this.$store.state.ticket,
						module: 1522,
						cur_version: this.$store.state.cur_version
					})
				}
			}
		},
		data() {
			return {
				title: '',
				loading: true,
				echart: null,
				type: 0,
				area: '',
				url: '',
				value: [],
				dates: ['周', '月', '季', '年'],
				tabArr: ['玉米', '豆粕'],
				addressData: [],
				cdate: 1,
				price_data: [],
				results: [{
					title: '' /*正在搜索中...*/
				}],
				search_text: '',
				is_search_focus: false,
				update_time: '',
				material_search: true
			}
		}

	}
</script>

<style lang="less">
	.vux-popup-picker-placeholder {
		color: #333333
	}
	
	.material-chart iframe {
		border: none;
		height: 60vh;
	}
	
	.ui-footer {
		position: fixed;
		bottom: 0;
		width: 100%;
	}
	
	.ui-tiled {
		display: -moz-box;
		display: -webkit-box;
		display: -ms-flexbox;
		display: box;
	}
	
	.ui-tiled li {
		-webkit-box-flex: 1;
		height: 50px;
		line-height: 50px;
		border-top: 1px solid #57B663;
		border-right: 1px solid #57B663;
		text-align: center;
		color: #333333;
		cursor: pointer;
		background: #FFFFFF;
	}
	
	.ui-tiled li:last-child {
		border-right: none;
	}
	
	.ui-tiled li.active {
		background: #57B663;
		color: #FFFFFF
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
</style>