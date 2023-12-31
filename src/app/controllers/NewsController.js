const NewsRepository = require('../repositories/NewsRepository');
const db = require('../../database');

class NewsController {
  async index(request, response) {
    // Listar todos os registros
    const { orderBy } = request.query;
    const users = await NewsRepository.findAll(orderBy);

    response.json(users);
  }

  async show(request, response) {
    const { id } = request.params;
    const news = await NewsRepository.findById(id);

    console.log(news);

    response.json(news);
  }

  async store(request, response) {
    const {
      title,
      subtitle,
      content,
      author,
      sourceNews,
      urlSource,
      urlImg,
      descriptionImg,
      category,
      tags,
      toSchedule,
      status,
    } = request.body;

    if (!title) {
      return response.status(400).json({ error: 'Title is required' });
    }
    if (!content) {
      return response.status(400).json({ error: 'Content news is required' });
    }
    if (!author) {
      return response.status(400).json({ error: 'Author is required' });
    }
    if (!urlImg) {
      return response.status(400).json({ error: 'Image is required' });
    }

    const [categoryUUID] = await db.query(`
      SELECT id
      FROM categories_news
      WHERE name = ($1)
    `, [category]);

    const categoryId = categoryUUID.id;

    const news = await NewsRepository.create({
      title,
      subtitle,
      content,
      author,
      sourceNews,
      urlSource,
      urlImg,
      descriptionImg,
      categoryId,
      tags,
      toSchedule,
      status,
    });

    response.json(news);
  }

  async delete(request, response) {
    const { id } = request.params;

    await NewsRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new NewsController();
