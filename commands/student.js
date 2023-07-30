import sheets from '../sheets/sheets.js';
import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('student')
        .setDescription('Shows all members with the designated student invested and their investment.')
        .addStringOption(option => 
            option.setName('student')
                .setDescription('Name of the student to query.')
                .setRequired(true)),

    examples: [
        'student [student name]',
        'student Maki'
    ],

    async execute(interactionAdapter) {
        const cache = interactionAdapter.cache;
        const paramKeys = [
            'student'
        ];
        const args = interactionAdapter.getArgs(paramKeys);
        const charData = sheets.getStudentCacheKey();

        if (args)

        if (!charData.found) {

        }
    }
}