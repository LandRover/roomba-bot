require('dotenv').config();

module.exports = {
    delay: 1000,

    google: {
        CSE: process.env.CSE || null,
        apiKey: process.env.API_KEY || null,
    },

    triggers: {
        urlToImage: {
            pageres: {
                delay: 2,
                launchOptions: {
                    args: ['--no-sandbox', '--disable-setuid-sandbox']
                },
                userAgent: 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
                scale: 0.1,
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