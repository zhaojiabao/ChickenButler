<template>
	<!--该页面为短视频首页-->
	<div class="manager-view">
		<div class="mv-video">
			<ul>
				<li v-for="(manager,index) in manager_list" @click="managerClick(manager.id)">
					<div class="mv-pic">
						<img class="mv-cover" :src="manager.cover" alt=""  />
						<img class="mv-teach-cover" :src="manager.teach_cover" alt="" />
					</div>
					<p class="mv-title">{{manager.title}}</p>
					<p class="mv-description" v-if="manager.description!=''">{{manager.description}}</p>
					<p class="mv-description" v-else>无</p>
					<p class="view-num"><span><i><img src="../../assets/videoplay.png" alt="" /></i> {{manager.view}}</span> <span class="collect-num"><i><img src="../../assets/videoshoucang.png" alt="" /></i> {{manager.collect_num}}</span></p>
				</li>
			</ul>
		</div>
		<mugen-scroll :handler="fetchData" :should-handle="!loading" class="loadings">
			loading...
		</mugen-scroll>
	</div>
</template>
<script>
	import { videoBreedList } from '../../api/api'
	import MugenScroll from 'vue-mugen-scroll'
	export default {
		components: {
			MugenScroll
		},
		data() {
			return {
				manager_list: [],
				page: 0,
				loading: false
			}
		},
		mounted() {
			this.$store.state.header.title = "短视频"
			this.$store.state.header.right_title = ""
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
			//无限加载
			fetchData() {
				this.loading = true
				this.page++;
				videoBreedList({
					type: 1,
					page: this.page,
					ticket: this.$store.state.ticket
				}).then(res => {
					for(var i = 0; i < res.data.length; i++) {
						this.manager_list.push(res.data[i]);
					}
				});
				this.loading = false
			},
			//跳转到视频详情页
			managerClick(id) {
				this.$router.push('/p/video/detail/' + id)
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.loadings {
		width: 90%;
		margin: 0 auto;
		text-align: center;
	}
	
	.mv-video:after {
		content: "";
		display: table;
		clear: both;
	}
	
	.mv-video {
		ul li {
			width: 49.5%;
			float: left;
			margin: 0.5rem 0;
		}
		ul li:nth-child(2n) {
			margin-left: 0.9%;
		}
		.mv-pic {
			position: relative;
			.mv-cover {
				width: 100%;
				height: 8rem;
			}
			.mv-teach-cover {
				width: 3.5rem;
				height: 3.5rem;
				border-radius: 50%;
				position: absolute;
				left: 1rem;
				bottom: -1.75rem;
			}
		}
		p {
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
		.mv-title {
			padding-left: 5rem;
			font-size: 1.2rem;
		}
		.mv-description {
			color: #CCCCCC;
			padding: 0.3rem 0 0 1rem;
		}
		.view-num {
			color: #CCCCCC;
			span {
				i {
					display: inline-block;
					width: 1rem;
					height: 1rem;
					img {
						width: 100%;
					}
				}
			}
			.collect-num {
				float: right;
				padding-right: 2rem;
			}
		}
	}
	
	.weui-grids {
		&:before {
			border: none;
		}
		.weui-grid {
			padding: 5px 10px;
			&:before {
				border: none;
			}
			&:after {
				border: none;
			}
			p {
				color: #333333;
			}
		}
		.weui-grid__icon {
			width: 60%;
			height: auto;
		}
		p {
			font-size: 14px;
			color: #000000;
			font-family: 微软雅黑;
			text-align: center;
			margin: 8px auto;
		}
	}
</style>