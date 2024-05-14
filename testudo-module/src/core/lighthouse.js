const fs = require('fs');
require('dotenv').config();
const PROJECTID = process.env.PROJECTID;
const URL = process.env.URL;

const runLighthouse = async (address, projectID) => {
  const configPromise = require('./lighthouse-config');
  const config = await configPromise; 
  const { desktopConfig, options, chrome } = config;

  console.log('address is ', address);

  const postData = async (url, data) => {
    const { default: fetch } = await import('node-fetch');
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

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

  await chrome.kill();
};

module.exports = runLighthouse;
