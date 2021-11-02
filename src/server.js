const express = require('express')
const cors = require('cors')
require('dotenv').config({path:__dirname+'/../.env'})



//const path = require('path')


const db = require ('./database/db.js')
const routes = require('./routes/routes')
const app = express()

db.connection()

const allowedOrigin = [
    'http://127.0.0.1:5500'
]

app.use(cors({
    origin: function(origin,callback){
        let allowed= true

        //if there is no origin, like mobile apps, its allowed
        if(!origin){
            allowed = true
        }

        //allowed only selecteted origins 
        if(!allowedOrigin.includes(origin)){
            allowed = false
        }

        callback(null,allowed)
    }
}))

app.use(express.json())
app.use('/api',routes)
//habilitado para resceber o request no formato json

//app.use(express.urlencoded({ extended: true }))

//d6S23nOFpRU6J50xOO



const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server listening to ${port}`))