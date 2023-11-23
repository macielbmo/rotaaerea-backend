const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const UserController = require('./app/controllers/UserController');
const UserCategoryController = require('./app/controllers/UsersCategoryController');
const CategoryNewsController = require('./app/controllers/CategoryNewsController');
const NewsController = require('./app/controllers/NewsController');
const ImageUploadController = require('./app/controllers/ImageUploadController');

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

// Rotadas das Categories News
router.get('/categories', CategoryNewsController.index);
router.post('/categories', CategoryNewsController.store);
router.get('/categories/:id', CategoryNewsController.show);
router.put('/categories/:id', CategoryNewsController.update);
router.delete('/categories/:id', CategoryNewsController.delete);

// Rota das Noticias
router.get('/news', NewsController.index);
router.get('/news/:id', NewsController.show);
router.post('/news', NewsController.store);
router.delete('/news/:id', NewsController.delete);

// Rota do Upload de imagem
router.post('/image', multer(multerConfig).single('file'), ImageUploadController.store);
router.get('/image', ImageUploadController.index);
router.delete('/image/:id', ImageUploadController.delete);

module.exports = router;
