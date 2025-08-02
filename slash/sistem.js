const { EmbedBuilder, PermissionsBitField } = require("discord.js")
const Discord = require('discord.js')
const {
    JsonDatabase
  } = require("wio.db");
  let db = new JsonDatabase({
    databasePath: "./database.json"
  });

module.exports = {
    name: 'sistem',
    description: 'Sistem ayarlarını gösterir',
    run: async (client, interaction) => {
                const yetki = new Discord.EmbedBuilder()
  .setTitle('**Yetkin Yok**')
  .setDescription('Bu komutu kullanabilmek için yeterli yetkin yok')
  .setColor(Discord.Colors.Red)
  if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki], ephemeral: true})
        var desc = db.get(`desc_${interaction.guild.id}`)
        var icon = db.get(`icon_${interaction.guild.id}`)
        var buton1name = db.get(`buton1_${interaction.guild.id}`)
        var buton2name = db.get(`buton2_${interaction.guild.id}`)
        var buton3name = db.get(`buton3_${interaction.guild.id}`)
        var buton1emoji = db.get(`buton1e_${interaction.guild.id}`)
        var buton2emoji = db.get(`buton2e_${interaction.guild.id}`)
        var buton3emoji = db.get(`buton3e_${interaction.guild.id}`)
        var buton1renk = db.get(`buton1r_${interaction.guild.id}`)
        var buton2renk = db.get(`buton2r_${interaction.guild.id}`)
        var buton3renk = db.get(`buton3r_${interaction.guild.id}`)
        if (!buton1renk) {
            var renkx1 = Discord.ButtonStyle.Primary
        }
        if (buton1renk) {
            if (buton1renk == "mavi") {
                var renkx1 = Discord.ButtonStyle.Primary
                }
                if (buton1renk == "kirmizi") {
                  var renkx1 = Discord.ButtonStyle.Danger
                  }
                  if (buton1renk == "gri") {
                    var renkx1 = Discord.ButtonStyle.Secondary
                    }
                    if (buton1renk == "yesil") {
                      var renkx1 = Discord.ButtonStyle.Success
                      }
        }
        if (!buton2renk) {
            var renkx2 = Discord.ButtonStyle.Primary
        }
        if (buton2renk) {
            if (buton2renk == "mavi") {
                var renkx2 = Discord.ButtonStyle.Primary
                }
                if (buton2renk == "kirmizi") {
                  var renkx2 = Discord.ButtonStyle.Danger
                  }
                  if (buton2renk == "gri") {
                    var renkx2 = Discord.ButtonStyle.Secondary
                    }
                    if (buton2renk == "yesil") {
                      var renkx2 = Discord.ButtonStyle.Success
                      }
        }
        if (!buton3renk) {
            var renkx3 = Discord.ButtonStyle.Primary
        }
        if (buton3renk) {
            if (buton3renk == "mavi") {
                var renkx3 = Discord.ButtonStyle.Primary
                }
                if (buton3renk == "kirmizi") {
                  var renkx3 = Discord.ButtonStyle.Danger
                  }
                  if (buton3renk == "gri") {
                    var renkx3 = Discord.ButtonStyle.Secondary
                    }
                    if (buton3renk == "yesil") {
                      var renkx3 = Discord.ButtonStyle.Success
                      }
        }
        if (!buton1name){
            var buton1name = "Sipariş"
        }
        if (!buton2name){
            var buton2name = "Satış Öncesi"
        }
        if (!buton3name){
            var buton3name = "Genel Destek"
        }
        if (!buton1emoji){
            var buton1emoji = "\u{1F6D2}"
        }
        if (!buton2emoji){
            var buton2emoji = "\u{1F9D0}"
        }
        if (!buton3emoji){
            var buton3emoji = "\u{1F9F0}"
        }
        if (!desc){
            var desc = "*Ne konuda talep açmak istiyorsun*\n```yml\n- Sipariş\n- Satış öncesi\n- Genel destek```"
            var durumdesc = "Varsayılan ayar"
        } else {
            var durumdesc = "Özel ayar"
        }
        if (!icon){
            var icon = "https://cdn.icon-icons.com/icons2/2783/PNG/512/support_icon_177289.png"
            var durumicon = "Varsayılan ayar"
        } else {
            var durumicon = "Özel ayar"
        }

        const row = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
          .setStyle(renkx1)
          .setLabel(buton1name)
          .setEmoji(buton1emoji)
          .setDisabled(true)
          .setCustomId('sistemsiparis'),
          new Discord.ButtonBuilder()
          .setStyle(renkx2)
          .setLabel(buton2name)
          .setEmoji(buton2emoji)
          .setDisabled(true)
          .setCustomId('sistemsatis'),
          new Discord.ButtonBuilder()
          .setStyle(renkx3)
          .setLabel(buton3name)
          .setEmoji(buton3emoji)
          .setDisabled(true)
          .setCustomId('sistemgenel')
        )
      let pembed = new EmbedBuilder()
		    .setColor('#2F3136')	
            .setTitle("Sistem ayarlamaları")
			.addFields({
                name: '**Açıklama**', value: `${desc}`})
            .setDescription('*Açıklama: * `'+ durumdesc +'`\n\n*İcon: * `'+ durumicon +'`')
            .setThumbnail(icon)
			.setTimestamp()
			.setFooter({ text: `${interaction.user.username}`, iconURL: interaction.user.avatarURL()});
        interaction.reply({
          embeds: [pembed], components: [row]
        });
    },
};