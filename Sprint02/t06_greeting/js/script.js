let firstName = prompt("Enter your first name:");
let lastName = prompt("Enter your last name:");

function isValidName(name) {
    if (!name || isNaN(name) === false) return false;
    for (let i = 0; i < name.length; i++) {
        let char = name[i];
        if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z'))) return false;
    }
    return true;
}

function capitalize(name) {
    return name.slice(0, 1).toUpperCase() + name.slice(1);
}

if (!isValidName(firstName) || !isValidName(lastName)) {
    console.log("Wrong input!");
    alert("Wrong input!");
} else {
    firstName = capitalize(firstName);
    lastName = capitalize(lastName);
    let fullName = firstName + " " + lastName;
    console.log("Hello, " + fullName + "!");
    alert("Hello, " + fullName + "!");
}
