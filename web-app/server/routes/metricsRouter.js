import express from 'express';
const router = express.Router();

import metricsController from '../controllers/metricsController.js';

router.get('/:projectID', metricsController.getData);

router.post('/:projectID', metricsController.postData);

export default router;
