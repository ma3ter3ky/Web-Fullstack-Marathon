function Avenger({ name, alias, gender, age, powers }) {
    function Avenger() {
        return `${alias.toUpperCase()}\n${powers.join('\n')}`;
    }

    Avenger.toString = function () {
        return `name: ${name}\ngender: ${gender}\nage: ${age}`;
    };

    return Avenger;
}

module.exports = { Avenger };
