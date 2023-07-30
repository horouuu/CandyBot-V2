import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get a list of all available commands.'),

    examples: [
        'help'
    ],

    async execute(medium) {
        
    }
}