<template>
	<div class="seckill">
		秒杀首页
	</div>
</template>

<script>
	import { Swiper  } from 'vux'	
	import { goodsDetail } from '../api/seckill'
	export default {
		components: {
			Swiper
		},
		data() {
			return {
				
			}
		},
		mounted() {
			this.$store.state.header.title = '商品详情';
			
			/*goodsDetail({
				time_id:this.$route.params.time_id,
				good_id:this.$route.params.good_id
			}).then(rs=>{
				console.log(rs)
			})*/
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
			
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	.seckill{
		
		
		
	}
</style>