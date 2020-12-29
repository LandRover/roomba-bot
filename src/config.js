require('dotenv').config({path: '../.env'});

module.exports = {
    delay: 1000,

    google: {
        CSE: process.env.CSE || null,
        apiKey: process.env.API_KEY || null
    },

    tmp: {
        dir: __dirname + '/../_TMP'
    },
    
    coc: {
        api: process.env.COCVM
    }
};