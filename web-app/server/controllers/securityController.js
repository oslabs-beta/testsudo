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
import db from '../models/sql.js';

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
    return next();
  } catch (error) {
    console.error('Error executing bearer scan script:', error);
    // Respond with an error message or perform other error handling actions
  }
};

securityController.readReport = (req, res, next) => {
  try {
    console.log('ReadReport is running');
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

securityController.postSecurityData = (req, res, next) => {
  try {
    const projectID = req.params.projectID;
    const { cwe_ids, title, full_filename, line_number } = req.body;
    const value = [projectID, cwe_ids, title, full_filename, line_number];
    const postQuery = `INSERT INTO metrics
      (projectID, cwe_ids, title, full_filename, line_number)
      VALUES 
      ($1, $2, $3, $4, $5)`;

    db.query(postQuery, value).then((data) => {
      return next();
    });
  } catch (err) {
    return next({
      log: 'metricsController.postData - error adding project data: ' + err,
      status: 500,
      message: {
        err: 'metricsController.postData - error adding project data:',
      },
    });
  }
};

// securityController.readAndPostSecurityData = (req, res, next) => {
//   try {
//     // Read the report data
//     const reportFilePath = path.resolve(__dirname, '../../../scan_report.json');
//     const reportContent = fs.readFileSync(reportFilePath, 'utf-8');
//     const reportData = JSON.parse(reportContent);

//     // Post the report data to the database
//     const projectID = req.params.projectID;
//     const promises = reportData.map((data) => {
//       const { cwe_ids, title, full_filename, line_number } = data;
//       const values = [projectID, cwe_ids, title, full_filename, line_number];
//       const postQuery = `
//         INSERT INTO metrics
//         (projectID, cwe_ids, title, full_filename, line_number)
//         VALUES
//         ($1, $2, $3, $4, $5)`;

//       return db.query(postQuery, values);
//     });

//     // Wait for all insertions to complete
//     Promise.all(promises)
//       .then(() => {
//         res.json({ message: 'Data inserted successfully' });
//       })
//       .catch((error) => {
//         console.error('Error inserting data:', error);
//         res.status(500).json({ error: 'Internal server error' });
//       });
//   } catch (error) {
//     console.error('Error reading report:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
securityController.readAndPostSecurityData = async (req, res, next) => {
  try {
    // Read the report data
    const reportFilePath = path.resolve(__dirname, '../../../scan_report.json');
    const reportContent = fs.readFileSync(reportFilePath, 'utf-8');

    // Parse the report data
    const reportData = JSON.parse(reportContent);

    // Check if reportData is an object
    if (typeof reportData !== 'object') {
      throw new Error('Invalid report data format: expected an object');
    }

    // Define an array to hold filtered reports
    const filteredReports = [];

    // Iterate over each severity level in the report data
    for (const level of Object.keys(reportData)) {
      const reportsForLevel = reportData[level] || [];
      console.log(`Reports for ${level}:`, reportsForLevel);
      for (const report of reportsForLevel) {
        const filteredReport = {};
        for (const key in report) {
          if (req.body.hasOwnProperty(key)) {
            filteredReport[key] = report[key];
          }
        }
        filteredReports.push(filteredReport);
      }
      console.log(`Filtered reports for ${level}:`, filteredReports);
    }

    // Post the filtered report data to the database
    const projectID = req.params.projectID;
    const promises = filteredReports.map((data) => {
      const { cwe_ids, title, full_filename, line_number } = data;
      const values = [projectID, cwe_ids, title, full_filename, line_number];
      const postQuery = `
        INSERT INTO metrics
        (projectID, cwe_ids, title, full_filename, line_number)
        VALUES 
        ($1, $2, $3, $4, $5)`;

      // return db.query(postQuery, values);
      return db.query(postQuery, values);
    });

    // Wait for all insertions to complete
    Promise.all(promises)
      .then(() => {
        res.json({ message: 'Data inserted successfully' });
      })
      .catch((error) => {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  } catch (error) {
    console.error('Error reading or inserting report data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default securityController;
