const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String,
        // 让数据不被显示出来，因为每次保存都会对密码进行散列
        select: false,
        set(val) {
            // 密码散列，不可逆,第二个参数是加密指数，越高安全性越高，但耗时越多
            return require('bcrypt').hashSync(val,10)
        }
    }
})
 

module.exports = mongoose.model('User', UserSchema)