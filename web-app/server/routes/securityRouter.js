import express from 'express';
import securityController from '../controllers/securityController';
const router = express.Router();

router.get('/scan-report', securityController.runBearerScript);

export default router;
