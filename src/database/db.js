const mongoose = require('mongoose')

function connection(){

    //mongoose.set('useNewUrlParser',true)
    //mongoose.set('useUnifiedTopology',true)

    mongoose.connect('mongodb://localhost:27017/api-restful?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false')

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