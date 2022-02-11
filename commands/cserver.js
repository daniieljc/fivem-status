const { MessageEmbed } = require("discord.js");
module.exports = {
  slash: true,
  testOnly: false,
  category: "Help",
  ownerOnly: true,
  description: "Returns the number of active servers",
  callback: ({ client, message }) => {
    console.log("Call total servers");
    var Guilds = client.guilds.cache.map((guild) => guild.id);
    return Guilds.length;
  },
};
