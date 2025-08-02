const Discord = require("discord.js")

module.exports = {
    name: 'ping',
    description: 'Botun pingini gösterir!',
    run: async (client, interaction) => {
      let pembed = new Discord.EmbedBuilder()
		  .setColor('#2F3136')	
      .setTitle("Botun Pingi")
			.addFields(
      { name: '**Gecikme**', value: `\`${Date.now() - interaction.createdTimestamp}ms\``},
			{ name: '**API Gecikmesi**', value: `\`${Math.round(client.ws.ping)}ms\``}
      )
			.setTimestamp()
      .setFooter({
        text: `${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      })
        interaction.reply({
          embeds: [pembed]
        });
    },
};
