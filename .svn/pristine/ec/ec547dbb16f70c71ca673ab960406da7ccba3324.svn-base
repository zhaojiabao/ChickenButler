<template>
	<div>

		<divider>custom pullup html template</divider>
		<scroller lock-x scrollbar-y use-pullup height="200px" v-model="demo4Value" @on-pullup-loading="load4">
			<!--content slot-->
			<div class="box2">
				<p v-for="i in n4">placeholder {{i}}</p>
			</div>

			<!--pullup slot-->
			<div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
				<span v-show="demo4Value.pullupStatus === 'default'"></span>
				<span class="pullup-arrow" v-show="demo4Value.pullupStatus === 'default' || demo4Value.pullupStatus === 'up' || demo4Value.pullupStatus === 'down'" :class="{'rotate': demo4Value.pullupStatus === 'down'}">↑</span>
				<span v-show="demo4Value.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
			</div>
		</scroller>

	</div>
</template>
<script>
	import { Scroller, Divider, Spinner } from 'vux'
	export default {
		components: {
			Scroller,
			Divider,
			Spinner
		},
		methods: {
			load4() {
				setTimeout(() => {
					this.n4 += 10
					setTimeout(() => {
						this.demo4Value.pullupStatus = 'default'
					}, 10)
				}, 1000)
			}
		},
		data() {
			return {
				demo4Value: {
					pullupStatus: 'default'
				},
				n4: 10,
				demo3Value: {
					pullupStatus: ''
				},
				pullupConfig2: {
					content: '上拉加载更多',
					downContent: '松开进行加载',
					upContent: '上拉加载更多',
					loadingContent: '加载中...'
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.box1 {
		height: 100px;
		position: relative;
		width: 1490px;
	}
	
	.box1-item {
		width: 200px;
		height: 100px;
		background-color: #ccc;
		display: inline-block;
		margin-left: 15px;
		float: left;
		text-align: center;
		line-height: 100px;
	}
	
	.box1-item:first-child {
		margin-left: 0;
	}
	
	.box2-wrap {
		height: 300px;
		overflow: hidden;
	}
	
	.rotate {
		transform: rotate(180deg);
		-webkit-transform: rotate(180deg);
	}
	
	.pullup-arrow {
		display: block;
		transition: all linear 0.2s;
		-webkit-transition: all linear 0.2s;
		color: #666;
		font-size: 25px;
	}
</style>