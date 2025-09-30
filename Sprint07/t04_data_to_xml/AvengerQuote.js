const Comment = require('./Comment');

class AvengerQuote {
    constructor({ id, author, quote, photo = [], publishDate = new Date(), comments = [] }) {
        this.id = id;
        this.author = author;
        this.quote = quote;
        this.photo = photo;

        if (publishDate instanceof Date) {
            this.publishDate = publishDate.toString();
        } else {
            this.publishDate = publishDate;
        }

        this.comments = [];

        for (const c of comments) {
            if (c instanceof Comment) {
                this.comments.push(c);
            } else {
                this.comments.push(new Comment(c.comment, c.date));
            }
        }
    }
}

module.exports = AvengerQuote;
