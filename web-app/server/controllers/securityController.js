import runBearerScript from '../../../bearerScriptJson.js';
import fs from 'fs';
import path from 'path';

const securityController = {};

securityController.runBearerScript = async (req, res, next) => {
  try {
    console.log('running bearer script');
    await runBearerScript();
    console.log('Script completed. Sending success response.');
  } catch (error) {
    res.status(200).json({ message: 'Scan has been completed' });
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
    return next();
  }
};

securityController.readReport = (req, res, next) => {
  try {
    const reportFilePath = path.resolve(__dirname, '../../scan_report.json');
    const reportContent = fs.readFileSync(reportFilePath, 'utf-8');
    const reportData = JSON.parse(reportContent);

    console.log(reportData);
    res.json({ data: reportData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
    return next();
  }
};

export default securityController;

// const reportFilePath = path.resolve(__dirname, '../../scan_report.json');
// const reportContent = fs.readFileSync(reportFilePath, 'utf-8');
// const reportData = JSON.parse(reportContent);

// res.json({ data: reportData });
// console.log(reportData);
