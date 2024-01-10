const db = require('../../database');

class NewsRepository {
  // async findAll(orderBy = 'DESC') {
  //   const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  //   const rows = await db.query(`
  //   SELECT news.*, categories_news.name AS category_news_name
  //   FROM news
  //   LEFT JOIN categories_news ON categories_news.id = news.category
  //   ORDER BY news.created_at ${direction}`);
  //   return rows;
  // }

  // async findById(newsId) {
  //   const [row] = await db.query(`
  //   SELECT news.*, categories_news.name AS category_news_name
  //   FROM news
  //   INNER JOIN categories_news ON categories_news.id = news.category
  //   WHERE news.id = $1`, [newsId]);
  //   return row;
  // }

  async create(content) {
    const [row] = await db.query(`
      INSERT INTO news_content(content)
      VALUES($1)
      RETURNING *
    `, [content]);

    return row;
  }

  // async delete(id) {
  //   const deleteOp = await db.query(`
  //   DELETE FROM news WHERE id = $1
  //   `, [id]);

  //   return deleteOp;
  // }
}

module.exports = new NewsRepository();
