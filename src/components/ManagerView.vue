<template>
	<!--管家视界首页-->
	<div class="manager-view">
		<swiper :list="banner_list" height="150px" v-model="banner_index" :show-dots="true" dots-position="center" :interval="1500" :show-desc-mask="false" :loop="true" :auto="true"></swiper>
		<div>
			<grid :rows="4">
				<grid-item link="/p/breed-class" label="养殖课堂" @on-item-click="yangClick">
					<img slot="icon" src="../assets/mvketang.png">
				</grid-item>
				<grid-item link="/p/chicken-house" label="走进鸡场" @on-item-click="zouClick">
					<img slot="icon" src="../assets/mvjichang.png">
				</grid-item>
				<grid-item link="/p/teacher" label="金牌名师" @on-item-click="teacherClick">
					<img slot="icon" src="../assets/mvteacher.png">
				</grid-item>
				<grid-item link="/p/short-video" label="短视频" @on-item-click="videoClick">
					<img slot="icon" src="../assets/mvvideo.png">
				</grid-item>
			</grid>
		</div>

		<div class="mv-video">
			<p class="hot">热门推荐</p>
			<ul>
				<li v-for="(manager,index) in manager_list" @click="managerClick(manager.v_id)">
					<div class="mv-pic">
						<img class="mv-cover" :src="manager.cover" alt="" />
						<img class="mv-teach-cover" :src="manager.teach_cover" alt="" />
					</div>
					<p class="mv-title">{{manager.title}}</p>
					<p class="mv-description">{{manager.description}}</p>
					<p class="view-num"><span><i><img src="../assets/videoplay.png" alt="" /></i> {{manager.view}}</span> <span class="collect-num"><i><img src="../assets/videoshoucang.png" alt="" /></i> {{manager.collect_num}}</span></p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { Grid, GridItem, Swiper } from 'vux'
	import { videoHot, videoBanner, userAction } from '../api/api'
	export default {
		components: {
			Grid,
			GridItem,
			Swiper
		},
		data() {
			return {
				manager_list: [],
				banner_list: [],
				banner_index: 0

			}
		},
		mounted() {
			this.$store.state.header.title = "管家视界"
			this.$store.state.header.right_title = ""
			videoHot({
				ticket: this.$store.state.ticket
			}).then(res => {
				this.manager_list = res.data.data;
			});
			videoBanner().then(rs => {
				console.log(rs)
				for(var i = 0; i < rs.data.length; i++) {
					//判断获取的url是否有"http"标注 如果有就导航到新闻界面,如果没有证明跳转的是鸡蛋哥视频使用路由跳转
					if(rs.data[i].url.indexOf('http') > -1) {
						this.banner_list.push({
							url: "/p/news/detail/" + rs.data[i].url.replace(/[^0-9]+/g, ''),
							img: rs.data[i].cover
						});
					} else {
						this.banner_list.push({
							url: "/p/video/detail/" + rs.data[i].url,
							img: rs.data[i].cover
						});
					}
				}
			});

			this.$wechat.ready(() => {
				var title = '蛋鸡管家 - 管家视界';
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
			managerClick(id) {
				this.$router.push('/p/video/detail/' + id);
			},
			yangClick() {
				userAction({
					ticket: this.$store.state.ticket,
					module: 161,
					cur_version: this.$store.state.cur_version
				})
			},
			zouClick() {
				userAction({
					ticket: this.$store.state.ticket,
					module: 162,
					cur_version: this.$store.state.cur_version
				})
			},
			teacherClick() {
				userAction({
					ticket: this.$store.state.ticket,
					module: 163,
					cur_version: this.$store.state.cur_version
				})
			},
			videoClick() {
				userAction({
					ticket: this.$store.state.ticket,
					module: 164,
					cur_version: this.$store.state.cur_version
				})
			}
		}
	}
</script>

<style lang="less">
	.weui-grid__label span {
		font-size: 14px;
		font-family: "微软雅黑";
	}
	
	.manager-view {
		.mv-img {
			img {
				width: 100%;
			}
		}
		.mv-video {
			.hot {
				padding: 1rem;
				color: #57B663;
				font-size: 1.2rem;
				border-top: 0.5rem solid #F8F8FF;
			}
			ul li {
				width: 49.5%;
				float: left;
				margin: 0.2rem 0;
			}
			ul li:nth-child(2n) {
				margin-left: 1%;
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
				padding-right: 1rem;
			}
			.mv-description {
				color: #CCCCCC;
				padding: 0.3rem 1rem 0 1rem;
			}
			.view-num {
				padding: 0.5rem 0;
				color: #CCCCCC;
				span {
					padding-left: 1rem;
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
			padding-top: 0.5rem;
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
				width: 50%;
				height: auto;
			}
			.manager-view .weui-grids p {
				font-size: 1.1rem;
			}
			p {
				font-size: 14px;
				color: #000000;
				font-family: 微软雅黑;
				text-align: center;
				margin: 8px auto;
			}
		}
	}
</style>