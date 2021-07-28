const { MessageEmbed, Client, Message } = require('discord.js');
const day = require('dayjs')
const schema = require('../../mongodels/premium-guild');
const sendError = require('../../mores/error');
const sendDone = require('../../mores/success');

module.exports = {
  name: 'add-premium-guild',
  aliases: ['addpremiguild'],
  description: 'Add a premium guild (OWNER ONLY)',

  run: async(client, message, args) => {
    if(!message.author.id === "743954649790415009"){
      return sendError('This command is only for <@743954649790415009>', message.channel)
    }
    if(!args[0]){
      return sendError('Please specify a guild to add premium!', message.channel)
    }
    if(!client.guilds.cache.has(args[0])){
      return sendErorr('Please enter a valid guild id!', message.channel)
    }

    schema.findOne({ Guild: args[0] }, async(err, data) => {
      if(data) data.delete();

      if(args[1]) {
        const Expire = day(args[1]).valueOf();
        new schema({
          Guild: args[0],
          Expire,
          Permanent: false,
        }).save();
      } else {
        new schema({
          Guild: args[0],
          Expire: 0,
          Permanent: true,
        }).save();
      }
      return sendDone(`Data Saved! Now the guild: \`${args[0]}\` will have access to premium commands`, message.channel)
    })
  }
}