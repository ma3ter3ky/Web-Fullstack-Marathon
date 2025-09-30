const fs = require('fs');
const xml2js = require('xml2js');
const AvengerQuote = require('./AvengerQuote');
const Comment = require('./Comment');

class ListAvengerQuotes {
    constructor() {
        this.quotes = [];
    }

    add(quote) {
        this.quotes.push(quote);
    }

    toXML(filename) {
        const builder = new xml2js.Builder({ rootName: 'quotes', headless: true });

        const quoteObjects = this.quotes.map(q => ({
            id: q.id,
            author: q.author,
            quote: q.quote,
            photo: { url: q.photo },
            publishDate: q.publishDate,
            comments: { comment: q.comments.map(c => ({ comment: c.comment, date: c.date })) }
        }));

        const xml = builder.buildObject({ quote: quoteObjects });
        fs.writeFileSync(filename, xml);
    }

    fromXML(filename) {
        const xml = fs.readFileSync(filename, 'utf-8');
        const parser = new xml2js.Parser({ explicitArray: false });

        parser.parseString(xml, (err, result) => {
            if (err) {
                console.error('Failed to parse XML:', err);
                return;
            }

            this.quotes = [];

            const quoteArray = Array.isArray(result.quote) ? result.quote : [result.quote];

            for (const q of quoteArray) {
                const photos = Array.isArray(q.photo.url) ? q.photo.url : [q.photo.url];
                const rawComments = q.comments && q.comments.comment
                    ? Array.isArray(q.comments.comment) ? q.comments.comment : [q.comments.comment]
                    : [];

                const comments = rawComments.map(c => new Comment(c.comment, c.date));

                this.quotes.push(new AvengerQuote({
                    id: Number(q.id),
                    author: q.author,
                    quote: q.quote,
                    photo: photos,
                    publishDate: q.publishDate,
                    comments: comments
                }));
            }
        });
    }
}

module.exports = ListAvengerQuotes;
