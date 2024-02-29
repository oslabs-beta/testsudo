const express = require('express');
const router = express.Router();

const metricsController = require('../controllers/metricsController.js')

router.post('/write', metricsController.postData)

router.post('/query', metricsController.getData)

module.exports = router;