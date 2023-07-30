import * as events from '../events/event-bundler.js';

function bindEvents(client, settings) {
    for (const e in events) {
        const event = events[e];
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args))
        } else if (event.legacy) {  
            client.on(event.name, (msg) => event.execute(msg, settings))
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
        
    }
}

export default bindEvents;