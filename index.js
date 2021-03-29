const Discord = require('discord.js');

const client = new Discord.Client();
const prefix = '?'
const ms = require('ms');
const keepAlive = require("./server");




client.on('ready', () => {
    console.log(`Online XXXXXXXX!`);
    client.user.setStatus('dnd');
    setInterval(() => {
        const statuses = [
            `over servers`,
            'say ?help for all my commands',
            'follow @T_dynodiscord on twitter',
            'for ?',
            'Dayln#1506',
            'for bad people',
            'you',
            'Xlight',
        ]

        const status = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setActivity(status, { type: "WATCHING" })
    }, 5000)
});




client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command == 'ban') {
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply('Hey... you cannot use this command.')
        }
        {
            const userBan = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
            let UBtarget = message.guild.members.cache.get(userBan.id)
            const reason = args.slice(1).join(" ");
            if (!reason) return message.reply(`Please type a reason.`);
            if (userBan) {
                var member = message.guild.member(userBan);
                if (member) {
                    member.ban({
                        reason: `${reason}`
                    })
                    let kEmbed = new Discord.MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle(`${UBtarget.user.tag} was banned!`)
                        .setDescription(`**${UBtarget.user.tag} banned by **${message.author.tag}.\n**reason:** ${reason}`)
                    message.channel.send({ embed: kEmbed })
                }
            }
            let pvEmbed = new Discord.MessageEmbed()
                .setFooter(`Banned by ${message.author.tag}`)
                .setColor('#FF0000')
                .setTitle('***You were Banned***')
                .setDescription(`**reason: ${reason}** at **${message.guild}**`)
            userBan.send({ embed: pvEmbed })

        }
    } else if (command == 'kick') {
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply('Hey... you cannot use this command.')
        } {
            const userKick = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
            let kickTarget = message.guild.members.cache.get(userKick.id)
            const reason = args.slice(1).join(" ");
            if (!reason) return message.reply(`Please type a reason.`);
            if (userKick) {
                var member = message.guild.member(userKick);

                if (member) {
                    member.kick({
                        reason: `${reason}`
                    });
                    let kEmbed = new Discord.MessageEmbed()
                        .setColor('#FF0000')
                        .setTitle(`${kickTarget.user.tag} was kicked!`)
                        .setDescription(`**${kickTarget.user.tag} kicked by **${message.author.username}.\n**reason:** ${reason}`)
                    message.channel.send({ embed: kEmbed })
                }
            }
            let pvEmbed = new Discord.MessageEmbed()
                .setFooter(`Kicked by ${message.author.tag}`)
                .setColor('#FF0000')
                .setTitle('***You were Kicked***')
                .setDescription(`**reason: ${reason}** at ${message.guild}`)
            userKick.send({ embed: pvEmbed })
        }
    } else if (command == 'bot-info') {
        const embed = new Discord.MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle('bot info')
            .setColor('#000000')
            .addFields(
                {
                    name: 'Owner',
                    value: '<@673011572225998856>',
                    inline: true
                },
                {
                    name: '🌐 Servers',
                    value: `Serving ${client.guilds.cache.size} servers.`,
                    inline: true
                },
                {
                    name: '📺 Channels',
                    value: `Serving ${client.channels.cache.size} channels.`,
                    inline: true
                },
                {
                    name: '👥 Server Users',
                    value: `Serving ${client.users.cache.size}`,
                    inline: true
                },
                {
                    name: '⏳ Ping',
                    value: `${Math.round(client.ws.ping)}ms`,
                    inline: true
                },
                {
                    name: 'Join Date',
                    value: client.user.createdAt,
                    inline: true
                },
            )
            .setFooter(`Created By: ${message.author.tag}`, message.author.displayAvatarURL())
        message.channel.send(embed)
    } else if (command == 'slowmode') {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply(`You don't have permisson to use that command!`)
        var time = message.content.split(' ').slice(1).join(' ')
        if (!time) return message.reply('Please state the time you want!')
        message.channel.setRateLimitPerUser(time)
        message.reply(`I have set the slowmode to ${time} seconds`)
        timeout: 2000
    } else if (command == 'server-info') {
        let region;
        switch (message.guild.region) {
            case "europe":
                region = '🇪🇺 Europe';
                break;
            case "us-east":
                region = '🇺🇸 us-east'
                break;
            case "us-west":
                region = '🇺🇸 us-west';
                break;
            case "us-south":
                region = '🇺🇸 us-south'
                break;
            case "us-central":
                region = '🇺🇸 us-central'
                break;
        }

        const embed = new Discord.MessageEmbed()
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setColor('#f3f3f3')
            .setTitle(`${message.guild.name} server stats`)
            .addFields(
                {
                    name: "Owner: ",
                    value: message.guild.owner.user.tag,
                    inline: true
                },
                {
                    name: "Members: ",
                    value: `There are ${message.guild.memberCount} users!`,
                    inline: true
                },
                {
                    name: "Members Online: ",
                    value: `There are ${message.guild.members.cache.filter(m => m.user.presence.status == "online").size} users online!`,
                    inline: true
                },
                {
                    name: "Total Bots: ",
                    value: `There are ${message.guild.members.cache.filter(m => m.user.bot).size} bots!`,
                    inline: true
                },
                {
                    name: "Creation Date: ",
                    value: message.guild.createdAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: "Roles Count: ",
                    value: `There are ${message.guild.roles.cache.size} roles in this server.`,
                    inline: true,
                },
                {
                    name: `🗺 Region: `,
                    value: region,
                    inline: true
                },
                {
                    name: `Verified: `,
                    value: message.guild.verified ? 'Server is verified' : `Server isn't verified`,
                    inline: true
                },
                {
                    name: 'Boosters: ',
                    value: message.guild.premiumSubscriptionCount >= 1 ? `There are ${message.guild.premiumSubscriptionCount} Boosters` : `There are no boosters`,
                    inline: true
                },
                {
                    name: "Emojis: ",
                    value: message.guild.emojis.cache.size >= 1 ? `There are ${message.guild.emojis.cache.size} emojis!` : 'There are no emojis',
                    inline: true
                }
            )
        message.channel.send(embed)

    } else if (command == 'user-info') {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        let status;
        switch (user.presence.status) {
            case "online":
                status = "<:online:729181184193462285> online";
                break;
            case "dnd":
                status = "<:dnd:729181212530442311> dnd";
                break;
            case "idle":
                status = "<:idle:729181121933475931> idle";
                break;
            case "offline":
                status = "<:offline:729181162182017051> offline";
                break;
        }

        const embed = new Discord.MessageEmbed()
            .setTitle(`${user.user.username} stats`)
            .setColor(`#f3f3f3`)
            .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                {
                    name: "Name: ",
                    value: user.user.username,
                    inline: true
                },
                {
                    name: "#️⃣ Discriminator: ",
                    value: `#${user.user.discriminator}`,
                    inline: true
                },
                {
                    name: "🆔: ",
                    value: user.user.id,
                },
                {
                    name: "Current Status: ",
                    value: status,
                    inline: true
                },
                {
                    name: "Activity: ",
                    value: user.presence.activities[0] ? user.presence.activities[0].name : `User isn't playing a game!`,
                    inline: true
                },
                {
                    name: 'Avatar link: ',
                    value: `[Click Here](${user.user.displayAvatarURL()})`
                },
                {
                    name: 'Creation Date: ',
                    value: user.user.createdAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: 'Joined Date: ',
                    value: user.joinedAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: 'User Roles: ',
                    value: user.roles.cache.map(role => role.toString()).join(" ,"),
                    inline: true
                }
            )

        message.channel.send(embed)

    } else if (command == 'lock') {
        if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.reply('You do not have permisson to use that!'); {
            const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
            if (args[0] === 'on') {
                channels.forEach(channel => {
                    channel.updateOverwrite(message.guild.roles.everyone, {
                        SEND_MESSAGES: false
                    }).then(() => {
                        channel.setName(channel.name += `🔒`)
                    })
                })
                return message.reply('I have locked all channels no raids and only admins can talk now!');
            } else if (args[0] === 'off') {
                channels.forEach(channel => {
                    channel.updateOverwrite(message.guild.roles.everyone, {
                        SEND_MESSAGES: true
                    }).then(() => {
                        channel.setName(channel.name.replace('🔒', ''))
                    }

                    )

                })
                return message.reply('unlocked all channels!')
            }
        }
    } else if (command == 'warn') {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply('Hey... you cannot use this command.')
        }
        const userWarn = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
        let warnTarget = message.guild.members.cache.get(userWarn.id)
        if (!userWarn) return message.channel.send("**Couldn't find that user**.")
        const reason = args.slice(1).join(" ");
        if (!reason) return message.reply(`Please type a reason.`);
        let kEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`${warnTarget.user.tag} was warned!`)
            .setDescription(`**${warnTarget.user.tag} Warned by **${message.author.username}.\n**reason:** ${reason}`)
        message.channel.send({ embed: kEmbed })
        let pvEmbed = new Discord.MessageEmbed()
            .setFooter(`Warned by ${message.author.tag}`)
            .setColor('#FF0000')
            .setTitle('***You were warned***')
            .setDescription(`**reason: ${reason}**`)
        userWarn.send({ embed: pvEmbed })
    } else if (command == 'help') {
        const helpembed = new Discord.MessageEmbed()
            .setColor('#7fbff3')
            .setTitle('commands')
            .addFields(
                {
                    name: "prefix",
                    value: '?',
                },
                {
                    name: "Kick",
                    value: `kicks someone`,
                },
                {
                    name: "ban",
                    value: `bans someone`,
                },
                {
                    name: 'warn',
                    value: 'warns someone',
                },
                {
                    name: "slowmode",
                    value: 'sets the slowmode',
                },
                {
                    name: 'lock on',
                    value: `locks all channels`
                },
                {
                    name: 'lock off',
                    value: 'unlocks all channels',
                },
                {
                    name: 'user-info',
                    value: `gives info about a user`,
                },
                {
                    name: 'server-info',
                    value: `gives info about the server`,
                },
                {
                    name: `bot-info`,
                    value: `gives info about me`,
                },
               { 
                    name: 'bot-links',
                    value: 'Discord and more links!',
               },
               {
                    name: 'clear',
                    value: 'Clear messages',
               },
               {
                  name: `thanks!`,
                  value: `Chris!`,
                },
                {
                  name: 'Shoutout!',
                  value: `Xilight#3248!`,
                },
            
            )
        message.author.send(helpembed)
    } else if (command == 'clear') {
        if (message.deletable) {
            message.delete();
        }
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply('you do not have permisson to do that').then(m => m.delete(5000));
        }
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply('this is not a number').then(m => m.delete(5000));
        }
        let deleteAmount;
        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.reply(`I have deleted ${deleteAmount} messages`))
            .catch(err => message.reply(`something went wrong ... ${err}`))
    } else if (command == 'verify-setup') {
        message.delete()
        const vfembed = new Discord.MessageEmbed()
            .setColor('#34E62F')
            .setTitle('✅Verify')
            .addFields(
                {
                    name: "Type **?verify**",
                    value: 'after you have read the #📄-rules to verify and get full access to the server',
                },
                
            )
        message.channel.send(vfembed)
    } else if(command == 'verify'){
        message.delete();
        let memberRole = message.guild.roles.cache.get('748637716962476133')
        message.member.roles.add(memberRole)
         message.channel.send(`✅ You are verified now <@${message.member.id}>!`)
    } else if(command == 'mute'){
        const reason = args.slice(1).join(" ");
        const userMute = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
        if(userMute){
            let mainRole = message.guild.roles.cache.get('748637716962476133')
            let mutedRole = message.guild.roles.cache.get('750762225773576274')
            let muteTarget = message.guild.members.cache.get(userMute.id);

            muteTarget.roles.remove(mainRole);
            muteTarget.roles.add(mutedRole);
            const MuteEmbed = new Discord.MessageEmbed()
            .setTitle(`${muteTarget.user.tag} was Muted`)
            .setColor('#FF0000')
            .setDescription(`**${muteTarget.user.tag} muted by **${message.author.tag}.\n**reason:** ${reason}`)
            message.channel.send(MuteEmbed)

            const pmmuteembed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('**You were muted**')
            .setDescription(`**reason: ${reason}** at **${message.guild}**`)
            .setFooter(`Muted by ${message.author.tag}`)
            userMute.send(pmmuteembed)
            
        } 
    } else if(command == 'unmute'){
        const reason = args.slice(1).join(" ");
        const userMute = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
        if(userMute){
            let mainRole = message.guild.roles.cache.get('748637716962476133')
            let mutedRole = message.guild.roles.cache.get('750762225773576274')
            let muteTarget = message.guild.members.cache.get(userMute.id);

            muteTarget.roles.add(mainRole);
            muteTarget.roles.remove(mutedRole);
            const MuteEmbed = new Discord.MessageEmbed()
            .setTitle(`${muteTarget.user.tag} was Unmuted`)
            .setColor('#FF0000')
            .setDescription(`**${muteTarget.user.tag} unmuted by **${message.author.tag}.\n**reason:** ${reason}`)
            message.channel.send(MuteEmbed)
        } 
    }else if(command == 'Code'){
      message.author.send('Dayln#1506')
    }

});



keepAlive();
client.login('TOKEN');
