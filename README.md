
#Slack - Clash Royale Game APP

This is a beta of a clash royale slack game to be played with your team on slack. You and your buds enter the arena and fight each other until the end of the rounds or until there is only one player left. Each round, players can use one of the following comands.

## Here are the functions avaliable
1. Attack - Find and atack other players (if you dont't fail)
2. Heal   - Recover 30 points of life (if you don't fail)
3. Look for weapon - Ramdomly search for a weapon (Normal weapons and Rare weapons)
4. Hide   - Hide from other players for 1 round.
5. Enter Arena - Look for a open Arena 

6. (admin) Start Arena - Define the duration of the round and how many rounds the arena will have and start it

leeroy jenkins!!!
![Attack!!!](https://static.wixstatic.com/media/17b279_57a2bed6f594459b8d562e1eaa2fa014~mv2.gif)
![Search for a random weapon](https://static.wixstatic.com/media/17b279_6099fd6932744d97a17851cc0934bd07~mv2.gif)

## How to install
1. Create a ".env" file with the following variables:
 - MONGO_CONNECTION_STRING = mongoDB conection String
 - SLACK_CONNECTION_STRING = Create a Slack webhook URP and use here

2. Configure Arena
 - Create a database and a Collection named `arenas`
   Create the following document: `{"_id":{"$oid":"6181........0fbd"},"name":"Clash Royale Arena","status":"Active","total_players":100,"rounds":10,"round_duration":20000}`
 . You will send the arena id as a parameter to start the arena and you can define the number of round and the round duration.

3.  Configure Weapons
 - Create a database and a Collection named `weapons`
   Create the weapons as the scheme: `{"name":"Knife","slack_weapon_code":":hocho:","weapon_code":1,"min_dmg":10,"max_dmg":15,"rarity":"Normal"}`
 . You can define the rarity of the weapon, the icon that will show in slack and the min and max damage of the weapon
 


 
