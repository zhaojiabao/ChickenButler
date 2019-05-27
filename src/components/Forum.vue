<template>
	<div class="">
		<!--论坛首页-->
		<div class="forum-index">
			<div class="forum-index-top">
				<img src="../assets/11.png" alt="" />
			</div>
			<div class="forum-index-bottom">
				<ul>
					<li>
						<router-link tag="li" to="/p/forum-list/4">
							<img src="../assets/kan.png" alt="" @click="kanClick" />
						</router-link>
					</li>
					<li>
						<router-link tag="li" to="/p/forum-list/1">
							<img src="../assets/jinghua.png" alt="" @click="jingClick" />
						</router-link>
					</li>
					<li>
						<router-link tag="li" to="/p/forum-list/2">
							<img src="../assets/tiwen.png" alt="" @click="wenClick"/>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import { userAction } from "../api/api"
	export default {
		components: {},
		mounted() {
			this.$store.state.header.title = "论坛"
			this.$store.state.header.right_title = ""
			this.$store.state.forum_selected_index = -1;
			userAction({
				ticket: this.$store.state.ticket,
				module: 3,
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
			kanClick() {
				userAction({
					ticket: this.$store.state.ticket,
					module: 31,
					cur_version: this.$store.state.cur_version
				})
			},
			jingClick(){
				userAction({
					ticket: this.$store.state.ticket,
					module: 32,
					cur_version: this.$store.state.cur_version
				})
			},
			wenClick(){
				userAction({
					ticket: this.$store.state.ticket,
					module: 33,
					cur_version: this.$store.state.cur_version
				})
			}
		}
	}
</script>

<style lang="less">
	.forum-index {
		.forum-index-top {
			.title {
				text-align: center;
				padding: 1rem 0;
				color: #57b663;
				font-size: 1.3rem;
			}
			img {
				width: 100%;
			}
		}
		.forum-index-bottom {
			text-align: center;
			margin: 0 auto;
			ul li {
				width: 75%;
				margin: 0 auto;
				padding-top: 0.5rem;
				img {
					width: 100%;
				}
			}
			img:active {
				filter: brightness(.5);
			}
		}
	}
</style>