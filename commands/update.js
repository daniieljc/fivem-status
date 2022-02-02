const { MessageEmbed } = require("discord.js");
module.exports = {
  slash: true,
  testOnly: false,
  category: "Help",
  description: "Invite the bot",
  callback: ({ client, message }) => {
    const embedDatos = new MessageEmbed()
      .setTitle("FiveM Status Client - Upgrade")
      .setURL("https://discord.gg/dC5G5b6YV8")
      .setColor(0xffa76d)
      .setFooter("Bot developer: Evil Mark", client.user.avatarURL())
      .setTimestamp()
      .addField(
        "Why has this message reached me?",
        "This message has been sent to all the creators of the server where this bot is added, the myth is for an update, they have added slash command and it requires additional permission."
      )
      .addField(
        "What should I do?",
        "You should launch the discord bot and add it again so that it recovers most of its functionalities"
      )
      .addField(
        "Where do I get the invitation link?",
        "You can get both in our support discord or in the url indicated below"
      )
      .addField(
        "Link to add to bot",
        "[Invite Bot](https://discord.com/api/oauth2/authorize?client_id=763008622988886067&permissions=0&scope=applications.commands%20bot)"
      )
      .addField(
        "I have a problem",
        "Access the support discord or contact me directly - **intel#5815**"
      );

    return embedDatos;
  },
};
