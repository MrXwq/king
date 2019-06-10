import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'
Vue.use(Router)

import http from './http'
Vue.prototype.$http = http 

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children:[
        {path:'/categories/create',component:CategoryEdit},
        // 如果 props 被设置为 true，route.params 将会被设置为组件属性。
        {path:'/categories/edit/:id',component:CategoryEdit,props:true},
        {path:'/categories/list',component:CategoryList}
      ]
    },
    
  ]
})
