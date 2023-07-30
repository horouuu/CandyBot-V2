import * as commands from '../commands/command-bundler.js';
import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

function setCommands(client) {
    const commandData = [];
    for (const command in commands) {
        const cmd = commands[command];
        if (!cmd.data || !cmd.execute) {
            console.log("Command missing data or execute property.")
            continue;
        } else {
            client.commands.set(cmd.data.name, cmd);
            commandData.push(cmd.data.toJSON());
        }
    }

    const rest = new REST().setToken(process.env.TOKEN_TEST);

    (async () => {
        try {
            console.log(`Loading ${commandData.length} slash commands...`);
            
            const data = await rest.put(
                Routes.applicationCommands(process.env.CLIENTID),
                { body: commandData }
            )

            console.log(`Successfully loaded ${data.length} commands.`)
        } catch (error) {
            console.error(error);
        }
    })();

}

export default setCommands;