<template>
	<div class="more-active">
		<div class="active-center-info">
			<ul>
				<li v-for="(active,index) in active_list" @click="activeClick(active.cms_id)">
					<div class="active-center-info-clear">
						<div class="active-center-info-img">
							<img :src="active.cms_pic" alt="" />
						</div>
						<div class="active-center-info-main">
							<p>{{active.cms_title}}</p>
							<p>{{active.start_time}}</p>
							<p>访问数: {{active.view}}</p>
						</div>
						<div class="active-center-info-end">
							<img v-if="active.status==0" src="../../assets/progress-s.png" alt="" />
							<img v-else src="../../assets/finish-s.png" alt="" />
						</div>
					</div>
				</li>
				<mugen-scroll :handler="fetchData" :should-handle="!loading" class="loadings">
					loading...
				</mugen-scroll>
			</ul>
		</div>
	</div>
</template>

<script>
	import { activeInfo } from '../../api/active'
	import MugenScroll from 'vue-mugen-scroll'
	export default {
		components: {
			MugenScroll
		},
		data() {
			return {
				active_list: [],
				loading: false,
				page: 0,
				total: 0
			}
		},
		methods: {
			fetchData() {
				this.page++;
				activeInfo({
					page: this.page,
					ticket: this.$store.state.ticket
				}).then(res => {
					for(var i = 0; i < res.data.data.length; i++) {
						this.active_list.push(res.data.data[i]);
					}
				});
			},
			activeClick(id) {
				this.$router.push('/p/active-detail/'+id)
			}
		},
		mounted() {
			this.$store.state.header.title = "线上活动"
			this.$store.state.header.right_title = "";
		}
	}
</script>

<style lang="less" scoped="scoped">
	.active-center-info-clear:after {
		display: table;
		content: "";
		clear: both;
	}
	
	.more-active {
		background-color: #f4f4f4;
	}
	
	.active-center-info-clear {
		margin-top: 0.5rem;
		padding: 0.5rem 0.5rem 0;
		position: relative;
	}
	
	.active-center-info {
		width: 95%;
		margin: 0 auto;
		padding: 0.5rem 0;
		ul {
			width: 100%;
		}
		li {
			padding-bottom: 0.5rem;
			background-color: #FFFFFF;
		}
		.active-center-info-img {
			float: left;
			img {
				display: inline-block;
				width: 5rem;
				height: 5rem;
			}
		}
		.active-center-info-main {
			width: 50%;
			float: left;
			padding-left: 5%;
			p {
				padding-bottom: 0.4rem;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
			p:first-child {
				font-weight: bold;
			}
			p:nth-child(2) {
				color: #CCCCCC;
			}
			p:nth-child(3) {
				color: #FF0000;
			}
		}
		.active-center-info-end{
			img{
				display: block;
				width: 3rem;
				height: 3rem;
				position: absolute;
				top: 0;
				right: 0;
			}
		}
	}
</style>