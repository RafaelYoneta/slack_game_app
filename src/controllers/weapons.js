/* const Axios = require('axios')
//const WeaponModel = require('../models/weapons')
 

async function get(req,res){

    const {id} = req.params

    const obj = id ? {_id: id} : null

    try{
        const weapons = await WeaponModel.find(obj)

        Axios({
            method: 'post',                     
            url: 'https://hooks.slack.com/services/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',
            data: {
              text:":star:"
            }
          });

        console.log("foi")
        res.send(weapons)

        
    }
    catch(error){
        res.status(404).send('Not find')
    }   
 

}

async function post(req,res){
    
    try{
    const {
        name,
        rarity,
        code,
        mind_damage,
        max_damage,
        status,
        createdOn,
        removedOn,

    } = req.body

    const product = new WeaponModel({
        name,
        rarity,
        code,
        mind_damage,
        max_damage,
        status,
        createdOn,
        removedOn,
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
        const product = await WeaponModel.findOneAndUpdate({_id:id},req.body,{new:true})       

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

async function remove(req,res){
    const {id} = req.params
    let message=''

    //ainda não esta avisando quando não há mais uma opção com o id desejado
    try{
        const remove = await WeaponModel.findOneAndDelete({_id:id})
        message = "success"
    }catch(error){
        message = `Error: ${error}`
    }


    res.send({
        "message": message
    })

}

module.exports = {
    get,
    post,
    put,
    remove
} */