import * as events from '../events/event-bundler.js';
import InteractionAdapter from '../commands/interactionAdapter.js';

function bindEvents(client, settings) {

    for (const e in events) {
        const event = events[e];
        const cache = settings.cache;

        if (event.legacy) {  
            client.on(event.name, (msg) => {
                const legacyArgs = {
                    ...settings,
                    message: msg,
                    legacy: true
                }

                const interactionAdapter = new InteractionAdapter(legacyArgs);
                event.execute(interactionAdapter);
            });
            continue;
        }

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, cache));
        } else {
            client.on(event.name, (...args) => event.execute(...args, cache));
        }
        
    }
}

export default bindEvents;