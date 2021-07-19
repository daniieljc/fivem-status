const Discord = require("discord.js");
const client = new Discord.Client();
const request = require('request');
const cheerio = require('cheerio');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("./fivem.sqlite");
require("discord-buttons")(client);

require('dotenv').config()

client.comandos = new Discord.Collection();

let {readdirSync} = require('fs');
let prefix = process.env.PREFIX;
let activity = "CHECKING"
let oldActivity = ""
let color = ""
let status = "online"

client.on('ready', async () => {
    setInterval(function () {
        checkStatus()
    }, 5000);

    db.run("CREATE TABLE IF NOT EXISTS servers (idserver TEXT, idcanal TEXT)", function (err) {
        if (err) return console.error(err.message)
    })

    db.run("CREATE TABLE IF NOT EXISTS comandos (idserver TEXT, cotenido TEXT)", function (err) {
        if (err) return console.error(err.message)
    })

});

client.on('message', (message) => {
    if (message.author.bot) return

    if (message.content.startsWith(prefix + 'servers') && message.author.id == "308616751732490240") {
        client.guilds.cache.forEach(guild => {
            message.channel.send(`${guild.name} | ${guild.id}`)
        })
    }

    if (message.content.startsWith(prefix)) {
        db.run(`INSERT INTO comandos
                VALUES ("${message.guild.id}", "${message.content}")`, function (err) {
            if (err) return console.error(err.message)
        })
    }

});

function checkStatus() {
    request("https://downdetector.com/status/fivem/",
        function (err, res, body) {
            if (!err && res.statusCode == 200) {
                var $ = cheerio.load(body)

                if ($(".entry-title").text().trim() == "User reports indicate no current problems at FiveM") {
                    activity = "ONLINE"
                    color = "0x34F00A"
                }

                if ($(".entry-title").text().trim() == "User reports indicate possible problems at FiveM") {
                    activity = "POSSIBLE PROBLEMS"
                    color = "0xF0CA0A"
                }

                if ($(".entry-title").text().trim() == "User reports indicate problems at Wave FiveM") {
                    activity = "DOWN"
                    color = "0xD51010"
                }
            }
        });

    client.user.setActivity(`.help | ${activity}`);
}

for (const file of readdirSync('./comandos/')) {
    if (file.endsWith(".js")) {
        let fileName = file.substring(0, file.length - 3);
        let fileContents = require(`./comandos/${file}`);
        client.comandos.set(fileName, fileContents);
        console.log(fileName)
    }
}

console.log('-----')

for (const file of readdirSync('./eventos/')) {
    if (file.endsWith(".js")) {
        let fileName = file.substring(0, file.length - 3);
        let fileContents = require(`./eventos/${file}`);
        client.on(fileName, fileContents.bind(null, client));
        delete require.cache[require.resolve(`./eventos/${file}`)];
        console.log(fileName)
    }
}

client.login(process.env.TOKEN);

