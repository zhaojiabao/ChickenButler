<template>
	<div class="search-choose">
		<div class="choose-main">
			<router-link tag='div' :to="{ path:'/p/new-eggchart', query: { num: $route.params.search_area} }">
				<div class="choose-all choose-egg">
					<!-- @click="eggClick"-->
					<p>鸡蛋</p>
					<p>价格</p>
				</div>
			</router-link>
			<router-link tag='div' :to="{ path:'/p/new-materialchart', query: { num: $route.params.search_area} }">
				<div class="choose-all choose-mar">
					<!-- @click="marClick"-->
					<p>原料</p>
					<p>价格</p>
				</div>
			</router-link>
			<router-link tag='div' :to="{ path:'/p/new-cullchart', query: { num: $route.params.search_area} }">
				<div class="choose-all choose-cull">
					<!--@click="cullClick"-->
					<p>淘汰鸡</p>
					<p>价格</p>
				</div>
			</router-link>
			<div class="choose-map">
				<img v-if="$route.params.search_area.indexOf('河南')>-1" style="width: 100%;" src="../../assets/anhui.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('安徽')>-1" style="width: 100%;" src="../../assets/anhui.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('北京')>-1" style="width: 100%;" src="../../assets/beijing.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('重庆')>-1" style="width: 100%;" src="../../assets/chongqing.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('福建')>-1" style="width: 100%;" src="../../assets/fujian.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('甘肃')>-1" style="width: 100%;" src="../../assets/gansu.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('广东')>-1" style="width: 100%;" src="../../assets/guangdong.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('广西')>-1" style="width: 100%;" src="../../assets/guangxi.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('贵州')>-1" style="width: 100%;" src="../../assets/guizhou.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('海南')>-1" style="width: 100%;" src="../../assets/hainan.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('河北')>-1" style="width: 100%;" src="../../assets/hebei.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('黑龙江')>-1" style="width: 100%;" src="../../assets/heilongjiang.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('河南')>-1" style="width: 100%;" src="../../assets/henan.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('湖北')>-1" style="width: 100%;" src="../../assets/hubei.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('湖南')>-1" style="width: 100%;" src="../../assets/hunan.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('江苏')>-1" style="width: 100%;" src="../../assets/jiangsu.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('江西')>-1" style="width: 100%;" src="../../assets/jiangxi.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('吉林')>-1" style="width: 100%;" src="../../assets/jilin.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('辽宁')>-1" style="width: 100%;" src="../../assets/liaoning.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('内蒙古')>-1" style="width: 100%;" src="../../assets/neimenggu.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('宁夏')>-1" style="width: 100%;" src="../../assets/ningxia.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('青海')>-1" style="width: 100%;" src="../../assets/qinghai.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('山东')>-1" style="width: 100%;" src="../../assets/shandong.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('上海')>-1" style="width: 100%;" src="../../assets/shanghai.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('山西')>-1" style="width: 100%;" src="../../assets/shanxi.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('陕西')>-1" style="width: 100%;" src="../../assets/shanxi3.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('四川')>-1" style="width: 100%;" src="../../assets/sichuan.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('台湾')>-1" style="width: 100%;" src="../../assets/taiwan.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('天津')>-1" style="width: 100%;" src="../../assets/tianji.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('新疆')>-1" style="width: 100%;" src="../../assets/xinjiang.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('西藏')>-1" style="width: 100%;" src="../../assets/xizang.png" alt="" />
				<img v-else-if="$route.params.search_area.indexOf('云南')>-1" style="width: 100%;" src="../../assets/yunnan.png" alt="" />
				<img v-else style="width: 100%;" src="../../assets/zhejiang.png" alt="" />
			</div>
			<div style="position: absolute;top: 115px;left: 120px;width: 30px;height: 38px;z-index: 1002;">
				<img style="width: 100%;" src="../../assets/address_top.png" />
			</div>
		</div>
		<div class="choose-bottom">
			<img style="display: inline-block;width: 15px;height: 15px;" src="../../assets/address_bo.png" /><span style="display: inline-block;font-size:15px;padding-left: 10px;margin-bottom: 5px;height: 50px;">{{this.$route.params.search_area}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		mounted() {
			var d = new Date();
			var str = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
			this.menu();
			this.$store.state.header.title = '价格行情';
			var hello_str = encodeURIComponent(this.$route.params.search_area)
			this.$wechat.ready(() => {
				var title = str + '全国各地鸡蛋、原料、淘汰鸡价格';
				var link = 'https://m.danjiguanjia.com/pages/sharePrice.html?area=' + hello_str;
				var imgUrl = 'https://api.danjiguanjia.com/public/icon120.png';
				this.$wechat.onMenuShareTimeline({
					title: title,
					link: link,
					imgUrl: imgUrl
				});
				this.$wechat.onMenuShareAppMessage({
					title: title,
					desc: '天天查价格,掌握最新价格行情信息',
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
		data() {
			return {

			}
		},
		methods: {
			menu() {
				window.scrollTo(0, 0);
			},
		},
	}
</script>

<style lang="less">
	.choose-bottom:after {
		content: "";
		clear: both;
		display: table;
	}
	
	.choose-main {
		height: 270px;
		width: 270px;
		border: 2px dotted #CCCCCC;
		margin: 120px auto 80px;
		border-radius: 50%;
		position: relative;
		.choose-all {
			width: 80px;
			height: 80px;
			background: #F6FBF7;
			border-radius: 50%;
			text-align: center;
			box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.30);
			p {
				font-size: 16px;
			}
			p:first-child {
				padding-top: 18px;
			}
		}
	}
	
	.choose-egg {
		position: absolute;
		top: -40px;
		left: 95px;
	}
	
	.choose-mar {
		position: absolute;
		top: 150px;
		left: -20px;
	}
	
	.choose-cull {
		position: absolute;
		top: 150px;
		right: -20px;
	}
	
	.choose-bottom {
		text-align: center;
	}
	
	.choose-map {
		position: absolute;
		height: 150px;
		width: 150px;
		top: 60px;
		left: 60px;
		z-index: 1001;
	}
</style>