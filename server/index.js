const express = require('express')

const app = express()

//跨域
app.use(require('cors')())

app.use(express.json())

//挂载路由，如果一个目录下只有一个js文件，那么可以直接到admin
require('./routes/admin/index')(app)
//连接数据库
require('./plugins/db')(app)

app.listen(3000,() => {
    console.log('http://localhost:3000')
})