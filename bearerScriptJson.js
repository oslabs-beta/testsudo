import { exec } from 'child_process';
import path from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

// const runBearerScript = async () => {
//   console.log(process.cwd());

//   try {
//     // Find the absolute path of the current working directory
//     const absolutePath = process.cwd();

//     // Run the bearer scan command and output to a JSON file
//     const command = `bearer scan ${absolutePath} --format=json --output=scan_report.json`;
//     await execAsync(command, { stdio: 'inherit' });
//   } catch (error) {
//     console.error(error.message);
//   } finally {
//     // Always exit with success status code
//     process.exit(0);
//   }
// };

// export default runBearerScript;

const runBearerScript = async () => {
  try {
    // Find the absolute path of the current working directory
    const absolutePath = process.cwd();

    // Run the bearer scan command and capture the output
    const command = `bearer scan ${absolutePath} --format=json`;
    const { stdout, stderr } = await execAsync(command);

    // Check for errors in stderr
    if (stderr) {
      console.error(stderr);
      throw new Error('Error running bearer scan command');
    }

    // Parse the JSON output
    const scanResult = JSON.parse(stdout);

    return scanResult;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default runBearerScript;
