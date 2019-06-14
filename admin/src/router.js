import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'

import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList.vue'

import HeroEdit from './views/HeroEdit.vue'
import HeroList from './views/HeroList.vue'

import ArticleEdit from './views/ArticleEdit.vue'
import ArticleList from './views/ArticleList.vue'

import AdEdit from './views/AdEdit.vue'
import AdList from './views/AdList.vue'

import AdminEdit from './views/AdminEdit.vue'
import AdminList from './views/AdminList.vue'

import Login from './views/Login.vue'
Vue.use(Router)

import http from './http'
Vue.prototype.$http = http 

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      children:[
        {path:'/categories/create',component:CategoryEdit},
        // 如果 props 被设置为 true，route.params 将会被设置为组件属性。
        {path:'/categories/edit/:id',component:CategoryEdit,props:true},
        {path:'/categories/list',component:CategoryList},

        {path:'/items/create',component:ItemEdit},
        {path:'/items/edit/:id',component:ItemEdit,props:true},
        {path:'/items/list',component:ItemList},

        {path:'/heroes/create',component:HeroEdit},
        {path:'/heroes/edit/:id',component:HeroEdit,props:true},
        {path:'/heroes/list',component:HeroList},

        {path:'/articles/create',component:ArticleEdit},
        {path:'/articles/edit/:id',component:ArticleEdit,props:true},
        {path:'/articles/list',component:ArticleList},

        {path:'/ads/create',component:AdEdit},
        {path:'/ads/edit/:id',component:AdEdit,props:true},
        {path:'/ads/list',component:AdList},

        {path:'/admin_users/create',component:AdminEdit},
        {path:'/admin_users/edit/:id',component:AdminEdit,props:true},
        {path:'/admin_users/list',component:AdminList},
      ]
    },
    
  ]
})
