import { execSync } from 'child_process';
import path from 'path';

// Find the absolute path of the current working directory
const absolutePath = process.cwd();

// Run the bearer scan command
const command = `bearer scan ${absolutePath}`;
execSync(command, { stdio: 'inherit' });
