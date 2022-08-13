const express = require('express');
const router = express.Router();
const controller = require('../controllers/PropertyController');

router.get('/', controller.getProperties);
router.post('/', controller.addProperty);
router.post('/getProperty', controller.getProperty);


module.exports = router;