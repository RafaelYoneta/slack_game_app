const router = require('express').Router()

const PlayerController = require('../controllers/players')

//router.get('/products/:id?', ProductiController.get)
//router.post('/products', ProductiController.post)
//router.put('/products/:id', ProductiController.put)
//router.delete('/products/:id',ProductiController.remove)

router.get('/players/:email?', PlayerController.get)

router.post('/entrar_arena', (req,res,next) =>{
    // Se existir faz o parse e devolve para body e se não existir manda para o next 

    if(!req.body.payload){
        next()
    }else{
        
        console.log('passou aqui') 
        const body = JSON.parse(req.body.payload)
        req.body = body
        next()
    }
} ,PlayerController.overallRequest)

router.post('/procurar_arma', PlayerController.searchWeapon)


module.exports = router