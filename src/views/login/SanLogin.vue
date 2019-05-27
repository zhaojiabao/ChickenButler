<template>
	<!--第三方登录页面-->
	<div class="login">
		<div class="content">
			<group>
				<x-input placeholder="请输入手机号" v-model="user.mobile">
					<img slot="label" class="input-icon" src="../../assets/images/icon_phone.png" width="14">
				</x-input>
			</group>
			<group class="weui-cells_form" style='position: relative;'>
				<button @click="getCode" style="position: absolute;top: 10px;right: 0;z-index: 10000;border: none;background-color: #57B663;color: #fff;font-size: 14px;padding: 5px 8px;">{{ btnMsg }}</button>
				<x-input placeholder="请输入验证码" class="weui-vcode" v-model="user.code">
					<!--<x-button slot="right" type="primary" mini @click="getCode">{{ btnMsg }}</x-button>-->
					<img slot="label" class="input-icon" src="../../assets/images/icon_key.png" width="14">
				</x-input>
			</group>
			<x-button type="primary" class="border-radius" @click.native="onLogin">提交</x-button>
		</div>
	</div>
</template>

<script>
	import { XInput, Group, XButton, Cell, CheckIcon } from 'vux'
	import { identifyingCodes, bindPhone } from "../../api/api"

	// 1 登录 ===> ticket
	// 2 绑定的目的 ==== > ticket

	export default {
		components: {
			XInput,
			XButton,
			Group,
			Cell,
			CheckIcon
		},
		data() {
			return {
				remeber_pwd: true,
				is_regist: false,
				user: {
					mobile: "",
					code: "",
					mid: ''
				},
				rules: {
					mobile: [{
						required: true,
						message: '手机号不能为空！'
					}, {
						type: 'phone',
						message: '手机号格式不正确！'
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
				btnMsg: '获取验证码',
				time: 60,
				stop: true,
				interval: ''
			}
		},
		mounted() {
			this.$store.state.header.title = '绑定手机号';
			this.$store.state.header.right_title = "";
			//接收mid或者ticket
			var ticket = this.$route.query.ticket;
			if(ticket) {
//				sessionStorage.setItem('ticket', ticket);
				localStorage.setItem('ticket', ticket);
				this.$router.push('/');
			} else {
				this.user.mid = this.$route.query.mid;
//				this.user.mid = this.GetQueryString('mid')
			}
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
		methods: {
			GetQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return unescape(r[2]);
				return null;
			},
			onLogin() {
				var rs = this.checkForm();
				if(rs == false) return false;
				bindPhone(this.user).then(rs => {
					if(rs.retcode == 2000) {
						this.$vux.toast.text("恭喜您，绑定成功！");
						localStorage.setItem('ticket', rs.data.data);
						this.$router.push('/');
					} else {
						this.$vux.toast.text(rs.msg);
					}
				})
			},
			//获取验证码
			getCode() {
				if(this.user.mobile != "") {
					if(!this.stop) return;
					identifyingCodes({
						'phone': this.user.mobile
					}).then(rs => {
						if(rs.retcode == 4003) {
							this.$vux.toast.text("该手机号已注册!");
						} else {
							clearInterval(this.interval);
							this.interval = setInterval(this.timer, 1000);
							this.time = 60;
						}
					}).catch(function(err) {
						this.$vux.toast.text("网络错误!");
					})
				} else {
					this.$vux.toast.text("请先填写手机号");
				}
			},
			//设置定时器
			timer() {
				if(this.time > 0) {
					this.time--;
					this.btnMsg = this.time > 0 ? this.time + '秒后获取' : '重新获取';
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
						if(i == 'code' && this.is_regist == false) break;
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
		.content {
			width: 70%;
			padding-top: 10%;
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
				margin-top: 8%;
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
		.weui-btn {
			font-size: 15px;
			padding: 0.1rem 0;
		}
	}
</style>