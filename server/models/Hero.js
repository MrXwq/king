const mongoose = require('mongoose')

// 类别模型
const HeroSchema = new mongoose.Schema({
    name: {type: String},
    // 头像
    avatar: {type: String},
    // 称号
    title: {type: String},
    // 分类,因为一个英雄可能有多个分类，所以得写成数组的形式
    categories: [{type: mongoose.SchemaTypes.ObjectId,ref: 'Category' }],
    // 评分
    scores: {
        // 难度
        difficult: {type: Number},
        // 技能
        skills: {type: Number},
        // 攻击
        attack: {type: Number},
        // 生存
        survive: {type: Number},
    },
    // 技能
    skills: [{
        // 图标
        icon: {type: String},
        // 名字
        name: {type: String},
        // 描述
        description: {type: String},
        // 提示
        tips: {type: String}
    }],
    // 顺风出装，直接从物品上选取
    items1: [{type: mongoose.SchemaTypes.ObjectId,ref: 'Item'}],
    // 逆风出装
    items2: [{type: mongoose.SchemaTypes.ObjectId,ref: 'Item'}],
    // 使用技巧
    usageTips: {type: String},
    // 对抗技巧
    battleTips: {type: String},
    // 团战思路
    teamTips: {type: String},
    // 搭档
    partners: [{
        hero: {type: mongoose.SchemaTypes.ObjectId,ref: 'Hero'},
        description: {type: String},
    }]
})
 

module.exports = mongoose.model('Hero', HeroSchema)