import sheets from '../sheets/sheets.js';

export default {
    async isDiscordMention(str, cache) {
        const idFormatRegex = (/^(<@)[0-9]{18}>$/g);
        const idRegex = (/[<>@]/g);
        const idStatus = idFormatRegex.test(string);

        if (idStatus) {
            const userId = str.replace(idRegex, "");
        } else {
            return;
        }
        const memberSheet = await sheets.getRange(cache, process.env.MEMBERRANGE).data.values;
        for (const row in memberSheet) {
            if (userId === row[4]) {
                return {
                    user: row[4],
                    found: true
                };
            }
        }

        return;
    }
}