import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
    // 地址需要根据开发和编译进行替换
    // vue-cli带的,在客户端一般是没有这个process变量的，但webpack打包之后有
    // 如果有这个变量则用这个VUE_APP_API_URL，没有的话就用本地
    baseURL: process.env.VUE_APP_API_URL || '/admin/api'
    // baseURL: 'http://localhost:3000/admin/api'
})

// 请求拦截器，给请求头添加一个Authorization，有什么授权信息的时候可以传，这里传的是token
http.interceptors.request.use(function (config) {
    // 如果没有token的话，服务端就会发现token是空的，就会报一个401的错误
    if(localStorage.token){
        // 前面要加Bearer ，因为不止有这一种类型
        config.headers.Authorization ='Bearer ' + localStorage.token
    }
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// axios的 http拦截器 通用的错误处理 响应拦截器
http.interceptors.response.use(res =>{
    return res
},err => {
    if(err.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })
    }
    if(err.response.status === 401){
        router.push('/login')
    }
    
    return Promise.reject(err)
})

export default http 