const { PermissionsBitField, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');
const Discord = require("discord.js")
const { JsonDatabase } = require('wio.db');
const db = new JsonDatabase({
  databasePath: './database.json'
});

module.exports = {
  name: 'talep-embed',
  description: 'Talep açmak için embed gönderir',
  run: async (client, interaction) => {
    const yetkiEmbed = new EmbedBuilder()
      .setTitle('**Yetkin Yok**')
      .setDescription('Bu komutu kullanabilmek için yeterli yetkin yok')
      .setColor(Discord.Colors.Red);

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
      return interaction.reply({ embeds: [yetkiEmbed], ephemeral: true });

    let desc = db.get(`desc_${interaction.guild.id}`);
    let icon = db.get(`icon_${interaction.guild.id}`);

    if (!desc) {
      desc = "*Ne konuda talep açmak istiyorsun*\n```yml\n- Sipariş\n- Satış öncesi\n- Genel destek```";
    }

    if (!icon) {
      icon = 'https://cdn.icon-icons.com/icons2/2783/PNG/512/support_icon_177289.png';
    }

    let buton1name = db.get(`buton1_${interaction.guild.id}`);
    let buton2name = db.get(`buton2_${interaction.guild.id}`);
    let buton3name = db.get(`buton3_${interaction.guild.id}`);
    let buton1emoji = db.get(`buton1e_${interaction.guild.id}`);
    let buton2emoji = db.get(`buton2e_${interaction.guild.id}`);
    let buton3emoji = db.get(`buton3e_${interaction.guild.id}`);
    let buton1renk = db.get(`buton1r_${interaction.guild.id}`);
    let buton2renk = db.get(`buton2r_${interaction.guild.id}`);
    let buton3renk = db.get(`buton3r_${interaction.guild.id}`);

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

    if (!buton1name) {
      buton1name = 'Sipariş';
    }

    if (!buton2name) {
      buton2name = 'Satış Öncesi';
    }

    if (!buton3name) {
      buton3name = 'Genel Destek';
    }

    if (!buton1emoji){
       buton1emoji = "\u{1F6D2}"
  }
  if (!buton2emoji){
       buton2emoji = "\u{1F9D0}"
  }
  if (!buton3emoji){
       buton3emoji = "\u{1F9F0}"
  }

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setStyle(renkx1)
          .setLabel(buton1name)
          .setEmoji(buton1emoji)
          .setCustomId('siparis'),
        new ButtonBuilder()
          .setStyle(renkx2)
          .setLabel(buton2name)
          .setEmoji(buton2emoji)
          .setCustomId('satis'),
        new ButtonBuilder()
          .setStyle(renkx3)
          .setLabel(buton3name)
          .setEmoji(buton3emoji)
          .setCustomId('destek')
      );

    const embed = new EmbedBuilder()
      .setTitle('Talep Aç')
      .setDescription(desc)
      .setColor(Discord.Colors.Blue)
      .setThumbnail(icon);

    interaction.reply({ embeds: [embed], components: [row] });
  }
};
