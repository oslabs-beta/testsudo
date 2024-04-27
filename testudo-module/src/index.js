const dotenv = require('dotenv');
const { handleMeasuredRequestFactory } = require('./core/measured.js');
const runLighthouse = require('./core/lighthouse.js');

function initializeTestudo (expressApp, options = {}) {
    dotenv.config();
    if (options.lighthouseUrl) {
        runLighthouse(options.lighthouseUrl, options.projectID);
    }
    if (expressApp) {
        const handleMeasuredRequest = handleMeasuredRequestFactory(options.projectID);
        expressApp.use(handleMeasuredRequest);
    }
}

module.exports = { initializeTestudo, runLighthouse, handleMeasuredRequestFactory };
