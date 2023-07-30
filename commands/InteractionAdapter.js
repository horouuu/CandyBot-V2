class InteractionAdapter {
    constructor(responseMedium) {
        this._responseMedium = responseMedium;
        this.legacy = responseMedium.legacy || false;
    }

    get client() {
        if (this.legacy) {
            return this._responseMedium.client; 
        } else {
            return this._responseMedium.interaction.client;
        }
    }

    get user() {
        if (this.legacy) {
            return this._responseMedium.message.author;
        } else {
            return this._responseMedium.interaction.user;
        }
    }

    get prefix() {
        if (this.legacy) {
            return this._responseMedium.prefix;
        } else {
            return '/';
        }
    }

    get responseMedium() {
        if (this.legacy) {
            return this._responseMedium.message;
        } else {
            return this._responseMedium.interaction;
        }
    }

    set responseMedium(responseMedium) {
        this._responseMedium = responseMedium;
    }

    get cache() {
        return this._responseMedium.cache;
    }

    get discordInstance() {
        return this._responseMedium.discord;
    }

    getArgs(opts) {
        const medium = this.responseMedium;
        if (this.legacy) {
            const splitMessage = medium.content.split(' ');
            const args = splitMessage.slice(1, splitMessage.length);
            return args;
        } else {
            var res = [];
            for (const opt of opts) {
                res.push(medium.options.getString(opt));
            }
            return res;
        }
    }
}

export default InteractionAdapter;