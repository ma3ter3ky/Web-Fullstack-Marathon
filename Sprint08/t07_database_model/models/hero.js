const Model = require('../model');

class Hero extends Model {
    constructor(data = {}) {
        super(data);
    }

    static get tableName() {
        return 'heroes';
    }
}

module.exports = Hero;
