import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with "Pong!"'),
    
    examples: [
        'ping'
    ],
    
    async execute(interactionAdapter) {
        const responseMedium = interactionAdapter.responseMedium;
        await responseMedium.reply('Pong!');
    }
};