const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('inv')
        .setDescription('Send invitation link for the bot.'),
    async execute(interaction) {
        await interaction.reply('https://discord.com/oauth2/authorize?client_id=598583642205192220&permissions=261993005047&scope=bot%20applications.commands')
    }
}
