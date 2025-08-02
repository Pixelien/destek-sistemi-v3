let Discord = require("discord.js")
const { Permissions } = require('discord.js');
const {
    JsonDatabase
  } = require("wio.db");
  let db = new JsonDatabase({
    databasePath: "./database.json"
  });

module.exports = {
    name: 'sistem-açıklama',
    description: 'Talep açıklamasını ayarlar!',
    options: [
        {
          name: 'açıklama',
          description: 'Talep embedinde gözükecek bilgilendirme mesajı.',
          type: Discord.ApplicationCommandOptionType.String,
          required: true
        }
      ],    
      run: async (client, interaction) => {
        const yetki = new Discord.EmbedBuilder()
        .setTitle('**Yetkin Yok**')
        .setDescription('Bu komutu kullanabilmek için yeterli yetkin yok')
        .setColor(Discord.Colors.Red)
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki], ephemeral: true})
        let desc = interaction.options.getString("açıklama")
        const basarılıembed = new Discord.EmbedBuilder()
        .setTitle('BAŞARILI!!')
        .setColor(Discord.Colors.Green)
        .setDescription("Talep açıklaması ```" + desc + "``` olarak ayarlandı")
        db.set(`desc_${interaction.guild.id}`, `${desc}`)
        interaction.reply({embeds: [basarılıembed]})
    

      }

    }