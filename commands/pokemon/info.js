const {Command} = require('discord.js-commando');
const {RichEmbed} = require('discord.js');
const db = require("quick.db");
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
module.exports = class InfoCommand extends Command{
    constructor(client){
        super(client, {
            name: "info",
            group: "pokemon",
            memberName: "info",
            description: "Allows you to look at your pokemon.",
            args: [{
                key: "num",
                prompt: "what pokemon do you want to look at?",
                type: "string",
                default: "selected"
            }]
        });
    }
    run(message, {num}){
        let id;
        if(num === "selected"){
            id = db.get(`${message.author.id}_selected.pokemonId`);
        }
        else {
            id = num;
        }
        if(!db.has(`pokemon_${id}_${message.author.id}`)) return message.say("I am sorry, but you don't have a pokemon yet. type p.start to get started");
        let name = db.get(`pokemon_${id}_${message.author.id}.name`);
        let level = db.get(`pokemon_${id}_${message.author.id}.level`);
        let exp = db.get(`pokemon_${id}_${message.author.id}.exp`);
        let hp = db.get(`pokemon_${id}_${message.author.id}.hp`);
        let atk = db.get(`pokemon_${id}_${message.author.id}.atk`);
        let def = db.get(`pokemon_${id}_${message.author.id}.def`);
        let spatk = db.get(`pokemon_${id}_${message.author.id}.spatk`);
        let spdef = db.get(`pokemon_${id}_${message.author.id}.spdef`);
        let speed = db.get(`pokemon_${id}_${message.author.id}.speed`);
        let shiny = db.get(`pokemon_${id}_${message.author.id}.shiny`);
        P.getPokemonByName(name).then(function(response){
          let hpBase = response.stats[0].base_stat;
          let atkBase = response.stats[1].base_stat;
          let defBase = response.stats[2].base_stat;
          let spatkBase = response.stats[3].base_stat;
          let spdefBase = response.stats[4].base_stat;
          let speedBase = response.stats[5].base_stat;

            let embed = new RichEmbed()
            .setTitle(`${message.author.username}'s level ${level} ${name}`)
            .setDescription(`EXP: ${exp}`);
            
            let _hp = ((2 * hpBase + hp + (0/ 4) * level) /100) + level + 10;
            let _atk = (((2 * atkBase + atk + (0/4) * level)/100) + 5) * 1;
            let _def = (((2 * defBase + def + (0/4) * level)/100) + 5) * 1;
            let _spatk = (((2 * spatkBase + spatk + (0/4) * level)/100) + 5) * 1;
            let _spdef = (((2 * spdefBase + spdef + (0/4) * level)/100) + 5) * 1;
            let _speed= (((2 * speedBase + speed + (0/4) * level)/100) + 5) * 1;
            
            embed.addField(`Hp: ${Math.floor(Math.round(_hp))} | iv : ${hp}`, "\u200b");
            embed.addField(`Atk: ${Math.floor(Math.round(_atk))} | iv: ${atk}`, "\u200b");
            embed.addField(`Def: ${Math.floor(Math.round(_def))} | iv: ${def}`, "\u200b");
            embed.addField(`SpAtk: ${Math.floor(Math.round(_spatk))} | iv: ${spatk}`, "\u200b");
            embed.addField(`SpDef: ${Math.floor(Math.round(_spdef))} | iv: ${spdef}`, "\u200b");
            embed.addField(`Speed: ${Math.floor(Math.round(_speed))} | iv: ${speed}`, "\u200b");


            embed.setImage(`https://play.pokemonshowdown.com/sprites/ani/${name}.gif`);
            message.embed(embed);
        
        })

    }
}