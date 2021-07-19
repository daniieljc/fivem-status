const Discord = require("discord.js");

module.exports = (client, message, args) => {
    const embedDatos = new Discord.MessageEmbed()
        .setTitle("FiveM Status Client")
        .setAuthor(message.author.username, client.user.avatarURL())
        .setColor(0xFFA76D)
        .setFooter("Bot developer: hostemy.com", client.user.avatarURL())
        .setTimestamp()
        .addField("xfstatus", "Returns the status of the FiveM client.", true)
        .addField("Auto Check", "The client's status will also appear in the bot's activity.", true);

    message.channel.send({embed: embedDatos});
}