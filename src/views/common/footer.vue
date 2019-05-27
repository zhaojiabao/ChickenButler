<template>
		<tabbar>
			<tabbar-item selected link="/">
				<img slot="icon-active" src="../../assets/index1.png">
				<img slot="icon" src="../../assets/index.png">
				<span slot="label">首页</span>
			</tabbar-item>
			<tabbar-item>
				<img slot="icon-active" src="../../assets/prise1.png">
				<img slot="icon" src="../../assets/prise.png">
				<span slot="label">价格详情</span>
			</tabbar-item>
			<tabbar-item link="/forum">
				<img slot="icon-active" src="../../assets/forum1.png">
				<img slot="icon" src="../../assets/forum.png">
				<span slot="label">论坛</span>
			</tabbar-item>
			<tabbar-item>
				<img slot="icon-active" src="../../assets/tool1.png">
				<img slot="icon" src="../../assets/tool.png">
				<span slot="label">工具箱</span>
			</tabbar-item>
			<tabbar-item>
				<img slot="icon-active" src="../../assets/admin1.png">
				<img slot="icon" src="../../assets/admin.png">
				<span slot="label">个人中心</span>
			</tabbar-item>
		</tabbar>
</template>

<script>
	import { Tabbar, TabbarItem } from 'vux'
	export default {
		components: {
			Tabbar,
			TabbarItem
		}
	}
</script>

<style lang="less">
	.weui-tabbar {
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #FFFFFF;
	}
	
	.weui-tabbar__icon {
		width: 1.8rem;
		height: 1.8rem;
	}
	
	.weui-tabbar .weui-tabbar__item:nth-child(3) {
		position: relative;
		.weui-tabbar__icon {
			width: 2.2rem;
			height: 2rem;
		}
	}
	
	.weui-tabbar .weui-tabbar__item:nth-child(3):before {
		display: inline;
		position: absolute;
		top: -1.3rem;
		left: 20%;
		content: " ";
		text-align: center;
		width: 60%;
		height: 3rem;
		background-color: #FFFFFF;
		border-top: 1px solid #CCCCCC;
		border-top-right-radius: 100%;
		border-top-left-radius: 100%;
	}
</style>