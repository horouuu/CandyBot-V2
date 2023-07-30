import { google } from 'googleapis';

export default {
    async getClient() {
        const auth = new google.auth.GoogleAuth({
            keyFile: 'credentials.json',
            scopes: 'https://www.googleapis.com/auth/spreadsheets'
        });
    
        const client = await auth.getClient(),
    
        return {
            auth: auth,
            sheets: google.sheets({
                version: 'v4',
                auth: client
            })
        }
    },
    
    async getRange(cache, range) {
        const google = cache.google;
        const auth = google.auth;
        const spreadsheetId = process.env.SPREADSHEET;
        var out;
    
        const cacheKey = range.split('!')[0];
        if (!cache[cacheKey] || cache[cacheKey].stale) {
            const newData = await google.sheets.spreadsheets.values.get({
                auth,
                spreadsheetId,
                range: range
            })
    
            cache[range] = newData;
            cache[range]['stale'] = false;
            out = newData;
        } else {
            out = cache[range];
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
    }
}