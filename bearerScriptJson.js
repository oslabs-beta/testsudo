const { spawn } = require('child_process'); // Import spawn from child_process
const fs = require('fs');

function bearerScriptJson(callback) {
  //path for directory to scan
  const cwd = process.cwd(); // Get the current working directory

  const scanProcess = spawn('bearer', ['scan', cwd, '--format=json']);

  let output = '';

  scanProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  scanProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  scanProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);

    try {
      // Save output directly to JSON file
      fs.writeFileSync('scan_report.json', output);
      console.log('Output saved to scan_report.json');
      if (callback) {
        callback(); // Invoke the callback function
      }
    } catch (error) {
      console.error('Error saving output to file:', error);
    }
  });
}

module.exports = bearerScriptJson;
