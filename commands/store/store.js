const {Command} = require('discord.js-commando');
const {RichEmbed} = require('discord.js');
const db = require('quick.db');

module.exports = class StoreCommand extends Command{
    constructor(client){
        super(client, {
            name: "store",
            group: "store",
            memberName: "store",
            description: "displays the store"
        })
    }
    run(message){
        let sections = ["Leveling"];
        let embed = new RichEmbed();
        let str = "";
        let n = 1;
        for(let i = 0; i < sections.length; ++i){
            while(db.has(`store_${sections[i]}_${n}`)){
                str += `${db.get(`store_${sections[i]}_${n}.item`)} - ${db.get(`store_${sections[i]}_${n}.price`)}\n`;
                
            }
            embed.addField(`${sections[0]}`, str);
        }
        message.embed(embed);
    }
}