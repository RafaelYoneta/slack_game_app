
const ProdcutModel = require('../models/products')


async function get(req,res){


    const products = await ProdcutModel.find()
    res.send(products)
}

module.exports = {
    get
}