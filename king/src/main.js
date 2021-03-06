import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入字体图标
import './assets/icons/iconfont.css'

import './assets/scss/style.scss'

// 引入vue-awesome-swiper轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)

// 全局引入卡片
import Card from './components/Card.vue'
Vue.component('m-card', Card)

import ListCard from './components/ListCard.vue'
Vue.component('m-list-card', ListCard)

import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api'
  // baseURL: 'http://localhost:3000/web/api'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
