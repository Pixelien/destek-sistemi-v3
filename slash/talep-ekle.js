let Discord = require("discord.js")

module.exports = {
    name: 'talep-ekle',
    description: 'Talebine kullanıcı ekler',

    options: [
        {
          name: 'kullanıcı',
          description: 'Talebe eklenecek kullanıcıyı etiketleynizi',
          type: Discord.ApplicationCommandOptionType.User,
          required: true
        }
      ],    


    run: async (client, interaction) => {
        const uye = interaction.options.getUser('kullanıcı');
        const hataembed = new Discord.EmbedBuilder()
        .setTitle("HATA !")
        .setDescription("Bu komutu sadece talep kanalında yazabilirsin")
        .setColor(Discord.Colors.Red)
        if (!interaction.channel.name.includes("talep")) return interaction.reply({ embeds: [hataembed], ephemeral: true })
        const member = interaction.guild.members.cache.get(uye.id)
       const ticket = interaction.channel;
       await ticket.permissionOverwrites.set([
        {
          id: member.id,
          allow: [Discord.PermissionsBitField.Flags.AttachFiles, Discord.PermissionsBitField.Flags.ReadMessageHistory, Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages]
        }
       ])
          interaction.reply({ embeds: [new Discord.EmbedBuilder().setTitle('Başarılı').setColor(Discord.Colors.Green).setDescription(`<@${member.id}> adlı kişiyi talep'e ekledim`)] })
    }
    };