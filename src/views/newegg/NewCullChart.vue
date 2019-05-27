<template>
	<!--淘汰鸡曲线页面-->
	<div class="material-chart">
		<group>
			<x-address :title="title" @on-hide="logHide" v-model="value" value-text-align="left" :list="addressData" :placeholder="$store.state.chicken_area" :hide-district="false"></x-address>
		</group>
		<div class="price-yuan">
			<span v-if="new_rose>0">最新报价: <span style="color: #D0021B;">{{new_price.toFixed(2)}}</span> <img class="arrow" src="../../assets/up.png" alt="" /></span>
			<span v-else-if="new_rose==0">最新报价: {{new_price.toFixed(2)}} <img class="arrow-ping" src="../../assets/ping.png" alt="" /></span>
			<span v-else>最新报价: <span style="color: #57b663;">{{new_price.toFixed(2)}}</span> <img class="arrow" src="../../assets/down.png" alt="" /></span>
			<span class="type-name" @click="clickSelect">{{type_name}}</span>
		</div>
		<div class="price-company">单位:元 / 斤</div>
		<iframe width="100%" border="no" :src="url" class="ifr-egg-price"></iframe>
		<div class="egg-chart-article" v-for="(cull,index) in cull_new_list" @click="eggNewClick(cull.url)">
			{{cull.title}}
		</div>
		<div class="mask" v-if="is_search_focus"></div>
		<div class="tab fix-box">
			<router-link class="tab-item selected" style='width: 49%;border-right: 1px solid #CCCCCC;' to="/p/new-cullchart">
				<img src="../../assets/click_price.png" class="price-icon" alt="" /><br />
				<span>价格曲线</span>
			</router-link>
			<router-link class="tab-item" tag='div' to="/p/new-cullprice">
				<img src="../../assets/no_table.png" class="price-table" alt="" /><br />
				<span>表格详情</span>
			</router-link>
		</div>
		<actionsheet v-model="mar_chart_choose" :menus="mar_chart_list" @on-click-menu="clickMar"></actionsheet>
	</div>
</template>

<script>
	import { Cell, ButtonTab, ButtonTabItem, XAddress, Group, Search, Actionsheet } from 'vux'
	import { getChanNav, cullMouthPrice, getChartNew } from '../../api/EggPrice'
	import 'vue-awesome/icons/map-marker'
	import Icon from 'vue-awesome/components/Icon'
	import { userAction } from "../../api/api"

	let base = "https://api.danji.jianong.com/map/chart/chickout_price/";
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
			Search,
			Actionsheet
		},
		mounted() {
			this.menu();
			this.$store.state.header.title = '淘汰鸡价格行情';
			this.$store.state.price_type = 2;
			//如果在蛋鸡管家app中那么就让header和搜索框都不显示
			var ua = navigator.userAgent.toLowerCase();
			if(ua.indexOf('djgj_jn') > -1) {
				this.$store.state.header.is_show_header = false;
				this.material_search = false;
				if(this.$route.query.ticket != undefined) this.$store.state.ticket = this.$route.query.ticket;
			}
			getChanNav().then(rs => {
				this.addressData = this.util.haddleAddressData(rs.data);
			})

			userAction({
				ticket: this.$store.state.ticket,
				module: 1531,
				cur_version: this.$store.state.cur_version
			})
			getChartNew({
				type_id: 3
			}).then(res => {
				this.cull_new_list = res.data
				this.egg_new_title = res.data[0].title
				this.egg_new_id = res.data[0].url
			})
			
			this.init();
			
			if(typeof this.$route.query.address != 'undefined') {
				this.$store.state.chicken_area = this.$route.query.address;
			}
			
			if(this.$store.state.chicken_area.indexOf('北京,') > -1) {
				this.$store.state.chicken_area = this.$store.state.chicken_area.replace('北京,', '北京市,')
			}
			if(this.$store.state.chicken_area.indexOf('天津,') > -1) {
				this.$store.state.chicken_area = this.$store.state.chicken_area.replace('天津,', '天津市,')
			}
			if(this.$store.state.chicken_area.indexOf('上海,') > -1) {
				this.$store.state.chicken_area = this.$store.state.chicken_area.replace('上海,', '上海市,')
			}
		},
		watch: {
			'cdate': 'init',
			'$store.state.egg_price.type': 'init',
			'$store.state.chicken_area': {
				handler: function() {
					this.init()
				},
				deep: true
			}
		},
		methods: {
			eggNewClick(id) {
				this.$router.push('/p/news/detail/' + id)
			},
			menu() {
				window.scrollTo(0, 0);
			},
			clickSelect() {
				this.mar_chart_choose = true
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
				if(this.$store.state.chart_cdate != 0) {
					this.cdate = this.$store.state.chart_cdate;
					this.$store.state.chart_cdate = 0;
				}
				if(this.$route.query.num != undefined) {
					this.$store.state.chicken_area = this.$route.query.num
				}
				cullMouthPrice({
					area: this.$store.state.chicken_area
				}).then(res => {
					this.new_rose = res.data.price.slice(-1)[0] - res.data.price.slice(-2, -1)[0]
					this.new_price = parseFloat(res.data.price.slice(-1)[0]);
				})
				let cdate = cdate_arr[this.cdate];
				//判断是否是年价格曲线并且有没有通行证,如果没有就跳转到登录页面
				if(this.cdate == 3 && this.$store.state.ticket == null) {
					this.$store.state.chart_cdate = 3;
					this.$vux.toast.text('请登录后查看淘汰鸡年价格曲线!')
					this.$router.push('/p/login')
				}
				//为上方iframe的src
				this.url = `${base}type/${this.$store.state.egg_price.type}/area/${this.$store.state.chicken_area}/date/${cdate}`;

				//获取当前的年月日
				var d = new Date();
				var str = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
				var hello = encodeURIComponent(this.$store.state.chicken_area)

				this.$wechat.ready(() => {
					var title = str + '全国各地鸡蛋、原料、淘汰鸡价格';
					var link = 'https://m.danjiguanjia.com/#/p/new-cullchart?address=' + hello;
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
			onReady(instance) {
				this.echart = instance;
				this.init();
			},
			onClick(event, instance, echarts) {},
			logHide(str) {
				//添加全省全市数据
				if(str) {
					var area_arr = [];
					var address_name = '';
					for(var i = 0; i < this.value.length; i++) {
						address_name = this.getAddressName(this.value[i]);
						if(address_name != '全省' && address_name != '全市') area_arr.push(this.getAddressName(this.value[i]));
					}
					this.$route.query.num = undefined;
					this.$store.state.chicken_area = area_arr.join(',');
					if(this.$store.state.chicken_area.indexOf('北京,北京') > -1) {
						this.$store.state.chicken_area = this.$store.state.chicken_area.replace('北京,北京', '北京市')
					}
					if(this.$store.state.chicken_area.indexOf('北京市县') > -1) {
						console.log(this.$store.state.chicken_area)
						this.$store.state.chicken_area = this.$store.state.chicken_area.replace('北京市县', '北京市')
					}
					if(this.$store.state.chicken_area.indexOf('天津,天津市') > -1) {
						this.$store.state.chicken_area = this.$store.state.chicken_area.replace('天津,天津市', '天津市')
					}
					if(this.$store.state.chicken_area.indexOf('上海,上海') > -1) {
						this.$store.state.chicken_area = this.$store.state.chicken_area.replace('上海,上海', '上海市')
					}
					if(this.$store.state.chicken_area.indexOf('天津,天津县') > -1) {
						this.$store.state.chicken_area = this.$store.state.chicken_area.replace('天津,天津县', '天津市')
					}
				}

			},
			logShow(str) {},
			getAddressName(value) {
				for(var i = 0; i < this.addressData.length; i++) {
					if(value == this.addressData[i].value) return this.addressData[i].name;
				}
			},
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
				addressData: [],
				cdate: 0,
				price_data: [],
				results: [{
					title: '正在搜索中...' /**/
				}],
				search_text: '',
				is_search_focus: false,
				update_time: '',
				material_search: true, //搜索框  开始为真
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
				cull_new_list: []
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
		height: 70vh;
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
	
	.vux-popup-picker-placeholder {
		color: #57b663;
	}
</style>