<template>
	<div>
		<div class="container">
			<div class="container-content">
				<div class="logo">
					<img src="../../assets/logo.png" />
				</div>
				<div class="list mb3">
					<div class="item">
						<h2><span>{{egg_price}}</span> 元/斤</h2>
						<div class="trend">
							<span v-if="egg_gains<0"><span style="color: #57b663;">{{egg_gains}}</span> <img src="../../assets/down.png" /></span>
							<span v-else-if="egg_gains==0">{{egg_gains}} <img src="../../assets/flat.png" /></span>
							<span v-else><span style="color: #D0021B;">{{egg_gains}}</span> <img src="../../assets/up.png" /></span>
						</div>
						<div class="title">
							鸡蛋价格
						</div>
					</div>
					<div class="item">
						<h2><span>{{corn_price}}</span>元/吨</h2>
						<div class="trend">
							<span v-if="corn_gains<0"><span style="color: #57b663;">{{corn_gains}}</span> <img src="../../assets/down.png" /></span>
							<span v-else-if="corn_gains==0">{{corn_gains}} <img src="../../assets/flat.png" /></span>
							<span v-else><span style="color: #D0021B;">{{corn_gains}}</span> <img src="../../assets/up.png" /></span>
						</div>
						<div class="title">
							玉米价格
						</div>
					</div>
				</div>

				<div class="list mb3">
					<div class="item">
						<h2><span>{{bean_price}}</span>元/吨</h2>
						<div class="trend">
							<span>{{bean_gains}}</span> <img src="../../assets/up.png" />
						</div>
						<div class="title">
							豆粕价格
						</div>
					</div>
					<div class="item">
						<h2><span>{{chicken_price}}</span>元/斤</h2>
						<div class="trend">
							<span>{{chicken_gains}}</span> <img src="../../assets/up.png"/>
						</div>
						<div class="title">
							淘汰鸡价格
						</div>
					</div>
				</div>

				<div class="update-time mb3">
					更新时间：<span>{{updata_time}}</span>
				</div>

				<div class="address mb3">
					<img src="../../assets/adress.png" /> <span>{{this.$route.params.result_area}}</span>
				</div>

				<div class="list down-more">
					<div class="item">
						<a href="http://app.danjiguanjia.com/#/p/egg-index"><img src="../../assets/btn-more.jpg" /></a>
					</div>
					<div class="item">
						<a href="https://www.danjiguanjia.com//download"><img src="../../assets/btn-download.jpg" /></a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { getDayEggPrice,marSearchList,getChickenPrice } from '../../api/EggPrice'
	export default {
		data() {
			return {
				egg_price:'',
				egg_gains:'',
				corn_price:'',
				corn_gains:'',
				bean_price:'',
				bean_gains:'',
				chicken_price:'',
				chicken_gains:'',
				updata_time:''
			}
		},
		mounted () {
			this.$store.state.header.title = '鸡蛋价格行情';
			getDayEggPrice({
				area:this.$route.params.result_area
			}).then(res=>{
				this.egg_price=res.data[0].price;
				this.egg_gains=res.data[0].gains.toFixed(2);
				this.updata_time=res.data[0].savetime;
			})
			marSearchList({
				area:this.$route.params.result_area,
				type:1
			}).then(res=>{
				this.corn_price=res.data.search[0].price
				this.corn_gains=res.data.search[0].gains
			})
			marSearchList({
				area:this.$route.params.result_area,
				type:2
			}).then(res=>{
				this.bean_price=res.data.search[0].price
				this.bean_gains=res.data.search[0].gains
			})
			getChickenPrice({
				area:this.$route.params.result_area
			}).then(res=>{
				console.log(res)
				this.chicken_price=res.data.search[0].price
				this.chicken_gains=res.data.search[0].gains
			})
		},
		methods: {
			query(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return decodeURI(r[2]);
				return null;
			}
		}
	}
</script>

<style>
	.container {
		height: 100vh;
		background-image: url(../../assets/share-bg.jpg);
		background-size: 100% 100%;
	}
	
	.container-content {
		text-align: center;
	}
	
	.container-content .logo {
		width: 30%;
		margin: 0 auto;
		padding-top: 16vh;
		padding-bottom: 3vh;
	}
	
	.container-content .logo img {
		width: 100%;
	}
	
	.list {
		overflow: hidden;
		width: 70%;
		margin: auto;
	}
	
	.list .item {
		float: left;
		width: 50%;
	}
	
	.list .item h2 {
		font-size: 16px;
	}
	
	.list .trend {
		margin: 1.2vh 0;
	}
	
	.list .trend img {
		width: 10%;
	}
	
	.update-time {
		margin-top: 5vh;
	}
	
	.address,
	.update-time {
		font-size: 12px;
	}
	
	.address img {
		width: 3.5%;
	}
	
	.mb3 {
		margin-bottom: 3vh;
	}
	
	.down-more img {
		width: 80%;
	}
</style>