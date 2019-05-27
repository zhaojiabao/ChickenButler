<template>
	<!--该页面为新闻详情页-->
	<div class="news-detail">
		<!--使用iframe引入页面-->
		<iframe v-if="" :src="'https://api.danjiguanjia.com/v4/news/viewdetail/id/'+$route.params.news_id+'?ticket='+$store.state.ticket" width="100%" height="100%" frameborder="no"></iframe>
	</div>
</template>

<script>
	import { newsDetail, userAction } from "../../api/api"
	export default {
		components: {

		},
		data() {
			return {
				data: {},
				param: {
					view: 0,
				},
			}
		},
		mounted() {
			this.$store.state.header.title = '资讯详情';
			this.$store.state.header.right_title = "";
			this.$store.state.header.right_url = "";

			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			newsDetail({
				ticket: this.$store.state.ticket,
				id: this.$route.params.news_id
			}).then(rs => {
				this.data = rs.data;
				this.$wechat.ready(() => {
					var title = this.data.title;
					if(isiOS) {
						var link = window.location.href + '?weixinshare';
					} else {
						var link = 'https://m.danjiguanjia.com/#/p/news/detail/' + this.$route.params.news_id + '?weixinshare';
					}
					var imgUrl = this.data.cover;
					this.$wechat.onMenuShareTimeline({
						title: title,
						link: link,
						imgUrl: imgUrl
					});
					this.$wechat.onMenuShareAppMessage({
						title: title,
						desc: this.data.description,
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

			})
			userAction({
				ticket: this.$store.state.ticket,
				module: 1111,
				cur_version: this.$store.state.cur_version
			})
		},
	}
</script>

<style lang="less">
	section {
		p,
		sapn {
			font-size: 16px;
		}
	}
	
	.news-detail {
		height: 90vh;
		width: 100%;
		margin: 0 auto;
		img {
			width: 100%;
		}
		h1 {
			font-size: 1.5rem;
			padding: 1rem 0;
			text-align: center;
		}
		.source-author,
		.time-view {
			text-align: center;
			padding: 0.3rem 0;
			span {
				padding: 1rem;
				color: #ccc;
			}
		}
		.news-detail-audio {
			position: fixed;
			right: 1rem;
			bottom: 1rem;
			width: 4rem;
			height: 4rem;
			border-radius: 50%;
			/*background: rgba(0, 0, 0, 0.5) url('https://www.danjiguanjia.com/upload/audio.png') center center no-repeat;*/
			background: rgba(0, 0, 0, 0.5);
			img {
				display: inline-block;
				width: 50%;
				height: 50%;
				padding-top: 25%;
				padding-left: 25%;
			}
		}
	}
	
	.vux-header .vux-header-left a,
	.vux-header .vux-header-left button,
	.vux-header .vux-header-right a,
	.vux-header .vux-header-right button {
		color: #57B663;
	}
	/*.news-bom {
		position: fixed;
		bottom: -5rem;
		left: 5%;
		padding-bottom: 20vh;
	}*/
</style>