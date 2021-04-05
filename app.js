const Discord = require("discord.js");
const client = new Discord.Client();

const request = require('request');
const cheerio = require('cheerio');

const chalk = require('chalk');

const config = require("./config.json");

let prefix = config.prefix;

let status = "ONLINE"
let color = ""

client.on('ready', () => {
    console.log(`Estoy listo!`);
    setInterval(function () { checkStatus() }, 5000);

});

client.on("guildCreate", guild => {
    console.log(`${chalk.red(guild.name)}`);
})

client.on('message', (message) => {
    if (message.author.bot) return
    //console.log(`${chalk.blue(message.guild.name)} - ${chalk.white(message.author.username)} - ${chalk.yellow(message.content)} `)

    if (message.content.startsWith(prefix + 'servers') && message.author.id == "308616751732490240") {
        client.guilds.cache.forEach(guild => {
            message.channel.send(`${guild.name} | ${guild.id}`)
        })
    }

    if (message.content.startsWith(prefix + 'server')) {
        message.channel.send(client.guilds.cache.size)
    }

    if (message.content.startsWith(prefix + 'status')) {
        const embedDatos = new Discord.MessageEmbed()
            .setColor(color)
            .setFooter("Bot developer: hostemy.com", client.user.avatarURL())
            .setTimestamp()
            .addField("STATUS", status)

        message.channel.send({ embed: embedDatos });

    }

    if (message.content.startsWith(prefix + 'help')) {
        const embedDatos = new Discord.MessageEmbed()
            .setTitle("FiveM Status Client")
            .setAuthor(message.author.username, client.user.avatarURL())
            .setColor(0xFFA76D)
            .setFooter("Bot developer: hostemy.com", client.user.avatarURL())
            .setTimestamp()
            .addField("xfstatus", "Returns the status of the FiveM client.", true)
            .addField("Auto Check", "The client's status will also appear in the bot's activity.", true);

        message.channel.send({ embed: embedDatos });
    }
});

function checkStatus() {
    request("https://downdetector.com/status/fivem/",
        function (err, res, body) {
            if (!err && res.statusCode == 200) {
                var $ = cheerio.load(body)

                if ($(".entry-title").text().trim() == "User reports indicate no current problems at FiveM") {
                    status = "ONLINE"
                    color = "0x34F00A"
                }

                if ($(".entry-title").text().trim() == "User reports indicate possible problems at FiveM") {
                    status = "POSSIBLE PROBLEMS"
                    color = "0xF0CA0A"
                }

                if ($(".entry-title").text().trim() == "User reports indicate problems at Wave FiveM") {
                    status = "DOWN"
                    color = "0xD51010"
                }
            }
        });

    client.user.setActivity(`Status: ${status}`);

}

client.login(config.token);

