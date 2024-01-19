const db = require('../../database');

class CadastroNewsletterRepository {
  // Friltro por email
  async findByEmail(email) {
    const [row] = await db.query(`
    SELECT *
    FROM email_newsletter
    WHERE email = $1
  `, [email]);

    return row;
  }

  // cadastro do email
  async create({ email }) {
    const [row] = await db.query(`
      INSERT INTO email_newsletter(email)
      VALUES($1)
      RETURNING *
    `, [email]);

    return row;
  }
}

module.exports = new CadastroNewsletterRepository();
