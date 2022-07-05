const Command = require('../../structures/Command');
const config = require('../../config.json');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'ping',
        aliases: ["ping", "latency"],
        description: `Anzeigen ${config.bot_name || 'Bot'}\'s Ping-Latenz.`,
        category: 'Information',
        cooldown: 3,
      });
    }

    async run(message) {


        const msg = await message.channel.send('Pingen...');
        const latency = msg.createdTimestamp - message.createdTimestamp;
  
        msg.edit(` \`\`\`js
Zeit genommen: ${latency}ms
Discord-API: ${Math.round(this.client.ws.ping)}ms\`\`\``);


      }
};