const {Command} = require('discord.js-commando');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');

module.exports = class PickCommand extends Command{
    constructor(client){
        super(client, {
            name: "pick",
            group: "pokemon",
            memberName: "pick",
            description: "Allows you to pick your first pokemon",
            usage:"<pokemon name>",
            args:[
                {
                    key: "pokemon",
                    prompt: "Which pokemon do you want?",
                    type: "string",
                },
            ],
        });
    }

    run(message, {pokemon}){
        let hasPokemon = db.has(`pokemon_1_${message.author.id}`);
        if(hasPokemon ) return message.say(`${message.author.username}, I am sorry, but I can only give you one pokemon.`);
        let starter = [ "bulbasaur", "charmander", "squirtle",
                        "chikorita", "cyndaquil", "totodile",
                        "treecko", "torchic", "mudkip",
                        "turtwig", "chimchar", "piplup",
                        "snivy", "tepig", "oshawott",
                        "chespin", "fennekin", "froakie",
                        "rowlet", "litten", "popplio"];
        if(!starter.includes(pokemon.toLowerCase())) return message.say("I am sorry, but thats not a starter pokemon.");
        let hp = Math.floor(Math.random() * 31);
        let atk = Math.floor(Math.random() * 31);
        let def = Math.floor(Math.random() * 31);
        let spatk = Math.floor(Math.random() * 31);
        let spdef = Math.floor(Math.random() * 31);
        let speed = Math.floor(Math.random() * 31);
        
        let name = pokemon.toLowerCase();
        db.set(`${message.author.id}_selected`, {pokemonId: 1});
        db.set(`pokemon_amount_${message.author.id}`, {num: 1});
        db.set(`pokemon_1_${message.author.id}`, {name: pokemon.toLowerCase(), level:1, exp: 0,hp:hp, atk: atk, def: def, spatk: spatk, spdef: spdef, speed: speed, shiny: 0});
        let embed = new MessageEmbed()
        .setTitle(`Congratulations ${message.author.username}. You got your first pokemon`)
        .setDescription(`Your recieved a **Level ${db.get(`pokemon_1_${message.author.id}.level`)} ${db.get(`pokemon_1_${message.author.id}.name`)}**`);

        return message.embed(embed);
    }
}
