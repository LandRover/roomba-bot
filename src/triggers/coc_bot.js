'use strict';

let rp = require('request-promise');
let config = require('../config');


let fs = require('fs'),
    APIPath = config.coc.api;

const MESSAGES = {
    BOT_UNKNOWN_ERR: 'Unknown response. Err: 100',
    BOT_STARTED: 'Bot Start! Troops and donations are working. Will go to sleep in 15m. Enjoy.',
    BOT_STOPPED: 'Bot Stopped! Going offline.',
    BOT_STOPPED_FAILED: 'Bot failed to stop.',
    BOT_STATUS_UP: 'Bot is running. All good.',
    BOT_STATUS_IDLE: 'Bot idle. You may start it.',
    BOT_LOADING: 'Bot loading.',
    BOT_FAILED: 'Bot failed. Err: 105'
};


class CoCBot {
    constructor(cocAction) {
        this.action = 'SAY';
        this.type = 'all';
        this.cocAction = cocAction[0];
    }


    donations(callback) {
        let text = [
            'Troop/Spell Names. General convenstion is set, The name of the soldier in Hebrew + 9 digit',
            '',
            'golem9 - Golem (x3)',
            'anak9 - Giant (x16)',
            'kosem9 - Wizard (x5)',
            'paka9 - PEKKA (x2)',
            'adama9 - Earthquake (x4)',
            'trufa9 - Hastle (x7)',
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
            'status - will respond the current state',
            'troops - **doesnt work yet.',
            'donations - list of troop commands',
            '',
            'Enjoy, LR'
        ].join('\\n');

        callback(text);
    }


    status(callback) {
        let text = MESSAGES.BOT_UNKNOWN_ERR;

        this._send('is_started').then(body => {
            if (true === body) {
                text = MESSAGES.BOT_STATUS_UP;
            } else
            if (false === body) {
                text = MESSAGES.BOT_STATUS_IDLE;
            }

            callback(text);
        }).catch(() => {
            callback(MESSAGES.BOT_FAILED);
        });
    }


    stop(callback) {
        let text = MESSAGES.BOT_UNKNOWN_ERR;

        this._send('stop').then(body => {
            if (true === body) {
                text = MESSAGES.BOT_STOPPED;
            } else
            if (false === body) {
                text = MESSAGES.BOT_STOPPED_FAILED;
            }

            callback(text);
        }).catch(() => {
            callback(MESSAGES.BOT_FAILED);
        });
    }


    start(callback) {
        let text = MESSAGES.BOT_UNKNOWN_ERR;

        this._send('start').then(body => {
            if (true === body) {
                text = MESSAGES.BOT_STARTED;
            } else
            if (false === body) {
                text = MESSAGES.BOT_LOADING;
            }

            callback(text);
        }).catch(() => {
            callback(MESSAGES.BOT_FAILED);
        });
    }


    execute(callback) {
        if ('function' === typeof this[this.cocAction]) {
            return this[this.cocAction](callback);
        }

        callback('404 ' + this.cocAction);
    }


    _send(action) {
        return rp(APIPath + action);
    }

}

module.exports = CoCBot;