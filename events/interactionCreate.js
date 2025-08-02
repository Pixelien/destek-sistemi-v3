module.exports = (client, interaction) => {
    if (interaction.isCommand()) {

    const command = client.interactions.get(interaction.commandName);

    if (!command) return interaction.reply({
      content: "Bazı şeyler hatalı | Bu komut kaydedilmemiş olabilirmi?",
      ephemeral: true
    });

    command.run(client, interaction);
  }
}