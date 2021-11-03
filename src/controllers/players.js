const Axios = require('axios')
const PlayerModel = require('../models/players')
const ArenaModel = require('../models/arena')

async function get (req,res){


    const {email} = req.params

    const obj = email ? {email:email} : null


    const player = await PlayerModel.find(obj)

        res.json({ player_count: player.length , players: player})  

        
}



async function overallRequest(req,res){

    
    
    
    console.log(req.body)
    
    res.status(200)
    
    const user_id = req.body.user_id
    const name = req.body.user_name

    
    const obj = {slack_id:user_id}

    let player = await PlayerModel.find(obj)

    const arena = await ArenaModel.find({status:"Active"})
    
    const arenaId = arena.lenght!==0 ? arena[0]._id : null
    
    
    const {
        nameR,
        slack_idR,
        arenaR,
        life,
        weapon_id,
        hidden,

    } = req.body

    const new_player = new PlayerModel({
        name,
        slack_id:user_id,
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

         msg = `<@${user_id}> entrou na arena :hocho: ${arena[0].name}` 


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


module.exports = {
    get,
    overallRequest,
}