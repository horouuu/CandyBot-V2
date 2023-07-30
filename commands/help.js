import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import * as commands from './command-bundler.js';
import dotenv from 'dotenv';

dotenv.config();

export default {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get a list of all available commands.'),

    examples: [
        'help'
    ],

    async execute(responseMedium) {
        var adapter = responseMedium;
        var prefix = '/'
        var user = responseMedium.user;
        if (responseMedium.legacy) {
            adapter = responseMedium.message;
            prefix = process.env.PREFIX;
            user = responseMedium.message.author.user;
        }

        var helpEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Commands')
            .setDescription('Contact <@' + process.env.GODSEL + '> for further assistance.')
            .setThumbnail(responseMedium.client.user.displayAvatarURL())
            .setTimestamp()
            .setFooter({ text: 'Requested by: '+ user});
        
        for (const command in commands) {
            const cmd = commands[command];
            const name = cmd.data.name;
            const desc = cmd.data.description;
            var exampleText = cmd.examples
                .map(e => '\`' + prefix + e + '\`')
                .join('\n');
            exampleText = desc + '\n' + exampleText;

            helpEmbed.addFields({ name: prefix + name, value: exampleText })
        }

        await adapter.reply({
            embeds: [helpEmbed]
        });
    }
}