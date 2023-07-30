import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with "Pong!"'),

    examples: [
        'ping'
    ],
    
    async execute(responseMedium) {
        var adapter = responseMedium;
        if (responseMedium.legacy) {
            adapter = responseMedium.message;
        }

        await adapter.reply('Pong!');
    }
};