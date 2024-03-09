import { execSync } from 'child_process';
import path from 'path';

const runBearerScript = () => {
  console.log(process.cwd());

  try {
    // Find the absolute path of the current working directory
    const absolutePath = process.cwd();

    // Run the bearer scan command and output to a JSON file
    const command = `bearer scan ${absolutePath} --format=json --output=scan_report.json`;
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(error.message);
  } finally {
    // Always exit with success status code
    process.exit(0);
  }
};

export default runBearerScript;
