import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('sheets')
        .setDescription('Get a link to the guild sheets.'),

    examples: [
        'sheets'
    ],

    async execute(interactionAdapter) {
        const responseMedium = interactionAdapter.responseMedium;
        await responseMedium.reply(process.env.SHEETSLINK);
    }
}