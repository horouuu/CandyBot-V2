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

    async execute(interactionAdapter) {
        var responseMedium = interactionAdapter.responseMedium;
        var prefix = interactionAdapter.prefix;
        var user = interactionAdapter.user;
        var client = interactionAdapter.client;

        var helpEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Commands')
            .setDescription('Contact <@' + process.env.GODSEL + '> for further assistance.')
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp()
            .setFooter({ text: 'Requested by: '+ user.tag, iconURL: user.displayAvatarURL() });
        
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
    
        await responseMedium.reply({
            embeds: [helpEmbed]
        });
    }
}