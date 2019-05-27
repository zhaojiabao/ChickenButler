<template>
	<div class="egg-forecast">
		<div class="newegg-title forcast-title common-margin-lr clear-float">
			<span>蛋价预测</span>
			<span class="draw-aquare">
			<x-address :title="title" style='' @on-hide="logHide" v-model="value" value-text-align="left" :list="addressData" :placeholder="$store.state.egg_price.area"></x-address>
			</span>
		</div>
		<div class="newegg-main">
			<p>已有{{forecast_detail.predict_num}}人参与预测</p>
			<div class="newegg-content">
				<p>
					您预测明日蛋价会：
				</p>
				<div class="newegg-type clear-float">
					<div @click="isClickTrue(3)" :class="{'up-select':this.curr_predict==3}">涨</div>
					<div @click="isClickTrue(2)" :class="{'flat-select':this.curr_predict==2}">平</div>
					<div @click="isClickTrue(1)" :class="{'down-select':this.curr_predict==1}">跌</div>
				</div>
			</div>
		</div>
		<div class="cut"></div>
		<div class="newegg-title forcast-title common-margin-lr">
			<span>明日蛋价预测统计</span><span></span>
		</div>
		<div class="common-margin-lr clear-float newegg-zhang">
			<div>涨：</div>
			<div>
				<div :style="'height: 1rem;background-color:#F7687A;border-radius:0.5rem;margin-right:1rem;width:'+up_number+'%;'"></div>{{up_number}}%
			</div>
		</div>
		<div class="common-margin-lr clear-float newegg-zhang newegg-ping">
			<div>平：</div>
			<div>
				<div :style="'height: 1rem;background-color:#999;border-radius:0.5rem;margin-right:1rem;width:'+flat_number+'%;'"></div>{{flat_number}}%
			</div>
		</div>
		<div class="common-margin-lr clear-float newegg-zhang newegg-die">
			<div>跌：</div>
			<div>
				<div :style="'height: 1rem;background-color:#57B663;border-radius:0.5rem;margin-right:1rem;width:'+down_number+'%;'"></div>{{down_number}}%
			</div>
		</div>
		<div class="look-my-forcast" @click="goForecastList">
			查看我的预测记录>>
		</div>
		<div class="cut"></div>
		<div class="newegg-title forcast-title common-margin-lr">
			<span>蛋价预测的规则和奖励</span><span></span>
		</div>
		<div class="forecast-info common-margin-lr">
			{{forecast_detail.rule}}
		</div>
		<div class="look-my-forcast" @click="goActivityPage">
			查看活动进程>>
		</div>
	</div>
</template>

<script>
	import { XAddress, Checker, CheckerItem } from 'vux'
	import { eggPricePorecast, getDefaultArea, getCitys, linkageAddress, newToPredict } from '../../api/EggPrice'
	export default {
		components: {
			XAddress,
			Checker,
			CheckerItem
		},
		data() {
			return {
				lonlat: '', //经纬度
				curr_city: '', //当前城市
				select_city: '', //选择时的城市
				forecast_detail: {},
				up_number: 0,
				down_number: 0,
				flat_number: 0,
				value: [],
				area: '',
				addressData: [],
				title: '',
				news_list: [],
				url: '',
				forecast_text: [{name:'涨',}, {name:'平'}, {name:'跌'}],
				is_guess: false,
				curr_predict:'',//当前选中的项数
			}
		},
		methods: {
			//点击涨,跌,平文字
			isClickTrue(value) {
				if(this.is_guess) {
					this.$vux.toast.text('您已经预测过了，不可再次预测！');
					return false;
				}
				this.curr_predict=value;
				let _this = this;
				this.$vux.confirm.show({
					title: '确认信息',
					content: '每天只有一次预测机会，您是否确认预测为' + this.forecast_text[value] + '吗？',
					onCancel() {

					},
					//点击确定的时候
					onConfirm() {
						newToPredict({
							area: _this.$store.state.egg_price.area,
							ticket: localStorage.getItem('ticket'),
							predict: value
						}).then(rs => {
							console.log(_this.is_guess)
							//							this.forecast_init = value;
							if(rs.retcode == 2000) {
								_this.is_guess = true;
								_this.$vux.toast.text('预测成功');
							} else {
								_this.$vux.toast.text(rs.msg);
							}
						})
					}
				})

			},
			//选择地址
			logHide() {
				var area_arr = [];
				var address_name = '';
				for(var i = 0; i < this.value.length; i++) {
					address_name = this.getAddressName(this.value[i]);
					if(address_name != '全省' && address_name != '全市') area_arr.push(this.getAddressName(this.value[i]));
				}
				this.$store.state.egg_price.area = area_arr.join(',');
			},
			getAddressName(value) {
				for(var i = 0; i < this.addressData.length; i++) {
					if(value == this.addressData[i].value) return this.addressData[i].name;
				}
			},
			//去预测记录页面
			goForecastList() {
				this.$router.push('/p/forecast-record')
			},
			//去活动进程页面
			goActivityPage() {
				this.$router.push('/p/forecast-active')
			},
			getForecastInfo() {
				eggPricePorecast({
					ticket: localStorage.getItem('ticket'),
					area: this.$store.state.egg_price.area
				}).then(res => {
					console.log(res)
					this.forecast_detail = res.data;
					this.up_number = parseFloat(res.data.up).toFixed(2);
					this.down_number = parseFloat(res.data.down).toFixed(2);
					this.flat_number = parseFloat(res.data.flat).toFixed(2);
//					this.is_guess = Boolean(parseInt(res.data.guess))
					this.is_guess = res.data.guess == 1;
					this.curr_predict=res.data.predict;
					if(res.data.guess==1){
						this.is_guess=true
					}
				})
			},
			//获取预测页面的地址
			getForecastAdress() {
				linkageAddress().then(rs => {
					this.value['1', '1001'];
					this.addressData = this.util.haddleAddressDataSmall(rs.data);
					this.$store.state.egg_price.area = this.addressData[0]['name'] + ',' + this.addressData[1]['name'];
				})
			}
		},
		watch: {
			'$store.state.egg_price.area': 'getForecastInfo'
		},
		mounted() {
			this.$store.state.header.title = '预测蛋价';
			if(typeof this.$route.query.area !='undefined'){
				this.$store.state.egg_price.area = this.$route.query.area
			}
			this.getForecastAdress();
			this.getForecastInfo();
			this.$wechat.ready(() => {
				var title = this.util.getNowTime() + '全国各地鸡蛋、原料、淘汰鸡价格';
				var link = 'https://m.danjiguanjia.com/newH5/#/p/egg-forecast-index?area='+encodeURI(this.$store.state.egg_price.area);
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
		}
	}
</script>

<style lang="less">
	.forcast-title {
		border-bottom: 1px solid #EEEEEE;
	}
	
	.newegg-main {
		p {
			height: 3rem;
			line-height: 3rem;
			text-align: center;
			color: #999999;
			font-size: 0.75rem;
		}
		.newegg-content {
			width: 79%;
			margin: 0 auto;
			margin-bottom: 1rem;
			height: 33vw;
			background: #F7F7F7;
			border: 0.5px solid #CCCCCC;
			border-radius: 7px;
			p {
				font-size: 0.75rem;
				height: 15vw;
				line-height: 15vw;
				margin-left: 10%;
				color: #333333;
				text-align: left;
			}
			.newegg-type {
				div {
					float: left;
					width: 13vw;
					height: 13vw;
					margin-left: 10vw;
					border-radius: 50%;
					box-sizing: border-box;
					text-align: center;
					line-height: 13vw;
					font-size: 1rem;
				}
				div:first-of-type {
					border: 1px solid #F7687A;
					color: #F7687A;
				}
				div:nth-of-type(2) {
					border: 1px solid #333333;
					color: #333;
				}
				div:nth-of-type(3) {
					border: 1px solid #57b663;
					color: #57b663;
				}
			}
		}
	}
	
	.newegg-zhang {
		height: 2rem;
		line-height: 2rem;
		margin-top: 1rem !important;
		div:first-of-type {
			width: 10%;
			float: left;
			text-align: center;
			color: #F7687A;
			font-size: 1rem;
		}
		div:last-of-type {
			width: 90%;
			float: left;
			color: #F7687A;
			font-size: 0.75rem;
			div {
				margin-top: 0.5rem;
			}
		}
	}
	
	.newegg-ping {
		margin-top: 0rem !important;
		div:first-of-type,
		div:last-of-type {
			color: #999;
		}
	}
	
	.newegg-die {
		margin-top: 0rem !important;
		div:first-of-type,
		div:last-of-type {
			color: #57B663;
		}
	}
	
	.look-my-forcast {
		height: 4rem;
		line-height: 3rem;
		color: #57B663;
		text-align: center;
		font-size: 0.88rem;
	}
	
	.forecast-info {
		font-size: 0.88rem;
		line-height: 1.5rem;
		padding-top: 0.5rem;
	}
	.scroller-mask{
		background-image:none !important;
	}
	.weui-cell_access .weui-cell__ft:after{
		border-color: rgba(0,0,0,0) !important;	
	}
	.up-select{
		background-color: #F7687A !important;
		color: #FFFFFF !important;
	}
	.flat-select{
		background-color: #333333 !important;
		color: #FFFFFF !important;
	}
	.down-select{
		background-color: #57b663 !important;
		color: #FFFFFF !important;
	}
</style>