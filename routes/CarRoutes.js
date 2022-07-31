var express = require('express');
var router = express.Router();
var controller = require('../controllers/CarController');

router.get('/:keyword', controller.getCarName);

module.exports = router;