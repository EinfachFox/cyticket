const { Client, Collection } = require("discord.js");
const Util = require('./structures/Util');
const config = require('./config.json');
const token  = config.main_token

module.exports = class botClient extends Client {
	constructor(options = {}, sentry) {
	  super({
      partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
      cacheGuilds: true,
      cacheChannels: true,
      cacheOverwrites: false,
      cacheRoles: true,
      cacheEmojis: true,
      cachePresences:  true,
      fetchAllMembers: true,
      disableMentions: 'everyone',
      messageCacheMaxSize: 25,
      messageCacheLifetime: 10000, 
      messageSweepInterval: 12000,
      ws: {
        intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_MESSAGES",
        "GUILD_EMOJIS",
        'GUILD_MESSAGE_REACTIONS',
        ],
      },
    });
    
    this.validate(options);
    this.partials = ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
    this.commands = new Collection();
    this.events = new Collection();
    this.aliases = new Collection();
    this.utils = new Util(this);
    this.config = require('./config.json');
  }
  
  validate(options) {
    if (typeof options !== 'object') throw new TypeError('Optionen sollten ein Objekttyp sein.');

    if (!token) throw new Error('Sie müssen das Token für den Client übergeben.');
    this.token = token;

    if(!options.prefix) throw new Error('Sie müssen ein Präfix für den Client übergeben.');
    if(typeof options.prefix !== 'string') throw new TypeError('Prefix sollte eine Art String sein.');
    this.prefix = options.prefix;

  }

  async start(token = this.token) {
    this.utils.loadCommands()
    this.utils.loadEvents()


    
    this.login(config.token);

    console.log('CYTICKET ist nun Online!!');
  }

};
