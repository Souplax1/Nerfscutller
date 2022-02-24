const { MessageEmbed, Message } = require('discord.js')
const { default: fetch } = require('node-fetch')
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('champ')
        .setDescription('Send information about the champion.')
        .addStringOption(option => option.setName('name').setDescription('Enter champions name.').setRequired(true)),
    async execute(interaction) {
        try {

        const name = interaction.options.getString('name');
        const response = await fetch(`https://cdn.communitydragon.org/latest/champion/${name}/data`)
        const data = await response.json()

        const champembed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(data.name + ` (${data.roles})`)
            .setURL(`https://euw.leagueoflegends.com/en-gb/champions/${data.alias.toLowerCase()}`)
            .setDescription(data.title)
            .setThumbnail(` https://cdn.communitydragon.org/latest/champion/${name}/square`)
            .addField('\u200B', '\u200B')
            .addField(`Passive: ${data.passive.name}`, data.passive.description.replace(/<[^>]*>/g, ' '))
        data.spells.forEach(s => {
            champembed.addField(s.name + ` (${s.spellKey.toUpperCase()})`, s.description.replace(/<[^>]*>/g, ' '))
        });
        interaction.reply({ embeds: [champembed] })
    } catch (error) {
          interaction.reply('Wrong champion name.')  
    }

    }
}