'use strict';

const { scrape } = require('scrapa');

let quotesURL = 'https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

class Quotes {

   constructor() {
        this.action = 'SAY';
        this.type = 'all';
    }


    async execute() {
        return this.getText();
    }


    async getText() {
        let randomQuote = await this.getRandomQuote();

        return [`
     _${randomQuote.quote}_
        
    
	*~${randomQuote.author}*
         `].join("\r\n");
    }


    async getRandomQuote() {
        let quotes = await this._getQuotes();

        return quotes[Math.floor(Math.random() * quotes.length)]
    }


    async _getQuotes() {
        try {
            let body = await scrape({ url: quotesURL });
            body = JSON.parse(body);

            return body.quotes;
        } catch(err) {
            console.error('_getQuotes failed: ', err);
        }
        
        return [];
    }

}

module.exports = Quotes;