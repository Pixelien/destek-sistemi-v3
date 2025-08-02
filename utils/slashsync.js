const Discord = require('discord.js');

module.exports = async (client, commands, options = {
    debug: false,
    guildId: null
}) => {

    const log = (message) => options.debug && console.log(message);

    const ready = client.readyAt ? Promise.resolve() : new Promise(resolve => client.once('ready', resolve));
    await ready;
    const currentCommands = await client.application.commands.fetch(options.guildId && { guildId: options.guildId });

    log(`Komutlar düzenleniyor...`);
    log(`${currentCommands.size} adet komut kaydedildi.`);

    const newCommands = commands.filter((command) => !currentCommands.some((c) => c.name === command.name));
    for (let newCommand of newCommands) {
        await client.application.commands.create(newCommand, options.guildId);
    }

    log(`${newCommands.length} adet komut oluşturuldu!`);

    const deletedCommands = currentCommands.filter((command) => !commands.some((c) => c.name === command.name)).toJSON();
    for (let deletedCommand of deletedCommands) {
        await deletedCommand.delete();
    }

    log(`${deletedCommands.length} adet komut silindi!`);

    const updatedCommands = commands.filter((command) => currentCommands.some((c) => c.name === command.name));
    let updatedCommandCount = 0;
    for (let updatedCommand of updatedCommands) {
        const newCommand = updatedCommand;
        const previousCommand = currentCommands.find((c) => c.name === updatedCommand.name);
        let modified = false;
        if (previousCommand.description !== newCommand.description) modified = true;
        if (!Discord.ApplicationCommand.optionsEqual(previousCommand.options ?? [], newCommand.options ?? [])) modified = true;
        if (modified) {
            await previousCommand.edit(newCommand);
            updatedCommandCount++;
        }
    }

    log(`${updatedCommandCount} adet komut güncellendi!`);

    log(`Komutlar güncellendi!`);

    return {
        currentCommandCount: currentCommands.size,
        newCommandCount: newCommands.length,
        deletedCommandCount: deletedCommands.length,
        updatedCommandCount
    };

};
