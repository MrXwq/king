const mongoose = require('mongoose')

// 类别模型
const ArticleSchema = new mongoose.Schema({
    title: {type: String},
    categories: [{type: mongoose.SchemaTypes.ObjectId,ref: 'Category' }],
    detail: {type: String},
},{
    // 加个时间戳，可以自己生成时间字段，一个创建时间，一个是更新时间
    timestamps: true
})
 
// 还有第三个参数，集合名字,默认根据第一个参数的复数形式写的
module.exports = mongoose.model('Article', ArticleSchema)