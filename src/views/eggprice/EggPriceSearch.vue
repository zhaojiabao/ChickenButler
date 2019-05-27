<template>
	<div class="egg-price-search">
		<search placeholder="请输入您要查询的地区" @on-change="getResult" cancel-text=" " @on-focus="onFocus" @result-click="resultClick" :results="results" v-model="search_text" position="absolute" auto-scroll-to-top top="46px" @on-submit="onSearch" ref="search"></search>
		<div class="hot-address">
			<p>热点地区</p>
			<span class="egg-price-search-data" v-for="(res,index) in results" @click="resultClick(res)">
				{{res.title}}
			</span>
		</div>
	</div>
</template>

<script>
	import { Search } from 'vux'
	import { search, getSaleSearch, sreachArea } from '../../api/EggPrice'
	var regZH = new RegExp("[\\u4E00-\\u9FFF]+", "g"); /*验证是否为汉字*/
	export default {
		components: {
			Search
		},
		data() {
			return {
				price_data: [],
				results: [{
					title: '正在搜索中...'
				}],
				search_text: '',
				is_search_focus: false,
				update_time: ''
			}
		},
		mounted() {
			if(this.$store.state.ticket == null) {
				this.$router.push('/p/login');
			}
			sreachArea().then(rs => {
				if(rs.data.length > 0) {
					this.results = [];
					for(var i = 0; i < rs.data.length; i++) this.results.push({
						title: rs.data[i]
					});
				}
			})
			var price_type_number = this.$store.state.price_type;
			var price_type_title = "";
			if(price_type_number == 0) {
				price_type_title = "鸡蛋价格查询"
			} else if(price_type_number == 1) {
				price_type_title = "原料价格查询"
			} else {
				price_type_title = "淘汰鸡价格查询"
			}
			this.$store.state.header.title = price_type_title;

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
			resultClick(item) {
				this.title = item.title;
				//跳转搜索结果页面
				this.$router.push('/p/search-result/' + item.title);
			},
			onFocus() {},
			onSearch() {
				this.$refs.search.setBlur();
			},
		}
	}
</script>

<style lang="less">
	.hot-address {
		width: 90%;
		margin: 0 auto;
		p {
			padding: 0.5rem 0;
			color: #CCCCCC;
		}
		span {
			display: inline-block;
			padding: 5px 10px;
			background-color: #EEEEEE;
			margin: 5px 5px 5px 0;
		}
		/*.weui-cells{
			display: none;
		}*/
	}
</style>