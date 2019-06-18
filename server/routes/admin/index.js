module.exports = app => {
    const express = require('express')
    
    //这个是express的子路由，当我们需要子路由的时候就用它,因为我们会在子路由上挂载各种各样的东西
    const router = express.Router({
        // 表示合并url参数，写了这个下面的req.params.resource参能获取到
        //把父级里面的url参数合并到router里面来
        useNewUrlParser: true
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
        console.log(req.user)

        // 如果获取数据中有关联数据，那么可以用populate获取完整的数据对象，而不止是关联那个
        // 因为这里的parent是写死的，我们这是通用接口，所以我们需要特殊处理，使用setOptions方法
        // let items = await req.Model.find().populate('parent').limit(10)
        const queryOptions = {}
        if(req.Model.modelName === 'Category'){
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
    // 登陆校验中间件
    const authMiddleware = require('../../middleware/auth')
    const resourceMiddleware = require('../../middleware/resource')
    // 这里我们加了前缀和处理函数
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

    // 中间件
    const multer = require('multer')
    // 传递一个目标地址是哪里
    const upload = multer({ dest: __dirname + '\\..\\..\\uploads'})
    // 除了资源路由还有别的路由，所以我们得在下面写
    // upload.single代表单个文件上传，上传后服务端返回一个file，所以里面是file,这样子我们就接受了这个接口可以上传文件
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req,res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
    app.post('/admin/api/login', async (req,res) => {
        const {username,password} = req.body
        // 1.根据用户名查找用户,因为密码被散列了，所以不能按密码来找
        
        // 在设置用户数据库的时候，我们默认把密码不显示，所以我们这里是取不到的，我们需要在这里加一个.select('+password')
        const user = await AdminUser.findOne({username}).select('+password')

        assert(user,422,'用户不存在')
        // if(!user) {
        //     return res.status(422).send({
        //         message: '用户不存在'
        //     })
        // }
        // 2.校验密码
        // 对比请求的密码和数据库中的密码
        const isValue = require('bcrypt').compareSync(password, user.password)
        assert(isValue,422,'密码错误')
        // if(!isValue) {
        //     return res.status(422).send({
        //         message: '密码错误'
        //     })
        // }
        // 3.返回token
        
        // app.get()只有一个参数就代表获取配置，如果有两个那么就是获取路由
        // token的生成
        const token = jwt.sign({id: user._id},app.get('secret'))
        res.send({token})
    }) 

    // 错误处理中间件
    app.use(async (err,req,res,next) => {
        res.status(err.status || 500).send({
            message: err.message
        })
    })
}