<template>
	<div class="chart111">
		<div class="drawtwo" id="drawtwo">

		</div>
	</div>
</template>

<script>
	export default {
		//		props: ['xdate', 'ydate'],
		data() {
			return {
				xdate: [],
				ydate: [],
				title: [],
				util: ''
			}
		},
		watch: {
			'$store.state.info_random': 'getDate',
		},
		mounted() {
			//			this.xdate=sessionStorage.getItem('info_xdate').split(',');
			//			this.ydate=sessionStorage.getItem('info_ydate').split(',');
			//			this.title=sessionStorage.getItem('info_title').split(',');
			//			this.util=sessionStorage.getItem('info_unit');
			this.getDate();
		},
		methods: {
			//使用vuex管理数据
			getDate() {
				setTimeout(() => {
					this.$emit('getdate');
					this.xdate = this.$store.state.info_xdate;
					this.ydate = this.$store.state.info_ydate;
					this.title = this.$store.state.info_title.split(',')[0];
					this.util = this.$store.state.info_unit;
					setTimeout(()=>{
						this.drawLineone(this.xdate,this.ydate,this.title,this.util);
					},100)
				}, 100)
			},
			drawLineone(xdate,ydate,title,util) {
				let myChart = this.$echarts.init(document.getElementById('drawtwo'));
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
						data: title,
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
						data: xdate,
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
						name: util,
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
					series: [{
						data: ydate,
						type: 'line',
						name: title,
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

					}]
				})
			}
		}
	}
</script>

<style>
	.drawtwo {
		width: 100%;
		height: 20rem;
	}
</style>