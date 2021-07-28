const Discord = require("discord.js")
const db = require("quick.db")
const { truncate } = require("fs");
//ProjectRed
module.exports = {
    name: "config",
    aliases: "conf",
    description: "set guild anti raid config, use ka!config help for list",
    run: async (client, message, args) => {
    let cmd = args[0];
    const guildicon = message.guild.iconURL();
    if(!cmd) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag,message.author.displayAvatarURL())
        .setDescription(`
        ** Available Keys**
   > **ka!config setrolecreatelimit
   > ka!config setactionlogs
   > ka!config setroledeletelimit
   > ka!config setchannelcreatelimit
   > ka!config setchanneldeletelimit
   > ka!config setbanlimits
   > ka!config setkicklimits
   > ka!config clearuser
   > ka!config show**     
   `)
 .setFooter(message.guild.name, guildicon)
  return message.channel.send(embed);
}

 if(cmd.toLowerCase() === 'help') {
  const embed = new Discord.MessageEmbed()
  .setAuthor(message.author.tag,message.author.displayAvatarURL())
  .setDescription(`
  ** Available Keys**
> **ka!config setrolecreatelimit
> ka!config setactionlogs
> ka!config setroledeletelimit
> ka!config setchannelcreatelimit
> ka!config setchanneldeletelimit
> ka!config setbanlimits
> ka!config setkicklimits
> ka!config clearuser
> ka!config show
> ka!config help**     
`)
.setFooter(message.guild.name, guildicon)
return message.channel.send(embed);
 }
 if(cmd.toLowerCase() === 'show') {
   let rolelimit = db.get(`rolecreatelimit_${message.guild.id}`) 
   if(rolelimit === null) rolelimit = "Disabled <:atlanta_error:736144198318686278>"
   let roledelete = db.get(`roledeletelimits_${message.guild.id}`) 
   if(roledelete === null) roledelete = "Disabled <:atlanta_error:736144198318686278>"
   let logschannel = db.get(`actionslogs_${message.guild.id}`)
   let logschannel2 = db.get(`actionslogs_${message.guild.id}`)
   if(logschannel === null) logschannel = "Disabled <:atlanta_error:736144198318686278>"
   else logschannel = `<#${logschannel2}>`
   let channelcreatelimits = db.get(`channelcreatelimits_${message.guild.id}`)
   if(channelcreatelimits === null) channelcreatelimits = "Disabled <:atlanta_error:736144198318686278>"
   let channeldeletelimits = db.get(`channeldeletelimits_${message.guild.id}`)
   if(channeldeletelimits === null) channeldeletelimits = "Disabled <:atlanta_error:736144198318686278>"
   let banlimits = db.get(`banlimits_${message.guild.id}`)
  if(banlimits === null) banlimits = "Disabled <:atlanta_error:736144198318686278>"
  let kicklimits = db.get(`kicklimits_${message.guild.id}`)
  if(kicklimits === null) kicklimits = "Disabled <:atlanta_error:736144198318686278>"

   let showembed = new Discord.MessageEmbed()

   .setAuthor(message.author.username, message.author.displayAvatarURL())
   .addField('Role Create limits', rolelimit, true)
   .addField('Role Delete limits', roledelete, true)
   .addField(`Action Logs Channel`, logschannel, true)
   .addField(`Channel Create limits`, channelcreatelimits, true)
   .addField(`Channel Delete limits`, channeldeletelimits, true)
   .addField(`Ban limits`, banlimits, true)
   .addField(`Kick limits`, kicklimits, true)
    .setFooter(message.guild.name, guildicon)
    return message.channel.send(showembed);
 }
 if(cmd.toLowerCase() === 'setrolecreatelimit') {
let rolecreate = args.slice(1).join(" ");
if(!rolecreate) {
 let missing = new Discord.MessageEmbed()
 .setAuthor(message.author.username, message.author.displayAvatarURL())
 .setDescription(`** an invaild usage**\nconfig setrolecreatelimit (number)`)
 .setFooter(message.guild.name, guildicon)

  return message.channel.send(missing);
}
if(isNaN(rolecreate)) {
  let missing = new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`** an invaild usage (Cannot be words only numbers)**\nconfig setrolecreatelimit (number)`)
  .setFooter(message.guild.name, guildicon)
return message.channel.send(missing);
}
db.set(`rolecreatelimit_${message.guild.id}`, rolecreate)
let done = new Discord.MessageEmbed() 
.setAuthor(message.author.username, message.author.displayAvatarURL())
.setDescription(`Done SetRoleCreation limits Has Been Set To ${rolecreate} ✅`)
.setFooter(message.guild.name, guildicon)
return message.channel.send(done);
}
if(cmd.toLowerCase() === 'setroledeletelimit') {
  let roledelete = args.slice(1).join(" ");
  if(!roledelete) {
   let missing = new Discord.MessageEmbed()
   .setAuthor(message.author.username, message.author.displayAvatarURL())
   .setDescription(`** an invaild usage**\nconfig setroledeletelimit (number)`)
   .setFooter(message.guild.name, guildicon)
  
    return message.channel.send(missing);
  }
  if(isNaN(rolecreate)) {
    let missing = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`** an invaild usage (Cannot be words only numbers)**\nconfig setroledeletelimit (number)`)
    .setFooter(message.guild.name, guildicon)
  return message.channel.send(missing);
  }
  db.set(`roledeletelimits_${message.guild.id}`, rolecreate)
  let done = new Discord.MessageEmbed() 
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`Done SetRoleDelete limits Has Been Set To ${rolecreate} ✅`)
  .setFooter(message.guild.name, guildicon)
  return message.channel.send(done);
  
}
if(cmd.toLowerCase() === 'setactionlogs') {
  let logs = message.mentions.channels.first();
  if(!logs) {
  let logsembed = new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`Please Mention an vaild channel`)
  .setFooter(message.guild.name, guildicon)
return message.channel.send(logsembed);
}
logs.send(`** Anit-Raid Logs Room **`)
db.set(`actionslogs_${message.guild.id}`, logs.id)
let done = new Discord.MessageEmbed()
.setAuthor(message.author.username, message.author.displayAvatarURL())
.setDescription(`well done action-logs channel has been set to ${logs}`)
.setFooter(message.guild.name, guildicon)
return message.channel.send(done)
}
if(cmd.toLowerCase() === 'setchannelcreatelimit') {
  let rolecreate = args.slice(1).join(" ");
  if(!rolecreate) {
   let missing = new Discord.MessageEmbed()
   .setAuthor(message.author.username, message.author.displayAvatarURL())
   .setDescription(`** an invaild usage**\nconfig setchannelcreatelimit (number)`)
   .setFooter(message.guild.name, guildicon)
  
    return message.channel.send(missing);
  }
  if(isNaN(rolecreate)) {
    let missing = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`** an invaild usage (Cannot be words only numbers)**\nconfig setchannelcreatelimit (number)`)
    .setFooter(message.guild.name, guildicon)
  return message.channel.send(missing);
  }
  db.set(`channelcreatelimits_${message.guild.id}`, rolecreate)
  let done = new Discord.MessageEmbed() 
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`Done Channel Create limits Has Been Set To ${rolecreate} ✅`)
  .setFooter(message.guild.name, guildicon)
  return message.channel.send(done);
}
if(cmd.toLowerCase() === 'setchanneldeletelimit') {
  let rolecreate = args.slice(1).join(" ");
  if(!rolecreate) {
   let missing = new Discord.MessageEmbed()
   .setAuthor(message.author.username, message.author.displayAvatarURL())
   .setDescription(`** an invaild usage**\nconfig setchanneldeletelimit (number)`)
   .setFooter(message.guild.name, guildicon)
  
    return message.channel.send(missing);
  }
  if(isNaN(rolecreate)) {
    let missing = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`** an invaild usage (Cannot be words only numbers)**\nconfig setchanneldeletelimit (number)`)
    .setFooter(message.guild.name, guildicon)
  return message.channel.send(missing);
  }
  db.set(`channeldeletelimits_${message.guild.id}`, rolecreate)
  let done = new Discord.MessageEmbed() 
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`Done Channel Delete limits Has Been Set To ${rolecreate} ✅`)
  .setFooter(message.guild.name, guildicon)
  return message.channel.send(done);
}
if(cmd.toLowerCase() === 'setbanlimits') {
  let rolecreate = args.slice(1).join(" ");
  if(!rolecreate) {
   let missing = new Discord.MessageEmbed()
   .setAuthor(message.author.username, message.author.displayAvatarURL())
   .setDescription(`** an invaild usage**\nconfig setbanlimit (number)`)
   .setFooter(message.guild.name, guildicon)
  
    return message.channel.send(missing);
  }
  if(isNaN(rolecreate)) {
    let missing = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`** an invaild usage (Cannot be words only numbers)**\nconfig setbanlimit (number)`)
    .setFooter(message.guild.name, guildicon)
  return message.channel.send(missing);
  }
  db.set(`banlimits_${message.guild.id}`, rolecreate)
  let done = new Discord.MessageEmbed() 
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`Done Channel Ban limits Has Been Set To ${rolecreate} ✅`)
  .setFooter(message.guild.name, guildicon)
  return message.channel.send(done);
}
if(cmd.toLowerCase() === 'setkicklimits') {
  let rolecreate = args.slice(1).join(" ");
  if(!rolecreate) {
   let missing = new Discord.MessageEmbed()
   .setAuthor(message.author.username, message.author.displayAvatarURL())
   .setDescription(`** an invaild usage**\nconfig setbanlimit (number)`)
   .setFooter(message.guild.name, guildicon)
  
    return message.channel.send(missing);
  }
  if(isNaN(rolecreate)) {
    let missing = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`** an invaild usage (Cannot be words only numbers)**\nconfig setkicklimits (number)`)
    .setFooter(message.guild.name, guildicon)
  return message.channel.send(missing);
  }
  db.set(`kicklimits_${message.guild.id}`, rolecreate)
  let done = new Discord.MessageEmbed() 
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`Done Channel Kick limits Has Been Set To ${rolecreate} ✅`)
  .setFooter(message.guild.name, guildicon)
  return message.channel.send(done);
}
if(cmd.toLowerCase() === 'clearuser') {
  let user = message.mentions.users.first()
if(!user) {
  return message.channel.send(`** Mention User **`);
}
db.delete(`executer_${message.guild.id}_${user.id}_kicklimits`) 
db.delete(`executer_${message.guild.id}_${user.id}_banlimits`)
db.delete(`executer_${message.guild.id}_${user.id}_rolecreate`)
db.delete(`executer_${message.guild.id}_${user.id}_roledelete`)
db.delete(`executer_${message.guild.id}_${user.id}_channelcreate`)
db.delete(`executer_${message.guild.id}_${user.id}_channeldelete`)
return message.channel.send(`Reseted User limits`);
}
}}
 
