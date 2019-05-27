<template>
	<!--找回密码页面-->
	<div class="login">

		<div class="logo">
			<img src="../../assets/logo.png" />
		</div>

		<div class="content">

			<group>
				<x-input placeholder="请输入手机号" v-model="user.user_name">
					<img slot="label" class="input-icon" src="../../assets/images/icon_phone.png" width="14">
				</x-input>
			</group>

			<group class="weui-cells_form">
				<button @click="getCode" style="position: absolute;top: 10px;right: 0;z-index: 10000;border: none;background-color: #57B663;color: #fff;font-size: 14px;padding: 5px 8px;">{{ btn_msg }}</button>
				<x-input placeholder="请输入验证码" class="weui-vcode" v-model="user.code">
					<!--<x-button slot="right" type="primary" plain mini @click.native="getCode">{{ btn_msg }}</x-button>-->
					<img slot="label" class="input-icon" src="../../assets/images/icon_key.png" width="14">
				</x-input>
			</group>

			<group>
				<x-input placeholder="请输入密码" type="password" v-model="user.user_pwd">
					<img slot="label" class="input-icon" src="../../assets/images/icon_lock.png" width="14">
				</x-input>
			</group>

			<x-button type="primary" class="border-radius" @click.native="onRegist">找回</x-button>
		</div>

	</div>

</template>

<script>
	import { XInput, Group, XButton, Cell, CheckIcon, LoadMore } from 'vux'
	import { forgetPassword, identifyingCodes, userLogin } from "../../api/api"

	export default {
		components: {
			XInput,
			XButton,
			Group,
			Cell,
			CheckIcon,
			LoadMore
		},
		data() {
			return {
				remeber_pwd: true,
				is_regist: false,
				user: {
					user_name: "",
					user_pwd: "",
					code: "",
					decive: 'WX'
				},
				rules: {
					user_name: [{
						required: true,
						message: '手机号不能为空！'
					}, {
						type: 'phone',
						message: '手机号格式不正确！'
					}],
					user_pwd: [{
						required: true,
						message: '密码不能为空！'
					}],
					code: [{
						required: true,
						message: '验证码不能为空！'
					}, {
						min: 1000,
						max: 9999,
						message: '验证码不正确！'
					}]
				},
				btn_msg: '获取验证码',
				time: 60,
				stop: true,
				interval: ''
			}
		},
		mounted() {
			//设置标题
			this.init();
			this.$store.state.header.right_title = "";
			this.$wechat.ready(() => {
				var title = '蛋鸡管家 - 全球蛋鸡产业信息化平台';
				var link = window.location.href;
				var imgUrl = 'https://api.danjiguanjia.com/public/icon120.png';
				this.$wechat.onMenuShareTimeline({
					title: title,
					link: link,
					imgUrl: imgUrl
				});
				this.$wechat.onMenuShareAppMessage({
					title: title,
					desc: '关注蛋鸡管家,随时掌握最新行情信息!',
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
		watch: {
			'$route.name': 'init'
		},
		methods: {
			init() {
				this.$store.state.header.title = '找回密码';
				this.$store.state.header.border = false;
			},
			onRegist() {
				var rs = this.checkForm();
				if(rs == false) return false;
				forgetPassword({
					mobile_phone: this.user.user_name,
					password: this.user.user_pwd,
					code: this.user.code
				}).then(rs => {
					if(rs.retcode == 2000) {
						userLogin(this.user).then(rs => {
							if(rs.retcode == 2000) {
								this.$vux.toast.text("恭喜您，登录成功！");
								this.$store.state.ticket = rs.data.ticket;
								localStorage.setItem('ticket', rs.data.ticket);
								//跳转回来源页
								if(this.$store.state.source_url_name == "") {
									this.$router.push('/');
								} else {
									this.$router.push(this.$store.state.source_url_name);
								}

							} else {
								this.$vux.toast.text(rs.msg);
							}
						});
//						this.$vux.toast.text("找回成功，请您登录！");
//						this.$router.push('/')
					} else if(rs.retcode == 4002) {
						this.message("验证码错误");
					} else if(rs.retcode == 4001) {
						this.$vux.toast.text("修改失败!");
					} else {
						this.$vux.toast.text("参数缺失!");
					}
				})
			},
			//获取验证码
			getCode() {
				if(this.user.user_name != "") {
					if(!this.stop) return;
					identifyingCodes({
						'phone': this.user.user_name
					}).then(rs => {
						if(rs.retcode == 2000) {
							clearInterval(this.interval);
							this.interval = setInterval(this.timer, 1000);
							this.time = 60;
						} else if(rs.retcode == 4001) {
							this.$vux.toast.text("60s内不能重复发送!");
						} else if(rs.retcode == 4002) {
							this.$vux.toast.text("发送失败!");
						} else {
							this.$vux.toast.text("该用户没有注册!");
						}
					}).catch(function(err) {
						this.$vux.toast.text("网络错误!");
					})
				} else {
					this.$vux.toast.text("请先填写手机号、密码");
				}
			},
			//设置定时器 当返回值为2000的时候调用,替换原来的获取验证码
			timer() {
				if(this.time > 0) {
					this.time--;
					this.btn_msg = this.time > 0 ? this.time + '秒后获取' : '重新获取';
					this.stop = false;
				} else if(this.time == 0) {
					this.stop = true;
					clearInterval(this.interval);
				}
			},
			//检测表单
			checkForm() {
				var rs = true;
				outerloop:
					for(var i in this.rules) {
						if(i == 'code') break;
						for(var j = 0; j < this.rules[i].length; j++) {
							rs = this.verify(this.user[i], this.rules[i][j]);
							if(rs == false) break outerloop;
						}
					}
				return rs;
			},
			//验证数据合法性
			verify(val, rules) {
				if(rules.required && val == "") {
					this.$vux.toast.text(rules.message);
					return false;
				}
				if(typeof(rules.min) != 'undefined' || typeof(rules.max) != 'undefined') rules.type = 'size';
				if(typeof(rules.type) == 'undefined') return true;
				var is_rule = true;
				switch(rules.type) {
					case 'phone':
						if(!(/^1[3|4|5|7|8]\d{9}$/.test(val))) is_rule = false;
						break;
					case 'size':
						if(val < rules.min || val > rules.max) is_rule = false;
						break;
					case 'number':
						if(!/^[0-9]*$/.test(val)) is_rule = false;
						break;
					default:
						rules.message = '未知错误';
						is_rule = false;
						break;
				}
				if(!is_rule) this.$vux.toast.text(rules.message);
				return is_rule;
			}
		}
	}
</script>

<style lang='less'>
	.login {
		font-size: 12px;
		.logo {
			width: 40%;
			height: 32vh;
			margin: auto;
			display: flex;
			align-items: center;
			img {
				width: 100%;
			}
		}
		.weui-btn {
			padding: 0.1rem 10px;
		}
		.weixin {
			width: 20%;
			margin: 0 auto;
			img {
				width: 100%;
			}
		}
		.content {
			width: 70%;
			margin: auto;
			li {
				background: #42B983;
			}
			.note {
				margin: 15px 0 30px 0;
			}
			.weui-cells:before {
				border-top: none;
			}
			.input-icon {
				padding-right: 10px;
				display: block;
			}
			.border-radius {
				border-radius: 99px;
			}
		}
		.bottom {
			width: 80%;
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
	}
</style>