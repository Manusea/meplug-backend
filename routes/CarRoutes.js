var express = require('express');
var router = express.Router();
var controller = require('../controllers/CarController');

router.get('/', controller.getCarName);

module.exports = router;