'use strict';

const PostILStatus = require('postil-status');

class PostIL {
    constructor(message) {
        this.action = 'SAY';
        this.type = 'all';

        this.trackingID = message[1];
    }


    async execute() {
        let postil = new PostILStatus({language: 'HE'}, {log: () => {}});
        
        return await postil.getStatus(this.trackingID).then(packageModel => {
            return packageModel.getDescription();
        });
    }
}

module.exports = PostIL;