var express = require('express');
var router = express.Router();
var mainController = require('../controllers/main');

router.get('/', mainController.index);
router.get('/travel', mainController.travel);
router.get('/about', mainController.about);
router.get('/contact', mainController.contact);
router.get('/meals', mainController.meals);
router.get('/news', mainController.news);
router.get('/rooms', mainController.rooms);

module.exports = router;
