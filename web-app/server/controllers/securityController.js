import { bearerScriptJson } from '../../bearerScriptJson.js';
import fs from 'fs';
import path from 'path';

const securityController = {};

securityController.runBearerScript = async (req, res, next) => {
  try {
    bearerScriptJson();

    const reportFilePath = path.resolve(__dirname, '../../scan_report.json');
    const reportContent = fs.readFileSync(reportFilePath, 'utf-8');
    const reportData = JSON.parse(reportContent);

    res.json({ data: reportData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
    return next();
  }
};

export default securityController;
