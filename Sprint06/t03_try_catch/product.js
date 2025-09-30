class Product {
    constructor(name, kcal_per_portion) {
        this.name = name;
        this.kcal_per_portion = kcal_per_portion;
    }

    get kcal() {
        return this.kcal_per_portion;
    }
}

module.exports = {Product};