// const express = require('express');
import express from 'express';
const router = express.Router();

// const metricsController = require('../controllers/metricsController.js')
import metricsController from '../controllers/metricsController.js';

router.post('/write', metricsController.postData);

router.post('/query', metricsController.getData);

// module.exports = router;
export default router;
