// import Vue from "../node_modules/vue/dist/vue.js"
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './assets/js/extend'
import './assets/less/app.less'

// 自适应解决方案
import flexible from './assets/js/flexible'
Vue.use(flexible)

// Vant UI框架
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

import Common from './common'
Vue.use(Common)

// 图标插件
import Echarts from 'echarts'
Vue.prototype.$echarts = Echarts

// axios异步请求
import request from './request'
Vue.use(request)

Vue.config.productionTip = false

Vue.prototype.$imgHost = 'http://img.heymisoft.com/'

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')