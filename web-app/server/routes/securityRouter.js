const express = require('express');
const router = express.Router();
const securityController = require('../controllers/securityController.js');

router.get('/scan-report', securityController.runBearerScript);
router.get('/get-report/:projectID', securityController.getReportById);
router.post(
  '/postSecurityData/:projectID',
  // securityController.runBearerScript,
  // securityController.readReport,
  securityController.postSecurityDataMongo
);
module.exports = router;
