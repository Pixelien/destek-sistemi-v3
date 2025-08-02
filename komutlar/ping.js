const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  let m = await message.reply("websocket'ler bekleniyor...")
  let pong = new Discord.EmbedBuilder()
    .setAuthor(`🏓 Pong!`, message.author.displayAvatarURL)
    .setTitle("Botun Pingi")
    .setColor('#2F3136')	
    .setTimestamp()
    .addField("Gecikme", `${m.createdTimestamp - message.createdTimestamp}ms`, true)
    .addField("API Gecikmesi", `${Math.round(client.ws.ping)}ms`, true)
    .setFooter(`Tarafından istendi ${message.author.tag}`, message.author.displayAvatarURL());
     m.delete()
  message.reply({ content: " ", embeds: [pong] })
}
