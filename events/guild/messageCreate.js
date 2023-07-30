import { Events } from 'discord.js';
import InteractionAdapter from '../../commands/InteractionAdapter.js';

export default {
    name: Events.MessageCreate,
    legacy: true,
    execute(interactionAdapter) {
        const message = interactionAdapter.responseMedium;
        const prefix = interactionAdapter.prefix;
        const client = interactionAdapter.client;

        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const params = message.content.slice(prefix.length).split(' ');
        const cmd = params.shift().toLowerCase();
        const command = client.commands.get(cmd);

        if (command) command.execute(interactionAdapter);
    }
};