let Discord = require("discord.js")
const {
    JsonDatabase
  } = require("wio.db");
  let db = new JsonDatabase({
    databasePath: "./database.json"
  });

module.exports = {
    name: 'sistem-icon',
    description: 'Talep iconunu ayarlar!',

    options: [
        {
          name: 'icon',
          description: 'Talepte gözükecek iconu dosya olarak ekleyiniz',
          type: Discord.ApplicationCommandOptionType.Attachment,
          required: true
        }
      ],    
    run: async (client, interaction) => {
      const yetki = new Discord.EmbedBuilder()
      .setTitle('**Yetkin Yok**')
      .setDescription('Bu komutu kullanabilmek için yeterli yetkin yok')
      .setColor(Discord.Colors.Red)
      if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki], ephemeral: true})
    const dosya = interaction.options.getAttachment('icon');
    let url = dosya.proxyURL;
    const basarılıembed = new Discord.EmbedBuilder()
    .setTitle('BAŞARILI!!')
    .setImage(url)
    .setColor(Discord.Colors.Green)
    .setDescription("Gönderdiğiniz resim icon olarak ayarlandı")
    db.set(`icon_${interaction.guild.id}`, `${url}`)
    interaction.reply({embeds: [basarılıembed]})
    }
    }