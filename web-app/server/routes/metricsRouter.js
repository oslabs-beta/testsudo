import express from 'express';
const router = express.Router();

import metricsController from '../controllers/metricsController.js';

router.post('/write', metricsController.postData);

router.post('/query', metricsController.getData);

export default router;
