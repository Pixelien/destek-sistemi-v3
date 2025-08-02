const Discord = require("discord.js");
const client = new Discord.Client({ intents: 7753 });
const fs = require("fs");
const moment = require('moment')
moment.locale('tr')
const ayarlar = require("./ayarlar.json");
const discordTranscripts = require('discord-html-transcripts');
const {
  JsonDatabase
} = require("wio.db");
let db = new JsonDatabase({
  databasePath:"./database.json"
});
/*const {Database} = require('./utils/Database.js');
const db = new Database("database");
*/
const { ButtonBuilder } = require('discord.js');
//const ms = require("ms");
client.ayarlar = ayarlar;


/* Ready Kısmı */

client.on('ready', async () => {
  client.user.setActivity(`Taleplerinizi izliyor`, { type:'STREAMING', url: 'https://www.twitch.tv/pixelien0'})
   
   console.log("Bot Aktif!!")
 });

/* Ready Kısmı */


/* Event Yükleyici */

fs.readdir("./events", (_err, files) => {
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log(`Yüklenen eventler: ${eventName} !`)
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

/* Event Yükleyeci */


/* Komut Yükleyici */

client.commands = new Discord.Collection();
fs.readdir("./komutlar/", (_err, files) => {
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./komutlar/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, {
      name: commandName,
      ...props
    });
    console.log(`Yüklenen komut: ${commandName}.`);
  });
});

/* Komut Yükleyici */

/* Slash Komut Yükleyici */

client.interactions = new Discord.Collection();
client.register_arr = []
fs.readdir("./slash/", (_err, files) => {
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./slash/${file}`);
    let commandName = file.split(".")[0];
    client.interactions.set(commandName, {
      name: commandName,
      ...props
    });
    client.register_arr.push(props)
  });
});

/* Slash Komut Yükleyici */

/* Client Giriş */

client.login(ayarlar.token);

/* Client Giriş */


/* ==========================[Main Komutları]========================== */

/* Destek Sistmei */

client.on('interactionCreate', async (button) => {
  let YETKİLİROL = db.get(`taleprol_${button.guild.id}`)
  let EVERROL = button.guild.id;
  let SUNUCUID = button.guild.id;
  let KATEGORİID = db.get(`talepkategori_${button.guild.id}`)
  let kullanıcı = client.users.cache.get(button.user.id);
  let kullanıcıx = db.get(`kullanıcı_${button.channel.id}_${button.guild.id}`)
  let limit = db.fetch(`limit_${kullanıcı.id}_${button.guild.id}`);
const kapat = new Discord.ActionRowBuilder()
.addComponents(
    new ButtonBuilder()
    .setStyle(Discord.ButtonStyle.Danger)
    .setLabel('Talebi kapat')
    .setCustomId('kapat')
)
const dosya = await discordTranscripts.createTranscript(button.channel, {
  returnType: 'attachment',
  fileName: 'transcript.html'
});
let logid = db.get(`taleplog_${button.guild.id}`)
let logknl = button.guild.channels.cache.get(logid)
if (button.customId == 'kapat') return button.reply({ embeds: [new Discord.EmbedBuilder().setColor(Discord.Colors.Red).setTitle('Talep Kapatılıyor').setDescription('Talep otomatik olarak 3 saniye içerisinde silinicekdir')] }), db.set(`limit_${kullanıcıx}_${button.guild.id}`, 0), db.delete(`kullanıcı_${button.channel.id}_${button.guild.id}`), logknl.send({content: `${button.channel.name}`, files: [dosya]}), setTimeout(() => { button.channel.delete({ timeout: 5000 });}, 3000);

if (button.customId == 'siparis') {
  var taleparc1 = db.get(`butonarc1_${button.guild.id}`)
  if(!taleparc1) {
    var taleparc1 = "Sipariş"
  }
  const acıkmk = new Discord.EmbedBuilder()
  .setTitle('HATA')
  .setDescription('Zaten açık talebin var')
  .setColor(Discord.Colors.Red)
  if (limit == 1) return button.reply({embeds: [acıkmk], ephemeral: true})
  let talepdurum = db.get(`talepoke_${button.guild.id}`)
  const hataemb = new Discord.EmbedBuilder()
  .setTitle('HATA')
  .setColor(Discord.Colors.Red)
  .setDescription("Destek sisteminin kurulumu yapılmamış lütfen yöneticiler ile iletişime geçiniz.")
  if (talepdurum !== 1) return button.reply({embeds: [hataemb], ephemeral: true})
  button.message.guild.channels.create({ name: `talep-${kullanıcı.tag}`, type: Discord.ChannelType.GuildText, parent: KATEGORİID}).then(async kanal => {
  await db.set(`kullanıcı_${kanal.id}_${button.guild.id}`, kullanıcı.id)
  await db.set(`limit_${kullanıcı.id}_${button.guild.id}`, 1);
  const basarılımk = new Discord.EmbedBuilder()
  .setTitle('Başarılı')
  .setDescription('Başarıyla talep oluşturuldu <#' + kanal.id + '>')
  .setColor(Discord.Colors.Green);
  await button.reply({embeds: [basarılımk], ephemeral: true})
  const embed = new Discord.EmbedBuilder()
  .setTitle("YENİ BİR DESTEK TALEBİ VAR!")
  .addFields(
    { name: "Açılma Sebebi;", value: taleparc1, inline: true},
    { name: "Eğer sorunu çözdüysen yada yanlışlıkla açtıysan", value: "``'Talebi kapat' butonuna tıkla``", inline: true}
    )
  .setDescription(
    `Hey Merhaba ${kullanıcı}, Sanırım Desteğe İhtiyacın Var. Yetkililere Haber Verdim. Görür Görmez Destek Verecekler.

Tek Yapman Gereken Oturup Beklemek.`
  )
  .setColor("#2c2f33");
  await kanal.send({embeds: [embed], components: [kapat]})
  await kanal.permissionOverwrites.set([
    {
      id: kullanıcı,
      allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages, Discord.PermissionsBitField.Flags.EmbedLinks, Discord.PermissionsBitField.Flags.AttachFiles, Discord.PermissionsBitField.Flags.ReadMessageHistory]
    },
    {
      id: EVERROL,
      deny: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages, Discord.PermissionsBitField.Flags.EmbedLinks, Discord.PermissionsBitField.Flags.AttachFiles, Discord.PermissionsBitField.Flags.ReadMessageHistory]
    },
    {
      id: YETKİLİROL,
      allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages, Discord.PermissionsBitField.Flags.EmbedLinks, Discord.PermissionsBitField.Flags.AttachFiles, Discord.PermissionsBitField.Flags.ReadMessageHistory]
    }
  ]);
  let datepx = moment().utcOffset(-4).format("dddd, MMMM Do YYYY, h:mm:ss a");
  await kanal.setTopic(`**Bu talep şu tarihte oluşturuldu:** ${datepx}`)
})
}
if (button.customId == 'satis') {
  const acıkmk = new Discord.EmbedBuilder()
   .setTitle('HATA')
   .setDescription('Zaten açık talebin var')
   .setColor(Discord.Colors.Red)
   if (limit == 1) return await button.reply({embeds: [acıkmk], ephemeral: true})
   let talepdurum = db.get(`talepoke_${button.guild.id}`)
     var taleparc2 = db.get(`butonarc2_${button.guild.id}`)
   if(!taleparc2) {
     var taleparc2 = "Satış"
   }
   const hataemb = new Discord.EmbedBuilder()
   .setTitle('HATA')
   .setColor(Discord.Colors.Red)
   .setDescription("Destek sisteminin kurulumu yapılmamış lütfen yöneticiler ile iletişime geçiniz.")
   if (talepdurum !== 1) return await button.reply({embeds: [hataemb], ephemeral: true})
 button.message.guild.channels.create({ name: `talep-${kullanıcı.tag}`, type: Discord.ChannelType.GuildText, parent: KATEGORİID}).then(async kanal => {
 db.set(`kullanıcı_${kanal.id}_${button.guild.id}`, kullanıcı.id)
 db.set(`limit_${kullanıcı.id}_${button.guild.id}`, 1);
 const basarılımk = new Discord.EmbedBuilder()
 .setTitle('Başarılı')
 .setDescription('Başarıyla talep oluşturuldu <#'+ kanal.id +'>')
 .setColor(Discord.Colors.Green)
 button.reply({embeds: [basarılımk], ephemeral: true})
 const embed = new Discord.EmbedBuilder()
 
 .setTitle("YENİ BİR DESTEK TALEBİ VAR!")
 
 .addFields(
  { name: "Açılma Sebebi;", value: taleparc2, inline: true},
  { name: "Eğer sorunu çözdüysen yada yanlışlıkla açtıysan", value: "``'Talebi kapat' butonuna tıkla``", inline: true}
  )
 
 .setDescription(
 `Hey Merhaba ${kullanıcı}, Sanırım Desteğe İhtiyacın Var. Yetkililere Haber Verdim. Görür Görmez Destek Verecekler.
 
 Tek Yapman Gereken Oturup Beklemek.`
 )
 
 .setColor("#2c2f33");
 kanal.send({embeds: [embed], components: [kapat]});
 await kanal.permissionOverwrites.set([
  {
    id: kullanıcı,
    allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages, Discord.PermissionsBitField.Flags.EmbedLinks, Discord.PermissionsBitField.Flags.AttachFiles, Discord.PermissionsBitField.Flags.ReadMessageHistory]
  },
  {
    id: EVERROL,
    deny: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages, Discord.PermissionsBitField.Flags.EmbedLinks, Discord.PermissionsBitField.Flags.AttachFiles, Discord.PermissionsBitField.Flags.ReadMessageHistory]
  },
  {
    id: YETKİLİROL,
    allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages, Discord.PermissionsBitField.Flags.EmbedLinks, Discord.PermissionsBitField.Flags.AttachFiles, Discord.PermissionsBitField.Flags.ReadMessageHistory]
  }
]);
 let datepx = moment().utcOffset(-4).format("dddd, MMMM Do YYYY, h:mm:ss a");
 await kanal.setTopic(`**Bu talep şu tarihte oluşturuldu:** ${datepx}`)
 })
 }
if (button.customId == 'genel') {
  const acıkmk = new Discord.EmbedBuilder()
  .setTitle('HATA')
  .setDescription('Zaten açık talebin var')
  .setColor(Discord.Colors.Red)
  if (limit == 1) return button.reply({embeds: [acıkmk], ephemeral: true})
  let talepdurum = db.get(`talepoke_${button.guild.id}`)
    var taleparc3 = db.get(`butonarc3_${button.guild.id}`)
  if(!taleparc3) {
    var taleparc3 = "Genel Destek"
  }
  const hataemb = new Discord.EmbedBuilder()
  .setTitle('HATA')
  .setColor(Discord.Colors.Red)
  .setDescription("Destek sisteminin kurulumu yapılmamış lütfen yöneticiler ile iletişime geçiniz.")
  if (talepdurum !== 1) return button.reply({embeds: [hataemb], ephemeral: true})
  button.message.guild.channels.create({ name: `talep-${kullanıcı.tag}`, type: Discord.ChannelType.GuildText, parent: KATEGORİID}).then(async kanal => {
db.set(`kullanıcı_${kanal.id}_${button.guild.id}`, kullanıcı.id)
await db.set(`limit_${kullanıcı.id}_${button.guild.id}`, 1);
  const basarılımk = new Discord.EmbedBuilder()
  .setTitle('Başarılı')
  .setDescription('Başarıyla talep oluşturuldu <#' + kanal.id + '>')
  .setColor(Discord.Colors.Green)
  button.reply({
  embeds: [basarılımk],
   ephemeral: true
  })
const embed = new Discord.EmbedBuilder()

.setTitle("YENİ BİR DESTEK TALEBİ VAR!")

.addFields(
  { name: "Açılma Sebebi;", value: taleparc3, inline: true},
  { name: "Eğer sorunu çözdüysen yada yanlışlıkla açtıysan", value: "``'Talebi kapat' butonuna tıkla``", inline: true}
  )
.setDescription(
  `Hey Merhaba ${kullanıcı}, Sanırım Desteğe İhtiyacın Var. Yetkililere Haber Verdim. Görür Görmez Destek Verecekler.

Tek Yapman Gereken Oturup Beklemek.`
)

.setColor("#2c2f33");

kanal.send({embeds: [embed], components: [kapat]});
await kanal.permissionOverwrites.set([
  {
    id: kullanıcı,
    allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages, Discord.PermissionsBitField.Flags.EmbedLinks, Discord.PermissionsBitField.Flags.AttachFiles, Discord.PermissionsBitField.Flags.ReadMessageHistory]
  },
  {
    id: EVERROL,
    deny: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages, Discord.PermissionsBitField.Flags.EmbedLinks, Discord.PermissionsBitField.Flags.AttachFiles, Discord.PermissionsBitField.Flags.ReadMessageHistory]
  },
  {
    id: YETKİLİROL,
    allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages, Discord.PermissionsBitField.Flags.EmbedLinks, Discord.PermissionsBitField.Flags.AttachFiles, Discord.PermissionsBitField.Flags.ReadMessageHistory]
  }
]);
let datepx = moment().utcOffset(-4).format("dddd, MMMM Do YYYY, h:mm:ss a");
await kanal.setTopic(`**Bu talep şu tarihte oluşturuldu:** ${datepx}`)
})

}
})
client.on('interactionCreate', async (button) => {
  let kullanıcı = client.users.cache.get(button.user.id);
  let limit = db.fetch(`limit_${kullanıcı.id}_${button.guild.id}`);
  if (button.customId == 'siparis') {
    if (limit == null) return db.set(`limit_${kullanıcı.id}_${button.guild.id}`, 0);
  }
  if (button.customId == 'satis') {
    if (limit == null) return db.set(`limit_${kullanıcı.id}_${button.guild.id}`, 0);
  }
  if (button.customId == 'genel') {
    if (limit == null) return db.set(`limit_${kullanıcı.id}_${button.guild.id}`, 0);
  }
})


client.on('interactionCreate', async (button) => {
  var desc = db.get(`desc_${button.guild.id}`)
  var icon = db.get(`icon_${button.guild.id}`)
  if (!desc){
      var desc = "*Ne konuda talep açmak istiyorsun*\n```yml\n- Sipariş\n- Satış öncesi\n- Genel destek```"
  }
  if (!icon){
      var icon = "https://cdn.icon-icons.com/icons2/2783/PNG/512/support_icon_177289.png"
  }
          var buton1name = db.get(`buton1_${button.guild.id}`)
        var buton2name = db.get(`buton2_${button.guild.id}`)
        var buton3name = db.get(`buton3_${button.guild.id}`)
        var buton1emoji = db.get(`buton1e_${button.guild.id}`)
        var buton2emoji = db.get(`buton2e_${button.guild.id}`)
        var buton3emoji = db.get(`buton3e_${button.guild.id}`)
        var buton1renk = db.get(`buton1r_${button.guild.id}`)
        var buton2renk = db.get(`buton2r_${button.guild.id}`)
        var buton3renk = db.get(`buton3r_${button.guild.id}`)
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
        const row = new Discord.ActionRowBuilder()
        .addComponents(
          new Discord.ButtonBuilder()
          .setStyle(renkx1)
          .setLabel(buton1name)
          .setEmoji(buton1emoji)
          .setCustomId('siparis'),
          new Discord.ButtonBuilder()
          .setStyle(renkx2)
          .setLabel(buton2name)
          .setEmoji(buton2emoji)
          .setCustomId('satis'),
          new Discord.ButtonBuilder()
          .setStyle(renkx3)
          .setLabel(buton3name)
          .setEmoji(buton3emoji)
          .setCustomId('genel')
        )
  const talepembed = new Discord.EmbedBuilder()
  .setColor('#2c2f33')
  .setTitle('**__Talep Aç__**')
  .setThumbnail(icon) 
  .setDescription(desc)
  .setFooter({ text: "Developed By Pixelien", iconURL: "https://images-ext-1.discordapp.net/external/-OHwY5YNYrW0AC_Uh2wksZVMccCQmNF1MIucjebQ76g/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/852582698119200788/3b5a86425593330b7a10d019fcd43aeb.png?width=670&height=670"})
  if (button.customId == 'siparis') {
    button.channel.messages
    .fetch(button.message.id)
    .then(pixelmsg => {
     pixelmsg.edit({embeds:[talepembed], components: [row]});
    })
  }
  if (button.customId == 'satis') {
    button.channel.messages
    .fetch(button.message.id)
    .then(pixelmsg => {
     pixelmsg.edit({embeds:[talepembed], components: [row]});
    })
  }
  if (button.customId == 'genel') {
    button.channel.messages
    .fetch(button.message.id)
    .then(pixelmsg => {
      pixelmsg.edit({embeds:[talepembed], components: [row]});
    })
  }
})
 /*Destek Sistemi */
