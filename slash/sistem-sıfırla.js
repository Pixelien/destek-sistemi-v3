let Discord = require("discord.js")
const {
    JsonDatabase
  } = require("wio.db");
  let db = new JsonDatabase({
    databasePath: "./database.json"
  });

module.exports = {
    name: 'sistem-sıfırla',
    description: 'Talep sistemini sıfırla!',

    options: [
        {
          name: 'tür',
          description: 'Talepte gözükecek iconu dosya olarak ekleyiniz',
          type: Discord.ApplicationCommandOptionType.String,
          required: true,
          choices: [
          ({ name: 'icon', value: 'type_icon' }),
          ({ name: 'açıklama', value: 'type_desc' })
      ]
}],    
    run: async (client, interaction) => {
              const yetki = new Discord.EmbedBuilder()
  .setTitle('**Yetkin Yok**')
  .setDescription('Bu komutu kullanabilmek için yeterli yetkin yok')
  .setColor(`RED`)
  if(!interaction.user.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply({ embeds: [yetki], ephemeral: true})
    let type = interaction.options.getString("tür")
    if(type == "type_icon") {
      const iconrst = new Discord.EmbedBuilder()
      .setTitle("Başarılı")
      .setDescription("Başarılı bir şekilde iconu sıfırladın")
      .setColor(Discord.Colors.Green)
      .setFooter(`Sistem iconu default icon olarak ayarlandı görmek için */sistem*`)
      db.delete(`icon_${interaction.guild.id}`)
      interaction.reply({embeds: [iconrst]})
    }
    if(type == "type_desc"){
      const descreset = new Discord.EmbedBuilder()
      .setTitle("Başarılı")
      .setDescription("Başarılı bir şekilde açıklamayı sıfırladın")
      .setColor(Discord.Colors.Green)
      .setFooter(`Sistem açıklaması default açıklama olarak ayarlandı görmek için */sistem*`)
      db.delete(`desc_${interaction.guild.id}`)
      interaction.reply({embeds: [descreset]})
    }
    }
    }