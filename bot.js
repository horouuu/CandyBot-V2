import { Client, GatewayIntentBits } from 'discord.js';
import { Collection as DiscordCollection } from 'discord.js';
import Discord from 'discord.js';
import setCommands from './handlers/command-handler.js';
import bindEvents from './handlers/event-handler.js';
import dotenv from 'dotenv';

dotenv.config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

client.events = new DiscordCollection();
client.commands = new DiscordCollection();

const settings = {
    client: client,
    discord: Discord,
    prefix: process.env.PREFIX,
    cache: {
        keys: {
            red: {
                key: process.env.REDRANGE.split('!')[0],
                range: process.env.REDRANGE,
                charRange: process.env.REDRANGECHAR
            },
            yellow: {
                key: process.env.YELLOWRANGE.split('!')[0],
                range: process.env.YELLOWRANGE,
                charRange: process.env.YELLOWRANGECHAR
            },
            blue: {
                key: process.env.BLUERANGE.split('!')[0],
                range: process.env.BLUERANGE,
                charRange: process.env.BLUERANGECHAR
            },
            member: {
                key: process.env.MEMBERRANGE.split('!')[0],
                range: process.env.MEMBERRANGE
            }
        }
    }
}

bindEvents(client, settings);
setCommands(client, settings);

client.login(process.env.TOKEN_TEST);