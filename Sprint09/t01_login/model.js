const db = require('./db').promise();

class Model {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async getById(id) {
        const [rows] = await db.query(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
        return rows[0] || null;
    }

    async getAll() {
        const [rows] = await db.query(`SELECT * FROM ${this.tableName}`);
        return rows;
    }

    async deleteById(id) {
        await db.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
    }
}

module.exports = Model;
