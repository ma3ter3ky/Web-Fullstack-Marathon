function* numberGenerator() {
    let result = 1
    while (true) {
        const input = prompt(`Previous result: ${result}. Enter a new number:`)
        const number = Number(input)

        if (isNaN(number) || number === null) {
            console.error('Invalid number')
            yield
        }

        result += number

        if (result > 10000) {
            result = 1
        }
    }
}

const gen = numberGenerator()
gen.next()
