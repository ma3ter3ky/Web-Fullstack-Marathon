const db = require('./db').promise();

class Model {
    constructor(data = {}) {
        for (const key in data) {
            this[key] = data[key];
        }
    }

    static get tableName() {
        throw new Error('Subclass must define static tableName');
    }

    static async find(id) {
        const [rows] = await db.query(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
        if (rows.length === 0) return null;
        return new this(rows[0]);
    }

    async delete() {
        if (!this.id) throw new Error('Cannot delete without ID');
        await db.query(`DELETE FROM ${this.constructor.tableName} WHERE id = ?`, [this.id]);
    }

    async save() {
        const keys = Object.keys(this).filter(key => key !== 'id');
        const values = keys.map(key => this[key]);

        if (this.id) {
            const setClause = keys.map(key => `${key} = ?`).join(', ');
            await db.query(
                `UPDATE ${this.constructor.tableName} SET ${setClause} WHERE id = ?`,
                [...values, this.id]
            );
        } else {
            const placeholders = keys.map(() => '?').join(', ');
            const [result] = await db.query(
                `INSERT INTO ${this.constructor.tableName} (${keys.join(', ')}) VALUES (${placeholders})`,
                values
            );
            this.id = result.insertId;
        }
    }
}

module.exports = Model;
