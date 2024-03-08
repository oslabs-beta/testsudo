// // const lighthouse = require('lighthouse');
// import fs from 'fs';
// import lighthouse from 'lighthouse';
// import * as chromeLauncher from 'chrome-launcher';
// // const chromeLauncher = require('chrome-launcher');

// // async function runLighthouse(url, opts, config = null) {
// //   const chrome = await chromeLauncher.launch({ chromeFlags: opts.chromeFlags });
// //   opts.port = chrome.port;
// //   const runnerResult = await lighthouse(url, opts, config);

// //   await chrome.kill();

// //   // Example: Log the performance score
// //   const performanceScore = runnerResult.lhr.categories.performance.score * 100;
// //   console.log(`Performance score: ${performanceScore}`);
// // }

// // // Usage example
// // const options = {
// //   chromeFlags: ['--headless']
// // };
// // runLighthouse('https://codesmith.io', options);



// async function runAudit(url) {
//     const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
//     const opts = {logLevel: 'info', output: 'html', port: chrome.port};
//     const results = await lighthouse(url, opts);
//     await chrome.kill();
//     return results;
// }

// export default runAudit;

import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';
import { setupMetrics } from './core/setup.js';


async function runLighthouseAudit(url, opts = null, config = null) {
    const chrome = await launch({ chromeFlags: ['--headless'] });
    opts = { ...opts, port: chrome.port };

    const runnerResult = await lighthouse(url, opts, config);
    await chrome.kill();

    return runnerResult.lhr; // Returning Lighthouse results
}

export { runLighthouseAudit, setupMetrics };
