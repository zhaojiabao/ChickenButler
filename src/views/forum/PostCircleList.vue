<template>
	<!--该页面为点击发帖后,选择发帖圈子的页面-->
	<div class="post-circleList">
		<div class="circleList-main" v-for="(cir,index) in circle_list">
			<div class="circleList1">
				<img :src="cir.image" alt="" />
			</div>
			<div class="circleList2">
				<p>{{cir.name}}</p>
				<p> {{cir.info}}</p>
			</div>
			<div class="circleList3">
				<span v-if="cir.is_circle==1" @click="postClick(cir.id)">选择</span>
				<span v-else @click="joinCircle(cir)">加入</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { circleList, circleJoin } from '../../api/api'
	export default {
		data() {
			return {
				circle_list: []
			}
		},
		mounted() {
			circleList({
				ticket: this.$store.state.ticket
			}).then(res => {
				this.circle_list = res.data;
			});
			this.$store.state.header.title = "选择圈子";
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
		methods: {
			//跳转不同的发帖页面
			postClick(id) {
				this.$router.push('/p/post/container/' + this.$route.params.type + '/' + id)
			},
			joinCircle(cir) {
				cir.is_circle = 1;
				circleJoin({
					ticket: this.$store.state.ticket,
					circle_id: cir.id
				}).then(res => {
					if(res.retcode == "2000") {
						this.$vux.toast.text(res.msg);
						circleList({
							ticket: this.$store.state.ticket
						}).then(res => {
							this.circle_list = res.data;
						});
					} else {
						this.$vux.toast.text('');
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.circleList-main:after {
		content: " ";
		display: table;
		clear: both;
	}
	
	.circleList-main {
		padding: 0.5rem 0;
		width: 90%;
		margin: 0 auto;
		border-bottom: 1px solid #CCCCCC;
		.circleList1 {
			float: left;
			width: 15%;
			img {
				height: 4rem;
				width: 4rem;
				border-radius: 1rem;
			}
		}
		.circleList2 {
			float: left;
			width: 55%;
			padding-left: 6%;
			padding-top: 0.5rem;
			p:first-child {
				font-size: 1.15rem;
			}
			p:last-child {
				color: #CCCCCC;
				font-size: 1.1rem;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
		}
		.circleList3 {
			float: right;
			width: 24%;
			padding-top: 1.3rem;
			text-align: right;
			span {
				padding: 0.1rem 1rem;
				color: #57B663;
				border: 1px solid #57B663;
				font-size: 1.1rem;
			}
		}
	}
</style>