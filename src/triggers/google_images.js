'use strict';

// RAW API: https://www.googleapis.com/customsearch/v1?searchType=image&key={API_KEY}&cx={CSE}&q={keyword_here}
// DOCS: https://developers.google.com/custom-search/docs/xml_results#chineseSearch

const config = require('../config');
const GoogleImages = require('image-search-google');

const fs = require('fs'),
      crypto = require('crypto'),
      wget = require('wget-improved'),
      cache = require('../utils/cache');

class GoogleImagesAPI {
    constructor(message) {
        this.cachePrefix = 'IMAGES_';
        this.action = 'IMAGE';
        this.type = 'all';
        this.keyword = message[1];

        this.google = new GoogleImages(config.google.CSE, config.google.apiKey);
    }


    getFirstShuffle(list) {
        let shuffledList = this.shuffle(list.splice(0, 10));

        return shuffledList[0];
    }


    getKey() {
        return this.cachePrefix + this.keyword;
    }


    async handleImages(images) {
        if (0 >= images.length) {
            
            throw('nothing found');

            return;
        }

        let url = this.getFirstShuffle(images).url,
            imgBuffer = null;
        
        if (url) {
            let imgPath = await this.getImage(url);
            imgBuffer = fs.readFileSync(imgPath);
        }
        
        return imgBuffer;
    }


    async search() {
        let getCachedQuery = cache.get(this.getKey());

        if (undefined !== getCachedQuery) {
            return await this.handleImages(getCachedQuery);
        }

        return this.google
            .search(this.keyword)
            .then(async images => {
                cache.set(this.getKey(), images);
                return await this.handleImages(images);
            });
    }


    async getImage(url) {
        console.log(['INPUT URL', url]);
        let tmp = config.tmp.dir,
            fileMD5 = crypto.createHash('md5').update(url).digest('hex'),
            fileName = fileMD5;

        console.log('Downloading image... ' + url + 'to: '+ fileName);

        return new Promise(async (resolve, reject) => {
            let tempImgPath = await this.download(url, tmp + '/' + fileName)
                .then(() => {
                    console.log('Downloaded image... ' + url + ' Sending back ' + fileName);

                    return tmp + '/' + fileName;
                })
                .catch((err) => reject(err));

        
            setTimeout(() => {
                resolve(tempImgPath);
            }, 500);
        });
    }


    async execute() {
        return await this.search();
    }


    async download(uri, filename) {
        console.log([uri, filename]);

        return new Promise((resolve, reject) => {
            let dl = wget.download(uri, filename, {});

            dl.on('end', output => {
                resolve(output);
            });

            dl.on('error', err => {
                reject(err);
            });

            dl.on('progress', (progress) => {
            });
        });
    }


    shuffle(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);

        return o;
    }
}

module.exports = GoogleImagesAPI;