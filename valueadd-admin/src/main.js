// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Element from 'element-ui'

//css
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // 引入多国语言包
import './icons' // 引入icon组件封装
import './errorLog' // error log
import './permission' // permission control

import * as filters from './filters' // global filters

Vue.use(Element, {
  size: 'medium',// set element-ui default size
  zIndex: 3000,
  i18n: (key, value) => i18n.t(key, value)
})

Object.keys(filters).forEach(key=> {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
