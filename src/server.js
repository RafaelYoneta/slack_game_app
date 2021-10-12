const express = require('express')
const path = require('path')


const db = require ('./database/db.js')
const routes = require('./routes/routes')
const app = express()

db.connection()
app.use(express.json())
app.use('/api',routes)

//habilitado para resceber o request no formato json

//app.use(express.urlencoded({ extended: true }))



const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server listening to ${port}`))