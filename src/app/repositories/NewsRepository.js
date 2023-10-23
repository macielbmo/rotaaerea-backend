const db = require('../../database');

class NewsRepository {
  async create({
    editorContent,
    titleNews,
    subtitle,
    author,
    fonteTitle,
    urlFonte,
    image,
    descriptionImg,
  }) {
    const [row] = await db.query(`
      INSERT INTO news(title, subtitle, content, author, news_source, url_source, url_image, image_description)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [titleNews, subtitle, editorContent, author, fonteTitle, urlFonte, image, descriptionImg]);

    return row;
  }
}

module.exports = new NewsRepository();
