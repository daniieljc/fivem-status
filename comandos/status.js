const Discord = require("discord.js");

module.exports = (client, message, args) => {
    const embedDatos = new Discord.MessageEmbed()
        .setColor(color)
        .setFooter("Bot developer: hostemy.com", client.user.avatarURL())
        .setTimestamp()
        .addField("STATUS", status)

    message.channel.send({ embed: embedDatos });

}