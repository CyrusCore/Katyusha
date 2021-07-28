const {
    MessageEmbed,
    Message,
    Client
} = require("discord.js");
const sendError = require('../../mores/error');
const db = require('quick.db');
const {
    readdirSync
} = require("fs");
let color = "#36393f";

module.exports = {
    name: "help",
    aliases: ['h'],
    description: "Shows all available bot commands.",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String} args 
     * @returns 
     */
    run: async (client, message, args) => {
        if (!args[0]) {
            let categories = [];


            //categories to ignore
            let ignored = [
              'owner'
            ];

            const emo = {
                protector: '🛡️',
                antilink: '🔗',
                fun: "<:atlanta_fun_category:789030226607996958>",
                gway: "🎉",
                info: "📻",
                mod: "<:atlanta_moderation_category:789030389741781033>",
                about: "🤖",
                act: "📞",
                main: "☄",
                image: '<:atlanta_images_category:789030084861362257>',
                animals: '🐈',
                swear: '🚫',
                owner: '<:atlanta_owner_category:789030328261410836>',
                ticket: '🎫',
                purge: '💣',
                sim: '📦',
                premium: '⭐',
                antialt: '👤',
                config: '⚙',
                games: '🎮',
                backup: '💾',
                ranking: '⬆',
                music: "<:atlanta_music_category:789030283637948417>",
                economy: "<:atlanta_economy_category:789030493793288212>",
                nsfw: '🔞'

            }

            readdirSync("./commands/").forEach((dir) => {
                if (ignored.includes(dir.toLowerCase())) return;
                const name = `${emo[dir.toLowerCase()]} ${dir.toUpperCase()}`
                let cats = new Object();

                cats = {
                    name: name,
                    value: `\`${client.prefix}help ${dir.toLowerCase()}\``,
                    inline: true
                }


                categories.push(cats);
                //cots.push(dir.toLowerCase());
            });

            const embed = new MessageEmbed()
                .setTitle("Help Menu")
                .setDescription(
                    `\`\`\`js\nTo get help with each category, you can enter ${client.prefix}help [category]\nParameters: <> = required, [] = optional\`\`\`\n[\`Github\`](https://github.com/CyrusCore) | [\`Support Server\`](https://discord.gg/YWBWKd8reV) | [\`Invite me\`](https://dsc.lol/katyusha)\n\n__**Categories**__`
                )
                .addFields(categories)
                .addField("Donate" , "[Trakteer](https://trakteer.id/projectred) | [Saweria](https://saweria.co/ProjectRed)")
                .setFooter("Katyusha")
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL({
                    dynamic: true
                }))
                .setColor(color);


            return message.channel.send(embed);
        } else {
            let cots = [];
            let catts = [];

            readdirSync("./commands/").forEach((dir) => {
                if (dir.toLowerCase() !== args[0].toLowerCase()) return;
                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );


                const cmds = commands.map((command) => {
                    let file = require(`../../commands/${dir}/${command}`);

                    if (!file.name) return "Unnamed";

                    let name = file.name.replace(".js", "");

                    let des = client.commands.get(name).description;

                    let obj = {
                        cname: `\`${name}\``,
                        des
                    }

                    return obj;
                });

                let dota = new Object();

                cmds.map(co => {
                    dota = {
                        name: `${cmds.length === 0 ? "In progress." : co.cname}`,
                        value: co.des ? co.des : 'No Description',
                        inline: true,
                    }
                    catts.push(dota)
                });

                cots.push(dir.toLowerCase());
            });

            console.log(cots);

            const command =
                client.commands.get(args[0].toLowerCase()) ||
                client.commands.find(
                    (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
                );

            if (cots.includes(args[0].toLowerCase())) {
                const combed = new MessageEmbed()
                    .setTitle(`__${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands!__`)
                    .setDescription(`Use \`${client.prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${client.prefix}help ping\`.\n\n`)
                    .addFields(catts)
                    .setColor(color)

                return message.channel.send(combed)
            }

            if (!command) {
                return sendError(`Invalid Command/Category! To see all of my commands, you can just do \`${client.prefix}help\``, message.channel);
            }

            const embed = new MessageEmbed()
                .setTitle("Command Details:")
                .addField(
                    "Command:",
                    command.name ? `\`${command.name}\`` : "No name for this command."
                )
                .addField(
                    "Aliases:",
                    command.aliases ?
                    `\`${command.aliases.join("` `")}\`` :
                    "No aliases for this command."
                )
                .addField(
                    "Usage:",
                    command.usage ?
                    `\`${client.prefix}${command.name} ${command.usage}\`` :
                    `\`${client.prefix}${command.name}\``
                )
                .addField(
                    "Command Description:",
                    command.description ?
                    command.description :
                    "No description for this command."
                )
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setTimestamp()
                .setColor(color);
            return message.channel.send(embed);
        }
    },
};