const mongoose = require('mongoose')

// 类别模型
const AdSchema = new mongoose.Schema({
    name: {
        type: String
    },
    items: [{
        image: {type: String},
        url: {type: String}
    }]
})
 

module.exports = mongoose.model('Ad', AdSchema)