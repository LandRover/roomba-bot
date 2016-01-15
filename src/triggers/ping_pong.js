'use strict';

class RepeatText {
    constructor(message) {
        this.action = 'SAY';
        this.type = 'all';
        this.message = message;
    }

    get() {
        return 'Pong!';
    }
}

module.exports = RepeatText;