class Comment {
    constructor(comment, date = new Date()) {
        this.comment = comment;

        if (date instanceof Date) {
            this.date = date.toString();  // or .toISOString() if consistency is needed
        } else {
            this.date = date;
        }
    }
}

module.exports = Comment;
