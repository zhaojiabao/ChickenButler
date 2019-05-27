<template>
	<div class="cool-summer">
		<div class="head">
			<img src="../../assets/images/active/head.png" />
		</div>
		<img src="../../assets/images/active/intro.png" class="intro" @click="intro = true" />
		<popup v-model="intro" height="100%">
			<!--<div class="popup1">
				活动说明<hr>
				活动暂未开启
				<button @click="intro = false">关闭</button>
			</div>-->
			<img src="https://www.danjiguanjia.com/active.jpg" style="width:100%">
			<icon type="cancel" class="close-btn" @click.native="intro = false"></icon>
		</popup>

		<div class="result hundred" v-show="isAlert">
			<div class="mask hundred" @click="isAlert = false"></div>
			<div class="msg animated bounceIn">
				<img src="../../assets/images/active/msg.png" />
				<img src="../../assets/images/active/close.png" class="close" @click="isAlert = false" />
				<div class="content">
					<img :src="'https://m.danjiguanjia.com/images/gift/gift_'+ (selectIndex==0?1:selectIndex) +'.png'" v-show="alertText.tip == ''" />
					<!--<img :src="goodsList[selectIndex]['image']" v-show="alertText.tip == ''" />-->
					<div class="text blue-text">
						<h1 v-html="alertText.title"></h1>
						<p>
							{{ alertText.tip }}
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="lotty-n">
			<div class="newman">
				<img src="../../assets/images/active/lotty-text-x.png" />
				<img src="../../assets/images/active/btn-1.png" class="receive-rewards" @click="getScore(1)" />
			</div>

			<div class="manage">
				<img src="../../assets/images/active/lotty-text-b.png" class="title" />
				<img src="../../assets/images/active/btn-1.png" class="receive-rewards" @click="getScore(2)" />
			</div>

			<div class="countdown">
				<!--<img src="../../assets/images/active/lotty-time.png" />-->
				<div class="left-text">
					<img src="../../assets/images/active/datetime.png" />
				</div>
				<div class="datetime">
					<span>{{ rTime.h | TimeText }}</span>
					<b>:</b>
					<span>{{ rTime.m | TimeText }}</span>
					<b>:</b>
					<span>{{ rTime.s | TimeText }}</span>
				</div>
				<div class="right-text">
					<img src="../../assets/images/active/datetext.png" />
				</div>
			</div>
		</div>

		<div class="main">
			<div class="grid">
				<!--<div class="item animated" v-for="i in 9" @click="itemClick(i)" :class="{ bounceInUp:bounceIndex == i,bounceIn:selectIndex == i,fadeOut:isLotty[i]}" v-show="isShow[i-1]">
					<img :src="'https://m.danjiguanjia.com/images/gift/gift_'+ i +'.png'" />
					<div class="bubble" v-if="isLotty[i]"></div>
				</div>-->

				<div class="item animated" v-for="(goods,i) in goodsList" @click="itemClick(i)" :class="{ bounceInUp:bounceIndex == i,bounceIn:selectIndex == i,fadeOut:isLotty[i]}" v-show="isShow[i-1]">

					<img :src="goods.image" />
					<div class="bubble" v-if="isLotty[i]"></div>
				</div>
			</div>
		</div>

		<div class="footer">
			本活动最终解释权归嘉农在线所有
		</div>
	</div>
</template>

<script>
	var u = navigator.userAgent,
		app = navigator.appVersion;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

	var isShow = [false, false, false, false, false, false, false, false, false];
	var isLotty = [false, false, false, false, false, false, false, false, false];
	var lottyArr = [1, 2, 3, 6, 9, 8, 7, 4]; //抽奖顺序
	var timer;
	import { Popup, Icon } from 'vux';
	import { getGoods, getUserPrize, addScores, addPrize, getPrize, getRecordLog } from '../../api/BeneActive'
	export default {
		components: {
			Popup,
			Icon
		},
		data() {
			return {
				bounceIndex: 0,
				selectIndex: 1,
				isShow: isShow,
				isLotty: isLotty,
				isStop: false,
				intro: false,
				isAlert: false,
				lottyArr: lottyArr,
				lotty: 1,
				alertText: {
					title: '',
					tip: ''
				},
				rTime: {
					h: 0,
					m: 0,
					s: 0
				},
				goodsList: '', //奖品
				state: '', //是否能领取状态
				sign: '',
				prize_id: '', //奖品id
				prizes: [],
				status: true,
				prizeresult: '',
				is_app: false,
				num: 0,
				recordLog: '',
				ticket: false
			}
		},
		mounted() {
			this.bounceInUp(); //出场动画
			this.GetRTime();
			//if(!this.ticket) this.ticket = localStorage.getItem('ticket');
			var ua = navigator.userAgent.toLowerCase();
			if(ua.match(/djgj_jn/)) {
				this.ticket = this.$route.query.ticket;
			}
			if(!this.ticket) this.ticket = localStorage.getItem('ticket');
			//alert(this.ticket);
			if(!this.ticket) {
				this.$store.state.source_url_name = this.$route.path;
				this.$router.push('p/login');
				//				this.$vux.toast.show({
				//					text: '请您先登录！'
				//				})
			} else {
				getUserPrize({
					ticket: this.ticket
				}).then(rs => {
					this.state = rs.data.state;
					this.sign = rs.data.sign;
				});

			}
			getGoods().then(rs => {
				this.goodsList = rs.data;
			})
		},
		methods: {
			getScore(type) {
				if(!this.ticket) {
					this.$vux.toast.show({
						text: '请您先登录！'
					})
					return false;
				}
				this.isAlert = true;
				this.alertText.title = '非常抱歉<br/>';

				if(type == this.sign) {
					if(this.state == 0) this.alertText.tip = '提示：您还未完成任务，请继续努力吧。';
					if(this.state == 1) {
						//领取积分奖励
						addScores({
							ticket: this.ticket,
							sign: this.sign
						}).then(rs => {
							this.alertText.title = '恭喜<br/>';
							this.alertText.tip = rs.msg;
						})
					}
					if(this.state == 2) this.alertText.tip = '提示：您已经领取过了，请不要贪心喔！';
				} else {
					this.alertText.tip = '提示：您还未完成任务，请继续努力吧。';
				}
			},
			itemClick: function(i) {
				if(!this.ticket) {
					this.$vux.toast.show({
						text: '请您先登录！'
					})
					return false;
				}

				for(var j = 1; j <= 9; j++) {
					this.prizes[this.goodsList[j]['id']] = j;
				}

				if(i == 5) {
					var _this = this;

					if(this.bounceIndex == 0) {

						getPrize({
							ticket: this.ticket
						}).then(rs => {
							if(rs.retcode == 2000) {
								this.prizeDraw();
								setTimeout(() => {
									_this.selectIndex = rs.data.prize_id == 20?9:1;
									_this.alertText.title = '正在抽奖中...';
									_this.stop("恭喜您中奖了");
								}, 2000);
							} else if(rs.retcode == 4001) {
								this.isAlert = true;
								this.selectIndex = rs.data.prize_id == 20?9:1;	
								this.alertText.title = '您已经中过奖了<br/>';								
							} else {
								this.isAlert = true;
								this.alertText.title = '非常抱歉<br/>';
								this.alertText.tip = rs.msg;
								return false;
							}
						});

						
					}
				}
			},
			//点击抽奖动画
			prizeDraw() {
				var _this = this;
				_this.lotty = 0;
				timer = setInterval(function() {
					if(_this.isStop) { //停止抽奖
						clearInterval(timer);
						_this.isLotty.splice(_this.selectIndex, 1, true);
						_this.isStop = false; //重置抽奖	
					} else {
						//中奖纪录
						_this.selectIndex = lottyArr[_this.lotty];
						_this.lotty++;
						if(_this.lotty > 7) {
							_this.lotty = 0; //最大值范围
							_this.num++;
						}
						if(_this.num == 2 && _this.selectIndex == _this.prizeresult) {
							_this.selectIndex = _this.prizeresult;
							_this.stop("恭喜你中奖了");
						}
					}
				}, 100);
			},
			stop(title) {
				this.isStop = true;
				var _this = this;
				this.alertText.title = title;
				this.alertText.tip = '';
				setTimeout(function() {
					_this.isAlert = true; //弹出窗口						
				}, 800);
			},
			//出场动画
			bounceInUp() {
				var _this = this;
				let index = 0;
				timer = setInterval(function() {
					_this.isShow.splice(index, 1, true);
					index++;
					_this.bounceIndex = index;
					if(index == 9) {
						clearInterval(timer);
						_this.bounceIndex = 0;
					}
				}, 700);
			},
			GetRTime() {
				var endTime = new Date('2017/08/01 00:00:00');
				var _this = this;
				var nowTime, t;
				var ita = setInterval(function() {
					nowTime = new Date();
					t = endTime.getTime() - nowTime.getTime();
					if(t >= 0) {
						_this.rTime.h = Math.floor(t / 1000 / 60 / 60);
						_this.rTime.m = Math.floor(t / 1000 / 60 % 60);
						_this.rTime.s = Math.floor(t / 1000 % 60);
					} else {
						clearInterval(ita);
					}
				}, 1000);
			}
		},
		filters: {
			TimeText: function(t) {
				return t >= 10 ? t : '0' + t;
			}
		}
	}
</script>

<style lang="less">
	@keyframes run {
		0% {
			background-image: url(../../assets/images/active/bubble-1.png);
		}
		25% {
			background-image: url(../../assets/images/active/bubble-2.png);
		}
		50% {
			background-image: url(../../assets/images/active/bubble-3.png);
		}
		75% {
			background-image: url(../../assets/images/active/bubble-4.png);
		}
		100% {
			opacity: 0;
		}
	}
	
	.cool-summer {
		background-image: url(../../assets/images/active/bg.jpg);
		background-size: cover;
		height: 100%;
		.close-btn {
			position: fixed;
			top: 5px;
			right: 2px;
		}
		.hundred {
			position: absolute;
			width: 100vw;
			height: 115vh;
			top: 0;
			left: 0;
		}
		.blue-text {
			color: #071857
		}
		.result {
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 12;
			.mask {
				background: #000000;
				opacity: 0.4;
			}
			.msg {
				position: relative;
				z-index: 15;
				width: 70vw;
				img {
					width: 100%;
					display: block;
				}
				.close {
					width: 10vw;
					position: absolute;
					right: 10vw;
					top: 10vw;
					z-index: 5;
				}
				.content {
					position: absolute;
					top: 0;
					left: 0;
					padding-top: 20vw;
					width: 100%;
					img {
						width: 40%;
						margin: auto;
					}
					.text {
						padding: 0 15vw;
						text-align: center;
						margin-top: 5vw;
						h1 {
							font-size: 18px;
						}
						p {
							margin-top: 25px;
							font-size: 14px;
							font-weight: 800;
						}
					}
				}
			}
		}
		.animate {
			position: absolute;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			z-index: 9999;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.bubble {
			width: 32vw;
			height: 32vw;
			background-image: url(../../assets/images/active/bubble-1.png);
			background-size: contain;
			-webkit-animation: run steps(1, end) 0.5s infinite;
			position: absolute;
			top: -2.5vw;
			left: -4.3vw;
		}
		.intro {
			position: absolute;
			width: 20vw;
			right: 0;
			top: 0
		}
		.head {
			padding-top: 10vh;
			img {
				display: block;
				margin: auto;
				width: 70%;
			}
		}
		.lotty-n {
			img {
				display: block;
				width: 100%;
			}
			.newman {
				width: 55vw;
				margin: 0 auto;
				position: relative;
				.receive-rewards {
					position: absolute;
					right: -30px;
				}
			}
			.manage {
				margin-bottom: 15px;
				.title {
					margin-left: 5vw;
					width: 50vw;
				}
			}
			.receive-rewards {
				width: 30vw;
				margin: auto;
			}
			.countdown {
				margin-left: 5vw;
				margin-top: 25px;
				/*background-image: url(../../assets/images/active/lotty-time.png);
				background-size: contain;*/
				div {
					font-family: "微软雅黑";
					display: inline-block;
				}
				.left-text {
					width: 12vw;
				}
				.right-text {
					width: 50vw;
				}
				.datetime {
					margin: 0 5px;
					span {
						display: inline-block;
						background: #FFFFFF;
						padding: 3px 5px;
					}
				}
			}
		}
		.main {
			margin: 2vw 12.5vw;
			min-height: 75vw;
			.grid {
				.item {
					width: 25vw;
					height: 25vw;
					display: inline-flex;
					justify-content: center;
					align-items: center;
					background-image: url(../../assets/images/active/bubble.png);
					background-size: contain;
					position: relative;
					img {
						width: 70%;
					}
				}
			}
		}
		.footer {
			text-align: center;
			margin: 15px;
		}
	}
	
	@media screen and (max-width: 400px) {
		.cool-summer {
			.lotty-n {
				.countdown {
					.datetime {
						span {
							padding: 1px 3px;
						}
					}
				}
			}
		}
	}
</style>