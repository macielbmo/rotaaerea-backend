const PostImage = require('../models/ImagePost');

class ImageUploadController {
  async index(request, response) {
    const [posts] = await PostImage.find();

    return response.json(posts);
  }

  async store(request, response) {
    const {
      originalname: name, size, key, location: url = '',
    } = request.file;

    const post = await PostImage.create({
      name,
      size,
      key,
      url,
    });

    return response.json(post);
  }

  async delete(request, response) {
    const post = await PostImage.findById(request.params.id);

    await post.deleteOne();

    return response.send();
  }
}

module.exports = new ImageUploadController();
