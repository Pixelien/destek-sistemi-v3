const register = require('./../utils/slashsync');
const { ApplicationCommandType } = require("discord.js")
module.exports = async (client) => {
  await register(client, client.register_arr.map((command) => ({
    name: command.name,
    description: command.description,
    options: command.options,
    type: ApplicationCommandType.ChatInput
  })), {
    debug: true
  });
  console.log(`Tüm Slash komutları yükendi`)
  console.log('Bot aktif')
  let invite = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`;

};
