var express = require('express');
var router = express.Router();
var controller = require('../controllers/UserController');

router.post('/', controller.getUsers);
router.post('/topup', controller.topup);
router.post('/withdraw', controller.withdraw);
router.post('/getCars', controller.getUserCars);
router.post('/addCharging', controller.addCharging);
router.post('/getCharging', controller.getCharging);
router.post('/endCharging', controller.endCharging);
router.post('/getHistory', controller.getUserHistory);

module.exports = router;