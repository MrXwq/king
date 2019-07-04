//这种是插件的写法
module.exports = app => {
    const mongoose = require('mongoose');

    mongoose.connect('mongodb://127.0.0.1:27017/shop', {
        useCreateIndex: true
    })

    // 把文件上的所有文件引用进来，使用一遍
    // 这里没有做任何操作
    require('require-all')(__dirname + '/../models')
}