// import { execSync } from 'child_process';

// import path from 'path';
const { execSync } = require('child_process');
const path = require('path');
// Find the absolute path of the current working directory
try {
  const absolutePath = process.cwd();
  // const absolutePath =
  //   '/Users/admin/Desktop/Github/testudo/web-app/server/routes';

  // Run the bearer scan command
  const command = `bearer scan ${absolutePath}`;
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error(error.message);
}
// finally {
//   // Always exit with success status code
//   process.exit(0);
// }
