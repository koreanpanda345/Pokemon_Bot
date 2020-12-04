const {Command} = require('discord.js-commando');
const{MessageEmbed} = require('discord.js');
const db = require('quick.db');
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

module.exports = class CatchCommand extends Command{
    constructor(client){
        super(client, {
            name: "catch",
            group: "pokemon",
            memberName: "catch",
            description: "Allows you to catch the pokemon by saying its name.",
            usage: "<pokemon's name>",
            args: [{
                key: "guess",
                prompt: "What is the pokemon's name?",
                type: "string",
            }],
        });
    }
    run(message, {guess}){
        if(!db.has(`channel_${message.channel.id}.spawn`)) return;
        P.getPokemonByName(db.get(`channel_${message.channel.id}.spawn`)).then(function(response) {
            console.log(response.forms[0].name);
            if(!guess.toLowerCase() === response.forms[0].name) return message.channel.send("Sorry, but thats the wrong pokemon, try again.");
            let level = Math.floor(Math.random() * 50);
            let hp = Math.floor(Math.random() * 31);
            let atk = Math.floor(Math.random() * 31);
            let def = Math.floor(Math.random() * 31);
            let spatk = Math.floor(Math.random() * 31);
            let spdef = Math.floor(Math.random() * 31);
            let speed = Math.floor(Math.random() * 31);
            let shiny = 0;
            db.add(`pokemon_amount_${message.author.id}.num`, 1);
            db.set(`pokemon_${db.get(`pokemon_amount_${message.author.id}.num`)}_${message.author.id}`, {name: guess.toLowerCase(), level:1, exp: 0,hp:hp, atk: atk, def: def, spatk: spatk, spdef: spdef, speed: speed, shiny: shiny});
            let embed = new MessageEmbed()
            .setTitle(`Congratulations ${message.author.username}'s you caught a **level ${level} ${guess.toLowerCase()}**`);

            message.channel.send(embed);
            db.delete(`channel_${message.channel.id}.spawn`);
    })
}
}
