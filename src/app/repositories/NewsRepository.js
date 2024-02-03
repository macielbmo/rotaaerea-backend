const db = require('../../database');

class NewsRepository {
  async findAll(orderBy = 'DESC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
    SELECT news.*, categories_news.name AS category_news_name
    FROM news
    LEFT JOIN categories_news ON categories_news.id = news.category_news
    ORDER BY news.created_at ${direction}`);
    return rows;
  }

  async findLimit(orderBy = 'DESC', limit = 10, id = null, idcategory = null) {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
    SELECT news.*, categories_news.name AS category_news_name
    FROM news
    LEFT JOIN categories_news ON categories_news.id = news.category_news
    WHERE
      (news.id <> $1 OR news.id IS NULL)
      AND news.category_news = $2
    ORDER BY news.created_at ${direction}
    LIMIT $3`, [id, idcategory, limit]);
    return rows;
  }

  async findById(newsId) {
    const [row] = await db.query(`
    SELECT
      news.*,
      categories_news.name AS category_news_name,
      news_content.content as content
    FROM
      news
    INNER JOIN
      categories_news ON categories_news.id = news.category_news
    INNER JOIN
      news_content ON news_content.id = news.content_id
    WHERE
      news.id = $1`, [newsId]);
    return row;
  }

  async create({
    title,
    subtitle,
    contentId,
    author,
    sourceNews,
    urlSource,
    urlImg,
    descriptionImg,
    categoryId,
    tags,
    toSchedule,
    status,
  }) {
    const [row] = await db.query(`
      INSERT INTO news(title, subtitle, content_id, author, news_source, url_source, url_img, img_description, status, schedule, category_news, tags)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *
    `, [title, subtitle, contentId, author, sourceNews, urlSource, urlImg, descriptionImg, status, toSchedule, categoryId, tags]);

    return row;
  }

  async update({
    id,
    title,
    subtitle,
    author,
    sourceNews,
    urlSource,
    urlImg,
    descriptionImg,
    categoryId,
    tags,
    toSchedule,
    status,
  }) {
    const update_news = await db.query(`
      UPDATE  news
      SET     title = $2,
              subtitle = $3,
              author = $4,
              sourceNews = $5,
              urlSource = $6,
              urlImg = $7,
              descriptionImg = $8,
              categoryId = $9,
              tags = $10,
              toSchedule = $11,
              status = $12,
      WHERE   news.id = $1
    `, [id, title, subtitle, author, sourceNews, urlSource, urlImg, descriptionImg, categoryId, tags, toSchedule, status]);

    return update_news;
  }

  async delete(id) {
    const deleteOp = await db.query(`
    DELETE FROM news WHERE id = $1
    `, [id]);

    return deleteOp;
  }
}

module.exports = new NewsRepository();
