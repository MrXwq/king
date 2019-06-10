module.exports = app => {
    const express = require('express')
    //这个是express的子路由，当我们需要子路由的时候就用它,因为我们会在子路由上挂载各种各样的东西
    const router = express.Router()


    const Category = require('../../models/Category')

    // 发送新建分类
    router.post('/categories',async (req,res) => {
        //定义数据,创建数据，要想使用，必须在index.js里面机上app.use(express.json())
        let model = await Category.create(req.body)
        //定义完后，发送给客户端
        res.send(model)
    })

    // 根据id修改数据
    router.put('/categories/:id',async (req,res) => {
        //定义数据,创建数据，要想使用，必须在index.js里面机上app.use(express.json())
        let model = await Category.findByIdAndUpdate(req.params.id,req.body)
        //定义完后，发送给客户端
        res.send(model)
    })

    // 根据id删除整条
    router.delete('/categories/:id',async (req,res) => {
        await Category.findByIdAndDelete(req.params.id,req.body)
        res.send({
            message:'success'
        })
    })

    // 获取分类所有信息
    router.get('/categories',async (req,res) => {
        // 如果获取数据中有关联数据，那么可以用populate获取完整的数据对象，而不止是关联那个
        let items = await Category.find().populate('parent').limit(10)
        res.send(items)
    })

    // 根据id查询单条语句
    router.get('/categories/:id',async (req,res) => {
        let model = await Category.findById(req.params.id)
        res.send(model)
    })

    app.use('/admin/api',router)
}