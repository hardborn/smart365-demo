import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import { AUTHORIZED } from './types'
import VueAMap from 'vue-amap'

Vue.use(VueAMap)
Vue.use(Vuex)

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: '0d14f38ee7fba775c412cbac8c6faa19',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.Geolocation', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  uiVersion: '1.0'
})

const state = {
  isAuthorized: false
}

const mutations = {
  [AUTHORIZED] (state, payload) {
    state.isAuthorized = true
  }
}
export default new Vuex.Store({
  state,
  mutations,
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
