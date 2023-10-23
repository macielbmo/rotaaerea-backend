const db = require('../../database');

class UsersRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
    SELECT users.*, categories_user.name AS category_user_name
    FROM users
    LEFT JOIN categories_user ON categories_user.id = users.category_id
    ORDER BY users.name ${direction}`);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
    SELECT users.*, categories_user.name AS category_user_name
    FROM users
    LEFT JOIN categories_user ON categories_user.id = users.category_user
    WHERE users.id = $1`, [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT id, name, email, phone, category_id FROM users WHERE email = $1', [email]);
    return row;
  }

  async create({
    name, email, phone, category_id, password,
  }) {
    const [row] = await db.query(`
    INSERT INTO users(name, email, phone, category_id, password)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *
    `, [name, email, phone, category_id, password]);

    return row;
  }

  async update(id, {
    name, email, phone, category_user,
  }) {
    const [row] = await db.query(`
      UPDATE users
      SET name = $1, email = $2, phone = $3, category_user = $4
      WHERE id = $5
      RETURNING *
    `, [name, email, phone, category_user, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM users WHERE id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new UsersRepository();
