let Discord = require("discord.js")
const { Permissions } = require('discord.js');
const {
    JsonDatabase
  } = require("wio.db");
  let db = new JsonDatabase({
    databasePath: "./database.json"
  });

module.exports = {
    name: 'sistem-buton',
    description: 'Talep butonlarını ayarlar!',

    options: [
        {
          name: 'buton',
          description: 'hangi butonu düzenliyeceğini bildir',
          type: Discord.ApplicationCommandOptionType.String,
          required: true,
          choices: [
          ({ name: '1.', value: 'buton1' }),
          ({ name: '2.', value: 'buton2' }),
          ({ name: '3.', value: 'buton3' })
      ]
    },
    {
        name: 'buton-ismi',
        description: 'Butonda gözükecek yazı',
        type: Discord.ApplicationCommandOptionType.String,
        require: true
    },
    {
        name: 'emoji',
        description: 'butonda gözükecek emoji idsini yazınız.',
        type: Discord.ApplicationCommandOptionType.String,
        require: false
    },
    {
      name: 'renk',
      description: 'Butonun rengini ayarlıyabilirsiniz.',
      type: Discord.ApplicationCommandOptionType.String,
      required: false,
      choices: [
      ({ name: 'Mavi', value: "mavi" }),
      ({ name: 'Yeşil', value: "yesil" }),
      ({ name: 'Kırmızı', value: "kirmizi" }),
      ({ name: 'Gri', value: "gri"})
  ]
},
{
  name: 'talep-konusu',
  description: 'Butona tıklandığında açılacak talebin konusunu ayarlar.',
  type: Discord.ApplicationCommandOptionType.String,
  require: true
}
],    
    run: async (client, interaction) => {
              const yetki = new Discord.EmbedBuilder()
  .setTitle('**Yetkin Yok**')
  .setDescription('Bu komutu kullanabilmek için yeterli yetkin yok')
  .setColor(Discord.Colors.Red)
  if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki], ephemeral: true})
    var emoji = interaction.options.getString('emoji')
    var buttonname = interaction.options.getString('buton-ismi')
    var renk = interaction.options.getString("renk")
    let type = interaction.options.getString("buton")
    var butonarc = interaction.options.getString("talep-konusu")
    if(type == "buton1") {
      const buton1embd = new Discord.EmbedBuilder()
      .setTitle("Başarılı")
      .setDescription("Başarılı şekilde ilk butonu aşağıdaki şekilde ayarladın")
      .setColor(Discord.Colors.Green)
      .setFooter({ text: `Ayarladığın butonu görmek için */sistem*` })
      if (buttonname) {
        db.set(`buton1_${interaction.guild.id}`, buttonname)
        var namex = buttonname
      }
      namedb = db.get(`buton1_${interaction.guild.id}`)
      if (!buttonname) {
        if (!namedb) {
          var namex = "Buton-1"
        }
        if (namedb) {
          var namex = namedb
        }
      }
      if (buttonname) {
        var namex = buttonname
      }
      if (butonarc) {
      db.set(`butonarc1_${interaction.guild.id}`, butonarc)
      }
      if(!emoji) {
        var emojidb = db.get(`buton1e_${interaction.guild.id}`)
         if(!emojidb) {
          var emoji = "\u{1F6D2}"
         } else {
           var emoji = emojidb
         }
       } else {
         db.set(`buton1e_${interaction.guild.id}`, emoji)
       }
      if(!renk) {
        let renkdb = db.get(`buton1r_${interaction.guild.id}`)
        if (!renkdb) {
       var renkx = Discord.ButtonStyle.Primary
        } 
      }
      if (renk) {
      db.set(`buton1r_${interaction.guild.id}`, renk)
      }  
      if (renk == "mavi") {
        var renkx = Discord.ButtonStyle.Primary
        }
        if (renk == "kirmizi") {
          var renkx = Discord.ButtonStyle.Danger
          }
          if (renk == "gri") {
            var renkx = Discord.ButtonStyle.Secondary
            }
            if (renk == "yesil") {
              var renkx = Discord.ButtonStyle.Success
              }
      
      const row1 = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
        .setStyle(renkx)
        .setLabel(namex)
        .setEmoji(emoji)
        .setDisabled(true)
        .setCustomId('sistemsiparis')
      )
      interaction.reply({embeds: [buton1embd], components: [row1]})
    }
    if(type == "buton2") {
      const buton2embd = new Discord.EmbedBuilder()
      .setTitle("Başarılı")
      .setDescription("Başarılı bir şekilde ikinci butonu aşağıdaki gibi ayarladın")
      .setColor(Discord.Colors.Green)
      .setFooter({ text: `Ayarladığın butonu görmek için */sistem*` })
      namedb = db.get(`buton2_${interaction.guild.id}`)
      if (!buttonname) {
        if (!namedb) {
          var namex = "Buton-2"
        }
        if (namedb) {
          var namex = namedb
        }
      }
      if (buttonname) {
        var namex = buttonname
      }
      if (butonarc) {
      db.set(`butonarc2_${interaction.guild.id}`, butonarc)
      }
      if(!emoji) {
        var emojidb = db.get(`buton2e_${interaction.guild.id}`)
         if(!emojidb) {
          var emoji = "\u{1F9D0}"
         } else {
           var emoji = emojidb
         }
       } else {
         db.set(`buton2e_${interaction.guild.id}`, emoji)
       }
       if(!renk) {
        let renkdb = db.get(`buton2r_${interaction.guild.id}`)
        if (!renkdb) {
       var renkx = Discord.ButtonStyle.Primary
        } 
      }
      if (renk) {
      db.set(`buton2r_${interaction.guild.id}`, renk)
      }
        if (renk == "mavi") {
        var renkx = Discord.ButtonStyle.Primary
        }
        if (renk == "kirmizi") {
          var renkx = Discord.ButtonStyle.Danger
          }
          if (renk == "gri") {
            var renkx = Discord.ButtonStyle.Secondary
            }
            if (renk == "yesil") {
              var renkx = Discord.ButtonStyle.Success
              }
      const row2 = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
        .setStyle(renkx)
        .setLabel(namex)
        .setEmoji(emoji)
        .setDisabled(true)
        .setCustomId('sistemsatis')
      )
      interaction.reply({embeds: [buton2embd], components: [row2]})
    }
    if(type == "buton3") {
      const buton3embd = new Discord.EmbedBuilder()
      .setTitle("Başarılı")
      .setDescription("Başarılı bir şekilde üçüncü butonu aşağıdaki gibi ayarladın")
      .setColor(Discord.Colors.Green)
      .setFooter({ text: `Ayarladığın butonu görmek için */sistem*` })
      namedb = db.get(`buton3_${interaction.guild.id}`)
      if (!buttonname) {
        if (!namedb) {
          var namex = "Buton-3"
        }
        if (namedb) {
          var namex = namedb
        }
      }
      if (buttonname) {
        var namex = buttonname
      }
      if (butonarc) {
      db.set(`butonarc3_${interaction.guild.id}`, butonarc)
      }
      if(!emoji) {
       var emojidb = db.get(`buton3e_${interaction.guild.id}`)
        if(!emojidb) {
         var emoji = "\u{1F9F0}"
        } else {
          var emoji = emojidb
        }
      } else {
        db.set(`buton3e_${interaction.guild.id}`, emoji)
      }
      if(!renk) {
        let renkdb = db.get(`buton3r_${interaction.guild.id}`)
        if (!renkdb) {
       var renkx = Discord.ButtonStyle.Primary
        } 
      }
      if (renk) {
      db.set(`buton3r_${interaction.guild.id}`, renk)
      }  
      if (renk == "mavi") {
        var renkx = Discord.ButtonStyle.Primary
        }
        if (renk == "kirmizi") {
          var renkx = Discord.ButtonStyle.Danger
          }
          if (renk == "gri") {
            var renkx = Discord.ButtonStyle.Secondary
            }
            if (renk == "yesil") {
              var renkx = Discord.ButtonStyle.Success
              }
      const row3 = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
        .setStyle(renkx)
        .setLabel(namex)
        .setEmoji(emoji)
        .setDisabled(true)
        .setCustomId('sistemsatis')
      )
      interaction.reply({embeds: [buton3embd], components: [row3]})
    }
    }
    }