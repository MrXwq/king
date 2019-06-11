module.exports = app => {
    const path = require('path')
    const express = require('express')
    //这个是express的子路由，当我们需要子路由的时候就用它,因为我们会在子路由上挂载各种各样的东西
    const router = express.Router({
        // 表示合并url参数，写了这个下面的req.params.resource参能获取到
        //把父级里面的url参数合并到router里面来
        mergeParams:true
    })

    

    // 发送新建分类
    router.post('/',async (req,res) => {
        //定义数据,创建数据，要想使用，必须在index.js里面机上app.use(express.json())
        let model = await req.Model.create(req.body)
        //定义完后，发送给客户端
        res.send(model)
    })

    // 根据id修改数据
    router.put('/:id',async (req,res) => {
        //定义数据,创建数据，要想使用，必须在index.js里面机上app.use(express.json())
        let model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        //定义完后，发送给客户端
        res.send(model)
    })

    // 根据id删除整条
    router.delete('/:id',async (req,res) => {
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            message:'success'
        })
    })

    // 获取分类所有信息
    router.get('/',async (req,res) => {
        

        // 如果获取数据中有关联数据，那么可以用populate获取完整的数据对象，而不止是关联那个
        // 因为这里的parent是写死的，我们这是通用接口，所以我们需要特殊处理，使用setOptions方法
        // let items = await req.Model.find().populate('parent').limit(10)
        let queryOptions = {}
        if(req.Model === 'Category'){
            queryOptions.populate = 'parent'
        }
        let items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })

    // 根据id查询单条语句
    router.get('/:id',async (req,res) => {
        let model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    // 这里我们加了前缀和处理函数
    app.use('/admin/api/rest/:resource',async (req,res,next) => {
        // 转换类名
        const modelName = require('inflection').classify(req.params.resource)
        // 这里，它是直接把请求路径的参数拿了过来，我们需要的是它的单数，这是命名规范
        // 这里我们在请求路径上挂载一个属性，不然上面访问不到
        req.Model = require(`../../models/${modelName}`)
        // 做完这个函数我们才去处理下面的路径
        next()
    } ,router)

    // 中间件
    const multer = require('multer')
    // 传递一个目标地址是哪里

    const upload = multer({ dest: __dirname + '\\..\\..\\uploads'})
    // 除了资源路由还有别的路由，所以我们得在下面写
    // upload.single代表单个文件上传，上传后服务端返回一个file，所以里面是file,这样子我们就接受了这个接口可以上传文件
    app.post('/admin/api/upload', upload.single('file'), async (req,res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
}