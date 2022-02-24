const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
        .setDefaultPermission(true)
		.setName('clear')
		.setDescription('clear messages')
		.addIntegerOption(option => option.setName('int').setDescription('Enter an integer')),

	async execute(interaction) {
		if(!interaction.member.permissions.has('KICK_MEMBERS')) return interaction.reply('You don\'t have permission.')
		const amount = interaction.options.getInteger('int');
		if (isNaN(amount)) {
			return interaction.reply('that doesn\'t seem to be a valid number.');
		} else if (amount <= 1 || amount > 100) {
			return interaction.reply('you need to input a number between 1 and 99.');
		}

		interaction.channel.bulkDelete(amount, true).then(() => interaction.reply({ content: `Successfuly deleted`, ephemeral: true }))
	}
}