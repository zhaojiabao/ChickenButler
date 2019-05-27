<template>
	<div class="business-cooperation-success">

		<img src="https://img.jianong.com/icon_success.png" class="icon" />
		<p class="info">
			您的企业信息提交成功，我们的商务合作经理会尽快与您联系，如有问题，欢迎咨询：<br/>400-656-7018
		</p>
		<div class="line">
			补充产品详情有助于更好的了解和沟通，欢迎填写详细产品介绍
		</div>
		<group title="企业产品详情" class="product">
			<template v-for="(product,key) in products">
				<x-textarea title="产品介绍" v-model="product.pro_name" :rows="3" placeholder="请输入产品详细介绍"></x-textarea>

				<div class="weui-cell picture-box">
					<div class="weui-cell__hd">
						<label class="weui-label" style="width: 5em;"></label>
						<div class="product-label">产品照片</div>
					</div>
					<div class="weui-cell__hd">
						<ul class="weui-uploader__files">
							<li class="weui-uploader__file" v-for="pic in product.pro_pics" :style="'background-image:url('+pic+')'"></li>
						</ul>
						<div class="weui-uploader__input-box">
							<input class="weui-uploader__input" type="file" name="file" accept="image/*" multiple="" @click="index=key" @change="upload">
						</div>
					</div>
				</div>
				<div class="line"></div>
			</template>
		</group>
		<div class="tools">
			<div class="icons" @click='addProduct'>
				<x-icon type="ios-plus-outline" size="20"></x-icon><span>添加产品</span>
			</div>
			<div class="icons" @click='reduceProduct'>
				<x-icon type="ios-minus-outline" size="20"></x-icon><span>撤销</span>
			</div>
		</div>
		<div class="h60"></div>
		<div class="footer">
			<x-button type="primary" @click.native="addProductInfo">提交产品详情</x-button>
		</div>
	</div>
</template>

<script>
	import { XButton, XTextarea, Group, Loading } from 'vux'
	import { uploadImg, getQiniuSign, submitProductInfo } from '../../../api/api'
	const domain = 'https://img.jianong.com/';
	export default {
		components: {
			XButton,
			XTextarea,
			Group
		},
		mounted() {

			//this.$store.state.header.title = '商业合作';

		},
		methods: {
			addProduct() {
				this.products.push({
					pro_name: '',
					pro_pics: []
				});
			},
			reduceProduct() {
				if(this.products.length > 1) {
					this.products.splice(this.products.length - 1, 1); // 删除最后一个
				}
			},
			upload(e) {
				if(e.target.files[0] == undefined){
					return false;
				}
				this.$vux.loading.show({
					text: '图片上传中，请稍等...'
				})
				getQiniuSign().then(rs => {
					uploadImg({
						file: e,
						token: rs.data
					}).then(rs => {
						this.products[this.index].pro_pics.push(domain + rs.key);
						this.$vux.loading.hide();
					})
				})
			},
			addProductInfo() {
				
				submitProductInfo({
					products: this.products,
					cid: this.$route.params.id
				}).then(rs => {
					if(rs.code == 200){
					this.$vux.alert.show({title:"恭喜您",content:"已经上传成功！"});
					this.products = [{
						pro_name: '',
						pro_pics: []
					}];
					}else{
						this.$vux.toast.text('请您先填写产品信息！');
					}
				})
			}
		},
		data() {
			return {
				products: [{
					pro_name: '',
					pro_pics: []
				}],
				index: 0
			}
		}

	}
</script>

<style lang="less">
	.business-cooperation-success {
		.line {
			height: auto;
			padding: 10px 25px;
			color: #AAAAAA
		}
		.icon {
			display: block;
			width: 20%;
			margin: 6vh auto;
			margin-bottom: 0;
		}
		.product {
			.line {
				padding: 2px 25px;
			}
			.picture-box {
				position: relative;
				.product-label {
					position: absolute;
					top: 8px
				}
			}
		}
		.info {
			width: 80%;
			margin: 4vh auto;
			color: #56b563;
			font-size: 15px;
			text-align: center;
			font-weight: bold;
		}
		.tools {
			padding: 7px;
			&:after {
				clear: both;
				content: '.';
				display: block;
				width: 0;
				height: 0;
				visibility: hidden;
			}
			.icons {
				float: right;
				margin: 15px 10px 0;
				svg,
				span {
					float: left;
					margin-right: 5px;
					color: #56b563
				}
			}
		}
		.vux-x-icon {
			fill: #56b563;
		}
		.business-content {}
		.footer {
			position: fixed;
			width: 100%;
			bottom: 0;
			left: 0;
		}
	}
</style>