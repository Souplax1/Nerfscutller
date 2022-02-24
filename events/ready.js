
module.exports = {
	name: 'ready',
	once: true,
	async execute(client, args) {
		console.log('Ready!');
		client.user.setPresence({ activities: [{ name: 'Hello 👋' }], status: 'dnd' });

	},
};