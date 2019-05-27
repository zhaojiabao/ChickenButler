<template>
	<!--预测记录-->
	<div class="forecast-record search-result">

		<h2 class="theme-color forecast-record-info">主产区蛋价预测记录结果</h2>
		<x-table :cell-bordered="false">
			<thead>
				<tr class="theme-bg">
					<th>预测地区</th>
					<th>预测时间</th>
					<th>预测结果</th>
					<th>实际结果</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="r in data">
					<td>{{ r.address }}</td>
					<td>{{ r.pre_time }}</td>
					<td>{{ r.predict }}</td>
					<td>{{ r.results }}</td>
				</tr>
			</tbody>
		</x-table>
		<img src="https://api.danjiguanjia.com/public/image/sorry.png" class="empty-data" v-if="data.length == 0" />
	</div>
</template>

<script>
	import { XTable, LoadMore } from 'vux';
	import { getPredict } from '../../api/EggPrice'

	export default {
		components: {
			XTable,
			LoadMore
		},
		data() {
			return {
				data: []
			}
		},
		mounted() {
			this.$store.state.header.title = '预测记录';
			getPredict({
				ticket: localStorage.getItem('ticket')
			}).then(rs => {
				if(rs.retcode == 2000) {
					this.data = rs.data;
				}
			})
			this.$wechat.ready(() => {
				var title = '蛋鸡管家 - 全球蛋鸡产业信息化平台';
				var link = 'https://m.danjiguanjia.com/#/p/forecast-record';
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
		}
	}
</script>

<style lang="less">
	.forecast-record {
		.forecast-record-info {
			text-align: center;
			font-size: 1rem;
			padding: 0.5rem 0;
		}
	}
</style>