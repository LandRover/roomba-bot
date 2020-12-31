'use strict';

const util = require('util');
const dns = require('dns');
const lookup = util.promisify(dns.lookup);

class DNS {
    constructor(message) {
        this.action = 'SAY';
        this.type = 'all';
        this.domain = message[1];
    }


    async getIP(domain) {
        let res = await lookup(domain);

       return res.address;
    }


    async execute() {
        return await this.getIP(this.domain);
    }

}

module.exports = DNS;