const { MessageEmbed, Collection} = require("discord.js");

module.exports = {
	name: 'channelCreate',
	async execute(channel, client) {

		const guild = channel.guild
		const ch = guild.channels.cache.find(n => n.name === "mod-logs")

		if(!ch) return

		const fetchlogs = await channel.guild.fetchAuditLogs({
			limit: 1,
			type: 'CHANNEL_CREATE'
		})

		const log = fetchlogs.entries.first()

		if (!log) return

		const { executor, target } = log
		if(executor.bot) return

		const logembed = new MessageEmbed()
			.setAuthor({name: executor.tag, iconURL: executor.displayAvatarURL()})
			.setColor('PURPLE')
			.setDescription(`**Action:** Channel create\n**Reason:** moderation\n**Member:** ${executor.tag} created ${channel}`)

		ch.send({ embeds: [logembed] })
	},
};