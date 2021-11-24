const Axios = require('axios')
const delay = require('delay');
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
    
    if(req.body.channel_name !== 'clash-royale-game'){
        res.status(200).send('O Jogo esta disponível apenas no canal clash-royale-game')
    }else{
       
    
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
        damage_dealtR,
        aliveR,

    } = req.body

    const new_player = new PlayerModel({
        name,
        slack_id:user_id,
        hidden: false,
        weapon_id: null,
        life:100,
        arena:arenaId,
        round_action:0,
        damage_dealt:0,
        alive: true,
    }) 
    
    let msg



    console.log(player.length)

    if(arena.length == 0){
         msg = 'Arena ainda não esta aberta, aguarde'

    } else if(player.length==0){

        new_player.save()
       // let player = await PlayerModel.findOneAndUpdate(obj,{arena:arenaId},{new:true})

         msg = `<@${user_id}> entrou na arena :hocho: ${arena[0].name}` 

         
         Axios({
             method: 'post',                     
             url: process.env.SLACK_CONNECTION_STRING,
             data: {
               text:msg
             }
           });
        msg ='Leeeeeroy Jenkins'

    } else if (player.length ==1 ){
         msg = 'Prepare-se, a batalha começa em breve!!'
    }

    Axios({
        method: 'post',                     
        url: process.env.SLACK_CONNECTION_STRING,
        data: {
          text:msg
        }
      });
    }
}

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
            const weapon_cod = Math.round(Math.random() * 2)//mudar a logica de pegar a quantidade de armas
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
            
            Axios({
                method: 'post',                     
                url: process.env.SLACK_CONNECTION_STRING,
                data: {
                  text:msg
                }
              });

            res.send(`Voce conseguiu uma arma ${weapon[0].name} / ${weapon[0].rarity} `)

            





        }else{
            res.send('Você ainda não entrou na arena, digite /entrar_arena para iniciar')
        }

    }

}

async function attack(req,res){


    const my_player = req.body.user_id
    const players = await PlayerModel.find()

    //achar o meu player e minha arma
    let my_player_params 
    let my_player_position  
    let msg
    let live_players = 0

    for(let n=0; n<=players.length-1; n++){
      //contar quantos jogadores vivos
      if(players[n].life > 0){
        live_players +=1
      }

      if(players[n].slack_id==my_player){
          my_player_params = players[n]
          my_player_position = n 
        }
    }
    let msg_attack
    let send_resp = false
    let attack_success = Math.random() * 10

    if(players[my_player_position].round_action == 1){
        msg = 'Aguarde o próximo turno para escolher uma ação'
    }else{

        
        //logica se o jogador já esta morto    
        if(players[my_player_position].life == 0){
            msg_attack = `<@${players[my_player_position].slack_id}> (:heart: ${players[my_player_position].life}) esta fora de combate!!`
            send_resp = true
            msg ='morto'

        }else{
            if(live_players<=1){
                msg = 'Last man standing!! Não há mais jogadores vivos na partida'
                 
            }else{
                
                
                
                //se o usuário não tem arma
                if(!players[my_player_position].weapon){
                    msg_attack = `<@${players[my_player_position].slack_id}> (:heart: ${players[my_player_position].life}) tentou atacar sem uma arma *...... e Falhou!!*`
                    send_resp = true
                    players[my_player_position].round_action = 1
                    const a = await PlayerModel.findOneAndUpdate({slack_id:players[my_player_position].slack_id},players[my_player_position],{new:true})
                    msg ='falhou'
                }else{
                    
                    
                    
                    
                    //escolher jogar a ser atacado
                    let enemy_params
                    let enemy_position
                    let enemy_found = false
                    //logica para quando só tiver 1 ou 0  inimigos vivos
                    
                    
                    //logica se o jogador já morreu
                    //*** verificar se o jogador não esta escondido
                    while(enemy_found == false){
                        
                        enemy_position = Math.round(Math.random() * (players.length-1))
                        
                        if(players[enemy_position].slack_id !== req.body.user_id && players[enemy_position].life > 0){    
                            
                            enemy_found = true

                        }
                    }
                    
                    if(attack_success < 2.5){
                        msg_attack = `<@${players[my_player_position].slack_id}> (:heart: ${players[my_player_position].life}) tentou atacar <@${players[enemy_position].slack_id}> (:heart: ${players[enemy_position].life})*...... e Falhou!!*`
                        send_resp = true
                        players[my_player_position].round_action = 1
                        const a = await PlayerModel.findOneAndUpdate({slack_id:players[my_player_position].slack_id},players[my_player_position],{new:true})
                        msg ='falhou'
                    }else{
                        
                    //diminuir vida do atacado e aumentar pontos do atacante
                    
                    
                    let my_player_damage = Math.round((players[my_player_position].weapon.max_dmg - players[my_player_position].weapon.min_dmg) *Math.random()) + players[my_player_position].weapon.min_dmg   
                    
                    //atacado morreu? 
                    if(players[enemy_position].life <= my_player_damage){
                        
                        players[enemy_position].life = 0
                        players[enemy_position].alive = false   
                        msg_attack =`<@${players[my_player_position].slack_id}> (:heart: ${players[my_player_position].life}) atacou <@${players[enemy_position].slack_id}> (:heart: ${players[enemy_position].life}) com ${players[my_player_position].weapon.weapon_slack_code} *${my_player_damage} Dano!*  ---- <@${players[enemy_position].slack_id}> morreu  :skull: `
                        send_resp = true
                        msg ='atacou'

                    }else if(players[enemy_position].life > my_player_damage){
                        
                        players[enemy_position].life = players[enemy_position].life - my_player_damage
                        msg_attack =`<@${players[my_player_position].slack_id}> (:heart: ${players[my_player_position].life}) atacou <@${players[enemy_position].slack_id}> (:heart: ${players[enemy_position].life}) com ${players[my_player_position].weapon.weapon_slack_code} *${my_player_damage} Dano!*  `
                        send_resp = true
                        msg ='atacou'
                    }
                    players[my_player_position].round_action = 1
                    players[my_player_position].damage_dealt += my_player_damage
                    //salvar alterações
                    const a = await PlayerModel.findOneAndUpdate({slack_id:players[my_player_position].slack_id},players[my_player_position],{new:true})
                    
                    const b = await PlayerModel.findOneAndUpdate({slack_id:players[enemy_position].slack_id},players[enemy_position],{new:true})
                    
                   }   
                
                }
            }
        }
    }

    if(send_resp){
        Axios({
            method: 'post',                     
            url: process.env.SLACK_CONNECTION_STRING,
            data: {
              text:msg_attack
            }
          });

    }

    res.send(msg)
}

async function start_arena (req,res){

    const arena_req = req.body
    const arenaId = arena_req.arenaId
    
    //inicia partida
    const arena = await ArenaModel.find({id:arenaId})
   
    let msg = '\n *fim da arena ----- imprimindo resultados* \n'
    let arena_players
    
    Axios({
        method: 'post',                     
        url: process.env.SLACK_CONNECTION_STRING,
        data: {
            text:'*Preparem-se a Arena esta prestes a começar!!!!*'
        }
    })
    await delay(10000)


    //seleciona a arena que deve iniciar
    if(arena.length !== 1){
        msg = 'Arena não localizada'
    }else{

        
        //pega os parametros da partida (numero de rounds e duração por round)
        for(n=1 ; n<=arena[0].rounds; n++){

            //pega os jogadores que estão na partida
            arena_players = await PlayerModel.find({alive:true})
           
            //verifica se ainda há jogadores vivos
            if(arena_players.length <= 1){
                msg = `\n We have a winner!!!! ${arena_players.length} Jogadores na arena \n ---- *imprimindo resultados*`
                
            }else{
    
                await PlayerModel.updateMany({},{$set:{"round_action":0}})
                let msg_arena = `*Round ${n}!!* ---- Fight!!!`
                
                //anuncia o round iniciando
                Axios({
                    method: 'post',                     
                    url: process.env.SLACK_CONNECTION_STRING,
                    data: {
                        text:msg_arena
                    }
                })
                
                //espera duração por round
                await delay(arena[0].round_duration)
                
                //repete e volta a ação do round para 0                
                
            }
        }
        
    }   
    
    Axios({
        method: 'post',                     
        url: process.env.SLACK_CONNECTION_STRING,
        data: {
            text:msg
        }
    })

    const ranking = await PlayerModel.find({alive:true}).sort({damage_dealt: 'desc'})

    let qnt
    let pos = 1
    if(ranking.length>10){qnt=10}else{qnt=ranking.length} 
   
    for(i=0;i<qnt;i++){ 
        console.log(ranking[i])
        position = `Posição ${pos} --- Dano Total: ${ranking[i].damage_dealt} --- <@${ranking[i].slack_id}> `
        pos +=1
        Axios({
            method: 'post',                     
            url: process.env.SLACK_CONNECTION_STRING,
            data: {
                text:position
            }
        })
    }
    
    
    
    
    //fim da partida e anuncio do ranking de jogadores
    
    res.send(msg)
}



module.exports = {
    get,
    overallRequest,
    searchWeapon,
    attack,
    start_arena,
}