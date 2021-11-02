const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    status: String,
    total_players: Number,
    rounds: Number,
    createdOn:Date,
    removedOn:Date,

})

const Model = mongoose.model('arena',schema)

module.exports = Model