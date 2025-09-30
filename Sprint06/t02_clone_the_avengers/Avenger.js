function Avenger(name, alias, gender, age, powers, hp) {
    function Avenger() {
        return `${alias.toUpperCase()}\n${powers.join('\n')}`;
    }

    Avenger.toString = function () {
        return `name: ${name}\ngender: ${gender}\nage: ${age}`;
    };

    Avenger.hp = hp;
    return Avenger;
}

module.exports = { Avenger };
