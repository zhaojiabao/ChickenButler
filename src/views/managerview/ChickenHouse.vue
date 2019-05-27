<template>
	<!--该页面为走进鸡场首页-->
	<div class="chickenhouse">
		<ul>
			<li v-for="(chicken,index) in chicken_list" @click="chickenClick(chicken)">
				<!--"-->
				<div class="chickenhouse-left">
					<p class="chickenhouse-left-position"><i><img src="../../assets/qizhi.png" alt="" /></i> <span>{{chicken.position}}</span></p>
					<p>企业名称:{{chicken.company_name}}</p>
					<p>产品类型:{{chicken.product_type}}</p>
					<p>养殖规模:{{chicken.farm_size}}</p>
				</div>
				<div class="chickenhouse-right">
					<img :src="chicken.cover" alt="" />
					<p class="chickenhouse-right-title">{{chicken.title}}</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import { videoChickList, userAction } from '../../api/api'
	export default {
		data() {
			return {
				chicken_list: []
			}
		},
		mounted() {
			this.$store.state.header.title = "走进鸡场"
			this.$store.state.header.right_title = ""
			//页面加载填充数据
			videoChickList().then(res => {
				this.chicken_list = res.data;
			});
			//用户行为模块
			userAction({
				ticket: this.$store.state.ticket,
				module: 162,
				cur_version: this.$store.state.cur_version
			})
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
			//跳转详情页
			chickenClick(chicken) {
				//this.$store.state.current_chicken = chicken;
				//console.log(chicken)
				this.$router.push('/p/chickend/detail/' + chicken.id)
			}
		}
	}
</script>

<style lang="less">
	ul li:after {
		content: " ";
		display: table;
		clear: both;
	}
	
	.chickenhouse {
		p,
		span {
			font-size: 1.1rem;
		}
		width: 90%;
		margin: 0 auto;
		ul li {
			padding-top: 1.5rem;
			.chickenhouse-left {
				width: 45%;
				float: left;
				.chickenhouse-left-position {
					position: relative;
					color: #57B663;
					span {
						padding-left: 2.5rem;
					}
					i {
						position: absolute;
						top: -0.3rem;
						left: 0;
						display: inline-block;
						width: 2rem;
						height: 2rem;
						img {
							width: 100%;
						}
					}
				}
				p {
					padding: 0.3rem 0;
				}
			}
			.chickenhouse-right {
				width: 53%;
				float: right;
				img {
					display: inline-block;
					width: 100%;
					height: 9rem;
				}
				.chickenhouse-right-title {
					text-align: center;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
			}
		}
		ul li:nth-child(2n) {
			.chickenhouse-left {
				width: 45%;
				float: right;
				p {
					padding: 0.3rem 0;
				}
			}
			.chickenhouse-right {
				width: 53%;
				float: left;
				img {
					width: 100%;
					height: 9rem;
				}
				.chickenhouse-right-title {
					text-align: center;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
			}
		}
	}
</style>