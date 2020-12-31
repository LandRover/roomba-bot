'use strict';

class About {


    constructor() {
        this.action = 'SAY';
        this.type = 'all';
    }


    async execute() {
        return this.getText();
    }


    getText() {
        return [
            '`roomba-bot` is based on Termux, WA Web. Allowing simple integration between WA groups or P2P messaging between users and the bot for getting automated messages.',
            '',
            'Feel free to fork and modify @ https://github.com/LandRover/roomba-bot'
        ].join("\r\n");
    }


}

module.exports = About;