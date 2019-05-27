<template>
	<!--蛋价曲线-->
	<div class="price-chart">
		<producing-area></producing-area>
		<sale-address></sale-address>
		<iframe width="100%" border="no" :src="url" class="ifr-egg-price"></iframe>
		<div class="select-date">
			<button-tab v-model="cdate">
				<button-tab-item>月</button-tab-item>
				<button-tab-item>季</button-tab-item>
				<button-tab-item>年</button-tab-item>
			</button-tab>
		</div>
	</div>
</template>

<script>
	import { ButtonTab, ButtonTabItem } from 'vux'
	import {userAction} from '../../api/api'
	import SaleAddress from './SaleAddress'
	import ProducingArea from './ProducingArea'

	let base = "https://api.danji.jianong.com/map/chart/price/";
	let cdate_arr = ['m', 'q', 'y'];
	export default {
		components: {
			ProducingArea,
			SaleAddress,
			ButtonTab,
			ButtonTabItem
		},
		data() {
			return {
				cdate: 0,
				url: ''
			}
		},
		watch: {
			'cdate': 'init',
			'$store.state.egg_price': {
				handler: function() {
					this.init()
				},
				deep: true
			}
		},
		mounted() {
			var xheader = document.querySelector(".vux-header-title");
			xheader.classList.remove('title-after');
			this.$store.state.header.title = '蛋价曲线';
			if(this.$route.params.cdate != undefined) {
				this.cdate = parseInt(this.$route.params.cdate);
			}
			console.log("this.$route.query.cdate:"+this.$route.params.cdate)
			this.init();
			
			userAction({
				ticket: this.$store.state.ticket,
				module: 15153,
				cur_version: this.$store.state.cur_version
			})
		},
		methods: {
			init() {
				let cdate = cdate_arr[this.cdate];
				
				//判断是否是年价格曲线并且有没有通行证,如果没有就跳转到登录页面			
				if(this.cdate == 2 && this.$store.state.ticket == null) {
					this.$store.state.chart_cdate = 2;
					this.$vux.toast.text('请登录后查看鸡蛋年价格曲线!');
					this.$router.push('/p/login');
				}
				
				var area = this.$store.state.egg_price.area;
				if(this.$route.query.area != undefined) {
					area = decodeURI(this.$route.query.area);
				}

				this.url = `${base}type/${this.$store.state.egg_price.type}/area/${area}/date/${cdate}`;
				
				var d = new Date();
				var str = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

				
				this.$wechat.ready(() => {
					var title = str + '全国各地 鸡蛋、原料、淘汰鸡价格';
					var link = 'https://m.danjiguanjia.com/#/p/price-chart';
					var imgUrl = 'https://api.danjiguanjia.com/public/icon120.png';
					this.$wechat.onMenuShareTimeline({
						title: title,
						link: link,
						imgUrl: imgUrl
					});
					this.$wechat.onMenuShareAppMessage({
						title: title,
						desc: '蛋价曲线了解最新行情动态',
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
			}
		}
	}
</script>

<style lang="less">
	@theme-color: #56b563;
	.scroller-mask {
		background-color: red;
		display: none;
	}
	
	.scroller-indicator {
		background-color: rgba(0, 0, 0, 0.1);
	}
	
	.price-chart {
		background: #FFFFFF;
		.ifr-egg-price {
			border: none;
			height: 55vh;
		}
		.select-date {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			.vux-button-group {
				a {
					height: 45px;
					line-height: 46px;
				}
				a.vux-button-tab-item-first {
					border-radius: 0;
					&:after {
						border-radius: 0;
						border: none;
						border-top: 1px solid @theme-color;
						border-right: 1px solid @theme-color;
					}
				}
				a.vux-button-tab-item-last {
					border-radius: 0;
					&:after {
						border-radius: 0;
						border: none;
						border-top: 1px solid @theme-color;
						border-left: 1px solid @theme-color;
					}
				}
				a.vux-button-tab-item-middle:after {
					border: none;
					border-top: 1px solid @theme-color;
				}
			}
		}
	}
</style>