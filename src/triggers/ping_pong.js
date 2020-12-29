'use strict';

class RepeatText {
    constructor(message) {
        this.action = 'SAY';
        this.type = 'all';
        this.message = message[0];
    }

    async execute() {
        this.message = 'Pong!';

        return this.message;
    }
}

module.exports = RepeatText;