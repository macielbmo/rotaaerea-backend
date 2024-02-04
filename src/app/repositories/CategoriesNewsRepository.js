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

  async create({ name }) {
    const [row] = await db.query(`
      INSERT INTO categories_news(name)
      VALUES($1)
      RETURNING *
    `, [name]);

    return row;
  }

  async update(id, { name }) {
    const [row] = await db.query(`
      UPDATE categories_news
      SET name = $1
      WHERE id = $3
      RETURNING *
    `, [name, id]);

    return row;
  }

  async delete(id) {
    const [row] = await db.query(`
      DELETE FROM categories_news WHERE id = $1
    `, [id]);

    return row;
  }

  async getId(nameCategory) {
    const [category] = await db.query(`
    SELECT id
    FROM categories_news
    WHERE name = ($1)
  `, [nameCategory]);

    console.log(category);

    return category;
  }
}

module.exports = new CategoriesNewsRespository();
