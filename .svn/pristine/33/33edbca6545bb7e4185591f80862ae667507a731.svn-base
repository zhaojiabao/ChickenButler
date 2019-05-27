<template>
	<div class="active-detail">
		<iframe :src="'http://www.danjiguanjia.com/news/index/active/id/'+this.$route.params.active_id" width="100%" height="100%" frameborder="no"></iframe>
	</div>
</template>

<script>
	import { activeInfo } from '../../api/active'
	export default {
		data() {
			return {
				URL:''
			}
		},
		methods: {

		},
		mounted() {
			this.$store.state.header.title = "线上活动详情";
		}
	}
</script>

<style>
	.active-detail{
		height: 100vh;
	}
</style>