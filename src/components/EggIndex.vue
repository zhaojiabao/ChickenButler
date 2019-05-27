<template>
	<div class="price-index">
		<div class="price-info">
			<div class="price-top">
				<div class="price-info-left">
					<div>
						<x-address :title="title" style='padding: 0;' @on-hide="logHide" v-model="value" value-text-align="left" :list="addressData" :placeholder="$store.state.zhuchan_area"></x-address>
					</div>
					<div class="price-info-list">
						<p>{{area_price.toFixed(2)}}元 / 斤</p>
						<p>( 产区 )</p>
						<p>
							<div v-if="area_gains>0"><span style="color: #D0021B;">{{area_gains.toFixed(2)}}</span> <img class="arrow" src="../assets/up.png" alt="" /></div>
							<div v-else-if="area_gains==0"><img class="arrow-ping" src="../assets/ping.png" alt="" /></div>
							<div v-else><span style="color: #57b663;">{{(area_gains*-1).toFixed(2)}}</span> <img class="arrow" src="../assets/down.png" alt="" /></div>
						</p>
					</div>
				</div>
				<div class="price-info-right">
					<div>
						<x-address :title="title" style='padding: 0;' @on-hide="saleHide" v-model="sale_value" value-text-align="left" :list="saleAddressData" :placeholder="$store.state.sale_area"></x-address>
					</div>
					<div class="price-info-list1">
						<p>{{sale_price.toFixed(2)}}元 / 斤</p>
						<p>( 销区 )</p>
						<p>
							<div v-if="sale_gains>0"><span style="color: #D0021B;">{{sale_gains.toFixed(2)}}</span> <img class="arrow" src="../assets/up.png" alt="" /></div>
							<div v-else-if="sale_gains==0"><img class="arrow-ping" src="../assets/ping.png" alt="" /></div>
							<div v-else><span style="color: #57b663;">{{(sale_gains*-1).toFixed(2)}}</span> <img class="arrow" src="../assets/down.png" alt="" /></div>
						</p>
					</div>
				</div>
			</div>
			<div class="price-time">
				更新时间 : {{egg_update_time}}
			</div>
			<div class="price-bottom" @click="eggClick">
				鸡蛋价格行情
			</div>
		</div>
		<div class="material-info">
			<div class="price-top">
				<div class="price-info-left">
					<div>
						<x-address :title="title" style='padding: 0;' @on-hide="materHide" v-model="mater_value" value-text-align="left" :list="marterAddressData" :placeholder='$store.state.mater_area'></x-address>
					</div>
					<div class="price-info-list">
						<p>{{corn_price.toFixed(2)}}元 / 吨</p>
						<p>( 玉米 )</p>
						<p>
							<div v-if="corn_rose>0"><span style="color: #D0021B;">{{corn_rose.toFixed(2)}}</span> <img class="arrow" src="../assets/up.png" alt="" /></div>
							<div v-else-if="corn_rose==0"><img class="arrow-ping" src="../assets/ping.png" alt="" /></div>
							<div v-else><span style="color: #57b663;">{{(corn_rose*-1).toFixed(2)}}</span> <img class="arrow" src="../assets/down.png" alt="" /></div>
						</p>
					</div>
				</div>
				<div class="price-info-right">
					<div class="price-info-list1" style="margin-top: 45px;">
						<p>{{bean_price.toFixed(2)}}元 / 吨</p>
						<p>( 豆粕 )</p>
						<p>
							<div v-if="bean_rose>0"><span style="color: #D0021B;">{{bean_rose.toFixed(2)}}</span> <img class="arrow" src="../assets/up.png" alt="" /></div>
							<div v-else-if="bean_rose==0"><img class="arrow-ping" src="../assets/ping.png" alt="" /></div>
							<div v-else><span style="color: #57b663;">{{(bean_rose*-1).toFixed(2)}}</span> <img class="arrow" src="../assets/down.png" alt="" /></div>
						</p>
					</div>
				</div>
			</div>
			<div class="price-time">
				更新时间 : {{mater_update_time}}
			</div>
			<div class="price-bottom" @click="marterClick">
				原料价格行情
			</div>
		</div>
		<div class="chicken-info">
			<div class="chicken-top">
				<div>
					<x-address :title="title" style='padding: 0;' @on-hide="chickenHide" v-model="chicken_value" value-text-align="left" :list="chickenData" :placeholder='$store.state.chicken_area'></x-address>
				</div>
				<div class="price-info-list1">
					<p>{{chicken_price.toFixed(2)}}元 / 斤</p>
					<p>
						<div v-if="chicken_rose>0"><span style="color: #D0021B;">{{chicken_rose.toFixed(2)}}</span> <img class="arrow" src="../assets/up.png" alt="" /></div>
						<div v-else-if="chicken_rose==0"><img class="arrow-ping" src="../assets/ping.png" alt="" /></div>
						<div v-else><span style="color: #57b663;">{{(chicken_rose*-1).toFixed(2)}}</span> <img class="arrow" src="../assets/down.png" alt="" /></div>
					</p>
				</div>
				<div class="price-time">
					更新时间 : {{chicken_updata_time}}
				</div>
			</div>
			<div class="price-bottom" style="border: none;" @click="cullClick">
				淘汰鸡价格行情
			</div>
		</div>
	</div>
</template>

<script>
	import { linkageAddress, getDayEggPrice, getSaleAddressList, getSaleSearchList, getMaterList, marSearchList, getChickenList, getChickenPrice, productData, getCitys, getChanquAddress } from '../api/EggPrice'
	import { userAction } from '../api/api'
	import { XAddress } from 'vux'
	var city_str = '';
	var de_arr = ['全省', '全市'];
	export default {
		components: {
			XAddress
		},
		data() {
			return {
				city: '北京',
				value: [],
				sale_value: [],
				addressData: [], //主产区的地区数据
				title: '',
				area_price: 0.00, //主产区平均价格
				area_gains: 0.00, //主产区涨幅数
				saleAddressData: [], //主销区的地区数据
				sale_price: 0.00, //主销区平均价格
				sale_gains: 0.00, //主销区涨幅数
				marterAddressData: [], //原料的地区数据
				mater_value: [],
				egg_update_time: '', //鸡蛋报价时间
				mater_update_time: '', //原料报价时间
				corn_price: 0.00, //玉米价格
				corn_rose: 0.00, //玉米涨幅
				bean_price: 0.00, //豆粕价格
				bean_rose: 0.00, //豆粕涨幅
				chickenData: [],
				chicken_value: [],
				chicken_updata_time: '',
				chicken_price: 0.00,
				chicken_rose: 0.00,
				position_address: '',
				jing_wei: [], //承接经纬度的数组
				chanAddress: '', //通过接口获取就近的主产区地址
				xiaoAddress: '', //通过接口获取就近的主销区地址
			}
		},
		mounted() {
			var jingwei = ''
			this.$store.state.header.title = '价格行情';
			getCitys().then(res => {
				if(res.content.address_detail.province.indexOf('市') > -1) {
					res.content.address_detail.province = res.content.address_detail.province.slice(0, -1)
				}
				if(res.content.address_detail.province.indexOf('省') > -1) {
					res.content.address_detail.province = res.content.address_detail.province.slice(0, -1)
				}
				this.position_address = res.content.address_detail.province
				this.jing_wei.push(res.content.point.x)
				this.jing_wei.push(res.content.point.y)
			})
			setTimeout(() => {
				this.getMaterList();
				this.getChickenList();
				getChanquAddress({
//					ticket: localStorage.getItem('ticket'),
					lonlat: this.jing_wei.join(','),
					type: 0
				}).then(res => {
					console.log(res)
					this.chanAddress = res.data.province
				})
				getChanquAddress({
//					ticket: localStorage.getItem('ticket'),
					lonlat: this.jing_wei.join(','),
					type: 1
				}).then(res => {
					this.xiaoAddress = res.data.province
				})
			}, 500)
			setTimeout(() => {
				this.getAreaList();
				this.getSaleAreaList();
			}, 1500)
			var d = new Date();
			var str = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

			var hello_str = encodeURIComponent(this.$store.state.chicken_area)
			this.$wechat.ready(() => {
				var title = str + '全国各地鸡蛋、原料、淘汰鸡价格';
				var link = 'https://m.danjiguanjia.com/#/p/egg-index';
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
		methods: {
			//点击鸡蛋价格行情
			eggClick() {
				this.$router.push('/p/new-eggchart')
				userAction({
					ticket: this.$store.state.ticket,
					module: 151,
					cur_version: this.$store.state.cur_version
				})
			},
			//点击原料价格行情
			marterClick() {
				this.$router.push('/p/new-materialchart')
				userAction({
					ticket: this.$store.state.ticket,
					module: 152,
					cur_version: this.$store.state.cur_version
				})
			},
			//点击淘汰鸡价格行情
			cullClick() {
				this.$router.push('/p/new-cullchart')
				userAction({
					ticket: this.$store.state.ticket,
					module: 153,
					cur_version: this.$store.state.cur_version
				})
			},
			//获取主产区数据
			getAreaList() {
				linkageAddress().then(rs => {
					this.addressData = this.util.haddleSearchIndex(rs.data);
					this.$store.state.zhuchan_area = this.addressData[0]['name'];
					this.addressData.forEach((item, index) => {
						if(item.name.indexOf(this.chanAddress) > -1) {
							this.value.push(item.value)
						}
					})
					productData({
						area: this.chanAddress
					}).then(res => {
						this.area_price = parseFloat(res.data[0].price)
						this.area_gains = res.data[0].gains
						this.egg_update_time = res.data[0].savetime
					})
				})
			}, //获取主销区数据
			getSaleAreaList() {
				getSaleAddressList().then(rs => {
					this.saleAddressData = this.util.haddleSearchIndex(rs.data);
					this.$store.state.sale_area = this.saleAddressData[0]['name'];
					this.saleAddressData.forEach((item, index) => {
						if(item.name.indexOf(this.xiaoAddress) > -1) {
							this.sale_value.push(item.value)
						}
					})
					getSaleSearchList({
						area: this.xiaoAddress,
//						ticket: this.$store.state.ticket
					}).then(res => {
						this.sale_price = parseFloat(res.data[0].price)
						this.sale_gains = res.data[0].gains
					})
				})
			},
			//获取原料数据
			getMaterList() {
				getMaterList().then(rs => {
					this.marterAddressData = this.util.haddleSearchIndex(rs.data);

					this.marterAddressData.forEach((item, index) => {
						if(item.name.indexOf(this.position_address) > -1) {
							this.mater_value.push(item.value)
						}
					})
					this.$store.state.mater_area = this.position_address
					marSearchList({
						type: 1,
						area: this.position_address
					}).then(res => {
						this.mater_update_time = res.data.saveTime;
						this.corn_price = parseFloat(res.data.search[0].price);
						this.corn_rose = parseFloat(res.data.search[0].gains);
					})

					marSearchList({
						type: 2,
						area: this.position_address
					}).then(res => {
						this.bean_price = parseFloat(res.data.search[0].price);
						this.bean_rose = parseFloat(res.data.search[0].gains);
					})
				})
			},
			//获取淘汰鸡数据
			getChickenList() {
				getChickenList().then(res => {
					this.chickenData = this.util.haddleSearchIndex(res.data);

					this.chickenData.forEach((item, index) => {
						if(item.name.indexOf(this.position_address) > -1) {
							this.chicken_value.push(item.value)
						}
					})
					this.$store.state.chicken_area = this.position_address
					getChickenPrice({
						area: this.position_address
					}).then(res => {
						this.chicken_updata_time = res.data.saveTime
						this.chicken_price = parseFloat(res.data.search[0].price);
						this.chicken_rose = parseFloat(res.data.search[0].gains)
					})
				})
			},
			//主销区选择其他的地区加载不同的数据
			saleHide(str) {
				if(str) {
					//获取地区参数
					this.$store.state.sale_area = this.getSaleAddress(this.sale_value[0]);
					getSaleSearchList({
						area: this.$store.state.sale_area
					}).then(res => {
						this.sale_price = parseFloat(res.data[0].price)
						this.sale_gains = parseFloat(res.data[0].gains)
					})
				}
			},
			//主产区选择其他的地区加载不同的数据
			logHide(str) {
				if(str) {
					//获取地区参数
					this.$store.state.zhuchan_area = this.getAddressName(this.value[0]);
					productData({
						area: this.$store.state.zhuchan_area
					}).then(res => {
						this.area_price = parseFloat(res.data[0].price)
						this.area_gains = parseFloat(res.data[0].gains)
					})
				}
			},
			getAddressName(value) {
				for(var i = 0; i < this.addressData.length; i++) {
					if(value == this.addressData[i].value) return this.addressData[i].name;
				}
			},
			getSaleAddress(value) {
				for(var i = 0; i < this.saleAddressData.length; i++) {
					if(value == this.saleAddressData[i].value) return this.saleAddressData[i].name;
				}
			},
			getMateName(value) {
				for(var i = 0; i < this.marterAddressData.length; i++) {
					if(value == this.marterAddressData[i].value) return this.marterAddressData[i].name;
				}
			},
			getChickenName(value) {
				for(var i = 0; i < this.chickenData.length; i++) {
					if(value == this.chickenData[i].value) return this.chickenData[i].name;
				}
			},
			//原料选择其他的地区加载不同的数据
			materHide() {
				this.$store.state.mater_area = this.getMateName(this.mater_value[0]);
				marSearchList({
					type: 1,
					area: this.$store.state.mater_area
				}).then(res => {
					this.mater_update_time = res.data.saveTime;
					this.corn_price = parseFloat(res.data.search[0].price);
					this.corn_rose = parseFloat(res.data.search[0].gains);
				})
				marSearchList({
					type: 2,
					area: this.$store.state.mater_area
				}).then(res => {
					this.bean_price = parseFloat(res.data.search[0].price);
					this.bean_rose = parseFloat(res.data.search[0].gains);
				})
			},
			//淘汰鸡选择其他的地区加载不同的数据
			chickenHide() {
				this.$store.state.chicken_area = this.getChickenName(this.chicken_value[0]);
				console.log(this.$store.state.chicken_area)
				getChickenPrice({
					area: this.$store.state.chicken_area
				}).then(res => {
					this.chicken_updata_time = res.data.saveTime;
					this.chicken_price = parseFloat(res.data.search[0].price);
					this.chicken_rose = parseFloat(res.data.search[0].gains);
				})
			},
		}
	}
</script>

<style lang="less">
	.price-top:after {
		clear: both;
		display: table;
		content: "";
	}
	
	.price-time {
		text-align: center;
		color: #666;
		margin: 10px 0;
	}
	
	.price-info {
		margin-top: 20px;
	}
	
	.price-info-list {
		border-right: 1px solid #CCCCCC;
	}
	
	.price-info-list,
	.price-info-list1 {
		text-align: center;
		p {
			margin: 10px 0;
		}
		p:first-child {
			font-size: 20px;
			color: #333;
			font-weight: bold;
		}
		p:nth-child(2) {
			font-size: 12px;
			color: #999999;
		}
		p:last-child {
			font-size: 12px;
			img {
				display: inline-block;
				height: 10px;
				width: 8px;
			}
		}
	}
	
	.price-top {
		width: 90%;
		margin: 0 auto;
		.price-info-left {
			float: left;
			width: 50%;
			select {
				width: 40%;
				height: 30px;
				line-height: 20px;
				font-size: 12px;
				color: #57B663;
			}
		}
		.price-info-right {
			float: left;
			width: 50%;
			select {
				width: 40%;
				height: 30px;
				line-height: 20px;
				font-size: 12px;
				color: #57B663;
			}
		}
	}
	
	.price-bottom {
		margin-top: 15px;
		height: 50px;
		line-height: 50px;
		background: rgb(237, 247, 238);
		text-align: center;
		font-size: 15px;
		color: #57B663;
		border-bottom: 4px solid #F7F7F7;
	}
	
	.material-info,
	.chicken-info {
		margin-top: 20px;
	}
	
	.chicken-top {
		width: 90%;
		margin: 0 auto;
		select {
			width: 20%;
			height: 30px;
			line-height: 20px;
			font-size: 12px;
			color: #57B663;
		}
	}
</style>