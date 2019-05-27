<template>
	<!--组件:地区选择-->
	<div class="sale-address">
		<group>
			<x-address style='color: #57b663;' :title="title " @on-hide="logHide" v-model="value" value-text-align="left" :list="addressData" :placeholder="$store.state.egg_price.area">
			</x-address>
		</group>
		<br />
	</div>
</template>

<script>
	import { Cell, ButtonTab, ButtonTabItem, XAddress, Group, Value2nameFilter as value2name } from 'vux'
	import { salesAddress, productAddress, getAllProdNav, linkageAddress, getChanNav } from '../../api/EggPrice'

	import 'vue-awesome/icons/map-marker'
	import Icon from 'vue-awesome/components/Icon'

	var city_str = '';
	var de_arr = ['全省', '全市'];

	export default {
		components: {
			ButtonTab,
			ButtonTabItem,
			Group,
			Icon,
			Cell,
			XAddress
		},
		data() {
			return {
				title: '',
				addressData: [],
				value: [],
				is_chart: true,
				newData: []
			}
		},
		mounted() {
			this.init();
		},
		watch: {
			'$store.state.egg_price.type': 'init'
		},
		methods: {
			// 初始化地区数据
			init() {
				// 判断是否是曲线页面
				if(this.$route.name == 'PriceChart') this.is_chart = false;
				if(this.$route.query.area == undefined && this.value.length == 0) this.value = this.is_chart ? ['1', '1001', '100001'] : ['1', '1001', '100001'];

				// 主产区和主销区
				if(this.$store.state.egg_price.type == 0) {
					if(this.$route.name == "PriceForecast") {
						linkageAddress().then(rs => {
							this.value['1', '1001'];
							this.addressData = this.util.haddleAddressDataSmall(rs.data);
							this.$store.state.egg_price.area = this.addressData[0]['name'] + ',' + this.addressData[1]['name'];
						})
					} else {
						getChanNav().then(rs => {
							if(rs.retcode == '2000') {
								this.addressData = this.util.haddleAddressData(rs.data);
								if(de_arr.indexOf(this.addressData[1]['name']) == -1) city_str = ',' + this.addressData[1]['name'];
								this.$store.state.egg_price.area = this.addressData[0]['name'];
								this.newsData = this.util.haddleSearchIndex(rs.data)
								this.newsData.forEach((item, index) => {
									if(item.name.indexOf(this.$store.state.zhuchan_area) > -1) {
										this.value = []
										this.value.push(item.value)
									}
								})
								this.$store.state.egg_price.area=this.$store.state.zhuchan_area
								if(this.$route.query.num != undefined) {
									if(this.$route.query.num.split(',').length == 1) {
										if(this.$route.query.num.split(',')[0] == '上海') {
											this.value = ['上海']
										} else {
											this.value = [this.$route.query.num.split(',')[0]]
										}

									} else if(this.$route.query.num.split(',').length == 2) {
										this.value = [this.$route.query.num.split(',')[0], this.$route.query.num.split(',')[1]]
										this.$store.state.egg_price.area = [this.$route.query.num.split(',')[0], this.$route.query.num.split(',')[1]]
									} else {
										this.value = [this.$route.query.num.split(',')[0], this.$route.query.num.split(',')[1], this.$route.query.num.split(',')[2]]
										this.$store.state.egg_price.area = [this.$route.query.num.split(',')[0], this.$route.query.num.split(',')[1], this.$route.query.num.split(',')[2]]
									}
								}
							}
						})
					}
				} else {
					salesAddress().then(rs => {
						if(rs.retcode == '2000') {
							this.addressData = this.util.haddleAddressData(rs.data);
							this.$store.state.egg_price.area = this.addressData[0]['name'];
							this.newsData = this.util.haddleSearchIndex(rs.data)
							this.newsData.forEach((item, index) => {
								if(item.name.indexOf(this.$store.state.sale_area) > -1) {
									this.value = []
									this.value.push(item.value)
								}
							})
						}
					})
				}
			},
			logHide(str) {
				if(str) {
					var area_arr = [];
					//获取地区参数
					if(de_arr.indexOf(this.getAddressName(this.value[1])) == -1) city_str = ',' + this.getAddressName(this.value[1]);
					this.$store.state.egg_price.area = this.getAddressName(this.value[0]) + city_str;
					for(var i = 0; i < this.value.length; i++) {
						var address_name = this.getAddressName(this.value[i]);
						if(address_name != '全省' && address_name != '全市') area_arr.push(this.getAddressName(this.value[i]));
					}
					this.$route.query.num = undefined
					if(this.$store.state.egg_price.type == 0) {
						this.$store.state.egg_price.area = area_arr.join(',');
						if(this.$store.state.egg_price.area.indexOf('北京,北京') > -1) {
							this.$store.state.egg_price.area = this.$store.state.egg_price.area.replace('北京,北京', '北京市')
						}
						if(this.$store.state.egg_price.area.indexOf('北京市县') > -1) {
							this.$store.state.egg_price.area = this.$store.state.egg_price.area.replace('北京市县', '北京市')
						}
						if(this.$store.state.egg_price.area.indexOf('天津,天津市') > -1) {
							this.$store.state.egg_price.area = this.$store.state.egg_price.area.replace('天津,天津市', '天津市')
						}
						if(this.$store.state.egg_price.area.indexOf('上海,上海') > -1) {
							this.$store.state.egg_price.area = this.$store.state.egg_price.area.replace('上海,上海', '上海市')
						}
						if(this.$store.state.egg_price.area.indexOf('天津,天津县') > -1) {
							this.$store.state.egg_price.area = this.$store.state.egg_price.area.replace('天津,天津县', '天津市')
						}
					} else {
						this.$store.state.egg_price.area = area_arr.join(',');
					}
				}
			},
			logShow(str) {},
			getAddressName(value) {
				for(var i = 0; i < this.addressData.length; i++) {
					if(value == this.addressData[i].value) return this.addressData[i].name;
				}
			},
			getAddressValue(name) {
				for(var i = 0; i < this.addressData.length; i++) {
					if(name == this.addressData[i].name) return this.addressData[i].value;
				}
			}
		}
	}
</script>
<style>
	.weui-cell__ft {
		display: none;
	}
	
	.sale-address {
		padding: 0;
		margin: 0;
		height: 35px;
		border: none;
	}
</style>