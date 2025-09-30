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
            [login, password, fullname, email]
        );
    }

    async getByLogin(login) {
        const [rows] = await db.query('SELECT * FROM users WHERE login = ? LIMIT 1', [login]);
        return rows[0];
    }

    async exists(login, email) {
        const [rows] = await db.query(
            'SELECT id FROM users WHERE login = ? OR email = ? LIMIT 1',
            [login, email]
        );
        return rows.length > 0;
    }

    async checkPassword(input, hash) {
        return bcrypt.compare(input, hash);
    }
}

module.exports = new User();
