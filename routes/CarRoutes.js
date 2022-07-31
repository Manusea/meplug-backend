var express = require('express');
var router = express.Router();
var controller = require('../controllers/CarController');

router.post('/', controller.getCarName);

module.exports = router;