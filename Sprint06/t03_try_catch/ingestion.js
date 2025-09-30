const {Product} = require('./product');
const EatException = require('./eat-exception');

class Ingestion{
    constructor(meal_type, day_of_diet) {
        this.meal_type = meal_type;
        this.day_of_diet = day_of_diet;
        this.products = [];
    }

    setProduct(product) {
        this.products.push(product);
    }

    getProductInfo(productName) {
        return this.products.find(product => product.name === productName);
    }

    getFromFridge(productName) {
        const product = this.getProductInfo(productName);
        if (!product) {
            throw new Error(`Product ${productName} not found in fridge`);
        }
        if (product.kcal > 200) {
            throw new EatException(`Too many calories in ${product.name} for ${this.meal_type}!`);
        }
    }
}

module.exports = { Ingestion };