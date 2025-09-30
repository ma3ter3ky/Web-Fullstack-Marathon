const validator = {
    get(target, property) {
        console.log(`Trying to access the property ${property} ...`)
        return property in target ? target[property] : false
    },

    set(target, property, value) {
        if (property === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('The age is not an integer')
            }
            if (value < 0 || value > 200) {
                throw new RangeError('The age is invalid')
            }
        }
        target[property] = value
        console.log(`Setting value ${value} to ${property}`)
        return true
    }
}