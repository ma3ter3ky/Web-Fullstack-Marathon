String.prototype.removeDuplicates = function() {
    let words = this.trim().split(' ');
    let uniqueWords = [];

    for (let i = 0; i < words.length; i++) {
        if (words[i] !== '' && uniqueWords.indexOf(words[i]) === -1) {
            uniqueWords.push(words[i]);
        }
    }

    return uniqueWords.join(' ');
};
