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

    async execute(responseMedium) {
        const cache = responseMedium.cache;
        var adapter = responseMedium.interaction;
        var user;
        var student;
        if (responseMedium.legacy) {
            adapter = responseMedium.message;
            const args = adapter.content.split(" ");
            if (args.length < 3) {
                await adapter.reply(
                    "Error: Not enough parameters.\n" +
                    "Please use the command as follows:\n" +
                    `\`${process.env.PREFIX + this.examples[0]}\``
                )
                return;
            }
            user = args[1]; student = args[2];

        } else {
            user = adapter.options.getString('user');
            student = adapter.options.getString('student');
        }


        // check if given user is a discord mention
        const userInfo = await helper.isRegistered(user);
        if (userInfo.found) {
            user = userInfo.user;
        } else if (!userInfo.notMention) {
            await adapter.reply('User <@' + user + '> is not registered to any username on the sheets.');
            return;
        }

        // find student sheet & user
        console.log(cache)
        const res = await sheets.getStudentCacheKey(cache, student);
        if (!res.found) {
            await adapter.reply(`Student ${student} not found.`);
            return
        }

        const cacheKey = res.key;
        const range = cache.keys[cacheKey].range;
        
        const sheetData = await sheets.getRange(cache, range).data.values;

        for (const row of sheetData) {
            if (row.includes(user)) {
                await adapter.reply(row[res.searchIndex])
                return;
            }
        }

        await adapter.reply("not found");
    }
}