const CategoriesNewsRepository = require('../repositories/CategoriesNewsRepository');

class CategoryNewsController {
  async index(request, response) {
    const { orderBy } = request.query;
    const categories = await CategoriesNewsRepository.findAll(orderBy);

    response.json(categories);
  }

  async show(request, response) {
    const { id } = request.params;
    const category = await CategoriesNewsRepository.findById(id);

    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }

    response.json(category);
  }

  async store(request, response) {
    const { name, color } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required!' });
    }

    const category = await CategoriesNewsRepository.create({ name, color });

    response.json(category);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, color } = request.body;

    if (!name) {
      return response.status(404).json({ error: 'User name required' });
    }

    const category = await CategoriesNewsRepository.update(id, { name, color });

    response.json(category);
  }

  async delete(request, response) {
    const { id } = request.params;
    await CategoriesNewsRepository.delete(id);

    response.sendStatus(200);
  }
}

module.exports = new CategoryNewsController();
