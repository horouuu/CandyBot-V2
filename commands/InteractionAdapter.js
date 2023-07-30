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

    getArgs(params) {
        const medium = this.responseMedium;
        const opts = params.paramKeys;
        const paramsErr = {
            name: "notEnoughParamsError", 
            message: "Error: Not enough parameters.\n" +
            "Please use the command as follows:\n" +
            `\`${params.example}\``
        }
        var out = {};
        if (this.legacy) {
            const splitMessage = medium.content.split(' ');
            const args = splitMessage.slice(1, splitMessage.length);
            if (args.length < opts.length) {
                throw paramsErr;
            }

            for (var i = 0; i < opts.length; i++) {
                out[opts[i]] = args[i];
            }
        } else {
            for (const opt of opts) {
                out[opt] = medium.options.getString(opt);
            }
        }

        if (out.length < params.minParams) {
            throw paramsErr;
        }

        return out;
    }
}

export default InteractionAdapter;