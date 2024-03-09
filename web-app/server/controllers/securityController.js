import runBearerScript from '../../../bearerScriptJson.js';
import fs from 'fs';
import path from 'path';

const securityController = {};

securityController.runBearerScript = (req, res, next) => {
  try {
    runBearerScript();
    console.log('running bearer script');
    const reportFilePath = path.resolve(__dirname, '../../scan_report.json');
    const reportContent = fs.readFileSync(reportFilePath, 'utf-8');
    const reportData = JSON.parse(reportContent);

    res.json({ data: reportData });
    console.log(reportData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
    return next();
  }
};

export default securityController;
