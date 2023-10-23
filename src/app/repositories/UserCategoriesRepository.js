const db = require('../../database');

class UserCategoriesRepository {
  async findAll() {
    const rows = await db.query('SELECT *  FROM categories_user ORDER BY name');
    return rows;
  }

  async findByName(name) {
    const [row] = await db.query('SELECT * FROM categories_user WHERE name = $1', [name]);
    return row;
  }

  async create({ name }) {
    const { row } = await db.query(`
      INSERT INTO categories_user(name)
      VALUES($1)
      RETURNING *
    `, [name]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(`
      DELETE FROM categories_user WHERE id = $1
    `, [id]);

    return deleteOp;
  }
}

module.exports = new UserCategoriesRepository();
