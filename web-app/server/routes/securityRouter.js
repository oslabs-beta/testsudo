import express from 'express';
const router = express.Router();
import securityController from '../controllers/securityController.js';

router.get('/scan-report', securityController.readReport);
router.post(
  '/postSecurityData/:projectID',
  securityController.readReport,
  securityController.postSecurityData
);
export default router;
