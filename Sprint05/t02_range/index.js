exports.checkDivision = (beginRange = 1, endRange = 60) => {
    for (let num = beginRange; num <= endRange; num++) {
        let description = '';

        if (num % 2 !== 0 && num % 3 !== 0) {
            console.log(`The number ${num} -`)
        } else {
            description += 'is'
            if (num % 2 === 0) description += ' divisible by 2,';
            if (num % 3 === 0) description += ' divisible by 3,';
            if (num % 10 === 0) description += ' divisible by 10,';
            console.log(`The number ${num} ${description.slice(0, -1)}`)
        }
    }
}