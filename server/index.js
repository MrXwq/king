const express = require('express')

const app = express()

const path = require('path')



// 跨域
app.use(require('cors')())

// 新版express可以不用下载bodyParser处理json数据和可以发出post请求了
app.use(express.json())
// 表示uploads下的都是静态文件，在这个路径下的文件都可以通过/uploads来访问
app.use('/uploads',express.static(path.join(__dirname,'./uploads')))

//挂载路由，如果一个目录下只有一个js文件，那么可以直接到admin
require('./routes/admin/index')(app)
//连接数据库
require('./plugins/db')(app)

app.listen(3000,() => {
    console.log('http://localhost:3000')
})