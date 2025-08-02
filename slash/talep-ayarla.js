let Discord = require("discord.js")
const { PermissionsBitField } = require('discord.js');
const {
    JsonDatabase
  } = require("wio.db");
  let db = new JsonDatabase({
    databasePath: "./database.json"
  });

module.exports = {
    name: 'talep-ayarla',
    description: 'Talep sismemi kurulumunu yapar!',

    options: [
        {
          name: 'log-kanalı',
          description: 'Arşivlerin gideceği kanalı ayrlamanı sağlar',
          type: Discord.ApplicationCommandOptionType.Channel,
          required: true
        },
        {
        name: 'rol',
        description: 'Destek ekibi rolünü ayarlar',
        type: Discord.ApplicationCommandOptionType.Role,
        required: true
        },
        {
        name: 'kategori',
        description: 'Taleplerin işleyeceği kategoriyi ayarlar.',
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true
        }
      ],    
    run: async (client, interaction) => {
        const yetki = new Discord.EmbedBuilder()
  .setTitle('**Yetkin Yok**')
  .setDescription('Bu komutu kullanabilmek için yeterli yetkin yok')
  .setColor(Discord.Colors.Red)
  if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki], ephemeral: true})
    const kanal = interaction.options.getChannel('log-kanalı');
    const kategori = interaction.options.getChannel('kategori');
    const rol = interaction.options.getRole('rol');
    const hatakanal = new Discord.EmbedBuilder()
    .setTitle("HATA")
    .setColor(Discord.Colors.Red)
    .setDescription("Log kanalını lütfen yazı kanalı olarak seçiniz")
    const hatakategori = new Discord.EmbedBuilder()
    .setTitle("HATA")
    .setColor(Discord.Colors.Red)
    .setDescription("Talep kategorisini lütfen bir kategori olarak seçiniz.")
    if(kanal.type !== Discord.ChannelType.GuildText) return interaction.reply({embeds: [hatakanal], ephemeral: true})
    if(kategori.type !== Discord.ChannelType.GuildCategory) return interaction.reply({embeds: [hatakategori], ephemeral: true})
    const basarılıembed = new Discord.EmbedBuilder()
    .setTitle('BAŞARILI!!')
    .setColor(Discord.Colors.Green)
    .setDescription('◾ *Talep arşivleri kanalı* <#'+ kanal +'> *olarak ayarlandı*\n\n◾ *Talep Kategorisi* **<#'+ kategori +'>** *olarak ayarlandı*\n\n◾ *Talep sorumlusu rolü* <@&'+ rol +'> *olarak ayarlandı.*')
    db.set(`taleplog_${interaction.guild.id}`, `${kanal.id}`)
    db.set(`talepkategori_${interaction.guild.id}`, `${kategori.id}`)
    db.set(`taleprol_${interaction.guild.id}`, `${rol.id}`)
    db.set(`talepoke_${interaction.guild.id}`, 1)
    interaction.reply({embeds: [basarılıembed]})
    }
    }