const db = require('../../database');

class CategoriesNewsRespository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT *
      FROM categories_news
      ORDER BY name ${direction}
    `);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT *
      FROM categories_news
      WHERE id = $1
    `, [id]);

    return row;
  }

  async create({ name, color }) {
    const [row] = await db.query(`
      INSERT INTO categories_news(name, color)
      VALUES($1, $2)
      RETURNING *
    `, [name, color]);

    return row;
  }

  async update(id, { name, color }) {
    const [row] = await db.query(`
      UPDATE categories_news
      SET name = $1, color = $2
      WHERE id = $3
      RETURNING *
    `, [name, color, id]);

    return row;
  }

  async delete(id) {
    const [row] = await db.query(`
      DELETE FROM categories_news WHERE id = $1
    `, [id]);

    return row;
  }
}

module.exports = new CategoriesNewsRespository();
