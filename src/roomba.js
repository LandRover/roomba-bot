'use strict';

const qrcode = require("qrcode-terminal");

const config = require('./config'),
      Logger = require('./utils/logger'),
      Router = require('./router'),
      fs = require('fs');

const
    {
        WAConnection,
        MessageType,
        Presence,
        MessageOptions,
        Mimetype,
        WALocationMessage,
        WA_MESSAGE_STUB_TYPES,
        ReconnectMode,
        ProxyAgent,
        waChatKey,
    } = require("@adiwajshing/baileys");

class Roomba {
    constructor() {
        console.log('Roomba is Running');
        this.wa = new WAConnection();
    }


    bootstrap() {
        let route = new Router(this.wa);

        this.wa.on('qr', (qr) => {
            qrcode.generate(qr,
                {
                    small: true
                });
            console.log(`[ ${moment().format("HH:mm:ss")} ] Please Scan QR with app!`);
        });

        this.wa.on('credentials-updated', () => {
            // save credentials whenever updated
            console.log(`credentials updated!`)
            const authInfo = this.wa.base64EncodedAuthInfo() // get all the auth info we need to restore this session
            fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t')) // save this info to a file
        })
        fs.existsSync('./session.json') && this.wa.loadAuthInfo('./session.json');

        this.wa.connect();
        

        this.wa.on('user-presence-update', json => console.log(json.id + ' presence is ' + json.type));


        this.wa.on('message-status-update', json => {
            const participant = json.participant ? ' (' + json.participant + ')' : '' // participant exists when the message is from a group
            console.log(`${json.to}${participant} acknlowledged message(s) ${json.ids} as ${json.type}`)
        });


        this.wa.on('message-new', async (m) => {
            const messageContent = m.message;

            if (!messageContent) return; // if there is no text or media message
            
            const text = messageContent.conversation
            const messageType = Object.keys(messageContent)[0]; // get what type of message it is -- text, image, video

            let senderID = m.key.remoteJid;
            console.log(`[ ${Date.now()} ] (${senderID.split("@s.whatsapp.net")[0]} => ${text}`);

            route.dispatch(senderID, text);
        });

        return this;
    }
}

module.exports = new Roomba().bootstrap();