<template>
	<!--组件:主产区,主销区-->
	<div class="">
		<div class="select-type">
			<button-tab v-model="$store.state.egg_price.type">
				<button-tab-item @on-item-click="chanClick()">主产区</button-tab-item>
				<button-tab-item @on-item-click="xiaoClick()">主销区</button-tab-item>
			</button-tab>
		</div>
		<div class="line"></div>
	</div>
</template>

<script>
	import { ButtonTab, ButtonTabItem } from 'vux'
	import { userAction } from "../../api/api"
	export default {
		components: {
			ButtonTab,
			ButtonTabItem
		},
		methods: {
			//这个组件在蛋价和原料价格都出现过,判断下然后确定用户的行为
			chanClick() {
				if(this.$route.name == "PriceChart") {
					userAction({
						ticket: this.$store.state.ticket,
						module: 15151,
						cur_version: this.$store.state.cur_version
					})
				} else {
					userAction({
						ticket: this.$store.state.ticket,
						module: 1511,
						cur_version: this.$store.state.cur_version
					})
				}

			},
			xiaoClick() {
				if(this.$route.name == "PriceChart") {
					userAction({
						ticket: this.$store.state.ticket,
						module: 15152,
						cur_version: this.$store.state.cur_version
					})
				} else {
					userAction({
						ticket: this.$store.state.ticket,
						module: 1512,
						cur_version: this.$store.state.cur_version
					})
				}
			}
		}
	}
</script>

<style>

</style>