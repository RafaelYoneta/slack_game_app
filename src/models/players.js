const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    email: String,
    arena: String,
    life: Number,
    slack_id:String,
    weapon:{
        min_dmg: Number, 
        max_dmg: Number,
        rarity:String,
        weapon_name:String,
        weapon_slack_code:String,},
    hidden: Boolean,
    damage_dealt: Number,
    level: Number,
    round_action:Number,
    createdOn:Date,
    removedOn:Date,

})

const Model = mongoose.model('players',schema)

module.exports = Model