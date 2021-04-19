import Vue from 'vue'
import App from './App'
import store from './store' // 与vue项目中配置相同，可自行配置
Vue.prototype.$store = store



/* 全局组件注册 start  */
import hButton from './components/h-button'
import hIcon from './components/h-icon'
import hLazyImg from './components/h-lazy-img'

Vue.component('h-button', hButton)
Vue.component('h-icon', hIcon)
Vue.component('h-lazy-img', hLazyImg)
/* 全局组件注册 end  */

/* 地址 网络请求 接口  start */
// import url from './api/http/config.js'
// import api from './api/index.js'

// Vue.prototype.$url = url
// Vue.prototype.$api = api

import api from './api/index.js'
 Vue.prototype.$api = api
/* 地址 网络请求 接口  end */


import * as utils from './libs/utils.js'
Vue.prototype.$utils = utils

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
