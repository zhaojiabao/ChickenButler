<template>
	<div class="search-result">
		<div class="select-type">
			<tab v-model="$store.state.egg_price.m_type">
				<tab-item @on-item-click="buttonClick(0)">玉米</tab-item>
				<tab-item @on-item-click="buttonClick(1)">豆粕</tab-item>
			</tab>
		</div>
		<div class="line"></div>
		<group>
			<x-address :title="title" @on-hide="logHide" v-model="value" value-text-align="left" :list="addressData" :placeholder="$store.state.mater_area" :hide-district="false"></x-address>
		</group>
		<div class="price-yuan">
			<div v-if="new_rose>0">最新报价: <span style="color: #D0021B;">{{new_price.toFixed(2)}}</span> <img class="arrow" src="../../assets/up.png" alt="" /></div>
			<div v-else-if="new_rose==0">最新报价: {{new_price.toFixed(2)}} <img class="arrow-ping" src="../../assets/ping.png" alt="" /></div>
			<div v-else>最新报价: <span style="color: #57b663;">{{new_price.toFixed(2)}}</span> <img class="arrow" src="../../assets/down.png" alt="" /></div>
		</div>
		<x-table :cell-bordered="false" :content-bordered="false">
			<thead>
				<tr class="table-title">
					<th>地区</th>
					<th>{{ current_type.title }}价格{{ current_type.unit }}</th>
					<th>涨跌幅{{ current_type.unit }}</th>
				</tr>
			</thead>
			<tbody>
				<template v-for="(data,index) in data.search">
					<tr :class="{'active-table':index%2!=0}" style="height: 35px;line-height: 35px;">
						<td>{{ data.name }}</td>
						<td>{{ data.price}}</td>
						<td><span :class="data.gains>0?'theme-color-red':'theme-color'" :style="{color:data.gains == 0?'#333':false}">{{ data.gains.toFixed(2)}}</span></td>
					</tr>
				</template>
			</tbody>
		</x-table>
		<div class="tab fix-box">
			<router-link class="tab-item" style='width: 49%;border-right: 1px solid #CCCCCC;' to="/p/new-materialchart">
				<img src="../../assets/no_price.png" class="price-icon" alt="" /><br />
				<span>价格曲线</span>
			</router-link>
			<router-link class="tab-item selected" tag='div' to="/p/new-materialprice">
				<img src="../../assets/cllck_table.png" class="price-table" alt="" /><br/>
				<span>表格详情</span>
			</router-link>
		</div>
	</div>
</template>

<script>
	import { XTable, LoadMore, Tab, TabItem, XAddress, Group } from 'vux';
	import { getMaterList, getMarList } from '../../api/EggPrice'
	import { userAction } from "../../api/api"
	export default {
		components: {
			XTable,
			LoadMore,
			Tab,
			TabItem,
			XAddress,
			Group
		},
		data() {
			return {
				data: [],
				tabArr: ['玉米', '豆粕'],
				type: 0,
				//				$store.state.egg_price.m_type: 0,
				search_type: [{
					title: '鸡蛋',
					unit: '(元/斤)'
				}, {
					title: '玉米',
					unit: '(元/吨)'
				}, {
					title: '豆粕',
					unit: '(元/吨)'
				}, {
					title: '淘汰鸡',
					unit: '(元/斤)'
				}],
				current_type: {
					title: '',
					unit: ''
				},
				new_price: 0.00,
				new_rose: 0.00,
				value: [],
				area: '',
				addressData: [],
				title: ''
			}
		},
		watch: {
			'$store.state.egg_price.m_type': 'init',
			'$store.state.mater_area': {
				handler: function() {
					this.init();
				},
				deep: true
			}
		},
		mounted() {
			this.menu();
			getMaterList().then(rs => {
				this.addressData = this.util.haddleMaterAddressData(rs.data);
			})
			this.$store.state.header.title = '原料价格行情';

			if(this.$route.query.type != undefined) {
				this.$store.state.header.is_show_header = true;
				this.type = this.$route.query.type;
			} else {
				this.type = this.$store.state.price_type;
			}

			var ua = navigator.userAgent.toLowerCase();
			if(ua.indexOf('djgj_jn') > -1) {
				this.$store.state.header.is_show_header = false;
			}

			if(typeof this.$route.query.address != 'undefined') {
				this.$store.state.mater_area = this.$route.query.address;
			}

			if(this.$store.state.mater_area.indexOf('上海,上海市') > -1) {
				this.$store.state.mater_area = this.$store.state.mater_area.replace('上海,上海市', '上海')
			}
			if(this.$store.state.mater_area.indexOf('上海,上海县') > -1) {
				this.$store.state.mater_area = this.$store.state.mater_area.replace('上海,上海县', '上海')
			}
			if(this.$store.state.mater_area.indexOf('北京,北京市') > -1) {
				this.$store.state.mater_area = this.$store.state.mater_area.replace('北京,北京市', '北京')
			}
			if(this.$store.state.mater_area.indexOf('北京,北京县') > -1) {
				this.$store.state.mater_area = this.$store.state.mater_area.replace('北京,北京县', '北京')
			}
			if(this.$store.state.mater_area.indexOf('天津,天津县') > -1) {
				this.$store.state.mater_area = this.$store.state.mater_area.replace('天津,天津县', '天津')
			}
			if(this.$store.state.mater_area.indexOf('天津,天津市') > -1) {
				this.$store.state.mater_area = this.$store.state.mater_area.replace('天津,天津市', '天津')
			}
			this.init();
		},
		methods: {
			menu() {
				window.scrollTo(0, 0);
			},
			init() {
				var d = new Date();
				var str = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
				var u = navigator.userAgent;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if(this.$store.state.egg_price.m_type == 0) {
					this.current_type = this.search_type[1];
				} else {
					this.current_type = this.search_type[2];
				}
				if(typeof this.$route.query.type != 'undefined') {
					this.$store.state.egg_price.m_type = this.$route.query.type
				}
				//原料
				this.$vux.loading.show({
					text: 'Loading'
				})
				if(this.$route.query.num != undefined) {
					this.$store.state.mater_area = this.$route.query.num
				}
				getMarList({
					area: this.$store.state.mater_area,
					type: this.$store.state.egg_price.m_type + 1
				}).then(rs => {
					this.data = rs.data;
					this.new_price = parseFloat(rs.data.search[0].price);
					this.new_rose = parseFloat(rs.data.search[0].gains);
					this.$vux.loading.hide()
				})
				var hello_str = encodeURIComponent(this.$store.state.mater_area)
				this.$wechat.ready(() => {
					var title = str + '全国各地鸡蛋、原料、淘汰鸡价格';
					var link = 'https://m.danjiguanjia.com/#/p/new-materialprice?address=' + hello_str + '&type=' + this.$store.state.egg_price.m_type;
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
					for(var i = 0; i < this.value.length; i++) {
						address_name = this.getAddressName(this.value[i]);
						if(address_name != '市辖区') area_arr.push(this.getAddressName(this.value[i]));
					}
					this.$store.state.mater_area = area_arr.join(',');
					if(this.$store.state.mater_area.indexOf('上海,上海市') > -1) {
						this.$store.state.mater_area = this.$store.state.mater_area.replace('上海,上海市', '上海')
					}
					if(this.$store.state.mater_area.indexOf('上海,上海县') > -1) {
						this.$store.state.mater_area = this.$store.state.mater_area.replace('上海,上海县', '上海')
					}
					if(this.$store.state.mater_area.indexOf('北京,北京县') > -1) {
						this.$store.state.mater_area = this.$store.state.mater_area.replace('北京,北京县', '北京')
					}
				}
			},
			getAddressName(value) {
				for(var i = 0; i < this.addressData.length; i++) {
					if(value == this.addressData[i].value) return this.addressData[i].name;
				}
			},
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
				this.$router.push('/p/new-materialchart')
			}
		}
	}
</script>

<style lang="less">
	.search-result {
		h2.theme-color {
			text-align: center;
			margin: 20px 0;
			font-size: 18px;
		}
		.bottom {
			width: 50%;
			margin: 30px auto;
			text-align: center;
			font-size: 14px;
			img {
				width: 80%;
				display: block;
				margin: 10px auto;
				margin-top: 30px;
			}
		}
		.empty-data {
			display: block;
			margin: 0 auto;
			margin-top: 40px;
		}
	}
</style>