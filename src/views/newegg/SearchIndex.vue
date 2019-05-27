<template>
	<div class="search-index">
		<div style="text-align: center;margin: 30px 0 100px 0;">
			更新时间: {{updata_time}}
		</div>
		<div class="search-map"></div>
		<div class="search-chart">
			<div class="search-input">
				<search position="absolute" placeholder='请输入您要查询的地区' style='top: 120px;' @on-change="getResult" @on-focus="onFocus" :results="results" @on-submit="onSearch" ref="search" @result-click="resultClick" v-model="search_text"></search>
			</div>
			<div id="search_zero"></div>
			<div id="search_one"></div>
			<div id="search_two"></div>
			<div id="search_thr"></div>
		</div>
	</div>
</template>

<script>
	import { Search } from 'vux'
	import { search, getSaleSearch, sreachArea ,getProdEggPrice} from '../../api/EggPrice'
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
				updata_time:''
			}
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
			onFocus() {
				sreachArea().then(rs => {
					if(rs.data.length > 0) {
						this.results = [];
						for(var i = 0; i < rs.data.length; i++) this.results.push({
							title: rs.data[i]
						});
					}
				})
			},
			resultClick(item) {
				document.getElementById('search_zero').classList.add("search_zero")
				document.getElementById('search_one').classList.add("search_one")
				document.getElementById('search_two').classList.add("search_two")
				document.getElementById('search_thr').classList.add("search_thr")
				this.title = item.title;
				this.search_text=this.title
				if(this.title.indexOf('北京,')>-1){
					this.title=this.title.replace('北京,', '北京市,')
				}
				if(this.title.indexOf('天津,')>-1){
					this.title=this.title.replace('天津,', '天津市,')
				}
				if(this.title.indexOf('上海,')>-1){
					this.title=this.title.replace('上海,', '上海市,')
				}
				//跳转搜索结果页面
				setTimeout(()=>{this.$router.push('/p/search-choose/' + this.title)},1000)
			},
			onSearch() {
				this.$refs.search.setBlur();
			},
			menu() {
				window.scrollTo(0, 0);
			},
		},
		mounted() {
			getProdEggPrice({
				area:'河北'
			}).then(res=>{
				this.updata_time=res.data[0].savetime
			})
			this.menu();
			var d = new Date();
			var str = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
			this.$store.state.header.title = '价格行情';
			this.$wechat.ready(() => {
				var title = str + '全国各地鸡蛋、原料、淘汰鸡价格';
				var link = 'https://m.danjiguanjia.com/#/p/egg-index';
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
		}
	}
</script>

<style>
	.search-index {
		overflow: hidden;
		height: 100vh;
	}
	
	.search-map {
		position: absolute;
		top: 180px;
		z-index: 1;
		width: 96%;
		margin: 0 2%;
		height: 300px;
		background: url(../../assets/china_map.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.search-chart {
		position: relative;
		width: 300px;
		height: 300px;
		transition: 0.5s;
		margin: 0 auto;
	}
	
	.search_zero {
		position: absolute;
		width: 160px;
		height: 160px;
		top: 70px;
		left: 70px;
		z-index: 10;
		border-radius: 50%;
		background: rgba(87, 182, 99, 0.05);
	}
	
	.search_one {
		position: absolute;
		width: 160px;
		height: 160px;
		top: 70px;
		animation: warn 1s infinite;
		left: 70px;
		z-index: 10;
		border-radius: 50%;
		background: rgba(87, 182, 99, 0.05);
	}
	
	.search_two {
		position: absolute;
		width: 290px;
		height: 290px;
		top: 5px;
		left: 5px;
		z-index: 10;
		animation: warn1 1s infinite;
		border-radius: 50%;
		background: rgba(87, 182, 99, 0.05);
	}
	
	.search_thr {
		position: absolute;
		width: 400px;
		height: 400px;
		top: -50px;
		left: -50px;
		z-index: 10;
		animation: warn2 1s infinite;
		border-radius: 50%;
		background: rgba(87, 182, 99, 0.05);
	}
	
	@keyframes warn {
		0% {
			position: absolute;
			width: 160px;
			height: 160px;
			top: 70px;
			left: 70px;
			z-index: 10;
			border-radius: 50%;
			background: rgba(87, 182, 99, 0.05);
		}
		100% {
			position: absolute;
			width: 290px;
			height: 290px;
			top: 5px;
			left: 5px;
			z-index: 10;
			border-radius: 50%;
			background: rgba(87, 182, 99, 0.05);
		}
	}
	
	@keyframes warn1 {
		0% {
			position: absolute;
			width: 290px;
			height: 290px;
			top: 5px;
			left: 5px;
			z-index: 10;
			border-radius: 50%;
			background: rgba(87, 182, 99, 0.05);
		}
		100% {
			position: absolute;
			width: 400px;
			height: 400px;
			top: -50px;
			left: -50px;
			z-index: 10;
			border-radius: 50%;
			background: rgba(87, 182, 99, 0.05);
		}
	}
	
	@keyframes warn2 {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	
	.search-input {
		height: 50px;
		width: 100%;
		padding-top: 120px;
		position: relative;
		z-index: 100;
	}
	
	.weui-cells.vux-search_show {
		background: rgb(244, 247, 245);
		min-height: 120px;
		max-height: 200px;
		padding: 0 1%;
	}
	/*.weui-cell {
		padding: 0 !important;
		margin: 0 !important;
		float: left;
		width: 31.9%;
		height: 35px;
		border: 2px solid #fff;
		line-height: 35px;
		text-align: center;
		background: rgba(87, 182, 99, 0.10);
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}*/
</style>