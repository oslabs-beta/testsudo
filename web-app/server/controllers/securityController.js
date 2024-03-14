// import runBearerScript from '../../../bearerScriptJson.js';
// import fs from 'fs';
// import path from 'path';

// const securityController = {};

// securityController.runBearerScript = async (req, res, next) => {
//   try {
//     console.log('running bearer script');
//     await runBearerScript();
//     res
//       .status(200)
//       .json({ message: 'Script completed. Sending success response.' });
//   } catch (error) {
//     // res.status(200).json({ message: 'Scan has been completed' });
//     console.log(error);
//     res.status(500).json({ error: 'Internal server error' });
//     return next();
//   }
// };

// securityController.readReport = (req, res, next) => {
//   try {
//     const reportFilePath = path.resolve(__dirname, '../../scan_report.json');
//     const reportContent = fs.readFileSync(reportFilePath, 'utf-8');
//     const reportData = JSON.parse(reportContent);

//     console.log(reportData);
//     res.json({ data: reportData });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Internal server error' });
//     return next();
//   }
// };

// import { execSync } from 'child_process';

// const runNpmScriptSync = (scriptName) => {
//   try {
//     const command = `npm run ${scriptName}`;
//     const result = execSync(command, { encoding: 'utf-8' });

//     console.log(`npm script output: ${result}`);
//     console.log('npm script executed successfully');
//   } catch (error) {
//     console.error(`Error executing npm script: ${error.message}`);
//     throw new Error(`Error executing npm script: ${error.message}`);
//   }
// };

// const securityController = {};

// securityController.runBearerScript = (req, res, next) => {
//   try {
//     console.log('running bearer script');
//     runNpmScriptSync('sec_json');
//     console.log('Script completed. Sending success response.');
//     res.status(200).json({ message: 'Scan has been completed' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//     return next();
//   }
// };

// export default securityController;

// import runBearerScript from '../../../bearerScriptJson.js';
// import fs from 'fs';
// import path from 'path';

// const securityController = {};

// securityController.runBearerScript = (req, res, next) => {
//   try {
//     console.log('running bearer script');
//     runBearerScript();
//     // const reportFilePath = path.resolve(__dirname, '../../scan_report.json');
//     // const reportContent = fs.readFileSync(reportFilePath, 'utf-8');
//     // const reportData = JSON.parse(reportContent);

//     res.status(200).json({ message: 'scan complete' });
//     // console.log(reportData);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Internal server error' });
//     return next();
//   }
// };

// export default securityController;

import { execSync } from 'child_process';
import path from 'path';
import bearerScriptJson from '../../../bearerScriptJson.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Now you can use __dirname in your code

// Adjust the path as needed
const securityController = {};
securityController.runBearerScript = (req, res, next) => {
  try {
    console.log('Running bearer scan script...');
    bearerScriptJson(); // Call the exported function directly
    console.log('Bearer scan script executed successfully.');
    // Respond with a success message or perform other actions as needed
    res.status(200).json({ message: 'Scan completed' });
  } catch (error) {
    console.error('Error executing bearer scan script:', error);
    // Respond with an error message or perform other error handling actions
  }
};

securityController.readReport = (req, res, next) => {
  try {
    const reportFilePath = path.resolve(__dirname, '../../../scan_report.json');
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
