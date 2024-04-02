// import express from 'express';
// const router = express.Router();

// import metricsController from '../controllers/metricsController.js';

// router.get('/:projectID', metricsController.getFEData, metricsController.getBEData, (req, res, next) => {
//     return res.status(200).json({FEmetrics: res.locals.FEmetrics, BEmetrics: res.locals.BEmetrics, performance: res.locals.performance, response: res.locals.response})
// });

// router.post('/:projectID', metricsController.postData,  (req, res, next) => {
//     return res.status(200)
// });

// export default router;

const express = require('express');
const router = express.Router();

const metricsController = require('../controllers/metricsController.js');

router.get('/:projectID', metricsController.getFEData, metricsController.getBEData, (req, res, next) => {
    return res.status(200).json({
        FEmetrics: res.locals.FEmetrics, 
        BEmetrics: res.locals.BEmetrics, 
        performance: res.locals.performance, 
        response: res.locals.response
    });
});

router.post('/:projectID', metricsController.postData,  (req, res, next) => {
    return res.status(200).end();
});

module.exports = router;
