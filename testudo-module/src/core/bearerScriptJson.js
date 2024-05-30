const { exec } = require('child_process');
const axios = require('axios');
const path = require('path');

const runBearerScript = (projectID) => {
  console.log('runbearerscript project ID is ', projectID);
  try {
    const absolutePath = process.cwd();
    console.log(`Running Bearer scan on path: ${absolutePath}`);
    const command = `bearer scan ${absolutePath} --format=json --exit-code 0`;

    exec(command, async (error, stdout, stderr) => {
      console.log('Bearer command executed.');

      if (error) {
        console.error('Error running bearer scan:', error);
        return;
      }

      console.log('Bearer scan progress and info:', stderr);

      if (stdout) {
        console.log('Processing output...');
        try {
          const scanResults = JSON.parse(stdout);
          console.log(
            'First item of Bearer scan results:',
            scanResults.high[0]
          );
          const transformedData = transformData(scanResults);
          await postSecurityDataMongo(projectID, transformedData);
        } catch (parseError) {
          console.error('Error parsing bearer output:', parseError);
        }
      } else {
        console.log(
          'No output to process. Check for errors or issues in the scan command.'
        );
      }
    });
  } catch (error) {
    console.error('Failed to set up bearer scan:', error);
  }
};

const transformData = (inputObj) => {
  const transformedData = [];
  for (const severityLevel in inputObj) {
    inputObj[severityLevel].forEach((report) => {
      const transformedObj = {
        severity: severityLevel.toUpperCase(),
        cwe_id: report.cwe_ids[0],
        title: report.title,
        description: report.description.replace(/regex/g, ''),
        filename: report.filename,
        line_number: report.line_number,
      };
      transformedData.push(transformedObj);
    });
  }
  return transformedData;
};

const postSecurityDataMongo = async (projectID, data) => {
  try {
    const response = await axios.post(
      `http://testsudo-prod.eba-3rruicnb.us-east-1.elasticbeanstalk.com/projects/security/${projectID}`,
      data
    );
    console.log('Data successfully posted to MongoDB:');
  } catch (err) {
    console.error('Error posting data to MongoDB:', err);
  }
};

module.exports = runBearerScript;
