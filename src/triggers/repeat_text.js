'use strict';

class RepeatText {
    constructor(message) {
        this.action = 'SAY';
        this.type = 'all';
        this.text = message[1];
    }

    async execute() {
        return this.text;
    }
}

module.exports = RepeatText;