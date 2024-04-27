async function initializeConfig() {
  // Dynamically import chrome-launcher due to its ES Module format
  const chromeLauncher = await import('chrome-launcher');
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

  const config = {
    // Desktop configuration object
    desktopConfig: {
      extends: 'lighthouse:default',
      settings: {
        // Configuration settings...
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
        emulatedUserAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
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
        skipAudits: ['uses-http2', 'bf-cache', 'third-party-cookies'],
      },
    },
    options: {
      logLevel: 'info',
      output: 'html',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port,
    },
    chrome,
  };

  return config;
}

// Export a promise that resolves to `config`
module.exports = initializeConfig();
