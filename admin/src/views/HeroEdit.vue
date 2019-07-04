<template>
    <div class="about">
        <h1>{{id ? '编辑' : '新建'}}英雄</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-tabs value = "basic" type="border-card">
                <el-tab-pane label="基础信息" name="basic">
                    <el-form-item label = "名称">
                        <el-input v-model="model.name"></el-input>
                    </el-form-item>
                    <el-form-item label = "称号">
                        <el-input v-model="model.title"></el-input>
                    </el-form-item>
                    <el-form-item label = "类型">
                        <el-select v-model="model.categories" multiple>
                            <el-option v-for="item in categories" 
                            :key = "item._id" :label = "item.name" :value = "item._id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label = "头像">
                        <el-upload
                        class="avatar-uploader"
                        :action="uploadUrl"
                        :headers="getAuthHeaders()"
                        :show-file-list="false"
                        :on-success="res => $set(model,'avatar',res.url)"
                        >
                            <img v-if="model.avatar" :src="model.avatar" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label = "背景图片">
                        <el-upload
                        class="avatar-uploader"
                        :action="uploadUrl"
                        :headers="getAuthHeaders()"
                        :show-file-list="false"
                        :on-success="res => $set(model,'banner',res.url)"
                        >
                            <img v-if="model.banner" :src="model.banner" class="avatar" />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label = "难度">
                        <el-rate style="margin-top:0.7rem" :max = "9" show-score v-model="model.scores.difficult"></el-rate>
                    </el-form-item>
                    <el-form-item label = "技能">
                        <el-rate style="margin-top:0.7rem" :max = "9" show-score v-model="model.scores.skills"></el-rate>
                    </el-form-item>
                    <el-form-item label = "攻击">
                        <el-rate style="margin-top:0.7rem" :max = "9" show-score v-model="model.scores.attack"></el-rate>
                    </el-form-item>
                    <el-form-item label = "生存">
                        <el-rate style="margin-top:0.7rem" :max = "9" show-score v-model="model.scores.survive"></el-rate>
                    </el-form-item>
                    <el-form-item label = "顺风出装">
                        <el-select v-model="model.items1" multiple>
                            <el-option v-for="item in items" 
                            :key = "item._id" :label = "item.name" :value = "item._id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label = "逆风出装">
                        <el-select v-model="model.items2" multiple>
                            <el-option v-for="item in items" 
                            :key = "item._id" :label = "item.name" :value = "item._id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label = "使用技巧">
                        <el-input type = "textarea" v-model="model.usageTips"></el-input>
                    </el-form-item>
                    <el-form-item label = "对抗技巧">
                        <el-input type = "textarea" v-model="model.battleTips"></el-input>
                    </el-form-item>
                    <el-form-item label = "团战思路">
                        <el-input type = "textarea" v-model="model.teamTips"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label = "技能" name = "skills">
                    <el-button @click="model.skills.push({})" type = "primary">
                        <i class="el-icon-circle-plus"></i>
                        添加技能
                    </el-button>
                    <el-row>
                        <el-col :md = "12" v-for="(item,i) in model.skills" :key="i">
                            <el-form-item label = "名称">
                                <el-input type = "text" v-model="item.name"></el-input>
                            </el-form-item>
                            <el-form-item label = "冷却至">
                                <el-input type = "text" v-model="item.delay"></el-input>
                            </el-form-item>
                            <el-form-item label = "消耗">
                                <el-input type = "text" v-model="item.cost"></el-input>
                            </el-form-item>
                            <el-form-item label = "头像">
                                <!-- 如果属性一开始没有值的时候，可能会导致赋值赋不上去，所以我们要用vue里面的显示赋值 -->
                                <el-upload
                                class="avatar-uploader"
                                :action="uploadUrl"
                                :headers="getAuthHeaders()"
                                :show-file-list="false"
                                :on-success="(res) => $set(item,'icon',res.url)"
                                >
                                    <img v-if="item.icon" :src="item.icon" class="avatar" />
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label = "描述" >
                                <el-input type = "textarea" v-model="item.description"></el-input>
                            </el-form-item>
                            <el-form-item label = "提示" >
                                <el-input type = "textarea" v-model="item.tips"></el-input>
                            </el-form-item>
                            <el-form-item >
                                <el-button type = "danger" size = "small" @click="model.skills.splice(i,1)">删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <!-- 添加最佳搭档 -->
                <el-tab-pane label = "最佳搭档" name = "partners">
                    <el-button @click="model.partners.push({})" type = "primary">
                        <i class="el-icon-circle-plus"></i>
                        添加最佳搭档
                    </el-button>
                    <el-row type="flex" style="flex-wrap: wrap">
                        <el-col :md = "12" v-for="(item,i) in model.partners" :key="i">
                            <el-form-item label = "英雄">
                                <!-- filterable让它可筛选 -->
                                <el-select
                                filterable
                                 v-model="item.hero">
                                    <!-- value绑定的值，label显示的值 -->
                                    <el-option v-for="hero in heroes" 
                                    :key="hero._id"
                                    :value="hero._id"
                                    :label="hero.name"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label = "描述" >
                                <el-input type = "textarea" v-model="item.description"></el-input>
                            </el-form-item>
                            <el-form-item >
                                <el-button type = "danger" size = "small" @click="model.partners.splice(i,1)">删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <el-form-item style="margin-top: 1rem;">
                    <!-- 原生submit -->
                    <el-button type = "primary" native-type = "submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
    
</template>

<script>
export default {
    props: {
        id: {}
    },
    data() {
        return {
            categories: [],
            items: [],
            heroes: [],
            model: {
                name:'',
                avatar:'',
                scores: {},
                skills: [],
                partners: [],
                scores: {
                    difficult: 0
                }
            },
        }
    },
    methods: {
        async save() {
            let res
            if(this.id){
                res = await this.$http.put(`rest/heroes/${this.id}`,this.model)
            }else{
                res = await this.$http.post('rest/heroes',this.model)
            }
            // 保存之后返回
            // this.$router.push('/heroes/list')
            this.$message({
                type: 'success',
                message: '保存成功'
            })
        },
        async fetch() {
            const res = await this.$http.get(`rest/heroes/${this.id}`)
            // 如果有同名的，那么，res.data会覆盖掉this.model
            this.model = Object.assign({}, this.model, res.data)
        },
        // 获取分类信息
        async fetchCategories() {
            const res = await this.$http.get(`rest/categories`)
            this.categories = res.data
        },
        // 获取物品列表
        async fetchItems() {
            const res = await this.$http.get(`rest/items`)
            this.items = res.data
        },
        // 获取英雄列表
        async fetchHeroes() {
            const res = await this.$http.get(`rest/heroes`)
            this.heroes = res.data
        },
        
    },
    created() {
        this.fetchItems()
        this.fetchCategories()
        this.fetchHeroes ()
        this.id && this.fetch()
    }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }
  .avatar {
    width: 5rem;
    height: 5rem;
    display: block;
  }
</style>