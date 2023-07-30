import { Events } from 'discord.js';

export default {
    name: Events.MessageCreate,
    legacy: true,
    execute(message, settings) {
        const client = settings.client;
        const discord = settings.discord;
        const prefix = settings.prefix;

        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const params = message.content.slice(prefix.length).split(' ');
        const cmd = params.shift().toLowerCase();
        if (cmd) cmd.execute(client, message, params, discord);
    }
};