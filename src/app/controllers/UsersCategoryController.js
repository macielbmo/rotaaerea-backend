const UserCategoriesRepository = require('../repositories/UserCategoriesRepository');

class CategoryController {
  async index(request, response) {
    const categories = await UserCategoriesRepository.findAll();

    response.json(categories);
  }

  async show(request, response) {
    const { name } = request.params;
    const category = await UserCategoriesRepository.findByName(name);

    response.json(category);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const category = await UserCategoriesRepository.create({ name });

    response.json(category);
  }

  async delete(request, response) {
    const { id } = request.params;

    await UserCategoriesRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
