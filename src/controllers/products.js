
const ProdcutModel = require('../models/products')


async function get(req,res){

    const {id} = req.params

    const obj = id ? {_id: id} : null
    try{
        const products = await ProdcutModel.find(obj)
        res.send(products)
    }
    catch(error){
        res.status(404).send('Not find')
    }   
 

}

async function post(req,res){
    
    try{
    const {
        name,
        brand,
        price
    } = req.body

    const product = new ProdcutModel({
        name,
        brand,
        price
    }) 


        product.save()
        console.log('new product saved')
        res.send({message:'sucesso'})
    }catch(error){
        res.status(404).send({message: "Ups, someting went wrong"})
    }

}

async function put(req,res){
    const {id} = req.params

    try{        
        const product = await ProdcutModel.findOneAndUpdate({_id:id},req.body,{new:true})       
        
        res.send({
          message:'sucesso',
          product 
        })

    }catch(error){
        res.status(404).send({
            message:'Erro',
            error 
          })
    }
}

module.exports = {
    get,
    post,
    put
}