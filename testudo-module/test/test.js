import fs from 'fs';
import lighthouse from 'lighthouse';
// imports the desktop-specific parameters for config
import config from './config.js';
const { desktopConfig, options, chrome } = config;

const runnerResult = await lighthouse(
  'https://www.codesmith.io',
  options,
  desktopConfig
);

// `.report` is the HTML report as a string
const reportHtml = runnerResult.report;
fs.writeFileSync('lhreport.html', reportHtml);

// `.lhr` is the Lighthouse Result as a JS object
console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);
console.log(
  'Performance score was',
  runnerResult.lhr.categories.performance.score * 100
);
// object containing base metrics, eventually will display these to web app
const metricsHolder = {
  'First Contentful Paint':
    runnerResult.lhr.audits['first-contentful-paint'].displayValue,
  'Speed Index': runnerResult.lhr.audits['speed-index'].displayValue,
  'Time To Interactive': runnerResult.lhr.audits['interactive'].displayValue,
  'Largest Contentful Paint':
    runnerResult.lhr.audits['largest-contentful-paint'].displayValue,
  'Total Blocking Time':
    runnerResult.lhr.audits['total-blocking-time'].displayValue,
  'Cumulative Layout Shift':
    runnerResult.lhr.audits['cumulative-layout-shift'].displayValue,
};

console.log(metricsHolder);

await chrome.kill();
