import { Events } from 'discord.js';

export default {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        client.user.setPresence({
            status: "online",
            activities: [{
                name: "$help | CandyHouse",
            }],
            type: "PLAYING"
        })
    
        console.log(
            "***********************************************************\n\n" +
            "CandyBot logged in with user:\n" + client.user.tag + " | " + client.user + "\n\n" +
            "***********************************************************"
        );
    }
};