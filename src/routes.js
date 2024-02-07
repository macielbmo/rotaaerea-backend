const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

// Importações Controller
const UserController = require('./app/controllers/UserController');
const UserCategoryController = require('./app/controllers/UsersCategoryController');
const CategoryNewsController = require('./app/controllers/CategoryNewsController');
const NewsController = require('./app/controllers/NewsController');
const ImageUploadController = require('./app/controllers/ImageUploadController');
const CadastroNewsletterController = require('./app/controllers/CadastroNewsletterController');

const router = Router();

// Rotas dos Users
router.get(
  '/users',
  (request, response, next) => {
    request.appId = 'MeuAppId';
    next();
  },
  UserController.index,
);
router.post('/users', UserController.store);
router.get('/users/:id', UserController.show);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

// Rotas das Categories Users
router.get('/categories-user', UserCategoryController.index);
router.post('/categories-user', UserCategoryController.store);
router.get('/categories-user/:name', UserCategoryController.show);
router.delete('/categories-user/:id', UserCategoryController.delete);

// Rotas das Categories News
router.get('/categories', CategoryNewsController.index);
router.post('/categories', CategoryNewsController.store);
router.get('/categories/:id', CategoryNewsController.show);
router.put('/categories/:id', CategoryNewsController.update);
router.delete('/categories/:id', CategoryNewsController.delete);

// Rota das Noticias
router.get('/news', NewsController.index);
router.get('/newsLimited', NewsController.getLimit);
router.get('/news/:id', NewsController.show);
router.post('/news', NewsController.store);
router.put('/news/:id', NewsController.update);
router.put('/news/updatestatus/:id', NewsController.updateStatus);
router.delete('/news/:id', NewsController.delete);

// Rota do Upload de imagem
router.post('/image', multer(multerConfig).single('file'), ImageUploadController.store);
router.get('/image', ImageUploadController.index);
router.delete('/image/:id', ImageUploadController.delete);

// Newsletter
router.get('/newsletter/:email', CadastroNewsletterController.show);
router.post('/newsletter', CadastroNewsletterController.store);

module.exports = router;
