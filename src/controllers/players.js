const Axios = require('axios')
const PlayerModel = require('../models/players')
const ArenaModel = require('../models/arena')

async function get (req,res){


    const {email} = req.params

    const obj = email ? {email:email} : null


    const player = await PlayerModel.find(obj)

        res.json({ player_count: player.length , players: player})  

        
}



async function findArena(req,res){

    console.log(req)

    const {email} = req.params
    
    const obj = email ? {email:email} : null

    let player = await PlayerModel.find(obj)
    const arena = await ArenaModel.find({status:"Active"})
    
    const arenaId = arena.lenght!==0 ? arena[0]._id : null
    
    console.log(arenaId)
    
    const {
        name,
        emailR,
        arenaR,
        life,
        weapon_id,
        hidden,

    } = req.body

    const new_player = new PlayerModel({
        name,
        email,
        hidden: false,
        weapon_id: null,
        life:100,
        arena:arenaId 
    }) 
    
    let msg



    console.log(player.length)
    if(arena.length == 0){
         msg = 'Arena ainda não esta aberta, aguarde'

    } else if(player.length==0){

        new_player.save()
       // let player = await PlayerModel.findOneAndUpdate(obj,{arena:arenaId},{new:true})

         msg = `voce entrou na arena :hocho::hocho::hocho: ${arena[0].name}` 


    } else if (player.length ==1 ){
         msg = 'Prepare-se, a batalha começa em breve!!'
    }

    Axios({
        method: 'post',                     
        url: 'https://hooks.slack.com/services/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',
        data: {
          text:msg
        }
      });


    res.send(msg)

}

async function test (req,res){
    
    const body = req.body
    console.log(body)
    res.sendStatus(200)
}


module.exports = {
    get,
    findArena,
    test,
}