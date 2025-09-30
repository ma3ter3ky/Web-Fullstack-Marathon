class Team {
    constructor(id, avengers) {
        this.id = id;
        this.avengers = avengers;
    }

    battle({ damage }) {
        this.avengers.forEach(avenger => {
            avenger.hp -= damage;
        });
        this.avengers = this.avengers.filter(avenger => avenger.hp > 0);
    }

    calculateLosses(clonedTeam) {
        const before = clonedTeam.avengers.length;
        const after = this.avengers.length;
        const lost = before - after;

        if (lost === 0) {
            console.log("We haven't lost anyone in this battle!");
        } else {
            console.log(`In this battle we lost ${lost} Avengers.`);
        }
    }

    clone() {
        return new Team(this.id, this.avengers.slice());
    }
}

module.exports = { Team };
