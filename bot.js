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
    prefix: "%",
    cache: {}
}

bindEvents(client, settings);
setCommands(client, settings);

client.login(process.env.TOKEN_TEST);