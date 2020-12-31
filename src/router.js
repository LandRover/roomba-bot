'use strict';

const {
    MessageType,
} = require("@adiwajshing/baileys");

let Trigger = require('./trigger'),
    Help = require('./triggers/help'),
    PostIL = require('./triggers/postil'),
    DNS = require('./triggers/dns'),
    URLtoImage = require('./triggers/url_to_image'),
    GoogleImages = require('./triggers/google_images'),
    GoogleYoutube = require('./triggers/google_youtube'),
    PingPong = require('./triggers/ping_pong'),
    CoCBot = require('./triggers/coc_bot');

class Router {
    constructor(wa) {
        this.wa = wa;

        this.triggers = [];
        this.bindTriggers();
    }


    bindTriggers() {
        this.triggers.push(
            new Trigger(/@help/i, Help), // Help
            new Trigger(/@ping/i, PingPong), // ping pong, check bot up.
            new Trigger(/@i (.*)/i, GoogleImages), // search images.
            new Trigger(/@ip (.*)/i, DNS), // search images.
            new Trigger(/.*(([A-Za-z]{2})([0-9]{9})([A-Za-z]{2})|([A-Za-z]{2})([0-9]{10})([A-Za-z]{1})|([0-9]{13})).*/i, PostIL), // PostIL checker
            new Trigger(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/, GoogleYoutube),
            new Trigger(/(https?:\/\/[^\s]+)/gi, URLtoImage), // image downloader
            new Trigger(/@c (.*)/i, CoCBot) // clash bot
        );

        return this;
    }


    dispatch(id, message) {
        let matchText;

        console.log(['MSG IN ', id, message]);

        for (let i = 0, len = this.triggers.length; i < len; i++) {
            let trigger = this.triggers[i];

            matchText = trigger.match(message);

            if (null !== matchText) {
                this.run(trigger, id, message, matchText);
                break;
            }
        }

    }



    async run(trigger, id, message, matchText) {
        let triggeredActionInstance = trigger.getInstance(matchText);

        switch(triggeredActionInstance.action) {
            case 'SAY':
                triggeredActionInstance.execute().then(text => {
                    this.wa.sendMessage(id, text, MessageType.text);
                });

                break;


            case 'IMAGE':
                triggeredActionInstance.execute()
                    .then((buffer) => {
                        console.log(['DONEEEEE', buffer]);
                        this.wa.sendMessage(id, buffer, MessageType.image);
                    }).catch(err => {
                        switch (err) {
                            case 'nothing found':
                                this.wa.sendMessage(id, 'nothing found.. sry', MessageType.text);
                                console.error(['ERROR', 'nothing found']);
                                break;
                            default:
                                console.error(['ERROR', err, 'retry....']);

                                return this.run(trigger, id, message, matchText);
                        }

                    });

                break;
        }

    }

}

module.exports = Router;