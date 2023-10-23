const UserCategoriesRepository = require('../repositories/UserCategoriesRepository');
const UsersRepository = require('../repositories/UsersRepository');

class UserController {
  async index(request, response) {
    // Listar todos os registros
    const { orderBy } = request.query;
    const users = await UsersRepository.findAll(orderBy);

    response.json(users);
  }

  async show(request, response) {
    // Obter UM registro
    const { id } = request.params;
    const user = await UsersRepository.findById(id);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(user);
  }

  async store(request, response) {
    // Criar novo registro
    const {
      name, email, phone, cpf, category_name, password,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const userExists = await UsersRepository.findByEmail(email);

    if (userExists) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const categoryRow = await UserCategoriesRepository.findByName(category_name);
    const category_id = categoryRow.id;

    const user = await UsersRepository.create({
      name, email, cpf, phone, category_id, password,
    });

    response.json(user);
  }

  async update(request, response) {
    // Editar um registro
    const { id } = request.params;
    const {
      name, email, phone, category_name, password,
    } = request.body;

    const userExists = await UsersRepository.findById(id);
    if (!userExists) {
      return response.status(404).json({ error: 'User not found' });
    }

    if (!name) {
      return response.status(404).json({ error: 'User name required' });
    }

    const userByEmail = await UsersRepository.findByEmail(email);
    if (userByEmail && userByEmail.id !== id) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const category_id = await UserCategoriesRepository.findByName(category_name);

    const user = await UsersRepository.update(id, {
      name, email, phone, category_id, password,
    });

    response.json(user);
  }

  async delete(request, response) {
    // Deletar um registro
    const { id } = request.params;

    await UsersRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new UserController();
