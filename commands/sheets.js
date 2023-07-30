import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('sheets')
        .setDescription('Get a link to the guild sheets.'),

    examples: [
        'sheets'
    ],

    async execute(responseMedium) {
        var adapter = responseMedium;
        if (responseMedium.legacy) {
            adapter = responseMedium.message;
        }

        await adapter.reply(process.env.SHEETSLINK);
    }
}