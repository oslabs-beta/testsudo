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
// const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: chrome.port};
const options = {
  logLevel: 'info',
  output: 'json',
  onlyCategories: ['performance'],
  // onlyAudits:[
  //   'first-contentful-paint',
  //   'speed-index',
  //   'total-blocking-time',
  //   'largest-contentful-paint',
  //   'cumulative-layout-shift'
  // ],
  // skipAudits: [
  //   'envrioment',
  //   'stackPacks',
  //   'configSettings',
  //   'fullPageScreenShot',
  //   // 'il8n'
  // ],
  port: chrome.port
};
const runnerResult = await lighthouse('https://www.codesmith.io', options);

const reducer = (json, ...keys) => {
  const reducedObj = {};

  const obj = JSON.parse(json);

  for(let key of keys){
    reducedObj[key] = obj[key];
  }

  const jsonReducedObj = JSON.stringify(reducedObj)
  return jsonReducedObj;
}
// `.report` is the HTML report as a string
// const reportHtml = runnerResult.report;
const reportJson = runnerResult.report;
// fs.writeFileSync('lhreport.html', reportHtml);
// json output
// fs.writeFileSync('performance-skipRules.json', reportJson);
const reducedReport = reducer(runnerResult.report, 'audits', 'categories');

console.log(reducedReport, '<---reducedReport');

fs.writeFileSync('performance-skipRules.json', reducedReport);

// `.lhr` is the Lighthouse Result as a JS object
// console.log(runnerResult.lhr, '<------runnerResult');
console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);
console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

await chrome.kill();