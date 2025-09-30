function clearArr(arr) {
    let result = [];
    for (let word_index = 0; word_index < arr.length; word_index++) {
        if (arr.indexOf(arr[word_index]) === word_index) {
            result.push(arr[word_index]);
        }
    }
    return result;
}

function addWords(obj, wrds) {
    let arr = (obj.words + " " + wrds).split(" ");
    obj.words = clearArr(arr).join(" ");
}

function removeWords(obj, wrds) {
    let wrdsArr = wrds.split(" ");
    obj.words = obj.words.split(" ").filter(word => wrdsArr.indexOf(word) === -1).join(" ");
}

function changeWords(obj, oldWrds, newWrds) {
    let oldArr = oldWrds.split(" ");
    let newArr = newWrds.split(" ");
    let words = obj.words.split(" ");

    let newWordIndex = 0;
    for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
        let word = words[wordIndex];
        if (oldArr.indexOf(word) !== -1) {
            words[wordIndex] = newArr[newWordIndex];
            if (newWordIndex !== newArr.length - 1) {
                newWordIndex++;
            }
        }
    }
    obj.words = clearArr(words).join(" ");
}