const Discord = require('discord.js')

module.exports = async (text, channel, message) => {
    let embed = new Discord.MessageEmbed()
    .setDescription("<:atlanta_success:736144092123234354> - " + text)
    .setFooter('Success')
    .setTimestamp()
    .setColor("RANDOM")
    await channel.send(embed)
}