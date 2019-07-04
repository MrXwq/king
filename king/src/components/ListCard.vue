<template>
    
    <m-card :title = "title" :icon = "icon">
        <nav class = "jc-between">
          <div class = "nav-item" :class = "{active: active === index}"
          v-for="(category,index) in categories" :key = "index" 
          @click="$refs.list.swiper.slideTo(index)">
            <div class = "nav-link">
              {{category.name}}
            </div>
          </div>
        </nav>
        <div class = "pt-3">
          <swiper ref = 'list' :options="{autoHeight:true}"
          @slide-change = '() => active = $refs.list.swiper.realIndex'>
              <swiper-slide v-for = "(category, i) in categories " :key = "i">
                  <!-- category是上面v-for循环出来的 -->
                  <slot name = 'items' :category = 'category'></slot>
              </swiper-slide>
          </swiper>
        </div>
    </m-card>

</template>
<script>

export default {
   
    props: {
        icon: {type: String, required: true},
        title: {type: String, required: true},
        categories: {type: Array, required: true}
    },
    data() {
        return {
            active: 0
        }
    }
}
</script>
<style lang="scss">
    
</style>