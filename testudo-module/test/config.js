import * as chromeLauncher from 'chrome-launcher';

const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

const config = {
  // desktop configuration object
  desktopConfig: {
    extends: 'lighthouse:default',
    settings: {
      // copied exactly from the lighthouse test parameters
      additionalTraceCategories: null,
      blankPage: 'about:blank',
      blockedUrlPatterns: null,
      budgets: null,
      auditMode: false,
      extraHeaders: null,
      onlyAudits: null,
      precomputedLanternData: null,
      cpuQuietThresholdMs: 1000,
      maxWaitForFcp: 30000,
      debugNavigation: false,
      disableFullPageScreenshot: false,
      disableStorageReset: true,
      maxWaitForLoad: 45000,
      gatherMode: false,
      pauseAfterFcpMs: 1000,
      pauseAfterLoadMs: 1000,
      formFactor: 'desktop',
      emulatedUserAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
      networkQuietThresholdMs: 1000,
      throttling: {
        cpuSlowdownMultiplier: 1,
        downloadThroughputKbps: 0,
        requestLatencyMs: 0,
        rttMs: 40,
        throughputKbps: 10240,
        uploadThroughputKbps: 0,
      },
      screenEmulation: {
        deviceScaleFactor: 1.75,
        disabled: true,
        height: 823,
        mobile: true,
        width: 412,
      },
      throttlingMethod: 'simulate',
      usePassiveGathering: false,
      skipAboutBlank: false,
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
  // affects the output/results of calling the lighthouse function
  options: {
    logLevel: 'info',
    output: 'html', // <-- change output to html/json as needed
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
  },
  // instance of chrome initiated to kill in test file
  chrome,
};

export default config;
