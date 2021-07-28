const premiumSchema = require("../../mongodels/premium");
const { Client, Message, MessageEmbed } = require('discord.js');
const { dev } = require('../../config.json');
const sendError = require('../../mores/error');
const sendDone = require('../../mores/success');

module.exports = {
  name: 'del-premium',
  aliases: ['delpremi'],
  usage: 'del-premium [USER]',
  description: 'delete premium to a user (OWNER ONLY)',

  run: async(client, message, args) => {
    if(!message.author.id === "743954649790415009"){
      return sendError('This command is only for <@743954649790415009>', message.channel)
    }

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!member){
      return sendError('Please specify a valid member!', message.channel)
    }

    premiumSchema.findOne({
      User: member.id
    }, async (err, data) => {
      if(!data) return sendError('This user even don\'t have a premium features access!', message.channel);

      data.delete();
      return sendDone('User Has Been Removed From My Premium Access!', message.channel)
    })
  }
}