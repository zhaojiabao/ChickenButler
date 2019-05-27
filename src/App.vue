<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app',
		mounted() {
			//console.log(this.$route);
		}
	}
</script>

<style lang="less">
	html,
	body {
		height: 100%;
		font-size: 14px;
	}
	
	body {
		background: #FFFFFF;
	}
	
	* {
		padding: 0;
		margin: 0;
		font-family: "微软雅黑";
		font-size: 12px;
	}
	
	a {
		text-decoration: none;
	}
	
	hr {
		border: none;
		border-top: 1px solid #CCCCCC;
		margin: 7px 0;
	}
	
	ul li {
		list-style: none;
	}
	
	.l {
		float: left;
	}
	
	.r {
		float: right;
	}
	
	.of {
		overflow: hidden;
	}
	
	.table-title {
		background: rgba(87, 182, 99, 0.10);
		height: 35px;
		line-height: 35px;
		border: 1px solid rgba(87, 182, 99, 0.10);
	}
	
	.active-table {
		background-color: #f7f7f7;
	}
	
	.arrow {
		display: inline-block;
		height: 14px;
		width: 8px;
	}
	
	.arrow-ping {
		display: inline-block;
		height: 8px;
		width: 14px;
	}
	
	.vux-popup-picker-select {
		background: #fff !important;
		border: none !important;
	}
	/*.vux-popup-picker-placeholder:after,*/
	
	.type-name:after {
		position: absolute;
		margin-top: 5px;
		margin-left: 5px;
		width: 0;
		height: 0;
		content: " ";
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-top: 8px solid #57B663;
	}
	
	.tab {
		.tab-item {
			color: #333;
			width: 50%;
			text-align: center;
			line-height: 18px;
			height: 42px;
			float: left;
			font-size: 14px;
			padding-top: 8px;
			border-top: none;
		}
		.tab-item.selected {
			color: #57b663;
			background-color: #fff;
		}
	}
	
	.egg-price .tab .tab-item.selected {
		background: #fff;
	}
	
	.weui-cells:after {
		border: none;
	}
	
	.vux-table td:before,
	.vux-table th:before {
		border: none;
	}
	
	.vux-table:after {
		border: none;
	}
	.egg-chart-article {
		height: 35px;
		line-height: 35px;
		padding-left: 10px;
		width: 90%;
		margin: 0 auto;
		background-color: rgb(247, 247, 247);
		overflow:hidden;
		white-space:nowrap;
		text-overflow:ellipsis;
	}
</style>