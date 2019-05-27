<template>
	<div class="chart">
		<div class="draw" id="draw">

		</div>
	</div>
</template>

<script>
	export default {
		props: ['xdate', 'ydate', 'chartitle', 'change'],
		data() {
			return {
				seris: []
			}
		},
		mounted() {
			this.drawLine();
			console.log(this.xdate)
		},
		watch: {
			'ydate': 'drawLine'
		},
		methods: {
			drawLine() {
				if(typeof this.ydate.cornPrice_price != 'undefined') {
					this.seris = [];
					this.seris.push({
						data: this.ydate.cornPrice_price,
						type: 'line',
						name: '玉米价格',
						symbol: 'circle',
						symbolSize: 5, //图标尺寸
						lineStyle: {
							normal: {
								color: "#F5A623" //连线颜色
							}
						},
						itemStyle: {
							normal: {
								color: "#F5A623", //图标颜色
							}
						}
					}, {
						data: this.ydate.mealprice_price,
						type: 'line',
						name: '豆粕价格',
						symbol: 'circle',
						symbolSize: 5, //图标尺寸
						lineStyle: {
							normal: {
								color: "#FF4301" //连线颜色
							}
						},
						itemStyle: {
							normal: {
								color: "#FF4301", //图标颜色
							}
						}
					})
				}else{
					this.seris = [];
					this.seris.push({
						data: this.ydate.price,
						type: 'line',
						name: '鸡蛋价格',
						symbol: 'circle',
						symbolSize: 5, //图标尺寸
						lineStyle: {
							normal: {
								color: "#57b663" //连线颜色
							}
						},
						itemStyle: {
							normal: {
								color: "#57b663", //图标颜色
							}
						},
					},{
						data: [],
						type: 'line',
						name: '',
						symbol: 'circle',
						symbolSize: 5, //图标尺寸
						lineStyle: {
							normal: {
								color: "#57b663" //连线颜色
							}
						},
						itemStyle: {
							normal: {
								color: "#57b663", //图标颜色
							}
						},
					})
				}
				let myChart = this.$echarts.init(document.getElementById('draw'));
				myChart.setOption({
					grid: {
						top: 40,
						bottom: 30,
						left: 45,
						right: 10
					},
					tooltip:{
						trigger:'axis',
					},
					legend: {
						show: true,
						data: this.chartitle,
						textStyle: {
							color: '#999',
						},
						top: '10',
						right: '0',
						itemGap: 1,
						itemWidth: 6,
						itemHeight: 6,
					},
					xAxis: {
						type: 'category',
						data: this.xdate,
						nameTextStyle: {
							color: "#999"
						},
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							color: '#999'
						}
					},
					yAxis: {
						type: 'value',
						name: '单位（元／斤）',
						nameLocation: 'end',
						nameTextStyle: {
							color: "#999"
						},
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							color: '#999'
						},
						scale: true,
						splitLine: {
							lineStyle: {
								color: '#eee'
							}
						}
					},
					series: this.seris
				})
			}
		}
	}
</script>

<style>
	.draw {
		width: 100%;
		height: 20rem;
	}
</style>