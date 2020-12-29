'use strict';

class Help {
    constructor() {
        this.action = 'SAY';
        this.type = 'all';
    }


    async execute() {
        return this.getHelpText();
    }


    getHelpText() {
        return [
            "Hey, I'm Roomba.",
            '',
            'Get fast and reliable data in realtime to the chat. Some things I can help you with:',
            ' 1. @i(mage) search',
            ' 2. @ping',
            ' 3. @mute/unmute',
            ' 4. @ynet - soon',
            ' 5. @winner - soon',
            ' 7. @forkme',
            ' 8. @help'
        ].join('\\n');
    }
}

module.exports = Help;