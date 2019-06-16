<template>
    <div class="login-container">
        <el-card header = "请先登陆" class="login-card">
            <el-form @submit.native.prevent="login">
                <el-form-item label = "用户名">
                    <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label = "密码">
                    <el-input v-model="model.password"   type = "password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type = "primary" native-type = "submit">登陆</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            model: {}
        }
    },
    methods: {
        async login() {
            const res = await this.$http.post('/login',this.model)
            // 关闭网页就没了
            // sessionStorage.token = res.data.token
            // 关闭网页还有
            localStorage.token = res.data.token
            this.$router.push('/')
            this.$message({
                message: '登陆成功',
                type: 'success'
            })
        }
    }
}
</script>
<style>
    .login-card{
        width: 30rem;
        margin: 10rem auto;
    }
</style>