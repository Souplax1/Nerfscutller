const { genchannel } = require('../../util/genchannel')
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ready')
        .setDescription('create channels'),

    async execute(interaction) {
        const guild = interaction.guild
        const logs = interaction.guild.channels.cache.find(n => n.name == 'mod-logs' | n.name == 'member-logs')
        if (logs) return interaction.reply('There are already channels with names: ``mod-logs`` and ``member-logs`` ').catch(err => { interaction.author.send(err.message + ' .Be sure bot has Administrator Permissions') })
        genchannel(guild)
    }
}