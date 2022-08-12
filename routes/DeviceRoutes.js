var express = require('express');
var router = express.Router();
var controller = require('../controllers/DeviceController');

router.get('/data', controller.getData);
router.post('/sendHour', controller.sendHour);

module.exports = router;