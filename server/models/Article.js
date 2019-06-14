const mongoose = require('mongoose')

// 类别模型
const ArticleSchema = new mongoose.Schema({
    title: {type: String},
    categories: [{type: mongoose.SchemaTypes.ObjectId,ref: 'Category' }],
    detail: {type: String},
})
 

module.exports = mongoose.model('Article', ArticleSchema)