const mongoose = require('mongoose')

const CgSchema = new mongoose.Schema({
    name: {
        type: String
    },
    parent: {
        // 这个类型不能写成String，这个应该写成数据库的id，然后ref是关联哪个模型
        type: mongoose.SchemaTypes.ObjectId,ref:'Category'
    }
})
 

module.exports = mongoose.model('Category', CgSchema)