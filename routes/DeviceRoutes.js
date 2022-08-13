var express = require('express');
var router = express.Router();
var controller = require('../controllers/DeviceController');

router.get('/data', controller.getData);
router.put('/sendCode', controller.sendCode);
router.get('/auth', controller.getAuth);
router.put('/sendHour', controller.sendHour);

module.exports = router;