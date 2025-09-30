const Printable = {
    print() {
        this.weapons.forEach(w => console.log(w));
    }
};

module.exports = Printable;
