<template>
	<div class="cooperation-company-info">

		<div class="company-info-content">

			<group :title="param.title" v-for="(param,key,index) in params" :key="key" label-width="5em">
				<template v-for="(data,index) in param.data">
					<x-input :title="data.text" v-model="data.value" v-if="data.type=='text'" :placeholder="'请输入'+data.text"></x-input>
					<template v-if="data.type=='select'" >
						<selector 
							:title="data.text" 
							v-model="data.value" 
							:options="data.list"
							:placeholder="'请选择'+data.text" v-if="data.isSelecter" @on-change="onChangeSelecter(data)">
						</selector>
						<x-input :title="data.text" v-model="data.value" v-else :placeholder="'请输入其他'+data.text"></x-input>
					</template>					
					<x-textarea :title="data.text" v-model="data.value" v-if="data.type=='textarea'" :placeholder="'请输入'+data.text"></x-textarea>
				</template>
			</group>

		</div>
		<div class="h60"></div>
		<div class="footer">
			<x-button type="primary" @click.native="submitCompanyInfo">提交</x-button>
		</div>
	</div>
</template>

<script>
	import { XButton, XInput, XTextarea, Group, Selector } from 'vux'
	import { submitCompanyInfo } from '../../../api/api'
	export default {
		components: {
			XButton,
			XInput,
			XTextarea,
			Group,
			Selector
		},
		mounted() {

			//this.$store.state.header.title = '商务合作'
		},
		methods: {
			onChangeSelecter(data){
				if(data.value == '其他'){
					data.isSelecter = false;
					data.value = '';
				}
			},
			submitCompanyInfo() {
				var params = [];
				for(var i = 0; i < this.params.length; i++) {
					for(var j = 0; j < this.params[i].data.length; j++) {
						if(this.params[i].data[j].required && this.params[i].data[j].value == ''){
							this.$vux.toast.text(this.params[i].data[j].text+"不能为空！");
							return false;
						}
						if(this.params[i].data[j].name == 'contact_mobile_phone' && /^1[3|4|5|7|8]\d{9}$/.test(this.params[i].data[j].value) == false ){
							this.$vux.toast.text(this.params[i].data[j].text+"错误！");
							return false;
						}
						params.push(this.params[i].data[j]);						
					}
				}				
				if(this.$store.state.ticket != null && this.$store.state.ticket != '' && this.$store.state.ticket != undefined){					
					params.push({name:'uid',value:this.$route.query.ticket});
				}				
				params = this.util.createFormData(params);//转化成formdata数据				
				submitCompanyInfo(params).then(rs => {
					if(rs.code == 200){
						this.$router.push('/p/cooperation-success/'+rs.data);	
					}else{
						this.$vux.toast.text("参数缺失");
					}									
				})
			}
		},
		data() {
			return {
				params: [{
						title: '企业基本信息',
						data: [{
							name: 'com_name',
							type: 'text',
							value: '',
							required: true,
							text: '企业名称'
						}, {
							name: 'com_type',
							type: 'select',
							value: '',
							text: '企业类型',
							required: true,
							list: ['畜牧机械', '兽药动保', '蛋鸡饲料', '青年鸡/雏鸡', '鸡蛋销售', '蛋品加工', '其他'],
							isSelecter:true
						}, {
							name: 'main_product',
							type: 'text',
							value: '',
							required: true,
							text: '主要产品'
						}, {
							name: 'service_area',
							type: 'text',
							value: '',
							text: '服务地区'
						}, {
							name: 'coop_intention',
							type: 'select',
							value: '',
							text: '合作意向',
							required: true,
							list: ['广告', '商品秒杀', '积分兑换商品', '圈子入驻', '视频投放', '资讯投放', '检测中心入驻', '其他'],
							isSelecter:true
						}, {
							name: 'com_intro',
							type: 'textarea',
							value: '',
							text: '企业简介'
						}]
					},
					{
						title: '企业基本信息',
						data: [{
							name: 'contacts',
							type: 'text',
							value: '',
							required: true,
							text: '联系人'
						}, {
							name: 'contact_mobile_phone',
							type: 'text',
							value: '',
							required: true,
							text: '手机号'
						}, {
							name: 'contact_phone',
							type: 'text',
							value: '',
							text: '座机号'
						}, {
							name: 'contact_address',
							type: 'textarea',
							value: '',
							text: '联系地址'
						}]
					}
				]
			}
		}
	}
</script>

<style lang="less">
	.cooperation-company-info {		
		.group {
			margin: 15px 0;
			display: flex;
			font-size: 14px;
			color: #151515;
			.label {
				flex-grow: 2;
			}
			.input {
				flex-grow: 5;
				input,
				textarea {
					border: 1px solid #CCCCCC;
					padding: 4px 10px;
					width: 90%;
				}
				input {
					border-radius: 20px;
				}
				textarea {
					border-radius: 5px;
				}
			}
		}
		.footer {
			position: fixed;
			width: 100%;
			bottom: 0;
			left: 0;
		}
	}
</style>