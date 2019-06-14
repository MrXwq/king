<template>
    <div class="login-container">
        <el-card header = "请先登陆" class="login-card">
            <el-form>
                <el-form-item label = "用户名">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label = "密码">
                    <el-input  type = "password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type = "primary" native-type = "submit">登陆</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
