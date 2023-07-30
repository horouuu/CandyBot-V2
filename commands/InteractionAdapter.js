class InteractionAdapter {
    constructor(responseMedium) {
        this.responseMedium = responseMedium;
        this.legacy = responseMedium.legacy || false;
    }

    get client() {
        return this.responseMedium.client;
    }

    get user() {
        if (this.legacy) {
            return this.responseMedium.message.author.user;
        }
    }

    get prefix() {
        if (this.legacy) {
            return this.responseMedium.prefix;
        } else {
            return '/';
        }
    }

    get responseMedium() {
        if (this.legacy) {
            return this.responseMedium.message;
        } else {
            return this.responseMedium.interaction;
        }
    }

    get cache() {
        return this.responseMedium.cache;
    }

    get discordInstance() {
        return this.responseMedium.discord;
    }
}

export default InteractionAdapter;