const express = require('express');
const router = express.Router();
const controller = require('../controllers/PropertyController');

router.get('/', controller.getProperties);
router.post('/', controller.addProperty);
router.post('/getProperty', controller.getProperty);
router.get('/detail', controller.getPropertyDetail);
router.get('/usage', controller.getUsage);


module.exports = router;