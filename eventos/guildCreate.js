const chalk = require('chalk');

module.exports = (client, guild) => {
    console.log(`${chalk.green(guild.name)}`);
}