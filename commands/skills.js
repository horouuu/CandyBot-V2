import sheets from '../sheets/sheets.js';
import helper from './command-helpers.js';
import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('skills')
        .setDescription(`Shows the weapon status of a member's student`)
        .addStringOption(option => 
            option.setName('user')
                .setDescription('Username of the player whose student you want to check')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('student')
                .setDescription('Name of the student')
                .setRequired(true)),

    examples: [
        'skills [username] [student name]',
        'skills R Azusa'
    ],

    legacyDescription: 'Enclose the status with quotation marks (").',

    async execute(interactionAdapter) {
        const cache = interactionAdapter.cache;
        const responseMedium = interactionAdapter.responseMedium;

        // params
        const paramKeys = [
            'user', 
            'student'
        ];
        var user; var student;
        const args = interactionAdapter.getArgs(paramKeys);

        if (args.length < 2) {
            await responseMedium.reply(
                "Error: Not enough parameters.\n" +
                "Please use the command as follows:\n" +
                `\`${process.env.PREFIX + this.examples[0]}\``
            )
            return;
        } else {
            // paramKeys order is preserved
            user = args[0]; student = args[1];
        }

        // check if given user is a discord mention
        const userInfo = await helper.isRegistered(user);
        if (userInfo.found) {
            user = userInfo.user;
        } else if (!userInfo.notMention) {
            await responseMedium.reply('User <@' + user + '> is not registered to any username on the sheets.');
            return;
        }

        // find student sheet & user
        const res = await sheets.getStudentCacheKey(cache, student);
        if (!res.found) {
            await responseMedium.reply(`Student ${student} not found.`);
            return
        }

        const cacheKey = res.key;
        const range = cache.keys[cacheKey].range;
        var sheetData = await sheets.getRange(cache, range);
        sheetData = sheetData.data.values;

        for (const row of sheetData) {
            if (row[0] && row[0].toLowerCase() === user.toLowerCase()) {
                await responseMedium.reply(
                    `Weapon status of student \`${res.name}\` belonging to player \`${row[0]}\`:\n` +
                    '> ' + row[res.searchIndex]
                    );
                return;
            }
        }

        await responseMedium.reply(`Student \`${student}\` not found.`);
    }
}