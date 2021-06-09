const Discord = require("discord.js");
const client = new Discord.Client();

let { readdirSync } = require('fs');

client.config = require('./config.js');

client.comandos = new Discord.Collection();

const request = require('request');
const cheerio = require('cheerio');

const chalk = require('chalk');

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("./fivem.sqlite");

let prefix = client.config.prefix;

let status = "ONLINE"
let color = ""

client.on('ready', () => {
    console.log(`Estoy listo!`);
    setInterval(function () { checkStatus() }, 5000);

    db.run("CREATE TABLE IF NOT EXISTS servers (idserver TEXT, idcanal TEXT)", function (err) {
        if (err) return console.error(err.message)
    })
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

for (const file of readdirSync('./comandos/')) {

    //Esta condición evitara que los archivos que no son tengan la extención .js no sean listado:
    if (file.endsWith(".js")) {

        //Elimina los últimos tres caracteres nombre del archivo para
        //deshacerse de la extensión .js y solo quedarnos con el nombre del comando:
        let fileName = file.substring(0, file.length - 3);

        //Define una nueva varible 'fileContents' de la exportación del comando 
        //dentro de la carpeta comandos:
        let fileContents = require(`./comandos/${file}`);

        //Agrega el nombre del comando a la colección client.commands con un 
        //valor de sus exportaciones respectivas.
        client.comandos.set(fileName, fileContents);
    }
}

for (const file of readdirSync('./eventos/')) {

    //Esto condicion evitara que los archivos que no son archivos .js no coleccione:
    if (file.endsWith(".js")) {

        //Elimina los últimos tres caracteres nombre del archivo para
        //deshacerse de la extensión .js y solo quedarnos con el nombre del evento:
        let fileName = file.substring(0, file.length - 3);

        //Define una nueva variable 'fileContents' de la exportación del evento dentro de la carpeta eventos:
        let fileContents = require(`./eventos/${file}`);

        // Cuando el evento se activa o es solicitada exportamos la función con 
        // el nombre del evento vinculada y tambien el parametro client.
        client.on(fileName, fileContents.bind(null, client));

        // Elimina la memoria caché del archivo requerido para facilitar la recarga y no 
        // tener más memoria de la necesaria.
        delete require.cache[require.resolve(`./eventos/${file}`)];
    }
}

client.login(client.config.token);

