let Discord = require("discord.js")
const { JsonDatabase } = require('wio.db');
const db = new JsonDatabase({
  databasePath: './database.json'
});

module.exports = {
    name: 'talep-çıkar',
    description: 'Seçtiğiniz kullanıcıyı talepten çıkarır!',

    options: [
        {
          name: 'kullanıcı',
          description: 'talepden çıkarılacak kullanıcıyı etiketleyiniz',
          type: Discord.ApplicationCommandOptionType.User,
          required: true
        }
      ],    


    run: async (client, interaction) => {
      let osbir = db.get(`taleprol_${interaction.guild.id}`)
        const uye = interaction.options.getUser('kullanıcı');
        const hataembed = new Discord.EmbedBuilder()
        .setTitle("HATA !")
        .setDescription("Bu komutu sadece talep kanalında yazabilirsin")
        .setColor(Discord.Colors.Red)
        if (!interaction.channel.name.includes("talep")) return interaction.reply({ embeds: [hataembed], ephemeral: true })
        const yetkili = new Discord.EmbedBuilder()
        .setTitle("Hata")
        .setDescription("Tickettan bir yetkiliyi çıkaramassın")
        .setColor(Discord.Colors.Red)
        const member = interaction.guild.members.cache.get(uye.id)
        if (member.roles.cache.has(osbir)) return interaction.reply({ embeds: [yetkili], ephemeral: true})     
       const ticket = interaction.channel;
       await ticket.permissionOverwrites.set([
        {
          id: member.id,
          deny: [Discord.PermissionsBitField.Flags.AttachFiles, Discord.PermissionsBitField.Flags.ReadMessageHistory, Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages]
        }
       ])
          interaction.reply({ embeds: [new Discord.EmbedBuilder().setTitle('Başarılı').setColor(Discord.Colors.Green).setDescription(`<@${member.id}> adlı kişiyi tickettan çıkardım`)] })
    }
    }