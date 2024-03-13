import express from 'express';
const router = express.Router();

import metricsController from '../controllers/metricsController.js';

router.get('/:projectID', metricsController.getFEData, (req, res, next) => {
    return res.status(200).json(res.locals.FEmetrics)
});

router.post('/:projectID', metricsController.postData,  (req, res, next) => {
    return res.status(200)
});

export default router;
