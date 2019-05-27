<template>
	<div class="sale-list">
		<x-table :cell-bordered="false" style="background-color:#fff;">
			<thead>
				<tr style="background-color: #F7F7F7">
					<th>地区</th>
					<th>价格（元／斤）</th>
					<th>涨跌幅</th>
				</tr>
			</thead>
			<tbody>
				<tr class="table-border clear-float" @click="goSaleDetail(item)" v-for="(item,index) in sale_list" :key='index'>
					<td>{{item.bazaar}}</td>
					<td style="font-weight: bold;">{{item.bazzar_price}}</td>
					<td style="position: relative;">
						<span class="gains-info">
							<template v-if="item.percent>0">
								<span style="color:#D0021B;font-weight: bold;">+{{parseFloat(item.percent).toFixed(1)}}%</span>
								<span style="color:#999;">+{{item.gains.toFixed(2)}}</span>
							</template>
							<template v-else-if="item.percent==0">
								<span style="color:#333;font-weight: bold;">{{parseFloat(item.percent).toFixed(1)}}%</span>
								<span style="color:#999;">{{item.gains.toFixed(2)}}</span>
							</template>
							<template v-else>
								<span style="color:#57b663;font-weight: bold;">{{parseFloat(item.percent).toFixed(1)}}%</span>
								<span style="color:#999;">{{item.gains.toFixed(2)}}</span>
							</template>
						</span>
						<img class="sale-arrow" src="../../assets/jiantou.png" />
					</td>
				</tr>
			</tbody>
		</x-table>
	</div>
</template>

<script>
	import { daySaleEggPriceList } from '../../api/EggPrice'
	import { XTable } from 'vux'
	export default {
		data() {
			return {
				sale_list: []
			}
		},
		methods: {
			goSaleDetail(item) {
				this.$router.push('/p/sale-detail/' + item.bazaar)
			}
		},
		mounted() {
			this.$store.state.header.title = '鸡蛋(销区)';
			daySaleEggPriceList({
				ticket: localStorage.getItem('ticket')
			}).then(res => {
				this.sale_list = res.data;
			})

			this.$wechat.ready(() => {
				var title = this.util.getNowTime() + '全国各地销区鸡蛋价格列表';
				var link = 'https://m.danjiguanjia.com/newH5/#/p/sale-list';
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
		components: {
			XTable
		}
	}
</script>

<style lang="less">
	.table-border {
		border-bottom: 1px solid #EEEEEE;
		height: 4rem;
		line-height: 4rem;
		td {
			width: 35%;
		}
	}
	
	.sale-arrow {
		position: absolute;
		right: 5vw;
		top: 1.5rem;
		display: block;
		width: 0.5rem;
		height: 1rem;
	}
</style>