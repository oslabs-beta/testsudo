const express = require('express');
const router = express.Router();

const metricsController = require('../controllers/metricsController.js');

router.get('/:projectID', metricsController.getFEData, metricsController.getBEData, metricsController.getSecurityData, (req, res, next) => {
    return res.status(200).json({
        FEmetrics: res.locals.FEmetrics, 
        BEmetrics: res.locals.BEmetrics, 
        latestFE: res.locals.latestFE,
        latestBE: res.locals.latestBE,
        securityMetrics: res.locals.securityMetrics
    });
});

router.post('/FE/:projectID', metricsController.postFEData,  (req, res, next) => {
    return res.status(200).end();
});

router.post('/BE/:projectID', metricsController.postBEData, (req, res, next) => {
    return res.status(200).end();
})

router.post('/security/:projectID', metricsController.postSecurityData, (req, res, next) => {
    return res.status(200).end();
})

module.exports = router;
