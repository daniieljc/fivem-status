const { MessageEmbed } = require("discord.js");
module.exports = {
  slash: true,
  testOnly: false,
  category: "Help",
  description: "Help menu",
  callback: ({ client, message }) => {
    console.log("Call help menu");
    const embedDatos = new MessageEmbed()
      .setTitle("FiveM Status Client")
      .setColor(0xffa76d)
      .setFooter("Bot developer: Evil Mark", client.user.avatarURL())
      .setTimestamp()
      .addField("cstatus", "Check the status of FiveM services.", true)
      .addField(
        "Auto Check",
        "The client's status will also appear in the bot's activity.",
        true
      );

    return embedDatos;
  },
};
