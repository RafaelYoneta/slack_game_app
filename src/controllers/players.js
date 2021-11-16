const Axios = require('axios')
const PlayerModel = require('../models/players')
const ArenaModel = require('../models/arena')
const WeaponModel = require('../models/weapons')

async function get (req,res){


    const {email} = req.params

    const obj = email ? {email:email} : null


    const player = await PlayerModel.find(obj)

        res.json({ player_count: player.length , players: player})  

        
}



async function overallRequest(req,res){

    console.log(req.body)
    
<<<<<<< HEAD
    
    
    console.log(req.body)
=======
    if(req.body.channel_name !== 'clash-royale-game'){
        res.status(200).send('O Jogo esta disponível apenas no canal clash-royale-game')
    }else{
       
>>>>>>> e56cf78 (find weapon method created)
    
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
        round_actionR,

    } = req.body

    const new_player = new PlayerModel({
        name,
        slack_id:user_id,
        hidden: false,
        weapon_id: null,
        life:100,
        arena:arenaId,
        round_action:0,
    }) 
    
    let msg



    console.log(player.length)

    if(arena.length == 0){
         msg = 'Arena ainda não esta aberta, aguarde'

    } else if(player.length==0){

        new_player.save()
       // let player = await PlayerModel.findOneAndUpdate(obj,{arena:arenaId},{new:true})

         msg = `<@${user_id}> entrou na arena :hocho: ${arena[0].name}` 

<<<<<<< HEAD
=======
         
         Axios({
             method: 'post',                     
             url: process.env.SLACK_CONNECTION_STRING,
             data: {
               text:msg
             }
           });
        msg ='Leeeeeroy Jenkins'
>>>>>>> e56cf78 (find weapon method created)

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

<<<<<<< HEAD
      res.send(msg)
=======
async function searchWeapon(req,res){

    
    if(req.body.channel_name !== 'clash-royale-game'){
        res.status(200).send('O Jogo esta disponível apenas no canal clash-royale-game')
    }else{
        
        res.status(200)
    
        const user_id = req.body.user_id
        const name = req.body.user_name
        const obj = {slack_id:user_id}       
        const player = await PlayerModel.find(obj)

        if(player[0].round_action ==1){
            res.send('Aguarde o próximo turno para escolher uma ação')
        }else if(player.length !== 0){
            const weapon_cod = Math.round(Math.random() * 2)
            const weapon_obj = {weapon_code:weapon_cod}
        
            const weapon = await WeaponModel.find(weapon_obj)
               

     const new_weapon = PlayerModel({
         _id:player[0]._id,
         round_action:1,
        weapon:{
            min_dmg: weapon[0].min_dmg, 
            max_dmg: weapon[0].max_dmg,
            rarity:weapon[0].rarity,
            weapon_name:weapon[0].name,
            weapon_slack_code:weapon[0].slack_weapon_code},
    }) 


            if(weapon[0].rarity == "Normal"){
                msg = `<@${user_id}> encontrou uma ${weapon[0].slack_weapon_code}, ${weapon[0].name}, ${weapon[0].rarity}` 
            }else if(weapon[0].rarity == "Raro"){
                msg = `WTF!! <@${user_id}> encontrou uma ${weapon[0].slack_weapon_code}, ${weapon[0].name}, ${weapon[0].rarity}` 
            }

           
            const char = await PlayerModel.findOneAndUpdate({slack_id:user_id},new_weapon,{new:true})
            console.log(process.env.SLACK_CONNECTION_STRING)
            Axios({
                method: 'post',                     
                url: process.env.SLACK_CONNECTION_STRING,
                data: {
                  text:msg
                }
              });

            res.send(`Voce conseguiu uma arma ${weapon[0].name} / ${weapon[0].rarity} `)
>>>>>>> e56cf78 (find weapon method created)

   




        }else{
            res.send('Você ainda não entrou na arena, digite /entrar_arena para iniciar')
        }

    }

}


module.exports = {
    get,
    overallRequest,
}