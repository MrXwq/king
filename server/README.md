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

