const {CommandoClient, SQLiteProvider} = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const db = require('quick.db');
const {MessageEmbed} = require('discord.js');
const {token} = require('./config.json')
const dbInit = require('./DBInit');
const client = new CommandoClient({
    commandPrefix: 'p.',
    unknownCommandResponse: false,
    owner: '304446682081525772',
    disableEveryone: true
});

sqlite.open(path.join(__dirname, "settings.sqlite3")).then(db => {
    client.setProvider(new SQLiteProvider(db));
});
client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['general', 'General'],
        ['pokemon', 'Pokemon'],
        ['store', 'Store']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({ eval: false})
    .registerCommandsIn(path.join(__dirname, 'commands'));

    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}`);
        client.user.setActivity(`p.help`);
    });
    client.on('message', (message) => {
        if (message.author.bot) return;
	let rand1 = Math.floor(Math.random() * 10);
    let rand2 = Math.floor(Math.random() * 10);
    console.log(`${rand1} - ${rand2}`);
	if(rand1 === rand2){
		let spawn = Math.floor(Math.random() * 810);

		if(db.has(`channel_${message.channel.id}.spawn`)){
			db.delete(`channel_${message.channel.id}.spawn`);
			db.set(`channel_${message.channel.id}`, {spawn: spawn});
		}
		else {
			db.set(`channel_${message.channel.id}.spawn`, {spawn: spawn});
		}
		P.getPokemonByName(spawn, function(response, error){
			if(!error){
				console.log(response.forms[0].name);
				let embed = new MessageEmbed()
				.setTitle(`A wild pokemon`)
				.setDescription(`Type ${client.provider.get(message.guild, "prefix") || client.commandPrefix}catch <pokemon name>`)
				.setImage(`https://play.pokemonshowdown.com/sprites/ani/${response.forms[0].name}.gif`);

				message.channel.send(embed);
			}else
            console.log(error);
        })
    }
    });
    //new dbInit().run();
    client.login(token);
