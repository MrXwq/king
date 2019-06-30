

// 如果只返回一个async (req, res, next) => {}，这样我们是无法配置的
// 我们返回一个函数，这样就可以想调用就调用想配置就配置
module.exports = options =>{
    // 登陆校验中间件
    const jwt = require('jsonwebtoken')
    // 因为我们会频繁的使用到错误处理，所以我们直接在这加载一个错误处理的包
    const assert = require('http-assert')
    const AdminUser = require('../models/AdminUser')
    // 这里return一个函数，所以，在外面用的时候是要用括号当成一个函数调用完之后才能得到这个async（）这个中间件的
    return async (req, res, next) => {
        // 获取请求头中的authorization,前端是大写A对应服务端是小写a
        // 这里||'',是怕如果没有的话会报错
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登陆')
        // 校验,解密出来获取id,我们可以通过用户id生存token,也可以用token解析出id

        // const tokenData = jwt.verify(token,app.get('secret'))
        // { id: '5d05a2bb724bba2484c30209', iat: 1560655297 }\
        // 解构赋值出id
        // 请求里面有个app对象，不能直接用app，需要用req.app
        const {id} = jwt.verify(token, req.app.get('secret'))
        assert(id, 401, '请先登陆')

        req.user = await AdminUser.findById(id)
        assert(req.user, 401, '请先登陆')
        await next()
    } 
}