import express from 'express';
const router = express.Router();

import metricsController from '../controllers/metricsController.js';

router.get('/:projectID', metricsController.getData, (req, res, next) => {
    return res.status(200).json(res.locals.project)
});

router.post('/:projectID', metricsController.postData,  (req, res, next) => {
    return res.status(200)
});

export default router;
