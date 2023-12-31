import { google } from 'googleapis';

export default {
    async getClient() {
        const auth = new google.auth.GoogleAuth({
            keyFile: './sheets/credentials.json',
            scopes: 'https://www.googleapis.com/auth/spreadsheets'
        });
    
        const client = await auth.getClient();
        
        return {
            auth: auth,
            sheets: google.sheets({
                version: 'v4',
                auth: client
            })
        }
    },
    
    async getRange(cache, range, cacheLabel='skills') {
        const google = cache.google;
        const auth = google.auth;
        const spreadsheetId = process.env.SPREADSHEET;
        var out;
    
        const cacheKey = range.split('!')[0];
        if (!cache[cacheKey] || !cache[cacheKey][cacheLabel] || cache[cacheKey].stale) {
            try {
                const newData = await google.sheets.spreadsheets.values.get({
                    auth,
                    spreadsheetId,
                    range: range
                })
                cache[cacheKey][cacheLabel] = newData;
                cache[cacheKey]['stale'] = false;
                out = newData;
            } catch (err) {
                console.error(err);
                return;
            }
        } else {
            out = cache[cacheKey][cacheLabel];
        }
        
        return out;
    },
    
    async rowWrite(cache, range, content) {
        const google = cache.google;
        const auth = google.auth;
        const msg = content.message;
        const opts = content.options;
    
        await google.sheets.spreadsheets.values.update({
            auth,
            spreadsheetId,
            range: range,
            valueInputOption: opts,
            resource: {
                values: msg
            }
        });
    
        const cacheKey = range.split('!')[0];
        cache[cacheKey]['stale'] = true;
    },

    async getStudentCacheKey(cache, char) {
        const labels = ['red', 'yellow', 'blue'];
        for (const label of labels) {
            const range = cache.keys[label].charRange;
            const rawCharData = await this.getRange(cache, range, 'chars');
            const charData = rawCharData.data.values[0].map((row) => row.toLowerCase());

            if (charData.includes(char.toLowerCase())) {
                return {
                    found: true,
                    key: label,
                    searchIndex: charData.indexOf(char) + 1,
                    name: rawCharData.data.values[0][charData.indexOf(char.toLowerCase())]
                };
            }
        }
            
        return { found: false };
    }
}