import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

/**
 * 开发环境下，Vue 会提供很多警告来帮你对付常见的错误与陷阱。
 * 而在生产环境下，这些警告语句却没有用，反而会增加应用的体积。
 * 此外，有些警告检查还有一些小的运行时开销，这在生产环境模式下是可以避免的。
 */
Vue.config.productionTip = false

// 可以理解它为一个代码块，全局都可以使用，跟创建一个Vue的实例差不多，我们需要让Vue的每一个实例都拥有这个东西
Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL+'/upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  },
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
