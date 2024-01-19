const CadastroNewsletterRepository = require('../repositories/CadastroNewsletterRepository');
const validarEmail = require('../utilities/ValidateEmail');

class CadastroNewsletterController {
  // Filtro por e-mail
  async show(request, response) {
    const { email } = request.params;

    // Realizar a buscar
    const dataEmail = await CadastroNewsletterRepository.findByEmail(email);

    if (!dataEmail) {
      return response.status(404).json({ error: 'Category not found' });
    }

    response.json(dataEmail);
  }

  // cadastro de email
  async store(request, response) {
    const { email } = request.body;

    // Verificar se o e-mail já está cadastrado
    const existingEmail = await CadastroNewsletterRepository.findByEmail(email);

    if (existingEmail) {
      return response.status(400).json({ error: 'Este e-mail já está cadastrado!' });
    }

    // Vaerificar se o e-mail foi fornecido
    if (!email) {
      return response.status(400).json({ error: 'É necessário digitar um endereço de e-mail' });
    }

    // Validar o formato do e-mail
    if (!validarEmail(email)) {
      return response.status(400).json({ error: 'Esse não é um endereço de e-mail valido!' });
    }

    // Criar um novo registro
    const category = await CadastroNewsletterRepository.create({ email });

    response.json(category);
  }
}

module.exports = new CadastroNewsletterController();
