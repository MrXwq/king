
module.exports = options => {
    return async (req,res,next) => {
        // 转换类名
        const modelName = require('inflection').classify(req.params.resource)
        // 这里，它是直接把请求路径的参数拿了过来，我们需要的是它的单数，这是命名规范
        // 这里我们在请求路径上挂载一个属性，不然上面访问不到
        req.Model = require(`../models/${modelName}`)
        // 做完这个函数我们才去处理下面的路径
        next()
    }
}