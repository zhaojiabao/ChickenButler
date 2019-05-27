<template>
	<!--组件:地区选择-->
	<div class="sale-address">
		<group>
			<x-address :title="title" @on-hide="logHide" v-model="value" value-text-align="left" :list="addressData" :placeholder="$store.state.egg_price.area" :hide-district="is_chart">
				<template slot="title" scope="props">
					<div :class="props.labelClass" :style="props.labelStyle" style="height:24px;line-height: 24px;">
						<icon name="map-marker" scale="1.3" class="l" style="width: 20px;"></icon>
						<div class="l">当前定位为：</div>
					</div>
				</template>
			</x-address>
		</group>
		<br />
	</div>
</template>

<script>
	import { Cell, ButtonTab, ButtonTabItem, XAddress, Group, Value2nameFilter as value2name } from 'vux'
	import { salesAddress, productAddress } from '../../api/EggPrice'

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
				if(this.$route.query.area == undefined && this.value.length == 0) this.value = this.is_chart ? ['1', '1001'] : ['1', '1001', '100001'];
				//				if(this.$route.query.area == undefined && this.value.length == 0) this.value = this.is_chart ? ['1'] : ['1', '1001', '100001'];

				// 主产区和主销区
				if(this.$store.state.egg_price.type == 0 || this.$route.name == 'PriceForecast') {
					productAddress().then(rs => {
						if(rs.retcode == '2000') {
							if(this.$route.name == "PriceForecast") {
								this.value = this.is_chart ? ['1', '1001'] : ['1', '1001', '100001'];
								this.addressData = this.util.haddleAddressDataSmall(rs.data);
								this.$store.state.egg_price.area = this.addressData[0]['name'] + ',' + this.addressData[1]['name'];
							} else {
								this.value = this.is_chart ? ['1'] : ['1', '1001','100001'];
								this.addressData = this.util.haddleAddressData(rs.data);
								if(de_arr.indexOf(this.addressData[1]['name']) == -1) city_str = ',' + this.addressData[1]['name'];
								this.$store.state.egg_price.area = this.addressData[0]['name'] + city_str;
								if(this.$route.query.area != undefined) this.$store.state.egg_price.area = this.$route.query.area;
							}
						}
					})
				} else {
					salesAddress().then(rs => {
						if(rs.retcode == '2000') {
							this.addressData = this.util.haddleAddressData(rs.data);
							this.$store.state.egg_price.area = this.addressData[0]['name'];
							if(this.$route.query.area != undefined) this.$store.state.egg_price.area = this.$route.query.area;
						}
					})
				}
			},
			logHide(str) {
				if(str) {
					//获取地区参数
					if(de_arr.indexOf(this.getAddressName(this.value[1])) == -1) city_str = ',' + this.getAddressName(this.value[1]);
					this.$store.state.egg_price.area = this.getAddressName(this.value[0]) + city_str;
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

</style>