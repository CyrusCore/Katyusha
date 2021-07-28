const { MessageEmbed } = require('discord.js')
const discord = require('discord.js')
const { version } = require('../../package.json');
const clientID = '863658874963623956';

module.exports = {
  name: 'invite',
  description: 'Invite Me To Your Server And Shine Your Server!',

  run: async (client, message, args) => {
    const embed = new MessageEmbed()
    .setTitle('Hello!')
    .setDescription(`Thank you for trying to invite me to a server!\n\n**Click One Of The Links Down Below!**\n<:atlanta_add:598176235700355083> Server Moderator: **[\`Click Me\`](https://discord.com/oauth2/authorize?client_id=${clientID}&scope=bot&permissions=2147483647)**
    <:atlanta_add:598176235700355083> Server Helper: **[\`Click Me\`](https://discord.com/oauth2/authorize?client_id=${clientID}&scope=bot&permissions=4294967287)** \n <:atlanta_add:598176235700355083> Recommended: **[\`Click Me\`](https://dsc.lol/katyusha)**`)
    .setFooter(`© Katyusha`)
    .setColor("RANDOM");

    return message.channel.send(
      embed
    )
  }
}