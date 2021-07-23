const {MessageEmbed} = require('discord.js')
module.exports = {
    slash: 'both',
    testOnly: false,
    ownerOnly: true,
    description: 'Returns the number of active servers',
    callback: ({client, message}) => {
        return client.guilds.cache.size
    }
}
