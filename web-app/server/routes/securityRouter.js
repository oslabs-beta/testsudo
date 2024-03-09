import express from 'express';
const router = express.Router();
import securityController from '../controllers/securityController.js';

router.get('/scan-report', securityController.runBearerScript);

export default router;
