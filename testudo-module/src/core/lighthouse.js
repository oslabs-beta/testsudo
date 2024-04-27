
const fs = require('fs');
require('dotenv').config();
const PROJECTID = process.env.PROJECTID;
const URL = process.env.URL;

// Properly awaiting the imported config which is now a promise due to async Chrome launch
const runLighthouse = async (address, projectID) => {
  // Load the configuration asynchronously
  const configPromise = require('./lighthouse-config');
  const config = await configPromise; // Await the resolution of the config promise
  const { desktopConfig, options, chrome } = config;

  console.log('address is ', address);

  const postData = async (url, data) => {
    // Dynamically import node-fetch as it's an ES module
    const { default: fetch } = await import('node-fetch');
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    // You might want to handle the response
  };

  // Dynamically import lighthouse as it's an ES module
  const lighthouse = (await import('lighthouse')).default;

  const runnerResult = await lighthouse(address, options, desktopConfig);

  console.log('Report is done for', address);
  console.log(
    'Performance score was',
    runnerResult.lhr.categories.performance.score * 100
  );

    const metricsHolder = {
        projectID: PROJECTID,
        endpoint: address,
        firstContentfulPaint: runnerResult.lhr.audits['first-contentful-paint'].numericValue,
        speedIndex: runnerResult.lhr.audits['speed-index'].numericValue,
        largestContentfulPaint: runnerResult.lhr.audits['largest-contentful-paint'].numericValue,
        totalBlockingTime: runnerResult.lhr.audits['total-blocking-time'].numericValue,
        cumulativeLayoutShift: runnerResult.lhr.audits['cumulative-layout-shift'].numericValue,
        performance: runnerResult.lhr.categories.performance.score * 100,
        timeToInteractive: runnerResult.lhr.audits['interactive'].numericValue,
        totalByteWeight: runnerResult.lhr.audits['total-byte-weight'].numericValue,
        accessibility: runnerResult.lhr.categories.accessibility.score * 100,
        bestPractices: runnerResult.lhr.categories['best-practices'].score * 100
    };

  console.log(metricsHolder);

  postData(`http://localhost:3001/projects/FE/${projectID}`, metricsHolder);

  await chrome.kill(); // Make sure to close Chrome after your operations
};

module.exports = runLighthouse;
