const {Command} = require('discord.js-commando');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');

module.exports = class PokemonCommand extends Command{
    constructor(client){
        super(client, {
            name: "pokemon",
            group: "pokemon",
            memberName: "pokemon",
            description: "Displays a list of your pokemon",
            args: [{
                key: "pageNum",
                prompt: "what page do you want to go to?",
                type: "integer",
                default: 1,
            }]
        })
    }
    run(message, {pageNum}){
        let i = 1;
        let embed = new MessageEmbed();
        let pokes = [];
        while(db.has(`pokemon_${i}_${message.author.id}`)){
            ++i;
            pokes.push(db.get(`pokemon_${i}_${message.author.id}.name`));
        }
        let pages =  i < 16 ? 1 : i / 16;
        if(pageNum === 1){
            for(let n = 1; n < 16; ++n){
                if(db.get(`pokemon_${n}_${message.author.id}.name`) !== null)
                embed.addField(`ID: ${n} - Level: ${db.get(`pokemon_${n}_${message.author.id}.level`)} ${db.get(`pokemon_${n}_${message.author.id}.name`)}`, "\u200b");
            }
            message.embed(embed);
        }
        else{
            if(pageNum > pages) return;
            let pages =  i < 16 ? 1 : i / 16;
                for(let n = (pageNum)* 16 ; n < !(pageNum + 1 <= pages) ? pageNum * 16 : (pageNum + 1) * 16 ; ++n){
                    if(db.get(`pokemon_${n}_${message.author.id}.name`) !== null)
                    embed.addField(`ID: ${n} - ${db.get(`pokemon_${n}_${message.author.id}.name`)}`, "\u200b");
                }
                message.embed(embed);
            }
    }
}
