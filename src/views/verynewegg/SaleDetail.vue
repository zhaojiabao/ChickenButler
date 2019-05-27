<template>
	<div class="sale-detail">
		<div class="sale-main common-margin-lr">
			<div class="sale-title ">
				<p>今日蛋价（元／斤）</p>
				<p>
					{{sale_detail.price.bazzar_price}}
					<span v-if="sale_detail.price.gains>0">
						<img class="sale-jian-ud" src="../../assets/white-jian-up.png" alt="" />
						{{sale_detail.price.gains}}
					</span>
					<span v-else-if="sale_detail.price.gains==0">
						<img class="sale-jian" src="../../assets/white-jian-flat.png" alt="" />
					</span>
					<span v-else>
						<img class="sale-jian-ud" src="../../assets/white-jian-down.png" alt="" />
					</span>
				</p>
				<x-address :title="title" @on-hide="logHide" v-model="value" value-text-align="left" :list="addressData" :placeholder="$route.params.sale_area"></x-address>
			</div>
		</div>
		<div class="cut"></div>
		<div class="common-margin-lr">
			<div class="price-title">
				蛋价走势
			</div>
			<div class="local-price-chart loading-warp ">
				<chart :xdate='xdate' :ydate='ydate' @getdata='getChart'></chart>
				<div class="loading-main" v-if='is_show'>
					<img src="../../assets/timg.gif" alt="" />
				</div>
			</div>
			<ul class="ul-date">
				<li v-for='(date,index) in local_date_tab' :key='index' :class="{'date-select':date.done}" @click="localClickDateTab(index,date.day)">{{date.name}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {daySaleEggPriceDetail,saleH5Area} from  '../../api/EggPrice'
	import chart from '../../common/salechart'
	import { XTable,XAddress } from 'vux'
	export default {
		data() {
			return {
				local_date_tab: [{
					name: '近1月',
					done: true,
					day:30
				}, {
					name: '近3月',
					done: false,
					day:90
				}, {
					name: '近6月',
					done: false,
					day:180
				}, {
					name: '近1年',
					done: false,
					day:365
				}],
				day:30,
				sale_detail:{},
				chart_title:['鸡蛋价格'],
				xdate:[],
				ydate:[],
				
				area: '',
				addressData: [],
				title: '',
				value:[],
				select_city:'',
				curr_city:'',
				is_show:false,
			}
		},
		watch:{
			'select_city':'getChart'
		},
		methods: {
			//获取销区的地址数据
			getSaleDtail(){
				saleH5Area().then(res=>{
					this.addressData=this.util.haddleAddressDataSmall(res.data);
				})
			},
			localClickDateTab(index,day) {
				this.local_date_tab.forEach((item, index) => {
					item.done = false;
				})
				this.local_date_tab[index].done = true;
				this.day=day;
				this.getChart();
			},
			getChart(){
				let areas='';
				if(this.select_city==''){
					areas=this.$route.params.sale_area;
				}else{
					areas=this.select_city
				}
				this.is_show=true;
				daySaleEggPriceDetail({
					ticket:localStorage.getItem('ticket'),
					area:areas,
					day:this.day
				}).then(res=>{
					this.sale_detail=res.data;
					this.xdate=res.data.date;
					this.ydate=res.data.price_curve;
					this.$store.state.info_sale=res.data.date.length;
					this.is_show=false;
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
					this.select_city = address_name;
					this.$store.state.info_sale=address_name;
				}

			},
			getAddressName(value) {
				for(var i = 0; i < this.addressData.length; i++) {
					if(value == this.addressData[i].value) return this.addressData[i].name;
				}
			},
		},
		mounted() {
			this.$store.state.header.title = '鸡蛋(销区)';
			this.$nextTick(()=>{
				this.getSaleDtail();
				this.getChart();
			})
			var links = 'https://m.danjiguanjia.com/newH5/#/p/sale-detail/'+encodeURI(this.$route.params.sale_area);
			this.$wechat.ready(() => {
				var title = this.util.getNowTime() + this.$route.params.sale_area + '鸡蛋(销区)价格';
				var link = links;
				var imgUrl = 'https://api.danjiguanjia.com/public/icon120.png';
				this.$wechat.onMenuShareTimeline({
					title: title,
					link: link,
					imgUrl: imgUrl
				});
				this.$wechat.onMenuShareAppMessage({
					title: title,
					desc: '了解最新行情动态',
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
		components: {
			XTable,
			chart,
			XAddress
		}
	}
</script>

<style lang="less">
	.sale-title {
		margin: 1rem 0;
		width: 100%;
		height: 9rem;
		padding-top: 2rem;
		background-image: linear-gradient(-180deg, #CDEA93 0%, #0BAB5F 100%);
		border-radius: 5px;
		P {
			text-align: center;
			color: #FFFFFF;
		}
		p:first-of-type {
			font-size: 0.75rem;
		}
		p:nth-of-type(2) {
			font-size: 3rem !important;
			margin: 0.5rem 0;
		}
		p:last-of-type {
			font-size: 0.81rem;
			/*span {
				position: relative;
			}*/
		}
	}
	.sale-detail{
		.vux-popup-dialog,.vux-popup-dialog{
			background: #fff !important;
		}
	}
	.sale-jian{
		width: 14px;
		height: 8px;
	}
	.sale-jian-ud{
		height: 14px;
		width: 8px;
	}
</style>