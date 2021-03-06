'use strict';

let rp = require('request-promise');
let config = require('../config');


let fs = require('fs'),
    APIPath = config.coc.api;

const MESSAGES = {
    BOT_UNKNOWN_ERR: 'Unknown response. Err: 100',
    BOT_STARTED: 'Bot Started! Troops and donations are working. Will go to sleep in 15m. Enjoy.',
    BOT_STOPPED: 'Bot Stopped! Going idle.',
    BOT_STOPPED_FAILED: 'Bot failed to stop.',
    BOT_CLOSED: 'Bot Closed! You may start it again',
    BOT_CLOSED_FAILED: 'Bot failed to close.',
    BOT_STATUS_UP: 'Bot is running. All good.',
    BOT_STATUS_IDLE: 'Bot idle. You may start it.',
    BOT_LOADING: 'Bot loading.',
    BOT_FAILED: 'Bot failed. Err: 105'
};


class CoCBot {
    constructor(cocAction) {
        this.action = 'SAY';
        this.type = 'all';
        this.cocAction = cocAction[1];
    }


    donations(callback) {
        let text = [
            'Troop/Spell Names. General convenstion is set, The name of the soldier/spell in Hebrew + 9 digit from the list below. Should be used in the dontation text',
            '',
            'GOLEM9 - Golem (x3)',
            'ANAK9 - Giant (x12)',
            'KOSEM9 - Wizard (x9)',
            'PAKA9 - PEKKA (x2)',
            'ADAMA9 - Earthquake (x4)',
            'FAST9 - Hastle (x7)',
            '',
            'Good luck.'
        ].join('\\n');

        callback(text);
    }


    help(callback) {
        let text = [
            'Hi, I am the channel bot. I can donate, train troops and spells.',
            '',
            'To control me use these commands:',
            'start - starts the bot',
            'stop - stops the bot, idle',
            'close - closes the bot app',
            'status - will respond the current state',
            'troops - **doesnt work yet.',
            'donations - list of troop keywords',
            '',
            'Enjoy, LR'
        ].join('\\n');

        callback(text);
    }


    status(callback) {
        let text = MESSAGES.BOT_UNKNOWN_ERR;
        callback('Checkig status...');

        this._send('is_started').then(body => {
            if ('true' === body) {
                text = MESSAGES.BOT_STATUS_UP;
            } else
            if ('false' === body) {
                text = MESSAGES.BOT_STATUS_IDLE;
            }

            callback(text);
        }).catch(() => {
            callback(MESSAGES.BOT_FAILED);
        });
    }


    stop(callback) {
        let text = MESSAGES.BOT_UNKNOWN_ERR;
        callback('Stopping...');

        this._send('stop').then(body => {
            if ('true' === body) {
                text = MESSAGES.BOT_STOPPED;
            } else
            if ('false' === body) {
                text = MESSAGES.BOT_STOPPED_FAILED;
            }

            callback(text);
        }).catch(() => {
            callback(MESSAGES.BOT_FAILED);
        });
    }


    close(callback) {
        let text = MESSAGES.BOT_UNKNOWN_ERR;
        callback('Closing...');

        this._send('close').then(body => {
            if ('true' === body) {
                text = MESSAGES.BOT_CLOSED;
            } else
            if ('false' === body) {
                text = MESSAGES.BOT_CLOSED_FAILED;
            }

            callback(text);
        }).catch(() => {
            callback(MESSAGES.BOT_FAILED);
        });
    }


    start(callback) {
        let text = MESSAGES.BOT_UNKNOWN_ERR;
        callback('Starting...');

        this._send('start').then(body => {
            if ('true' === body) {
                text = MESSAGES.BOT_STARTED;
            } else
            if ('false' === body) {
                text = MESSAGES.BOT_LOADING;
            }

            callback(text);
        }).catch(() => {
            callback(MESSAGES.BOT_FAILED);
        });
    }


    async execute() {
        if ('function' === typeof this[this.cocAction]) {
            return await this[this.cocAction](callback);
        }

        return '404 ' + this.cocAction;
    }


    _send(action) {
        return rp(APIPath + action);
    }
}

module.exports = CoCBot;