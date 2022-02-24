const { api } = require('../../objects/config.json')
const { default: fetch } = require('node-fetch')
const { Discord, Formatters, MessageAttachment, MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');


const regions = {
    BR: 'br1.api.riotgames.com',
    EUNE: 'eun1.api.riotgames.com',
    EUW: 'euw1.api.riotgames.com',
    NA: 'na1.api.riotgames.com',
    KR: 'kr.api.riotgames.com'
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('acc')
        .setDescription('Send information about selected lol accounts')
        .addStringOption(option =>
            option.setName('region')
                .setDescription('Enter region(EUNE,EUW,KR,NA,BR)')
                .addChoice('EUNE','EUNE')
                .addChoice('EUW','EUW')
                .addChoice('NA','NA')
                .addChoice('KR','KR')
                .addChoice('BR','BR')
                .setRequired(true)
                )
        .addStringOption(option =>
                option.setName('name')
                .setDescription('Enter account name.')
                .setRequired(true)),
        

    async execute(interaction) {
        const region = interaction.options.getString('region');
        const name = interaction.options.getString('name');
        
        const nurl = `https://${regions[region.toUpperCase()]}/lol/summoner/v4/summoners/by-name/${name}?${api}`
        const response1 = await fetch(nurl)
        const json1 = await response1.json()

        if (response1.status !== 200) return interaction.reply('Wrong username!')

        const rurl = `https://${regions[region.toUpperCase()]}/lol/league/v4/entries/by-summoner/${json1.id}?${api}`
        const response2 = await fetch(rurl)
        const json2 = await response2.json()
     

        const Summoner = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({name : interaction.user.username,iconURL : interaction.user.displayAvatarURL()})
            .setThumbnail(`https://cdn.communitydragon.org/latest/profile-icon/${json1.profileIconId}`)
            .setDescription(`Summoner name:\n [${json1.name}](https://${region}.op.gg/summoner/userName=${json1.name.replace(/\s/g, '+')})\nLevel: ${json1.summonerLevel}`)


        if (json2.length > 0) {
            json2.sort(function (a, b) {
                var nameA = a.queueType.toUpperCase(); // ignore upper and lowercase
                var nameB = b.queueType.toUpperCase(); // ignore upper and lowercase
                if (nameA > nameB) {
                    return -1;
                }
            })
            json2.forEach(t => {
                Summoner.addField(t.queueType.replace(/[0-9_x]/g, ' '),
                    `Tier: ${t.tier + ' ' + t.rank}\n 
                LP: ${t.leaguePoints} / ${t.wins}W ${t.losses}L \n 
                `, true)
            });
        }
        await interaction.reply({ embeds: [Summoner]})
    }
}