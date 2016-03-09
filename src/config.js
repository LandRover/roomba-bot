require('dotenv').config({path: '../.env'});

module.exports = {
    delay: 1000,
    yowsup: {
        imei: 353271072005549,
        countryCode: process.env.COUNTRY || null,
        phoneNumber: process.env.PHONE || null,
        password: process.env.PASS || null
    },
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