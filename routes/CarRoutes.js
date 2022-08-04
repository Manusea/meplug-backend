var express = require('express');
var router = express.Router();
var controller = require('../controllers/CarController');

router.post('/', controller.getCarName);
router.get('/fetch', controller.getCarData);
router.post('/add', controller.addCarToUser);
router.post('/uploads', controller.uploadImage);

module.exports = router;