const router = require('express').Router()

const PlayerController = require('../controllers/players')

//list of players
router.get('/players/:email?', PlayerController.get)

//enter arena
router.post('/entrar_arena', (req,res,next) =>{
    // middleware - equilize the request once it comes throu Slack webhook 
    //pt-Se existir faz o parse e devolve para body e se não existir manda para o next 

    if(!req.body.payload){
        next()
    }else{
        
        const body = JSON.parse(req.body.payload)
        req.body = body
        next()
    }
} ,PlayerController.overallRequest)

//search for weapon (random)
router.post('/procurar_arma', PlayerController.searchWeapon)

//attack other player
router.post('/atacar',PlayerController.attack)

//find weapon
router.post('/iniciar_arena',PlayerController.start_arena)

//search for life
router.post('/procurar_vida',PlayerController.heal)

//make user invisible for 1 round
router.post('/invisivel', PlayerController.hide)


module.exports = router