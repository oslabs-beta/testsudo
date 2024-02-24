// // import runAudit from '../src/index.js';
// import { runLighthouseAudit } from '../src/index.js'; // Adjust the path as necessary

// // runAudit('https://www.codesmith.io')
// // .then(res => console.log('Audit completed'))
// // .catch(err => console.log('Audit failed: ', err));

// async function testLighthouseAudit() {
//     const url = 'https://codesmith.io';
//     try {
//         const results = await runLighthouseAudit(url);
//         console.log(`Lighthouse score for ${url}: ${results.categories.performance.score * 100}`);
//     } catch (error) {
//         console.error('Error running Lighthouse audit:', error);
//     }
// }

// testLighthouseAudit();

import fs from 'fs';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: chrome.port};
const runnerResult = await lighthouse('https://www.codesmith.io', options);

// `.report` is the HTML report as a string
const reportHtml = runnerResult.report;
fs.writeFileSync('lhreport.html', reportHtml);

// `.lhr` is the Lighthouse Result as a JS object
console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);
console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

await chrome.kill();