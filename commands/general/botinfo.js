const {Command} = require('discord.js-commando');
const {MessageEmbed} = require('discord.js');

module.exports = class BotInfoCommand extends Command{
    constructor(client){
        super(client,{
            name: "botinfo",
            group: "general",
            memberName: "botinfo",
            description: "displays info about the bot"
        });
    }
    run(message){
        let embed = new MessageEmbed();
        embed.setTitle(`Pokedex Entry for ${this.client.user.username}!`);
        embed.setDescription(`It is said that it can connect pokemons to a website called Discord.`);
        embed.addField(`Type`, `Normal-Electric`, true);
        embed.addField(`Base Stats`, `HP: 90\nATK: 100\nDEF: 100\nSPATK: 140\nSPDEF: 100\nSPEED: ${this.client.ping}`, true);
        embed.setImage(this.client.user.avatarURL);
        embed.setFooter(`Disclaimer, this is not actually a pokemon. ^-^. You will notice that the speed does change. this is the bot's latency.`);
        embed.setColor(0xfc0703);
        return message.embed(embed);
    }
}
