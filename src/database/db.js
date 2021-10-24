const mongoose = require('mongoose')

function connection(){


    
    console.log(process.env.SEC_CONSTRING)
    mongoose.connect(process.env.MONGO_CONNECTION_STRING)

    const db = mongoose.connection

    db.once('open', () =>{
        console.log('Connect to database')
    })

    db.once('error', ()=>{
        console.error.bind('Connection error')
    })

}

module.exports = {
    connection
}