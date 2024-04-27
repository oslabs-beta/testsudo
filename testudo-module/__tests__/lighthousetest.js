const fs = require('fs');
const path = require('path');
const runLighthouse = require('../src/core/lighthouse.js');

jest.mock('lighthouse');
jest.mock('node-fetch', () => jest.fn());

describe('lighthouse unit tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('runs tests', () => {
    it('posts lhr results', async () => {
      const url = 'http://spotify.com';
      const projectID = '123456';
      const lhr = {
        categories: {
            performance: {
                score: 0.09
            }
        },
        audits: {
          'first-contentful-paint': {numericValue: 30},
          'speed-index': {numericValue: 50},
          'largest-contentful-paint': { numericValue: 20 },
          'total-blocking-time': { numericValue: 100 },
          'cumulative-layout-shift': { numericValue: 0.5 },
        }
      }
      require('lighthouse').default.mockResolvedValue({lhr});

      await runLighthouse(url, projectID);

      expect(require('node-fetch')).toHaveBeenCalledWith(`http://localhost:3001/projects/FE/${projectID}`,
      expect.objectContaining({
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            projectID,
            firstContentfulPaint: 30,
            speedIndex: 50,
            largestContentfulPaint: 20,
            totalBlockingTime: 100,
            cumulativeLayoutShift: 0.5,
            performance: 9
        }),
      }))
      expect(chrome.kill).toHaveBeenCalled();
    })
  })
})