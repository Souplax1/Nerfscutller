const { Guild, Permissions, } = require('discord.js')

async function genchannel(guild = Guild) {

       await guild.channels.create(`member-logs`, {
            type: 'GUILD_TEXT',
            permissionOverwrites: [
                {
                    id: guild.roles.everyone,
                    deny: [Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.USE_EXTERNAL_EMOJIS, Permissions.FLAGS.ADD_REACTIONS],
                }
            ]
        })

       await guild.channels.create(`mod-logs`, {
            type: 'GUILD_TEXT',
            permissionOverwrites: [
                {
                    id: guild.roles.everyone,
                    deny: [Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.USE_EXTERNAL_EMOJIS,Permissions.FLAGS.ADD_REACTIONS],
                }
            ]
        })
}

module.exports = { genchannel }