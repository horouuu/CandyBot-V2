import { Events } from 'discord.js';

export default {
    name: Events.InteractionCreate,
    async execute(interaction, cache) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`Command ${interaction.commandName} not found.`);
            return;
        }

        try {
            const args = {
                interaction: interaction,
                cache: cache
            }
            await command.execute(args);
        } catch (error) {
            console.error(`Error encountered while trying to execute ${interaction.commandName}`);
            console.error(error);
        }
    }
};