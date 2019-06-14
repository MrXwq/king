<template>
    <div>
        <h1>{{id ? '编辑' : '新建'}}文章</h1>
        <el-form label-width = "120px" @submit.native.prevent="save">
            <el-form-item label = "所属分类">
                <el-select v-model="model.categories" multiple>
                    <!-- 点击的时候显示名称，关联是_id，这样，我们该名称的时候才不会影响关联 -->
                    <el-option
                        v-for="item in categories"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label = "标题">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label = "详情">
                <!-- useCustomImageHandler表示使用自定义的图片上传 -->
                <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model="model.detail"></vue-editor>
            </el-form-item>
            <el-form-item label = "名称">
                <el-button type = "primary" native-type = "submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
    
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
    props: {
        id: {}
    },
    components:{
        VueEditor
    },
    data() {
        return {
            model: {},
            categories: []
        }
    },
    methods: {
        // 参数：1. 文件 2. Editor编辑器 3. 光标的位置
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            // FormData是html的方法，表单数据的提交
            var formData = new FormData();
            formData.append("file", file);
            const res = await this.$http.post('upload',formData)
            Editor.insertEmbed(cursorLocation, "image", res.data.url);
            // 重置上传器
            resetUploader();
        },
        async save() {
            let res
            if(this.id){
                res = await this.$http.put(`rest/articles/${this.id}`,this.model)
            }else{
                res = await this.$http.post('rest/articles',this.model)
            }
            //创建完之后应该是跳到一个分类列表
            this.$router.push('/articles/list')
            this.$message({
                type: 'success',
                message: '保存成功'
            })
        },
        async fetch() {
            const res = await this.$http.get(`rest/articles/${this.id}`)
            this.model = res.data
        },
        async fetchCategories() {
            const res = await this.$http.get(`rest/categories`)
            this.categories = res.data
        }
    },
    created() {
        // 前面这个条件满足之后才执行后面的方法
        this.id && this.fetch()
        this.fetchCategories()
    }
}
</script>