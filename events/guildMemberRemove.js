module.exports = {
    name: 'guildMemberRemove',
    execute(member) {
        if (member.user.bot) return
        try {
            const ch = guild.channels.cache.find(n => n.name === "member-logs")

            ch.send(member + ' left the server')
        } catch (error) {

        }
    }
};