const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'eval',
        aliases: [ 'boteval' ],
        description: `Eval`,
        category: 'Owner',
        ownerOnly: true
      });
    }

    async run(message, args) {

        const input = args.join(' ');
        if (!input) return message.channel.send(`Was bewerte ich?`)
   
    
        let embed =  ``;
    
          try {
            let output = eval(input);
            if (typeof output !== 'string') output = require('util').inspect(output, { depth: 0 });
            
             embed = `\`\`\`js\n${output.length > 1024 ? 'Zu groß zum Anzeigen.' : output}\`\`\``
    
            
              
          } catch(err) {
            embed = `\`\`\`js\n${err.length > 1024 ? 'Zu groß zum Anzeigen.' : err}\`\`\``
          }
          
   
          if(!input.toLowerCase().includes('token')) {
            message.channel.send(embed);
          } else {
              //Block token
              message.channel.send(`noob.`)
          }
       
    
      }
};
