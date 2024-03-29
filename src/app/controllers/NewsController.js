const NewsRepository = require('../repositories/NewsRepository');
const db = require('../../database');
const NewsContentRepository = require('../repositories/NewsContentRepository');
const CategoriesNewsRepository = require('../repositories/CategoriesNewsRepository');

class NewsController {
  // Listar todos os registros
  async index(request, response) {
    const { orderBy } = request.query;
    const users = await NewsRepository.findAll(orderBy);

    response.json(users);
  }

  // Listar número maximo de registros
  async getLimit(request, response) {
    const { limit, id, idcategory } = await request.query;

    const { orderBy } = request.query;

    const users = await NewsRepository.findLimit(orderBy, limit, id, idcategory);

    response.json(users);
  }

  // Listar por ID da noticia
  async show(request, response) {
    const { id } = request.params;
    const news = await NewsRepository.findById(id);
    response.json(news);
  }

  // Criar um novo registro
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

    try {
      // Criar o newsContent e obter o ID
      const newsContent = await NewsContentRepository.create(content);
      if (!newsContent || !newsContent.id) {
        return response.status(500).json({ error: 'Error creating news content' });
      }

      const contentId = newsContent.id;

      // Obter o ID da categoria
      const [categoryResult] = await db.query(`
        SELECT id
        FROM categories_news
        WHERE name = ($1)
      `, [category]);

      const categoryId = categoryResult.id;

      // Criar o registro na tabela news usando o ID do newsContent
      const news = await NewsRepository.create({
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
      });

      // Responder com os dados do news
      response.json(news);
    } catch (error) {
      console.error('Error creating news:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  }

  // Update News
  async update(request, response) {
    const { id } = request.params;

    const {
      title,
      subtitle,
      content_id,
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

    try {
      // Atualizar o Content
      const newsContent = await NewsContentRepository.update(content_id, content);

      // Obter o ID da categoria
      const categoryResult = await CategoriesNewsRepository.getId(category);

      const categoryId = categoryResult.id;

      // Editar noticia
      const news = await NewsRepository.update({
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
      });

      // Responder com os dados do news
      response.status(204);
    } catch (error) {
      console.error('Error update news:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  }

  // Update Satatus News
  async updateStatus(request, response) {
    const { id } = request.params;
    const { status } = request.body;

    const news = await NewsRepository.updateStatus({ id, status });
    response.sendStatus(204);
  }

  // Apagar um registro
  async delete(request, response) {
    const { id } = request.params;

    await NewsRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new NewsController();
