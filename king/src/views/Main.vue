<template>
    <div>
        <div class="topbar bg-black py-2 px-3 d-flex ai-center">
            <img height="30" src="../assets/logo.png" alt="">
            <div class="px-2 flex-1">
                <div class="text-white">王者荣耀</div>
                <div class="text-grey-1 fs-xxs">团队成就更多</div>
            </div>
            <button class="btn bg-primary">立即下载</button>
        </div>
        <div class="bg-primary pt-2 pb-1">
            <nav class="d-flex text-white jc-around py-2">
                <div class="nav-item active">
                    <router-link class="nav-link" tag = "div" to = "/">首页</router-link>
                </div>
                <div class="nav-item">
                    <router-link class="nav-link" tag = "div" to = "/">攻略中心</router-link>
                </div>
                <div class="nav-item">
                    <router-link class="nav-link" tag = "div" to = "/">赛事中心</router-link>
                </div>
            </nav>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">

</style>
