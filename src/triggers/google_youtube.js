'use strict';

const config = require('../config');
const YoutubeAPI = require('youtube-node');

class GoogleYoutubeAPI {
    constructor(message) {
        this.action = 'SAY';
        this.type = 'all';
        this.videoID = message[1];

        this.youtube = new YoutubeAPI();
        this.youtube.setKey(config.google.apiKey);
    }


    async getVideoID(videoID) {
        console.log(videoID)
        return new Promise((resolve, reject) => {
            this.youtube.getById(videoID, (err, body) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                
                let text = [
                    body.items[0].snippet.title,
                    [
                        'Views: ' + body.items[0].statistics.viewCount,
                        'Likes: ' + body.items[0].statistics.likeCount,
                    ].join(' | ')

                ].join("\r\n");

                resolve(text);
            });
        })

    }


    async execute() {
        console.log('YOUTUBE!!!')
        let videoInfo = await this.getVideoID(this.videoID);

        return videoInfo;
    }

}

module.exports = GoogleYoutubeAPI;