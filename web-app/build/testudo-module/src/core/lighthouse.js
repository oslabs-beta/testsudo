"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs = require('fs');
require('dotenv').config();
const PROJECTID = process.env.PROJECTID;
const URL = process.env.URL;
const webAppURL = require('./config.js');
const runLighthouse = (address, projectID) => __awaiter(void 0, void 0, void 0, function* () {
    const configPromise = require('./lighthouse-config');
    const config = yield configPromise;
    const { desktopConfig, options, chrome } = config;
    console.log('address is ', address);
    const postData = (url, data) => __awaiter(void 0, void 0, void 0, function* () {
        const { default: fetch } = yield import('node-fetch');
        yield fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    });
    const lighthouse = (yield import('lighthouse')).default;
    const runnerResult = yield lighthouse(address, options, desktopConfig);
    console.log('Report is done for', address);
    console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);
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
        bestPractices: runnerResult.lhr.categories['best-practices'].score * 100,
    };
    console.log(metricsHolder);
    postData(`${webAppURL}${projectID}`, metricsHolder);
    yield chrome.kill();
});
module.exports = runLighthouse;
