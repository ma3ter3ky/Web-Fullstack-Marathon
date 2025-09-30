const houseMixin = {
    wordReplace(from, to) {
        this.description = this.description.split(from).join(to)
    },

    wordInsertAfter(afterWord, insertWord) {
        const words = this.description.split(' ')
        for (let i = 0; i < words.length; i++) {
            if (words[i] === afterWord) {
                words.splice(i + 1, 0, insertWord)
                i++
            }
        }
        this.description = words.join(' ')
    },

    wordDelete(word) {
        this.description = this.description.split(word).join('')
    },

    wordEncrypt() {
        let result = ''
        for (let i = 0; i < this.description.length; i++) {
            const char = this.description[i]
            const code = this.description.charCodeAt(i)
            if (code >= 65 && code <= 90) {
                result += String.fromCharCode(((code - 65 + 13) % 26) + 65)
            } else if (code >= 97 && code <= 122) {
                result += String.fromCharCode(((code - 97 + 13) % 26) + 97)
            } else {
                result += char
            }
        }
        this.description = result
    },

    wordDecrypt() {
        this.wordEncrypt()
    }
}
