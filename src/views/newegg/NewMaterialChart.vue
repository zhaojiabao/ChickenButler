<template>
	<!--原料价格曲线-->
	<div class="material-chart">
		<div class="select-type">
			<tab v-model="$store.state.egg_price.m_type">
				<tab-item @on-item-click="buttonClick(0)">玉米</tab-item>
				<tab-item @on-item-click="buttonClick(1)">豆粕</tab-item>
			</tab>
			</tab>
		</div>
		<div class="line"></div>
		<group>
			<x-address :title="title" @on-hide="logHide" v-model="value" value-text-align="left" :list="addressData" :placeholder="$store.state.mater_area" :hide-district="false"></x-address>
		</group>
		<div class="price-yuan">
			<span v-if="new_rose>0">最新报价: <span style="color: #D0021B;">{{new_price.toFixed(2)}}</span> <img class="arrow" src="../../assets/up.png" alt="" /></span>
			<span v-else-if="new_rose==0">最新报价: {{new_price.toFixed(2)}} <img class="arrow-ping" src="../../assets/ping.png" alt="" /></span>
			<span v-else>最新报价: <span style="color: #57b663;">{{new_price.toFixed(2)}}</span> <img class="arrow" src="../../assets/down.png" alt="" /></span>
			<span class="type-name" @click="clickSelect">{{type_name}}</span>
		</div>
		<div class="price-company">单位:元 / 吨</div>
		<iframe width="100%" border="no" :src="url"></iframe>

		<div class="egg-chart-article" v-for="(mater,index) in mater_new_list" @click="eggNewClick(mater.url)">
			{{mater.title}}
		</div>
		<div class="tab fix-box">
			<router-link class="tab-item selected" style='width: 49%;border-right: 1px solid #CCCCCC;' to="/p/new-materialchart">
				<img src="../../assets/click_price.png" class="price-icon" alt="" /><br />
				<span>价格曲线</span>
			</router-link>
			<router-link class="tab-item" tag='div' to="/p/new-materialprice">
				<img src="../../assets/no_table.png" class="price-table" alt="" /><br />
				<span>表格详情</span>
			</router-link>
		</div>
		<div class="mask" v-if="is_search_focus"></div>
		<actionsheet v-model="mar_chart_choose" :menus="mar_chart_list" @on-click-menu="clickMar"></actionsheet>
	</div>
</template>

<script>
	import { Cell, Tab, TabItem, XAddress, Group, Search, Actionsheet } from 'vux'
	import { feedMouthPrice, getChartNew, getMaterList } from '../../api/EggPrice'
	import { userAction } from "../../api/api"
	import 'vue-awesome/icons/map-marker'
	import Icon from 'vue-awesome/components/Icon'

	let base = "https://api.danji.jianong.com/map/chart/feed_price/";
	let cdate_arr = ['w', 'm', 'q', 'y'];
	//匹配汉字
	var regZH = new RegExp("[\\u4E00-\\u9FFF]+", "g");
	export default {
		components: {
			Cell,
			Tab,
			TabItem,
			XAddress,
			Group,
			Icon,
			Search,
			Actionsheet
		},
		mounted() {
			this.menu();
			this.$store.state.header.title = '原料价格行情';
			this.$store.state.price_type = 1;
			//如果在蛋鸡管家app中那么就让header和搜索框都不显示
			var ua = navigator.userAgent.toLowerCase();
			if(ua.indexOf('djgj_jn') > -1) {
				this.$store.state.header.is_show_header = false;
				this.material_search = false;
				if(this.$route.query.ticket != undefined) this.$store.state.ticket = this.$route.query.ticket;
			}
			//			this.area = this.util.deepClone(this.$store.state.egg_price.area);
			if(this.$route.query.area != undefined) {
				this.$store.state.mater_area = decodeURI(this.$route.query.area);
			}
			getMaterList().then(rs => {
				this.addressData = this.util.haddleMaterAddressData(rs.data);
			})
			userAction({
				ticket: this.$store.state.ticket,
				module: 1523,
				cur_version: this.$store.state.cur_version
			})
			getChartNew({
				type_id: 2
			}).then(res => {
				this.mater_new_list = res.data
			})
			//			if(this.$store.state.mater_area.indexOf('天津') > -1) {
			//				this.$store.state.mater_area = this.$store.state.mater_area.replace('天津', '天津,天津市')
			//			}
			//			if(this.$store.state.mater_area.indexOf('北京') > -1) {
			//				this.$store.state.mater_area = this.$store.state.mater_area.replace('北京', '北京,北京市')
			//			}

			//			if(this.$store.state.mater_area.indexOf('上海,') > -1) {
			//				this.$store.state.mater_area = this.$store.state.mater_area.replace('上海,', '上海,上海市,')
			//			}
			this.init();
			if(typeof this.$route.query.address != 'undefined') {
				this.$store.state.mater_area = this.$route.query.address;
			}
			if(this.$store.state.mater_area.indexOf('北京,密云县') > -1) {
				this.$store.state.mater_area = this.$store.state.mater_area.replace('北京,密云县', '北京,北京县,密云县')
			}
			if(this.$store.state.mater_area.indexOf('北京,延庆县') > -1) {
				this.$store.state.mater_area = this.$store.state.mater_area.replace('北京,延庆县', '北京,北京县,延庆县')
			}
			if(this.$store.state.mater_area.indexOf('上海,崇明县') > -1) {
				this.$store.state.mater_area = this.$store.state.mater_area.replace('上海,崇明县', '上海,上海县,崇明县')
			}
		},
		watch: {
			'$store.state.mater_area': 'init',
			'$store.state.egg_price.m_type': 'init',
			'cdate': 'init',

		},
		methods: {
			eggNewClick(id) {
				this.$router.push('/p/news/detail/' + id)
			},
			clickSelect() {
				this.mar_chart_choose = true
			},
			menu() {
				window.scrollTo(0, 0);
			},
			clickMar(menuKey) {
				this.cdate = menuKey;
				if(menuKey == 0) {
					this.type_name = '周'
				} else if(menuKey == 1) {
					this.type_name = '月'
				} else if(menuKey == 2) {
					this.type_name = '季'
				} else {
					this.type_name = '年'
				}
			},
			init() {
				if(this.$route.query.num != undefined) {
					this.$store.state.mater_area = this.$route.query.num
				}
				if(this.$route.query.num != undefined && this.$route.query.num.indexOf('北京市') > -1) {
					this.$store.state.mater_area = this.$route.query.num.replace('北京市', '北京,北京市')
				}
				if(this.$route.query.num != undefined && this.$route.query.num.indexOf('上海') > -1) {
					this.$store.state.mater_area = this.$route.query.num.replace('上海', '上海,上海市')
				}
//				if(this.$store.state.mater_area.indexOf('上海,') > -1 && this.$store.state.mater_area.indexOf('区') > -1) {
//					this.$store.state.mater_area=this.$store.state.mater_area.split().splice(2, 0, ['上','海','市']).join();
//					console.log(111)
//				}
				feedMouthPrice({
					area: this.$store.state.mater_area,
					type: this.$store.state.egg_price.m_type
				}).then(res => {
					this.new_rose = res.data.price.slice(-1)[0] - res.data.price.slice(-2, -1)[0]
					this.new_price = parseFloat(res.data.price.slice(-1)[0]);
				})

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
				if(typeof this.$route.query.type != 'undefined') {
					this.$store.state.egg_price.m_type = parseInt(this.$route.query.type)
				}
				this.url = `${base}type/${this.$store.state.egg_price.m_type}/area/${this.$store.state.mater_area}/date/${cdate}`;
				var hello_str = encodeURIComponent(this.$store.state.mater_area)
				this.$wechat.ready(() => {
					var title = str + '全国各地鸡蛋、原料、淘汰鸡价格';
					var link = 'https://m.danjiguanjia.com/#/p/new-materialchart?address=' + hello_str+ '&type=' + this.$store.state.egg_price.m_type;
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
			logHide(str) {
				if(str) {
					var area_arr = [];
					var address_name = '';
					//添加全省全市数据
					for(var i = 0; i < this.value.length; i++) {
						address_name = this.getAddressName(this.value[i]);
						if(address_name != '全市') area_arr.push(this.getAddressName(this.value[i]));
					}
					this.$route.query.num = undefined
					this.$store.state.mater_area = area_arr.join(',');
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
				//				type: 0,
				area: '',
				url: '',
				value: [],
				dates: ['周', '月', '季', '年'],
				tabArr: ['玉米', '豆粕'],
				addressData: [],
				cdate: 0,
				price_data: [],
				results: [{
					title: '' /*正在搜索中...*/
				}],
				search_text: '',
				is_search_focus: false,
				update_time: '',
				material_search: true,
				mar_chart_list: {
					0: '周',
					1: '月',
					2: '季',
					3: '年'
				},
				type_name: '周',
				mar_chart_choose: false,
				new_price: 0.00,
				new_rose: 0.00,
				egg_new_title: '',
				egg_new_id: '',
				mater_new_list: []
			}
		}

	}
</script>

<style lang="less">
	.vux-popup-picker-placeholder {
		color: #333333
	}
	
	.material-chart {
		padding-bottom: 70px;
	}
	
	.material-chart iframe {
		border: none;
		height: 65vh;
		margin-bottom: 10px;
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
	
	.vux-popup-picker-placeholder,
	.vux-popup-picker-value {
		color: #57B663;
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
		border-top: 8px solid #57B663;
	}
	
	.price-yuan {
		margin-left: 15px;
		padding: 10px 0;
	}
</style>