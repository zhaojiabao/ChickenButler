<template>
	<div class="active-center">
		<div class="active-center-user" style="background-color: #f4f4f4;">
			<div class="active-center-user-main">
				<div class="active-center-user-main-left">
					<img src="../assets/icon120.png" />
				</div>
				<div class="active-center-user-main-right">
					<p><span>{{user_scores}}</span>枚积蛋</p>
					<p>如何获取积蛋?</p>
				</div>
			</div>
		</div>
		<swiper :list="banner_list" dots-position="center" :show-desc-mask="false" :auto="true" :loop="true" :interval="1500"></swiper>
		<grid :rows="4" class="grid">
			<grid-item :link="module.path" v-for="(module,key,index) in module_list" :key="key">
				<img slot="icon" :src="module.img">
				<p>{{module.title}}</p>
			</grid-item>
		</grid>
		<div class="active-center-more">
			<p class="active-center-more-active">
				<span>线上活动</span>
				<router-link tag="span" to="/p/moreactive">
					<span>更多</span>
				</router-link>
			</p>
		</div>

		<div class="active-center-info">
			<ul>
				<li v-for="(active,index) in active_list" v-if="index<5" @click="activeClick(active.cms_id)">
					<div class="active-center-info-clear">
						<div class="active-center-info-img">
							<img :src="active.cms_pic" alt="" />
						</div>
						<div class="active-center-info-main">
							<p>{{active.cms_title}}</p>
							<p>{{active.start_time}}</p>
							<p>访问数: {{active.view}}</p>
						</div>
						<div class="active-center-info-end">
							<img v-if="active.status==0" src="../assets/progress-r.png"/>
							<img v-else src="../assets/finish-r.png"/>
						</div>
					</div>
					<hr />
				</li>
			</ul>
		</div>

	</div>
</template>

<script>
	import { userInfo, userScore } from '../api/api'
	import { goodList, activeInfo } from '../api/active'
	import { Swiper, Grid, GridItem } from 'vux'
	import tuangou from '@/assets/tuangou.png'
	import miaosha from '@/assets/miaosha.png'
	import dazhuanpan from '@/assets/dazhuanpan.png'
	import meiri from '@/assets/meiri.png'
	export default {
		components: {
			Swiper,
			Grid,
			GridItem
		},
		data() {
			return {
				user_scores: 0,
				banner_list: [],
				module_list: [{
						title: '团购',
						img: tuangou,
						path: 'groupindex'
					},
					{
						title: '秒杀',
						img: miaosha,
						path: 'seckillindex'
					}, {
						title: '大转盘',
						img: dazhuanpan,
						path: '/p/managerview'
					}, {
						title: '每日任务',
						img: meiri,
						path: '/p/activecenter'
					}
				],
				active_list: []
			}
		},
		methods: {
			activeClick(id) {
				this.$router.push('/p/active-detail/' + id)
			}
		},
		mounted() {
			this.$store.state.header.title = "活动中心"
			userScore({
				ticket: this.$store.state.ticket,
			}).then(res => {
				this.user_scores = res.data.score;
			})
			goodList({
				ticket: this.$store.state.ticket,
			}).then(rs => {
				for(var i = 0; i < rs.data.banner.length; i++) {
					this.banner_list.push({
						url: '/p/news/detail/' + rs.data.banner[i].url.substr(-4),
						img: rs.data.banner[i].cms_pic,
					});
				}
			})

			activeInfo().then(res => {
				this.active_list = res.data.data;
			})
		}
	}
</script>

<style lang="less" scoped="scoped">
	ul,
	li:after,
	.active-center-user:after,
	.active-center-user-main:after,
	.active-center-info-clear:after {
		display: table;
		content: "";
		clear: both;
	}
	
	.active-center {
		.active-center-info {
			width: 90%;
			margin: 0 auto;
			padding-top: 1rem;
			ul {
				width: 100%;
			}
			li {
				padding-bottom: 0.5rem;
			}
			.active-center-info-img {
				float: left;
				img {
					display: inline-block;
					width: 5rem;
					height: 5rem;
				}
			}
			.active-center-info-main {
				width: 50%;
				float: left;
				padding-left: 5%;
				p {
					padding-bottom: 0.4rem;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				p:first-child {
					font-weight: bold;
				}
				p:nth-child(2) {
					color: #CCCCCC;
				}
				p:nth-child(3) {
					color: #FF0000;
				}
			}
		}
		.active-center-user {
			.active-center-user-main {
				width: 90%;
				margin: 0 auto;
				padding: 0.5rem 0;
				.active-center-user-main-left {
					float: left;
					img {
						display: inline-block;
						height: 4rem;
						width: 4rem;
						border-radius: 50%;
					}
				}
				.active-center-user-main-right {
					float: left;
					padding-left: 10%;
					p {
						padding-top: 0.3rem;
						font-size: 1rem;
					}
					p:first-child {
						span {
							color: #57B663;
						}
					}
					p:last-child {
						color: #CCCCCC;
					}
				}
			}
		}
		.active-center-more {
			background-color: #f4f4f4;
			padding: 0.5rem 0;
			.active-center-more-active {
				width: 90%;
				margin: 0 auto;
				span:first-child {}
				span:last-child {
					float: right;
					color: #57B663;
				}
			}
		}
		.active-center-info-end{
			float: right;
			img{
				display: inline-block;
				height: 4rem;
				width: 4rem;
			}
		}
		.grid {
			padding: 1rem 0;
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
				width: 50%;
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
	}
</style>