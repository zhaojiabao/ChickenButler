<template>
	<div class="seckill-index">
		<div class="seckill-index-top">
			<p>秒杀即将开始</p>
			<p>已结束</p>
		</div>
		<p class="seckill-index-title">热门推荐</p>
		<div class="seckill-index-main">
			<ul>
				<li v-for="(hot,index) in hot_list">
					<img :src="hot.cover_middle" alt="" />
					<p class="seckill-index-main-title">{{hot.goods_name}}</p>
					<p class="seckill-index-main-newp">￥{{hot.price_new}} <span>去抢购</span></p>
					<p class="seckill-index-main-oldp">￥{{hot.price_old}} </p>
				</li>
			</ul>
		</div>
		<p class="seckill-index-title">秒杀精选</p>
		<div id="">

			<div class="seckill-index-list" v-for="(seck,index) in seckill_list">
				<div class="seckill-index-list-left">
					<img :src="seck.cover_middle" alt="" />
				</div>
				<div class="seckill-index-list-right">

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { getSeckillList, getSeckillTime } from '../../api/seckill'
	export default {
		components: {

		},
		data() {
			return {
				hot_list: []
			}
		},
		methods: {

		},
		mounted() {
			this.$store.state.header.title = "秒杀"
			this.$store.state.header.right_title = ""
			getSeckillTime({
				ticket: this.$store.state.ticket,
			}).then(res => {
				getSeckillList({
					ticket: this.$store.state.ticket,
					time_id: res.data[0].time_id
				}).then(rs => {
					this.hot_list = rs.data.recommend;
					this.seckill_list = rs.data.goods;
				})
			})
		}
	}
</script>

<style lang="less" scoped="scoped">
	.seckill-index {
		.seckill-index-title {
			text-align: center;
			padding: 0.5rem 0;
			color: blue;
		}
		.seckill-index-top {
			border-bottom: 5px solid #F4F4F4;
			p {
				text-align: center;
				padding-top: 0.5rem;
				color: #57B663;
			}
			p:first-child {
				font-size: 1.5rem;
				font-weight: bold;
			}
		}
		.seckill-index-main {
			border-bottom: 5px solid #F4F4F4;
			ul {
				width: 90%;
				margin: 0 auto;
				padding-bottom: 1rem;
				li {
					width: 45%;
					float: left;
					margin-right: 5%;
					box-shadow: 0 2px 5px #CCCCCC;
					img {
						width: 100%;
					}
					.seckill-index-main-title {
						padding: 1rem;
					}
					.seckill-index-main-newp {
						padding-left: 1rem;
						color: #FF0000;
						font-size: 1rem;
						font-weight: bold;
						span {
							float: right;
							color: #FFFFFF;
							padding: 5px 8px;
							background-color: #57B663;
							margin-right: 0.5rem;
							border-radius: 0.5rem;
						}
					}
					.seckill-index-main-oldp {
						padding: 0 0 1rem 1rem;
						color: #CCCCCC;
						text-decoration: line-through;
					}
				}
			}
		}
		.seckill-index-list {}
	}
</style>