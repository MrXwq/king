//这种是插件的写法
module.exports = app => {
    const mongoose = require('mongoose');

    mongoose.connect('mongodb://127.0.0.1:27017/shop', {
        useCreateIndex: true
    })
}