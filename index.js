const Discord = require("discord.js");
const WOKCommands = require('wokcommands')
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const cron = require('node-cron');
const client = new Discord.Client();

require('dotenv').config()

client.on('ready', () => {
    new WOKCommands(client, {
        commandsDir: 'commands',
        featuresDir: 'features',
        showWarns: false,
        testServers: ['710177482866819142']
    }).setBotOwner(['308616751732490240'])
})

cron.schedule('* * * * *', async () => {
    const response = await fetch('https://downdetector.com/status/fivem/')
    const body = await response.text();
    const $ = cheerio.load(body)

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
    client.user.setActivity(`/help | ${status}`);
})

client.login(process.env.TOKEN);
