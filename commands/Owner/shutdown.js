module.exports = {
    name: "shutdown",
    aliases: ["turnoff"],
    description: "Shuts down the bot !!",
    category: "owner",

    run: async(client, message, args) => {
        
        if (message.author.id !== "743954649790415009") {
            return;
        }
        
        await message.channel.send(`✅ Thank You For Letting Me Rest!`)
        console.log('Client was turned off using the shutdown command.')
        process.exit();
    }
}