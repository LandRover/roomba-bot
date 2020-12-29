require('dotenv').config();

module.exports = {
    delay: 1000,

    google: {
        CSE: process.env.CSE || null,
        apiKey: process.env.GOOGLE_API_KEY || null,
    },

    triggers: {
        urlToImage: {
            pageres: {
                delay: 2,
                launchOptions: {
                    args: ['--no-sandbox', '--disable-setuid-sandbox']
                },
                userAgent: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/604.1.11 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
                scale: 1,
                format: 'jpg',
            }
        }
    },

    tmp: {
        dir: __dirname + '/../_TMP',
    },
    
    coc: {
        api: process.env.COCVM,
    }
};