const Discord = require("discord.js");

module.exports = {
    name: "howgay",
    description: "IDK",

    run: async(bot, message, args) => {
        let member = message.mentions.members.first() || message.author

        let rng = Math.floor(Math.random() * 101);

        const howgayembed = new Discord.MessageEmbed()
        .setTitle("Gay Calculator")
        .setDescription(`${member} is ` + rng + "% Gay ")
        .setColor("RANDOM")

        message.channel.send(howgayembed);
    }
}