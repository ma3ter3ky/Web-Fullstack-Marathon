class StrFrequency {
    constructor(str) {
        this.str = str || '';
    }

    letterFrequencies() {
        const result = {};
        for (let i = 0; i < this.str.length; i++) {
            const char = this.str[i];
            if (/[a-zA-Z]/.test(char)) {
                const upper = char.toUpperCase();
                result[upper] = (result[upper] || 0) + 1;
            }
        }
        return result;
    }

    wordFrequencies() {
        const result = {};
        const words = this.str.toUpperCase().replace(/[^A-Z0-9\s]/g, ' ').split(/\s+/);

        if (words.length === 1 && words[0] === '') return {'': 1};
        for (const word of words) {
            if (word.length === 0) continue;
            result[word] = (result[word] || 0) + 1;
        }

        return result;
    }

    reverseString() {
        return this.str.split('').reverse().join('');
    }
}

module.exports = StrFrequency;
