import { Events } from 'discord.js';
import sheets from '../../sheets/sheets.js';

export default {
    name: Events.ClientReady,
    once: true,
    async execute(client, cache) {
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
            "***********************************************************\n\n"
        );

        
        try {
            console.log('Logging in to GoogleAPI...\n');
            cache['google'] = await sheets.getClient();
            console.log('Login success!');
        } catch (err) {
            console.error(err);
        }

        console.log('Loading caches...\n');

        const allRanges = [
            process.env.REDRANGE, 
            process.env.YELLOWRANGE, 
            process.env.BLUERANGE,
            process.env.MEMBERRANGE
        ];

        for (const range of allRanges) {
            const cacheKey = range.split('!')[0];
            cache[cacheKey] = {};
            await sheets.getRange(cache, range);
        }

        const allCharRanges = [
            process.env.REDRANGECHAR,
            process.env.BLUERANGECHAR,
            process.env.YELLOWRANGECHAR
        ]

        for (const charRange of allCharRanges) {
            const cacheKey = charRange.split('!')[0];
            cache[cacheKey].stale = true; // force staleness
            await sheets.getRange(cache, charRange, 'chars');
        }

        console.log("Successfully loaded caches.")
    }
};