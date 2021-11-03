const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    email: String,
    arena: String,
    life: Number,
    slack_id:String,
    weapon_id: String,
    hidden: Boolean,
    damage_dealt: Number,
    level: Number,
    createdOn:Date,
    removedOn:Date,

})

const Model = mongoose.model('players',schema)

module.exports = Model