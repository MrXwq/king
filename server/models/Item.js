const mongoose = require('mongoose')

// 类别模型
const ItemSchema = new mongoose.Schema({
    name: {
        type: String
    },
    icon: {
        type: String
    },
})
 

module.exports = mongoose.model('Item', ItemSchema)