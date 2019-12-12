const {Command} = require('discord.js-commando');
const {RichEmbed} = require('discord.js');

module.exports = class StartCommand extends Command {
    constructor(client) {
        super(client, {
            name: "start",
            group: "pokemon",
            memberName: "start",
            description: "Gets you started on your wonderful advenature in the land of pokemon."
        });
    }
    run(message) {
        let embed = new RichEmbed()
        .setDescription(`Welcome, ${message.author.username} to the world of Pokemon. Who am I, your asking, well I am Pokemon Bot.
        I will be with you on your journy through this world. but before we can do that, you need a pokemon. How about I give you one.`)
        //Grass: 🍃 | Fire: 🔥 | Water: 💧
        .addField("Kanto", "🍃: Bulbasaur | 🔥:  Charmander | 💧: Squirtle")
        .addField("Johto", "🍃: Chikorita | 🔥: Cyndaquil | 💧: Totodile")
        .addField("Hoenn", "🍃: Treecko | 🔥: Torchic | 💧: Mudkip")
        .addField("Sinnoh", "🍃: Turtwig | 🔥: Chimchar | 💧: Piplup")
        .addField("Unova", "🍃: Snivy | 🔥: Tepig | 💧: Oshawott")
        .addField("Kalos", "🍃: Chespin | 🔥: Fennekin | 💧: Froakie")
        .addField("Alola", "🍃: Rowlet | 🔥: Litten | 💧: Popplio")
        .setFooter(`Type ${this.client.provider.get(message.guild, "prefix")}pick <the pokemon you want> (don't include the <> to this.)`);
        message.embed(embed);
    }
}