const db = require('../db').promise();
const Model = require('../model');
const bcrypt = require('bcrypt');

class User extends Model {
    constructor() {
        super('users');
    }

    async create({ login, password, fullname, email }) {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);

        await db.query(
            'INSERT INTO users (login, password, fullname, email) VALUES (?, ?, ?, ?)',
            [login, hash, fullname, email]
        );
    }

    async exists(login, email) {
        const [rows] = await db.query(
            'SELECT id FROM users WHERE login = ? OR email = ? LIMIT 1',
            [login, email]
        );
        return rows.length > 0;
    }
}

module.exports = new User();
