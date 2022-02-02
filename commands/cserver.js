const { MessageEmbed } = require("discord.js");
module.exports = {
  slash: true,
  testOnly: false,
  category: "Help",
  ownerOnly: true,
  description: "Returns the number of active servers",
  callback: ({ client, message }) => {
    return client.guilds.cache.size;
  },
};
