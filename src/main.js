// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import Vuex from 'vuex'
import store from './vuex/store'
import App from './App'
import VueVideoPlayer from 'vue-video-player'
import 'babel-polyfill'
import { AlertPlugin,LoadingPlugin, ToastPlugin, ConfirmPlugin, WechatPlugin } from 'vux'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(VueVideoPlayer)
//使用图片的懒加载
//import ('lazy-vue')

//使用vuex
Vue.use(Vuex)
//去除点击延迟
FastClick.attach(document.body)

Vue.config.productionTip = false

//导入模版样式
import './styles/theme.less'
import Animate from 'animate.css'

//导入全局函数
import util from './common/util'
Vue.prototype.util = util


/* eslint-disable no-new */
new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app-box')

