const { MessageEmbed } = require("discord.js");
module.exports = {
  slash: true,
  testOnly: false,
  category: "Help",
  description: "Invite the bot",
  callback: ({ client, message }) => {
    const embedDatos = new MessageEmbed()
      .setTitle("Invite the bot")
      .setURL(
        "https://discord.com/api/oauth2/authorize?client_id=763008622988886067&permissions=0&scope=applications.commands%20bot"
      )
      .setColor(0xffa76d)
      .setFooter("Bot developer: hostemy.com", client.user.avatarURL())
      .setTimestamp();

    return embedDatos;
  },
};
