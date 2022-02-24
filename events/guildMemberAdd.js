module.exports = {
    name: 'guildMemberAdd',
    execute(member) {
        try {
            if (member.user.bot) return
            const ch = guild.channels.cache.find(n => n.name === "member-logs")

            ch.send(member + ' joined the server')
        } catch (error) {
        }
    }
};