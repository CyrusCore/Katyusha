const { MessageEmbed, Client, Message } = require('discord.js');
const day = require('dayjs')
const schema = require('../../mongodels/premium-guild');
const sendError = require('../../mores/error');
const sendDone = require('../../mores/success');

module.exports = {
  name: 'del-premium-guild',
  description: 'deletes a current premium guild!',
  aliases: ['delpremiguild'],

  run: async(client, message, args) => {
    if(!message.author.id === "743954649790415009"){
      return sendError('This command is only for <@743954649790415009>', message.channel)
    }

    if(!args[0]){
      return sendError('Please specify a guild id!', message.channel)
    }

    schema.findOne({
      Guild: args[0]
    }, async(err, data) => {
      if(!data){
        return sendError('This guild already cant access premium guild because the guild even dont have premium! still getting this error? please contact <@743954649790415009>', message.channel)
      }
      data.delete();
      return sendDone('Deleted Premium Access From The Guild!', message.channel)
    })
  }
}