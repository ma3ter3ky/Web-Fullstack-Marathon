function checkDivision(beginRange, endRange) {
    for (let num = beginRange; num <= endRange; num++) {
        let description = '';

        if (num % 2 !== 0 && num % 3 !== 0) {
            console.log(`${num} -\n`)
        } else {
            description += 'is'
            if (num % 2 === 0) description += ' even,';
            if (num % 3 === 0) description += ' a multiple of 3,';
            if (num % 10 === 0) description += ' a multiple of 10,';
            console.log(`${num} ${description.slice(0, -1)}\n`)
        }
    }
}


let startInput = prompt();
let endInput = prompt();

let start = startInput * 1;
if (!start) start = 1;

let end = endInput * 1;
if (!end) end = 100;

checkDivision(start, end);
