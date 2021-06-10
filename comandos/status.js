const Discord = require("discord.js");
let status = "ONLINE"
let color = ""

module.exports = (client, message, args) => {
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

    const embedDatos = new Discord.MessageEmbed()
        .setColor(color)
        .setFooter("Bot developer: hostemy.com", client.user.avatarURL())
        .setTimestamp()
        .addField("STATUS", status)

    message.channel.send({ embed: embedDatos });

}