// import { exec } from 'child_process';
// import path from 'path';
// import { promisify } from 'util';

// try {
//   // Find the absolute path of the current working directory
//   // const absolutePath = process.cwd();
//   const absolutePath =
//     '/Users/pavelkrapivin/Desktop/codesmith/testudo/web-app/server/controllers';
//   // Run the bearer scan command and output to a JSON file
//   const command = `bearer scan ${absolutePath} --format=json --output=scan_report.json`;
//   exec(command, { stdio: 'inherit' });
// } catch (error) {
//   console.error(error.message);
// }

//**********
// const runBearerScript = async () => {
//   try {
//     // Find the absolute path of the current working directory
//     // const absolutePath = process.cwd();
//     const absolutePath =
//       '/Users/pavelkrapivin/Desktop/codesmith/testudo/web-app/server/controllers';
//     // Run the bearer scan command and capture the output
//     const command = `bearer scan ${absolutePath} --format=json`;
//     const { stdout, stderr } = await execAsync(command);
//     console.log('Log from the bearer script->>>', stdout);
//     // Check for errors in stderr
//     if (stderr) {
//       console.error(stderr);
//       throw new Error('Error running bearer scan command');
//     }

//     // Parse the JSON output
//     const scanResult = JSON.parse(stdout);

//     return scanResult;
//   } catch (error) {
//     console.error(error.message);
//     throw error;
//   }
// };

// export default runBearerScript;

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
    const absolutePath = process.cwd();
    // const absolutePath =
    //   '/Users/pavelkrapivin/Desktop/codesmith/testudo/web-app/server/controllers';

    // Run the bearer scan command and output to a JSON file
    const command = `bearer scan ${absolutePath} --format=json --output=scan_report.json`;
    // const command = `bearer scan ${absolutePath} --report security --output scan_report.json`;
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(error.message);
    throw error;
  }
  // } finally {
  //   // Always exit with success status code
  //   process.exit(0);
  // }
};

module.exports = runBearerScript;
