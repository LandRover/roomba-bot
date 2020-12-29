'use strict';

let config = require('../config'),
    ignoreURLs = [
        'whatsapp'
    ];

const Pageres = require('pageres');

class URLtoImage {
    constructor(message) {
        this.action = 'IMAGE';
        this.type = 'all';
        this.url = message[0];
    }


    async execute() {
        let tmp = config.tmp.dir,
            url = this.url,
            ignorePattern;

        for (let i = 0, len = ignoreURLs.length; i < len; i++) {
            ignorePattern = new RegExp(ignoreURLs[i], 'i');

            if (url.match(ignorePattern)) {
                console.log('Ignore url found ' + url);
                return;
            }
        }

        // TODO, handle diffrently images, .jpg, .png wget them directly instead of using web browser.
        console.log('Downloading url... ' + url);

        return new Pageres({delay: 2})
            .src(url, ['750x1334'])
            .dest(tmp)
            .run()
            .then((stream) => {
                let fileName = stream[0].filename;
                console.log('Downloading complete... ' + url + ' Sending back '+ fileName);

                return tmp +'/'+ fileName;
            });
    }
}

module.exports = URLtoImage;