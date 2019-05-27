<template>
	<div class="search-result">
		<group>
			<x-address :title="title" @on-hide="logHide" v-model="value" value-text-align="left" :list="addressData" :placeholder="$store.state.chicken_area" :hide-district="false"></x-address>
		</group>
		<div class="price-yuan">
			<div v-if="new_rose>0"><span style="color: #D0021B;">最新报价: {{new_price.toFixed(2)}}</span> <img class="arrow" src="../../assets/up.png" alt="" /></div>
			<div v-else-if="new_rose==0">最新报价: {{new_price.toFixed(2)}} <img class="arrow-ping" src="../../assets/ping.png" alt="" /></div>
			<div v-else><span style="color: #57b663;">最新报价:{{new_price.toFixed(2)}}</span> <img class="arrow" src="../../assets/down.png" alt="" /></div>
		</div>

		<x-table :cell-bordered="false" :content-bordered="false" style="margin-bottom: 60px;">
			<thead>
				<tr class="table-title">
					<th>地区</th>
					<th>淘汰鸡价格(元/斤)</th>
					<th>涨跌幅(元/斤)</th>
				</tr>
			</thead>
			<tbody>
				<template v-for="(data,index) in data.search">
					<tr :class="{'active-table':index%2!=0}" style="height: 35px;line-height: 35px;">
						<td>{{ data.name }}</td>
						<td>{{ parseFloat(data.price).toFixed(2)}}</td>
						<td><span :class="data.gains>0?'theme-color-red':'theme-color'" :style="{color:data.gains == 0?'#333':false}">{{ data.gains.toFixed(2) }}</span></td>
					</tr>
				</template>
			</tbody>
		</x-table>
		<div class="tab fix-box">
			<router-link class="tab-item" style='width: 49%;border-right: 1px solid #CCCCCC;' to="/p/new-cullchart">
				<img src="../../assets/no_price.png" class="price-icon" alt="" /><br />
				<span>价格曲线</span>
			</router-link>
			<router-link class="tab-item selected" tag='div' to="/p/new-cullprice">
				<img src="../../assets/cllck_table.png" class="price-table" alt="" /><br />
				<span>表格详情</span>
			</router-link>
		</div>
	</div>
</template>

<script>
	import { XTable, LoadMore, XAddress, Group } from 'vux';
	//	import SaleAddress from './NewSaleAddress'
	import { getCullData, getChanNav } from '../../api/EggPrice'
	export default {
		components: {
			XTable,
			LoadMore,
			//			SaleAddress,
			XAddress,
			Group
		},
		data() {
			return {
				data: [],
				type: 0,
				new_price: 0.00,
				new_rose: 0.00,
				value: [],
				area: '',
				addressData: [],
				title: ''
			}
		},
		watch: {
			'mt_type': 'init',
			'$store.state.chicken_area': {
				handler: function() {
					this.init();
				},
				deep: true
			}
		},
		mounted() {
			this.menu();
			this.$store.state.header.title = '淘汰鸡价格行情';

			if(this.$route.query.type != undefined) {
				this.$store.state.header.is_show_header = true;
				this.type = this.$route.query.type;
			} else {
				this.type = this.$store.state.price_type;
			}

			if(this.$route.query.num != undefined) {
				this.$store.state.chicken_area = this.$route.query.num
			}
			getChanNav().then(rs => {
				this.addressData = this.util.haddleChickenAddressData(rs.data);
			})
			var ua = navigator.userAgent.toLowerCase();
			if(ua.indexOf('djgj_jn') > -1) {
				this.$store.state.header.is_show_header = false;
			}
			this.init();

			if(typeof this.$route.query.address != 'undefined') {
				this.$store.state.chicken_area = this.$route.query.address;
			}
			if(this.$store.state.chicken_area.indexOf('北京市') > -1) {
				this.$store.state.chicken_area = this.$store.state.chicken_area.replace('北京市', '北京')
			}
			if(this.$store.state.chicken_area.indexOf('北京县') > -1) {
				this.$store.state.chicken_area = this.$store.state.chicken_area.replace('北京县', '北京')
			}
			if(this.$store.state.chicken_area.indexOf('天津市') > -1) {
				this.$store.state.chicken_area = this.$store.state.chicken_area.replace('天津市', '天津')
			}
			if(this.$store.state.chicken_area.indexOf('上海市') > -1) {
				this.$store.state.chicken_area = this.$store.state.chicken_area.replace('上海市', '上海')
			}
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

				//原料
				this.$vux.loading.show({
					text: 'Loading'
				})
				if(this.$route.query.num != undefined) {
					this.$store.state.chicken_area = this.$route.query.num
				}
				getCullData({
					area: this.$store.state.chicken_area,
					ticket: this.$store.state.ticket
				}).then(rs => {
					this.new_price = parseFloat(rs.data.search[0].price);
					this.new_rose = rs.data.search[0].gains;
					this.data = rs.data;
					this.$vux.loading.hide()
				})
				var hello_str = encodeURIComponent(this.$store.state.chicken_area)
				this.$wechat.ready(() => {
					var title = str + '全国各地鸡蛋、原料、淘汰鸡价格';
					var link = 'https://m.danjiguanjia.com/#/p/new-cullprice?address=' + hello_str;
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
					var reg = /,$/g;
					var area_arr = [];
					var address_name = '';
					for(var i = 0; i < this.value.length; i++) {
						address_name = this.getAddressName(this.value[i]);
						if(address_name != '全省' && address_name != '全市') area_arr.push(this.getAddressName(this.value[i]));
					}
					this.$store.state.chicken_area = area_arr.join(',')
					if(this.$store.state.chicken_area.indexOf('北京,北京') > -1) {
						this.$store.state.chicken_area = this.$store.state.chicken_area.replace('北京,北京', '北京')
					}
					if(this.$store.state.chicken_area.indexOf('北京县') > -1) {
						this.$store.state.chicken_area = this.$store.state.chicken_area.replace('北京县', '北京')
					}
					if(this.$store.state.chicken_area.indexOf('天津,天津市') > -1) {
						this.$store.state.chicken_area = this.$store.state.chicken_area.replace('天津,天津市', '天津')
					}
					if(this.$store.state.chicken_area.indexOf('上海,上海') > -1) {
						this.$store.state.chicken_area = this.$store.state.chicken_area.replace('上海,上海', '上海市')
					}
					if(this.$store.state.chicken_area.indexOf('天津,天津县') > -1) {
						this.$store.state.chicken_area = this.$store.state.chicken_area.replace('天津,天津县', '天津')
					}
					if(this.$store.state.chicken_area.indexOf('上海市') > -1) {
						this.$store.state.chicken_area = this.$store.state.chicken_area.replace('上海市', '上海')
					}
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
	.search-result {
		padding-bottom: 60px;
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