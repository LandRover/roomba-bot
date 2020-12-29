'use strict';

const PostILStatus = require('postil-status');

class PostIL {
    constructor(message) {
        this.action = 'SAY';
        this.type = 'all';
        this.trackingID = [
            message[1], // XX
            message[2], // 123456789
            message[3]  // XX
        ].join('');
    }


    async execute() {
        console.log(this.trackingID);


        let postil = new PostILStatus({language: 'HE'}, {log: () => {}});
        postil.getStatus(this.trackingID).then(packageModel => {
            callback(packageModel.getDescription());
        });
    }
}

module.exports = PostIL;