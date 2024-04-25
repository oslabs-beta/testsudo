const { execSync } = require('child_process');
const path = require('path');
const bearerScriptJson = require('../../../bearerScriptJson.js');
const { fileURLToPath } = require('url');
const { dirname } = require('path');
const fs = require('fs');
const db = require('../models/sql.js');
const { Security } = require('../models/mongodb.js');

// Adjust the path as needed
const securityController = {};
securityController.runBearerScript = (req, res, next) => {
  try {
    console.log('Running bearer scan script...');
    bearerScriptJson(() => {
      console.log('Bearer scan script executed successfully.');
      // Respond with a success message or perform other actions as needed
      res.status(200).json({ message: 'Scan completed' });
      return next();
    });
  } catch (error) {
    console.error('Error executing bearer scan script:', error);
    // Respond with an error message or perform other error handling actions
  }
};
// Reading report and transforming it into more concise version
function transformData(inputObj) {
  const transformedData = [];
  for (const severityLevel in inputObj) {
    //iterate over report based on severety level
    inputObj[severityLevel].forEach((report) => {
      const { cwe_ids, title, description, filename, line_number } = report;

      //create new object with specified keys and values

      //removing all unwanted characters from description
      const formattedDescription = description
        .replace(/## Description\n\n/, '')
        .replace(/## Remediations\n\n❌/, '')
        .replace(/✅/, '')
        .replace(/```javascript\n/g, '```')
        .replace(/```/g, '\n```')
        .replace(/## Resources\n.*/, '')
        .replace(/\n/g, '');

      const transformedObj = {
        severity: severityLevel.toUpperCase(),
        cwe_id: cwe_ids[0],
        title: title,
        description: formattedDescription,
        filename: filename,
        line_number: line_number,
      };
      transformedData.push(transformedObj);
    });
  }
  return transformedData;
}

securityController.readReport = (req, res, next) => {
  try {
    console.log('ReadReport is running');

    //reading report
    const reportFilePath = path.resolve(__dirname, '../../../scan_report.json');
    const reportContent = fs.readFileSync(reportFilePath, 'utf-8');
    const reportData = JSON.parse(reportContent);

    //parsing through report and creating a new, better readable version

    // console.log(reportData);
    const editedReport = transformData(reportData);
    // console.log(editedReport);
    // res.json({ data: editedReport });
    console.log('Sending response...');
    res.locals.editedReport = editedReport;
    console.log('Response sent');

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
    return next();
  }
};

// Posting data to mongoDB

securityController.postSecurityDataMongo = async (req, res, next) => {
  try {
    const editedReport = res.locals.editedReport;
    const projectID = req.params.projectID;

    const securityDataArray = [];
    for (const entry of editedReport) {
      const { severity, cwe_id, title, description, filename, line_number } =
        entry;
      const securityData = {
        severity,
        cwe_id,
        title,
        description,
        filename,
        line_number,
      };

      //push securityData obj into the array
      securityDataArray.push(securityData);
    }

    //find the projectID in db, if doesn't exist create the obj with project ID and data array
    //if exists, update the data

    const savedData = await Security.findOneAndUpdate(
      { projectID: projectID },
      { $set: { data: securityDataArray } },
      { upsert: true, new: true }
    );
    console.log('Scan results added to database');
    res.json(savedData);
    res.locals.securityDataArray = savedData;
  } catch (err) {
    return next({
      log:
        'securityController.postSecurityDataMongo - error adding project data: ' +
        err,
      status: 500,
      message: {
        err: 'securityController.postSecurityDataMongo - error adding project data:',
      },
    });
  }
};

securityController.getReportById = async (req, res, next) => {
  try {
    const projectID = req.params.projectID;
    // console.log(projectID);
    const project = await Security.findOne({ projectID: projectID });
    // console.log(project);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    // console.log(project);
    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
    return next();
  }
};

module.exports = securityController;
