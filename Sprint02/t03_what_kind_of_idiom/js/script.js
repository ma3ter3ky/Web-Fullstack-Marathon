function getUsrInput() {
    let usrInput = prompt();
    let usrNum = Number(usrInput);
    return idiomAndValidation(usrNum);
}

function idiomAndValidation(usrNum) {
    switch (usrNum) {
        case 1:
            alert('Back to square 1');
            return 0;
        case 2:
            alert('Goody 2-shoes');
            return 0;
        case 3:
            alert('Two\'s company, three\'s a crowd');
            return 0;
        case 4:
            alert('Counting sheep');
            return 0;
        case 5:
            alert('Take five');
            return 0;
        case 6:
            alert('Two\'s company, three\'s a crowd');
            return 0;
        case 7:
            alert('Seventh heaven');
            return 0;
        case 8:
            alert('Behind the eight-ball');
            return 0;
        case 9:
            alert('Counting sheep');
            return 0;
        case 10:
            alert('Cheaper by the dozen');
            return 0;
        default:
            getUsrInput();
            return 0;
    }
}

getUsrInput();