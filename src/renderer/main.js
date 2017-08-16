import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

// 引入vue-amap
// import VueAMap from 'vue-amap'

Vue.use(ElementUI)
// Vue.use(VueAMap)

// // 初始化vue-amap
// VueAMap.initAMapApiLoader({
//   // 高德的key
//   key: '0d14f38ee7fba775c412cbac8c6faa19',
//   // 插件集合
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
// })

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
