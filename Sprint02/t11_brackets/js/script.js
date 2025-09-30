function checkBrackets(bracketsStr) {
    if ( typeof(bracketsStr) !== "string") return -1;

    let openingBracketOccurred = false;
    let closingBracketOccurred = false;
    let unmatchedOpen = 0;
    let unmatchedClose = 0;

    for (let element of bracketsStr) {
        if (element === "(") {
            openingBracketOccurred = true;
            unmatchedOpen++;
        } else if (element === ")") {
            closingBracketOccurred = true;
            if (unmatchedOpen === 0) {
                unmatchedClose++;
            } else {
                unmatchedOpen--;
            }
        }
    }

    if (!openingBracketOccurred || !closingBracketOccurred) {
        return -1;
    }
    return unmatchedOpen + unmatchedClose;
}