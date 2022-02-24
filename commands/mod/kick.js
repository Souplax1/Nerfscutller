const { MessageButton, MessageActionRow } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('kick member')
        .addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true)),
    async execute(interaction) {
        if(!interaction.member.permissions.has('KICK_MEMBERS')) return interaction.reply('You don\'t have permission.')
        const member = interaction.options.getMember('target');
        console.log(member)
        if (member.kickable === false) return interaction.reply(`${member} Can not be kicked!`)


        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('yes')
                    .setStyle('SUCCESS')
                    .setLabel('Yes'),

                new MessageButton()
                    .setCustomId('no')
                    .setStyle('DANGER')
                    .setLabel('No')
            )

        await interaction.reply({ content: 'te', components: [row] , ephemeral: true});

        const filter = i => i.customId === 'yes' && i.user.id === i.member.id
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
        collector.on('collect', async i => {
            if (i.customId === 'yes') {
                member.kick().catch((error) => {
                    console.error(error);
                })
                await i.deferUpdate();
                await i.channel.editReply(`${member} is kicked by: ${i.member}`)
                collector.stop()
            } else {
                await i.deferUpdate();
                await i.editReply({ content: 'Why not ?', components: [] });
            }
        });
    }
}