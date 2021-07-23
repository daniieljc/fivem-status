const {MessageEmbed} = require('discord.js')
const fetch = require('node-fetch');
const cheerio = require('cheerio');
var status, color;

module.exports = {
    slash: 'both',
    testOnly: false,
    description: 'Check the status of FiveM services',
    callback: async ({client, message}) => {
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

        const embedDatos = await new MessageEmbed()
            .setColor(color)
            .setFooter("Bot developer: hostemy.com", client.user.avatarURL())
            .setTimestamp()
            .addField("STATUS", status)

        return await embedDatos
    }
}

