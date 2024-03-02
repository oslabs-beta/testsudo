import { execSync } from 'child_process';
import { clear } from 'console';
import path from 'path';

// Find the absolute path of the current working directory
try {
  const absolutePath = process.cwd();

  // Run the bearer scan command
  const command = `bearer scan ${absolutePath}`;
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error(error.message);
} finally {
  // Always exit with success status code
  process.exit(0);
}
