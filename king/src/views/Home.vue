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
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.pagination-home'
        }
      }
    }
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
</style>
