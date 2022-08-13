var express = require('express');
var router = express.Router();
var controller = require('../controllers/UserController');

router.post('/', controller.getUsers)
router.post('/topup', controller.topup)
router.post('/getCars', controller.getUserCars);
router.post('/addCharging', controller.addCharging);

module.exports = router;