### 服务端

```shell
npm i
express@next mongoose cors(这个是允许跨域请求的)
```

#### 文件夹

##### model：给数据库创建的模型

##### plugins：连接数据库

##### routes：很多路由放在主入口会很乱，有分前端路由和后端路由

###### index.js

有个小技巧，导出一个函数

```js
module.export = app => {
	require('./')
}
```

### 创建个通用CRUD

#### 安装了个专门用来转换单复数的插件

```shell
npm i inflection
```

```js
module.exports = app => {
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
}
```

### 新增物品列表

#### 因为上面已经写了个通用的接口，所以，我们就不用再写CRUD了，只要增加个模型

### 物品上传图片变成文件上传

#### express本身获取不到上传文件的数据，所以我们需要下载中间件

```shell
npm i multer
```

#### 使用

```js
const multer = require('multer')
// 传递一个目标地址是哪里
const upload = multer({ dest: ___dirname + '/../../uploads'})
//在不同操作系统中路径分隔符是不一样的
//window：用两个\\代替一个\

```

#### 在其他系统中

```js
app.use('/uploads', express.static(__dirname + '/uploads'))
```

#### 在windows系统中

```js
app.use('/uploads',express.static(path.join(__dirname,'./uploads')))
```

#### 用户校验

在前端传过来一个token，然后解密出来，获得一个id，然后通过id在数据库中找到这个用户，再把这个用户赋值给req.user

#### 引用所有关联

```shell
npm i require-all
```

使用

把文件上的所有文件引用进来，使用一遍

```js
require('require-all')(__dirname + '/../models')
```

#### 使用chrome控制台

查找页面的数据

```js
$$('.newslist .title').map(el => {
    el.innerHTML
})
```

