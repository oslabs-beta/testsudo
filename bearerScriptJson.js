const { execSync } = require('child_process');
const path = require('path');

const runBearerScript = () => {
  // console.log(process.cwd());

  try {
    // Find the absolute path of the current working directory
    // if (!process.env.BEARER_API_KEY) {
    //   console.error('BEARER_API_KEY environment variable is not set.');
    //   process.exit(1); // Exit the script with an error code
    // }
    // const absolutePath = process.cwd();
    const absolutePath =
      '/Users/admin/Desktop/Github/testudo/web-app/server/';

    // Run the bearer scan command and output to a JSON file
    const command = `bearer scan ${absolutePath} --format json --output scan_report.json --exit-code 0`;
    console.log(command);
    // const command = `bearer scan ${absolutePath} --report security --output scan_report.json`;
    execSync(command, { stdio: 'inherit' });
    console.log('Scan completed successfully.');
    return 'Scan completed successfully';
  } catch (error) {
    console.error('Error running bearer scan:', error);
  }
  // } finally {
  //   // Always exit with success status code
  //   process.exit(0);
  // }
};

module.exports = runBearerScript;
