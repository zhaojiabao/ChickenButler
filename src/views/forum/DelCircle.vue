<template>
	<!--退出或者加入圈子-->
	<div class="del-circle">
		<div class="del-circle-name">
			<img :src="data_circle.image" alt="" />
			<span>{{data_circle.name}}</span>
		</div>
		<p>创建人： {{data_circle.creator}}</p>
		<p>简介： {{data_circle.info}}</p>
		<div v-if="data_circle.is_circle==1" class="delcircle-commit" @click="buildCircles">
			退出圈子
		</div>
		<div v-else class="delcircle-commit" @click="joinCircle(data_circle)">
			加入圈子
		</div>
	</div>
</template>

<script>
	import {circleDetail,circleDel,circleJoin} from '../../api/api'
	export default{
		data(){
			return{
				data_circle:{}
			}
		},
		mounted(){
			/*获取当前圈子数据*/
			circleDetail({
				ticket: this.$store.state.ticket,
				circle_id: this.$route.params.delcircle_id,
				page: 1
			}).then(res => {
				this.data_circle = res.data.circle;
				this.forum_list = res.data.community;
				this.data_top = res.data.top;
				this.$store.state.header.title = '圈子详情';
			})
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
		methods:{
			//退出圈子
			buildCircles(){
				circleDel({
					ticket:this.$store.state.ticket,
					circle_id:this.$route.params.delcircle_id
				}).then(res =>{
					if(res.retcode == "2000") {
						this.$router.go(-1);
						this.$vux.toast.text(res.msg);
					} else {
						this.$vux.toast.text('退出圈子失败!请重试!');
					}
				})
			},
			//加入圈子
			joinCircle(circle){
				circle.is_circle == 1;
				circleJoin({
					ticket: this.$store.state.ticket,
					circle_id: circle.id
				}).then(res => {
					if(res.retcode == "2000") {
						this.$router.push('/p/forum-list/3')
						this.$vux.toast.text(res.msg);
					} else {
						this.$vux.toast.text('加入圈子失败!请重试!');
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.del-circle-name:after{
		display: table;
		content: '';
		clear: both;
	}
	.del-circle{
		width: 90%;
		margin: 0 auto;
		.del-circle-name{
			padding: 1.5rem 0 1.5rem 25%;
			img{
				display: inline-block;
				width: 4rem;
				height:4rem;
				border-radius: 1rem;
				float: left;
			}
			span{
				float: left;
				padding: 1.2rem;
				font-size: 1rem;
			}
		}
		p{
			padding-top: 0.5rem;
			font-size: 1rem;
		}
		.delcircle-commit {
			width: 100%;
			background-color: #57B663;
			position: fixed;
			left: 0;
			bottom: 0;
			height: 2.3rem;
			color: #FFFFFF;
			text-align: center;
			font-size: 1.1rem;
			padding-top: 0.6rem;
		}
	}
</style>