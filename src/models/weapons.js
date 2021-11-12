const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    rarity:String,
    slack_weapon_code:String,
    weapon_code: Number,
    min_dmg: Number,
    max_dmg: Number,
    createdOn:Date,
    removedOn:Date,

})

const Model = mongoose.model('weapons',schema)

module.exports = Model