const express = require('express')
const path = require('path')


const db = require ('./database/db.js')
const routes = require('./routes/routes')
const app = express()

db.connection()

app.use('/api',routes)
app.use(express.urlencoded({extended : true}))


const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server listening to ${port}`))