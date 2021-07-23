const {MessageEmbed} = require('discord.js')
module.exports = {
    slash: 'both',
    testOnly: false,
    description: 'Help menu',
    callback: ({client, message}) => {
        const embedDatos = new MessageEmbed()
            .setTitle("FiveM Status Client")
            .setColor(0xFFA76D)
            .setFooter("Bot developer: hostemy.com", client.user.avatarURL())
            .setTimestamp()
            .addField("cstatus", "Check the status of FiveM services.", true)
            .addField("Auto Check", "The client's status will also appear in the bot's activity.", true);

        return embedDatos
    }
}
