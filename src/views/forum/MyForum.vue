<template>
	<!--我的论坛页面-->
	<div class="my-forum">
		<div style="padding: 1rem 0;" class="forum-tab-fix">
			<button-tab>
				<button-tab-item :selected="index == $store.state.my_forum_index" @on-item-click="onItemClick" v-for="(myf_btn,index) in myforum_btntab">{{myf_btn}}</button-tab-item>
			</button-tab>
		</div>
		<div class="forum-tab-fixed">
			<div class="my-forum-main" @click="forumClick(my_forum.id)" v-for="(my_forum,index) in my_forum_list">
				<p class="title">{{my_forum.title}}</p>
				<p v-if="my_forum.sign == 'text'" v-html="urlHtmlReplace(my_forum.content)"></p>
				<div v-else class="audios-forum">
					<button class="btnbox" @click="btnClick"> </button>
					<span class="replay-length">{{my_forum.length}}s</span>
					<audio class="audios-btn" :src="my_forum.content"></audio>
				</div>

				<p class="cover" v-if="my_forum.cover.length > 0">
					<img :src="cov" v-for="(cov,index) in my_forum.cover" />
				</p>
				<ul class="tag-img-time">
					<li>
						<span v-for="(tag,index) in my_forum.tag_id" v-if="index<2">{{tag}}</span>
					</li>
					<li>
						<img src="../../assets/jing.png" v-if="my_forum.type==1 || my_forum.is_jing==1" />
						<img src="../../assets/pu.png" v-else-if="my_forum.type==3" />
						<img src="../../assets/wen.png" v-else="my_forum.type==2" />
					</li>
					<li>
						<i><img src="../../assets/time.png" /></i>
						<span>{{my_forum.create_time}}</span>
					</li>
				</ul>
				<div class="reply">
					<span v-if="my_forum.reply_time!=''">回复: {{my_forum.reply_time}}</span><span v-else> 回复: 无</span>
					<span>{{my_forum.commit}}回</span>
				</div>
				<div class="my-forum-main-form">
					<p v-if="my_forum.circle!=''">来源: {{my_forum.circle}}</p>
					<p v-else>来源: 暂无</p>
					<div class="forum-main-ul" @click.stop @click="delPost(index)" v-if="my_forum.is_del_report ==1">
						<i>
								<img src="../../assets/del.png" alt="" />
							</i>
						<span>删除</span>
					</div>
				</div>
				<hr />
			</div>
		</div>
		<mugen-scroll :handler="fetchData" :should-handle="!loading" scroll-container="wrap" v-show="mugen" class="loadings">
			loading...
		</mugen-scroll>
	</div>
</template>
<script>
	import { ButtonTab, ButtonTabItem, Scroller, PopupPicker, Actionsheet } from 'vux'
	import { myForumList, likeCommunity, unlikeCommunity, favoritePost, delFavoritePost, addReport, cancleReport, delCommunity } from "../../api/api"
	import MugenScroll from 'vue-mugen-scroll'
	export default {
		components: {
			ButtonTab,
			ButtonTabItem,
			Scroller,
			PopupPicker,
			MugenScroll,
			Actionsheet
		},
		data() {
			return {
				my_forum_list: [],
				types: [1, 2, 3],
				scroller: true,
				page: 0,
				showPopupPicker: false,
				current_post: {},
				post: false,
				loading: false,
				mugen: false,//判断无限加载的loading是否出现
				show: false,
				myforum_btntab: ['我发出的帖子', '我参与的帖子', '好友的帖子']
			}
		},
		mounted() {
			this.$store.state.header.title = "我的论坛"
			this.$store.state.header.right_title = "我的消息";
			this.$store.state.header.right_url = "/p/mymessage";
			this.$wechat.ready(() => {
				var title = '蛋鸡管家 - 全球蛋鸡产业信息化平台';
				var link = window.location.href;
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

		},
		methods: {
			btnClick() {

			},
			onItemClick(index) {
				this.page = 1;
				this.my_forum_list = [];
				this.type = this.types[index];
				this.$store.state.my_forum_index = index;
				myForumList({
					type: this.type,
					ticket: this.$store.state.ticket,
					page:1
				}).then(res => {
					console.log(res)
					this.my_forum_list = res.data.res;
					if(res.data.res.length > 5) {
						this.mugen = true
					} else {
						this.mugen = false
					}
				});
			},
			fetchData() {
				this.page++;
				this.type=this.$store.state.my_forum_index+1;
				myForumList({
					type: this.type,
					page: this.page,
					ticket: this.$store.state.ticket
				}).then(res => {
					console.log(res)
					for(var i = 0; i < res.data.res.length; i++) {
						this.my_forum_list.push(res.data.res[i]);
					}
				});
			},
			urlHtmlReplace(str) {
				str = str.replace(/\n/g, '<br/>'); // 替换换行
				var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
				return str.replace(reg, '<a href="$1$2">$1$2</a>');
			},
			forumClick(id) {
				this.$router.push('/p/forum/post-detail/' + id);
			},
			onHidePopup() {
				this.showPopupPicker = false;
			},
			showPopupPickerFun(post) {
				this.current_post = post;
				this.show = true;
			},
			//删除帖子
			delPost(index) {
				console.log(index)
				var _this = this;
				this.$vux.confirm.show({
					title: '您是否确认删除该帖子?',
					onCancel() {},
					onConfirm() {
						delCommunity({
							ticket: _this.$store.state.ticket,
							community_id: _this.my_forum_list[index].id
						}).then(res => {
							if(res.retcode == "2000") {
								_this.$vux.toast.text(res.msg);
								_this.my_forum_list.splice(index, 1);
							} else {
								_this.$vux.toast.text('');
							}
						})
					}
				})
			},
			showPopupPickerFun(post) {
				this.current_post = post;
				this.show = true;
			},
		}
	}
</script>

<style lang="less" scoped="scoped">
	.btnbox {
		width: 30%;
		height: 2rem;
		background-color: #57B663;
		border: none;
		border-radius: 0.5rem;
		float: left;
		outline: none;
	}
	
	.btnbox:active {
		opacity: 0.5
	}
	
	.audios-forum:after {
		display: table;
		content: '';
		clear: both;
	}
	
	.replay-length {
		float: left;
		padding: 0.2rem 0 0 0.5rem;
		font-size: 1rem;
	}
	
	.my-forum {
		.forum-tab-fix {
			background-color: #FFFFFF;
			position: fixed;
			width: 90%;
			z-index: 10;
			top: 47px;
			left: 5%;
		}
		.loadings {
			width: 90%;
			margin: 0 auto;
			text-align: center;
		}
		.forum-tab-fixed {
			margin-top: 57px;
		}
		.jubao {
			img {
				display: inline-block;
				height: 1rem;
				width: 1rem;
			}
		}
		.forum-main-ul:after,
		.reply:after,
		ul.tag-img-time:after,
		.my-forum-main-form:after {
			content: " ";
			display: table;
			clear: both;
		}
		.title {
			font-size: 1.2rem;
			font-weight: bold;
		}
		width: 90%;
		margin: 0 auto;
		.my-forum-main {
			p {
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				word-break: break-all;
			}
			.cover {
				height: 7rem;
				img {
					width: 20%;
					height: 5rem;
					padding: 1rem 0.5rem;
				}
			}
			.my-forum-main-form {
				p {
					float: left;
					font-size: 12px;
					font-weight: none;
				}
			}
			p:first-child {
				text-align: center;
				padding: 0.5rem 0;
			}
			ul.tag-img-time {
				padding-top: 0.5rem;
				li {
					float: left;
					width: 33.33%;
				}
				li:first-child {
					span {
						border: 1px solid #CCCCCC;
						color: #CCCCCC;
						padding: 0rem 0.5rem;
						border-radius: 5px;
						margin-left: 0.3rem;
					}
				}
				li:nth-child(2) {
					text-align: center;
					img {
						display: inline;
						width: 1.5rem;
						height: 1.5rem;
					}
				}
				li:last-child {
					text-align: right;
					color: orange;
				}
			}
			.reply {
				span:first-child {
					float: left;
				}
				span:last-child {
					float: right;
				}
			}
			.forum-main-ul {
				padding-top: 0.5rem;
			}
			.forum-main-ul {
				float: right;
				i {
					display: inline-block;
					width: 1rem;
					height: 0.3rem;
					img {
						width: 100%;
					}
				}
				span {
					padding-left: 0.5rem;
				}
			}
			.forum-main-ul li:nth-child(2) {
				text-align: center;
			}
			.forum-main-ul li:last-child {
				text-align: right;
			}
		}
		.praise {
			color: #FF0000;
		}
		.weui-mask {
			background: rgba(0, 0, 0, 0.05)!important;
		}
		.vux-actionsheet-menu-default {
			color: #1d70e4 !important;
			font-family: "微软雅黑";
		}
	}
</style>