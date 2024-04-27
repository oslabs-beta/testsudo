
const dotenv = require('dotenv');
const { handleMeasuredRequestFactory } = require('./core/measured.js');
const runLighthouse = require('./core/lighthouse.js');
const runBearerScript = require('./core/bearerScriptJson.js')

function initializeTestudo (expressApp, options = {}) {
    dotenv.config();
    if (options.lighthouseUrl) {
        runLighthouse(options.lighthouseUrl, options.projectID);
    }
    if (expressApp) {
        const handleMeasuredRequest = handleMeasuredRequestFactory(options.projectID);
        expressApp.use(handleMeasuredRequest);
    }
    if (options.enableSecurityScan) {
        runBearerScript(options.projectID);
    }
}

module.exports = { initializeTestudo };
