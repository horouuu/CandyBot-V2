import { Events } from 'discord.js';
import InteractionAdapter from '../../commands/InteractionAdapter.js';

export default {
    name: Events.MessageCreate,
    legacy: true,
    execute(message, settings) {
        const args = {
            ...settings,
            message: message,
            legacy: true
        }

        const prefix = settings.prefix;
        const client = settings.client;

        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const params = message.content.slice(prefix.length).split(' ');
        const cmd = params.shift().toLowerCase();
        const command = client.commands.get(cmd);

        const interactionAdapter = new InteractionAdapter(args);
        if (command) command.execute(interactionAdapter);
    }
};