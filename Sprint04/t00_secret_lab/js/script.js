function transformation() {
    const labElement = document.querySelector('#lab');
    const heroElement = document.querySelector('#lab #hero');

    if (heroElement.innerHTML === "Bruce Banner") {
        heroElement.innerHTML = "Hulk";
        heroElement.style.fontSize = "130px";
        heroElement.style.letterSpacing = "6px";
        labElement.style.backgroundColor = "#70964b";
    } else {
        heroElement.innerHTML = "Bruce Banner";
        heroElement.style.fontSize = "60px";
        heroElement.style.letterSpacing = "2px";
        labElement.style.backgroundColor = "#ffb300";
    }
}
