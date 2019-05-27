<template>
	<div class="new-search">
		<div class="search-title clear-float">
			<div class="back-img" @click="goUpPage">
				<img src="../../assets/grren-roow.jpg" alt="" />
			</div>
			<div class="search-main">
				<search @on-result-click="resultClick" @on-change="getResult" :results="results" v-model="search_text" position="fixed" auto-scroll-to-top top="0" @on-focus="onFocus" ref="search"></search>
			</div>
			<div class="search-text">
				搜索
			</div>
		</div>
		<div class=" near-search">
			<div class="near-title" v-if='history_city.length>0'>
				最近搜索
			</div>
			<div class="near-content">
				<span v-for='(his,index) in history_city' @click="goHistoryDtail(his.area)">{{his.area}}</span>
			</div>
			<div class="near-title">
				热门搜索
			</div>
			<div class="near-content">
				<span v-for='(hot,index) in hot_city' @click="goHistoryDtail(hot.area)">{{hot.area}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { Search } from 'vux'
	import { search, getSaleSearch, sreachArea, getProdEggPrice,searchHotAndHistoryArea,searchCallBack } from '../../api/EggPrice'
	var regZH = new RegExp("[\\u4E00-\\u9FFF]+", "g");
	export default {
		components: {
			Search
		},
		data() {
			return {
				search_text: '',
				results: [{
					title: ''
				}],
				updata_time: '',
				history_city:[],
				hot_city:[]
			}
		},
		mounted() {
			if(this.$route.name == 'NewSearchPage') {

			}
			this.getNearCtity();
		},
		methods: {
			//点击历史地区跳转详情页
			goHistoryDtail(area){
				searchCallBack({
					ticket:localStorage.getItem('ticket'),
					area:area
				}).then(res=>{
					console.log(res)
				})
				this.$store.state.product_area = area;
				this.$store.state.curr_area = area.split(',')[area.split(',').length - 1];
				this.$router.push('/p/every-info-detail')
			},
			//点击热门地区跳转详情页
			goHistoryDtail(area){
				searchCallBack({
					ticket:localStorage.getItem('ticket'),
					area:area
				}).then(res=>{
					console.log(res)
				})
				this.$store.state.product_area = area;
				this.$store.state.curr_area = area.split(',')[area.split(',').length - 1];
				this.$router.push('/p/every-info-detail')
			},
			//获取当前用户的历史记录以及就近的地区
			getNearCtity(){
				searchHotAndHistoryArea({
					ticket:localStorage.getItem('ticket')
				}).then(res=>{
					this.history_city=res.data.history_area;
					this.hot_city=res.data.hot_area;
				})
			},
			goUpPage() {
				this.$router.go(-1)
			},
			resultClick(item) {
				this.title = item.title;
				this.search_text = this.title
				//跳转搜索结果页面
				searchCallBack({
					ticket:localStorage.getItem('ticket'),
					area:this.title
				}).then(res=>{
					console.log(res)
				})
				this.$store.state.product_area = this.title;
				this.$store.state.curr_area = this.$store.state.product_area.split(',')[this.$store.state.product_area.split(',').length - 1];
				this.$router.push('/p/every-info-detail')

			},
			getResult() {
				//只有汉字才能搜索
				if(regZH.test(this.search_text)) {
					sreachArea({
						area: this.search_text
					}).then(rs => {
						if(rs.data.length > 0) {
							this.results = [];
							for(var i = 0; i < rs.data.length; i++) this.results.push({
								title: rs.data[i]
							});
						}
					})
				}
			},
			onFocus() {
				
			},
		},
		watch: {

		}
	}
</script>

<style lang="less">
	.search-title {
		height: 49px;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		box-sizing: border-box;
		border-bottom: 1px solid #CCCCCC;
		.back-img {
			float: left;
			position: relative;
			width: 10%;
			height: 49px;
			overflow: hidden;
			img {
				position: absolute;
				width: 35px;
				height: 30px;
				top: 10px;
				left: 10px;
			}
		}
		.search-main {
			/*display: inline-block;*/
			float: left;
			width: 80%;
			position: relative;
			padding: 0;
			margin: 0;
			.weui-search-bar {
				background-color: #FFFFFF;
			}
			.weui-search-bar__label,
			.weui-search-bar__box {
				background-color: rgb(238, 247, 239);
			}
		}
		.search-text {
			width: 10%;
			float: left;
			color: #57B663;
			text-align: center;
			height: 49px;
			line-height: 49px;
			font-size: 0.88rem;
		}
	}
	
	.vux-search-fixed {
		background: rgba(0, 0, 0, 0.20);
	}
	
	.weui-cells.vux-search_show {
		background-color: #FFFFFF;
		min-height: 0;
		max-height: 88vh;
		margin: 30px 0;
	}
	
	.new-search {
		.weui-cell {
			float: left;
			background-color: #EEEEEE;
			border-radius: 2px;
			margin: 5px;
			padding: 5px 10px;
		}
	}
	.near-search{
		margin: 50px 5% 0 5%;
		.near-title{
			height: 3rem;
			line-height: 3rem;
			font-size: 0.69rem;
			color: #999999;
		}
		.near-content{
			span{
				background: #EEEEEE;
				margin: 5px;
				padding: 5px 10px;
				display: inline-block;
			}
		}
	}
</style>