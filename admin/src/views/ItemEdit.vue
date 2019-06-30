<template>
    <div>
        <h1>{{id ? '编辑' : '新建'}}物品</h1>
        <el-form label-width = "120px" @submit.native.prevent="save">
            <el-form-item label = "名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label = "图标">
                <!-- action是自带的ajax接口 -->
                <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="afterUpload"
                >
                <!-- 如果有图片就上传图片，没有就图标 -->
                    <img v-if="model.icon" :src="model.icon" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label = "名称">
                <el-button type = "primary" native-type = "submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
    
</template>

<script>
export default {
    props: {
        // 这里能获取到id，是因为在路由设置了props为true，这样，我们就能直接props里获取到route.params上的数据了
        id: {}
    },
    data() {
        return {
            model: {},
        }
    },
    methods: {
        async save() {
            let res
            if(this.id){
                res = await this.$http.put(`rest/items/${this.id}`,this.model)
            }else{
                res = await this.$http.post('rest/items',this.model)
            }
            //创建完之后应该是跳到一个分类列表
            this.$router.push('/items/list')
            this.$message({
                type: 'success',
                message: '保存成功'
            })
        },
        async fetch() {
            const res = await this.$http.get(`rest/items/${this.id}`)
            this.model = res.data
        },
        afterUpload(res) {
            // vue中有个数据响应的问题，就是定义的数据中要是没有定义子集的数据，就不能按下面这种方式添加数据
            // this.model.icon = res.url
            // vue中有一个显示赋值
            this.$set(this.model,'icon',res.url)
        }
    },
    created() {
        console.log(this.$route)
        console.log(this.$router)
        // 前面这个条件满足之后才执行后面的方法
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>