'use strict';

const { scrape, parse } = require('scrapa');

const config = {
    scraper: {
        type: 'get',
        url: 'aHR0cHM6Ly9nbHp4bWwuYmxvYi5jb3JlLndpbmRvd3MubmV0L2RhbGV0L2dsZ2x6LW9uYWlyL29uYWlyLnhtbA==',
    },

    parser: {
        type: 'xml',

        fields: {
            artist: 'BroadcastMonitor.Current.artistName',
            title: 'BroadcastMonitor.Current.titleName',
            year: 'BroadcastMonitor.Current.Year',
        },
    },
};

class GLZ {

    constructor() {
        this.action = 'SAY';
        this.type = 'all';
    }


    async execute() {
        return await this.getCurrentTrack();
    }


    async getCurrentTrack() {
        let currentlyPlaying = await this._getTicker();

        return [
            `GLZ NOW: ${currentlyPlaying.artist} - ${currentlyPlaying.title} (${currentlyPlaying.year})`,
            '',
            'Full GLZ playlist @ Spotify: https://spoti.fi/34otpMr (Updates Live)'
        ].join("\r\n");
    }


    async _getTicker() {
        let resp = {};

        try {
            let body = await scrape({
                url: Buffer.from(config.scraper.url, 'base64').toString('ascii'),
                type: config.scraper.type,
            });

            let parsed = await parse({
                body,
                type: config.parser.type,
                fields: config.parser.fields,
            });

            resp = parsed.fields[0];
        } catch (err) {
            console.error('_getTicker failed: ', err);
        }
        console.log(resp);
        return resp;
    }

}

module.exports = GLZ;