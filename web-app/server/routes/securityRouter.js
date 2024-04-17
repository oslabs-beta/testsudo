const express = require('express');
const router = express.Router();
const securityController = require('../controllers/securityController.js');

router.get('/scan-report', securityController.readReport);
router.post(
  '/postSecurityData/:projectID',
  securityController.readReport,
  securityController.postSecurityDataMongo
);
module.exports = router;
