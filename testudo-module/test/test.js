import fs from 'fs';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
// imports the desktop-specific parameters for config
import { throttling, screenEmulation, emulatedUserAgent } from './constants.js';

const chrome = await chromeLauncher.launch({
  chromeFlags: ['--headless'],
});
const options = {
  logLevel: 'info',
  output: 'html', // <-- change output to html/json as needed
  onlyCategories: ['performance'],
  port: chrome.port,
};
// used as 3rd parameter for lighthouse function, desktop
const config = {
  extends: 'lighthouse:default',
  settings: {
    maxWaitForFcp: 15 * 1000,
    maxWaitForLoad: 35 * 1000,
    formFactor: 'desktop',
    throttling,
    screenEmulation,
    emulatedUserAgent,
    skipAudits: [
      // Skip the h2 audit so it doesn't lie to us. See https://github.com/GoogleChrome/lighthouse/issues/6539
      'uses-http2',
      // There are always bf-cache failures when testing in headless. Reenable when headless can give us realistic bf-cache insights.
      'bf-cache',
    ],
  },
};
const runnerResult = await lighthouse(
  'https://www.codesmith.io',
  options,
  config
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
