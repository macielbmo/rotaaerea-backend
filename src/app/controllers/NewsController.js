const NewsRepository = require('../repositories/NewsRepository');

class NewsController {
  async store(request, response) {
    const {
      editorContent,
      titleNews,
      subtitle,
      author,
      fonteTitle,
      urlFonte,
      image,
      descriptionImg,
    } = request.body;

    if (!titleNews) {
      return response.status(400).json({ error: 'Title is required' });
    }
    if (!editorContent) {
      return response.status(400).json({ error: 'Content news is required' });
    }
    if (!author) {
      return response.status(400).json({ error: 'Author is required' });
    }
    if (!image) {
      return response.status(400).json({ error: 'Image is required' });
    }
    if (!titleNews) {
      return response.status(400).json({ error: 'Title is required' });
    }

    const news = await NewsRepository.create({
      editorContent,
      titleNews,
      subtitle,
      author,
      fonteTitle,
      urlFonte,
      image,
      descriptionImg,
    });

    response.json(news);
  }
}

module.exports = new NewsController();
