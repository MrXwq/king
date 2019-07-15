<template>
    <div class="page-hero" v-if="model">
        <div class="topbar bg-black py-2 px-3 text-white d-flex">
            <img height="30" src="../assets/logo.png" alt="">
            <div class="px-2 flex-1">
                <span>王者荣耀</span>
                <span class="ml-2">攻略战</span>
            </div>
            <router-link tag="div" to="/">更多英雄 &gt;</router-link>
        </div>
        <div class="top" :style="{'background-image':`url(${model.banner})`}">
            <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
                <div class="fs.sm">{{model.title}}</div>
                <h2 class="my-2">{{model.name}}</h2>
                <div class=" fs-sm">{{model.categories.map(v => v.name).join('/')}}</div>
                <div class="d-flex jc-between pt-2">
                    <div class="scores d-flex ai-center">
                        <span>难度</span>
                        <span class="badge bg-primary">{{model.scores.difficult}}</span>
                        <span>技能</span>
                        <span class="badge bg-blue-1">{{model.scores.skills}}</span>
                        <span>攻击</span>
                        <span class="badge bg-danger">{{model.scores.attack}}</span>
                        <span>生存</span>
                        <span class="badge bg-dark">{{model.scores.survive}}</span>
                    </div>
                    <router-link to="/" tag="span" class="text-grey">
                        皮肤：2 &gt;
                    </router-link>
                </div>
            </div>
        </div>
        <!-- end of top -->

        <div>
            <div class="bg-white px-3">
                <nav class="jc-around pt-3 pb-2 border-bottom">
                    <div class="nav-item active">
                        <div class="nav-link">
                            英雄初始
                        </div>
                    </div>

                    <div class="nav-item">
                        <div class="nav-link">
                            进阶攻略
                        </div>
                    </div>
                </nav>
            </div>
            <swiper>
                <swiper-slide>
                    <div>
                        <div class="p-3 bg-white border-bottom">
                            <div class="d-flex">
                                <router-link tag="button" to="/" class="btn btn-lg flex-1">
                                    <i class="iconfont icon-Menu"></i>
                                    英雄介绍视频
                                </router-link>
                                <router-link tag="button" to="/" class="btn flex-1 ml-1 btn-lg">
                                    <i class="iconfont icon-Menu"></i>
                                    一图识别英雄
                                </router-link>
                            </div>

                                <!-- skills -->
                            <div class="skills bg-white mt-4">
                                <div class="d-flex jc-around">
                                    <img 
                                    class="icon"
                                    @click="currentSkillIndex = i"
                                    :class="{active: currentSkillIndex === i}"
                                    v-for="(item,i) in model.skills"
                                    :key="item.name"
                                    :src="item.icon" 
                                    alt="">
                                </div>
                                <!-- 技能和技能描述 -->
                                <div v-if="currentSkill">
                                    <div class="d-flex pt-4 pb-3">
                                        <!-- h3有自己上下margin -->
                                        <h3 class="m-0">{{currentSkill.name}}</h3>
                                        <span class="text-grey-1 ml-4">
                                            (冷却值: {{currentSkill.delay}} 
                                            消耗: {{currentSkill.cost}})
                                        </span>
                                    </div>
                                    <p>
                                        {{currentSkill.description}}
                                    </p>
                                    <div class="border-bottom"></div>
                                    <p class="text-grey-1">小提示：{{currentSkill.tips}}</p>
                                </div>
                            </div>

                        </div>

                        <m-card plain icon="Menu" title="出装推荐" class="hero-items">
                            <div class="fs-xl">
                                顺风出装
                                <div class="d-flex jc-around text-center mt-3">
                                    <div v-for="item in model.items1" :key="item.name">
                                        <img :src="item.icon" class="icon" alt="">
                                        <div class="fs-xs">{{item.name}}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="border-bottom mt-3"></div>

                            <div class="fs-xl mt-3">
                                逆风出装
                                <div class="d-flex jc-around text-center mt-3">
                                    <div v-for="item in model.items2" :key="item.name">
                                        <img :src="item.icon" class="icon" alt="">
                                        <div class="fs-xs">{{item.name}}</div>
                                    </div>
                                </div>
                            </div>
                        </m-card>

                        <m-card plain icon="Menu" title="使用技巧">
                            <p class="m-0">{{model.usageTips}}</p>
                        </m-card>

                        <m-card plain icon="Menu" title="对抗技巧">
                            <p class="m-0">{{model.battleTips}}</p>
                        </m-card>

                        <m-card plain icon="Menu" title="团战思路">
                            <p class="m-0">{{model.teamTips}}</p>
                        </m-card>

                        <m-card plain icon="Menu" title="英雄关系">
                            <div class="fs-xl">最佳搭档</div>
                            <div v-for="item in model.partners" :key="item.name"
                            class="d-flex pt-3">
                                <img :src="item.hero.avatar" alt="" height="50">
                                <p class="flex-1 m-0 ml-3">
                                    {{item.description}}
                                </p>
                            </div>

                            <div class="border-bottom mt-3"></div>
                        </m-card>


                    </div>
                </swiper-slide>
            </swiper>
        </div>

    </div>
    
    

</template>
<script>
export default {
    props: {
        id: {required: true}
    },
    data() {
        return {
            model: null,
            currentSkillIndex:0,
        }
    },
    computed: {
        currentSkill() {
            return this.model.skills[this.currentSkillIndex]
        }
    },
    methods: {
        async fetch(){
            const res = await this.$http.get(`heroes/${this.id}`)
            this.model = res.data
            console.log(this.model)
        }
    },
    created() {
        this.fetch()
    }
}
</script>
<style lang="scss">
@import '../assets/scss/_variables.scss';
.page-hero {
    .topbar {
        align-items: center;
    }
    .top {
        // 视窗宽度的50%
        height: 50vw;
        // 垂直方向上往上靠，水平方向上居中
        background: #fff no-repeat top center;
        background-size:auto 100%;
        .info {
            background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
            .badge {
                margin: 0 0.25rem;
                display: inline-block;
                width: 1rem;
                height: 1rem;
                line-height: 0.9rem;
                text-align: center;
                border-radius: 50%;
                font-size: 0.4rem;
                border: 1px solid rgba(255,255,255,0.2);
            }
        }
    }
}
.skills {
    img.icon {
        width: 70px;
        height: 70px;
        // 默认是白色边框，当这样就不会当给它加边框的时候大小不一致
        border: 3px solid map-get($map: $colors, $key: 'white');
        &.active {
            border-color: map-get($map: $colors, $key: 'primary');
        }
        border-radius: 50%;
    }
}

.hero-items{
    img.icon{
        width: 45px;
        height: 45px;
        border-radius: 50%;
    }
}

</style>
