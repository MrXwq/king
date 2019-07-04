<template>
    <div class="page-article"  v-if="model">
        <div class="d-flex py-3 px-2 border-bottom">
            <i class="iconfont icon-back text-blue"></i>
            <div class="flex-1 text-blue pl-2">
                {{model.title}}
            </div>
            <div class="text-gray fs-xs">
                2019-07-04
            </div>
        </div>
        <!-- 详情内容 -->
        <div v-html="model.detail" class="px-3 abody fs-lg"></div>
        <!-- 相关资讯头 -->
        <div class="px-3 border-top py-3">
            <div class="d-flex ai-center">
                <i class="iconfont icon-Menu"></i>
                <strong class="text-blue fs-lg ml-1">相关资讯</strong>
            </div>
            <!-- 相关文章 -->
            <div class="pt-2">
                <router-link class="text-ellipsis py-1"
                :to="`/articles/${item._id}`" 
                v-for="item in model.related" 
                :key="item._id">
                {{item.title}}
                </router-link>
            </div>
        </div>
    </div>
    
</template>
<script>
export default {
    props: {
        id: {required:true}
    },
    watch: {
        // 当页面id变化时，调用这个方法，这是简写
        id: 'fetch',  
        // id() {
        //     this.fetch()
        // }
    },
    data() {
        return {
            model:null
        }
    },
    methods: {
        async fetch() {
            const res = await this.$http.get(`/articles/${this.id}`)
            this.model = res.data
            console.log(res)
        }
    },
    created() {
        this.fetch()
    }
}
</script>
<style lang="scss">
    .page-article{
        i {
            font-size: 1.6923rem;
        }
        .abody{
            img {
                max-width: 100%;
                height: auto;
            }
            iframe {
                max-width: 100%;
                height: auto;
            }
        }
    }
</style>