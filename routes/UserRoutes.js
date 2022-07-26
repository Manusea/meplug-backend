var express = require('express');
var router = express.Router();
var controller = require('../controllers/UserController');

router.post('/', controller.getUsers)

module.exports = router;