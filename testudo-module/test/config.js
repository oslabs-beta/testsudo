import * as chromeLauncher from 'chrome-launcher';

const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

const config = {
  desktopConfig: {
    extends: 'lighthouse:default',
    settings: {
      maxWaitForFcp: 15 * 1000,
      maxWaitForLoad: 35 * 1000,
      formFactor: 'desktop',
      throttling: {
        rttMs: 40,
        throughputKbps: 10 * 1024,
        cpuSlowdownMultiplier: 1,
        requestLatencyMs: 0, // 0 means unset
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0,
      },
      screenEmulation: {
        mobile: false,
        width: 1350,
        height: 940,
        deviceScaleFactor: 1,
        disabled: false,
      },
      emulatedUserAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
      skipAudits: [
        // Skip the h2 audit so it doesn't lie to us. See https://github.com/GoogleChrome/lighthouse/issues/6539
        'uses-http2',
        // There are always bf-cache failures when testing in headless. Reenable when headless can give us realistic bf-cache insights.
        'bf-cache',
        // STRETCH: Find a way to clear cookies before running the test, like devtools does; lowers best practices score a lot without this
        'third-party-cookies',
      ],
    },
  },
  options: {
    logLevel: 'info',
    output: 'html', // <-- change output to html/json as needed
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
  },
  chrome,
};

export default config;
