var express = require('express');
var router = express.Router();
var controller = require('../controllers/UserController');

router.post('/', controller.getUsers)
router.post('/topup', controller.topup)

module.exports = router;