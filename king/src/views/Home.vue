<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/9826a78321e3549d837f73c81c25738b.1561782882.20242d04cb58880a0312f980f7cc1fa6.230x140_15497.jpg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/a8f73a12cdddf0f835c47d97c73a52de.1561380342.befecc5e938bfc5c29b5e3e9c8ca2d20.230x140_14080.jpg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/a8f73a12cdddf0f835c47d97c73a52de.1561448137.6fb03ed48e0f135fb7fdecf5e1eb77b7.230x140_15200.jpg" alt="">
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-3"  slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->

    <div class="nav-icons bg-white mt-3  text-center pt-3 text-dark-1">
      <!-- 图标和字体 -->
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" 
        v-for="i in 10" :key="i">
          <i class="sprite sprite-news" ></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <!-- 收起 -->
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        收起
      </div>
    </div>
    <!--end of nav-icons -->

    <m-list-card icon = "Menu" title = "新闻资讯" :categories = "newCats">
      <!-- 因为是在自定义组件中写数据，所以才需要那么复杂，slot里面的只能展示父组件写的东西，循环就麻烦了 -->
      <template #items = '{category}'>
        <router-link tag="div" :to="`/articles/${news._id}`"
         class="py-2 fs-lg d-flex" v-for = "(news,i) in category.newsList" :key="i">
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createdAt | data}}</span>
        </router-link >
      </template>
    </m-list-card>

    <m-list-card icon = "card-hero" title = "英雄列表" :categories = "heroCats">
      <!-- 因为是在自定义组件中写数据，所以才需要那么复杂，slot里面的只能展示父组件写的东西，循环就麻烦了 -->
      <template #items = '{category}'>
        <div class="d-flex flex-wrap " style="margin: 0 -0.5rem;">
          <router-link tag="div" :to="`/heroes/${hero._id}`"
          class="p-2 text-center" style="width:20%;" 
          v-for = "(hero,i) in category.heroList" :key="i">
            <img class="w-100" :src="hero.avatar" alt="">
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>

    <m-card title="英雄列表" icon = "hero"></m-card>
    <m-card title="精彩视频" icon = "hero"></m-card>
    <m-card title="图文攻略" icon = "hero"></m-card>

<div>666</div><div>666</div><div>666</div><div>666</div><div>666</div><div>666</div><div>666</div>

    

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import dayjs from 'dayjs'
export default {
   filters: {
        data(val) {
            return dayjs(val).format('MM/DD')
        }
    },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.pagination-home'
        }
      },

      newCats:[],
      heroCats:[]
    }
  },
  methods: {
    // 获取新闻资讯
    async fetchNewsCats() {
      const res = await this.$http.get('news/list')
      this.newCats = res.data
    },
    async fetchHeroCats() {
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data
      console.log(res.data)
    }
  },
  created(){
    this.fetchNewsCats()
    this.fetchHeroCats()
  }
}
</script>
<style lang="scss">
  // 引入的时候需要分号结束
  @import '../assets/scss/variables';
 
 .pagination-home {
   .swiper-pagination-bullet {
     opacity: 1;
     border-radius: 0.1538rem; 
     background: map-get($map: $colors, $key: 'white');
     &.swiper-pagination-bullet-active{
       background: map-get($map: $colors, $key: 'info');
     }
   }
 }
 .nav-icons{
   border-top: 1px solid $border-color;
   border-bottom: 1px solid $border-color;
    .nav-item {
      width: 25%;
      border-right: 1px solid $border-color;
      &:nth-child(4n) {
        border-right: none;
      }
    }
 }
 
</style>
