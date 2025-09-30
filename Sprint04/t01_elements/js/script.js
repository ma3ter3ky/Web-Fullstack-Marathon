function main() {
    const characters = document.getElementById('characters');
    const charactersElements = characters.children;

    iterateElements(charactersElements);
}

function iterateElements(characters) {
    for (const character of characters) {
        correctClassAttribute(character);
        correctDataAttribute(character);
        addElementsDivs(character);
    }
}

function correctClassAttribute(character) {
    let characterClass = character.className;
    switch (characterClass) {
        case 'good':
            break;
        case 'evil':
            break;
        case 'unknown':
            break;
        default:
            character.className = 'unknown';
    }
}

function correctDataAttribute(character) {
    let characterData = character.getAttribute('data-element');
    if (!characterData || characterData === "") {
        character.setAttribute('data-element', 'none');
    }
}

function addElementsDivs(character) {

    const nextLineElement = document.createElement('br');
    character.appendChild(nextLineElement);

    let characterData = character.getAttribute('data-element');
    let elements = characterData.split(' ');
    let elementDiv = document.createElement('div');
    elementDiv.className = 'elem';
    for (const element of elements) {
        if (element === "air" || element === "water" || element === "earth" || element === "fire") {
            elementDiv.classList.add(element);
        }
        if (element === "none") {
            elementDiv.classList.add('none');
            let lineDiv = document.createElement('div');
            lineDiv.className = 'line';
            elementDiv.appendChild(lineDiv);
        }
    }
    character.appendChild(elementDiv);
}

main();