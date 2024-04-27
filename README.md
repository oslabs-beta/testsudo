# Testudo v1.0.0

## Instructions on using the Testudo Module

1. Sign up and login to Testudo <www.testudo.io>.

2. Create a new project and copy the Project ID.

3. On terminal, run ```npm i testudo```.
 
4. Create a ```testudoConfig.js``` in the root directory of your consuming app.
```
module.exports = {
    lighthouseUrl: <insert url of what you want to test>, 
    projectID: <insert project id from the web app in quotes>,
};
```

4. In the consuming app’s server.js file, add the following code immediately after app is initialized (```const app = express()```):

If using CommonJS:
```
const testudo = require(‘testudo’);
const testudoConfig = require(‘../testudoConfig.js’); // make sure this is the actual location of testudoConfig.js
testudo.initializeTestudo(app, testudoConfig);
```

If using ES6+:
```
import testudo from 'testudo';
import testudoConfig from '../testudoConfig.js'; // make sure this is the actual location of testudoConfig.js
testudo.initializeTestudo(app, testudoConfig);
```

5. Run your development environment as you would normally would (e.g., npm run dev).

6. Review your project dashboard on Testudo <www.testudo.io>
 
## Frontend Testing
 ### Lighthouse metrics
  Of 02/25/2024 the latest version of Lighthouse is 11.

### Core Web Vitals:

  #### [Performance](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring) - MVP features
Lighthouse 10 Audit Scoring System

[Understanding LHR (Lighthouse Result Object)](https://github.com/GoogleChrome/lighthouse/blob/main/docs/understanding-results.md) - Where did the 'O' go?

|acronym|audit categories| Weight | Brief Description |
|----|----|---|----|
|   FCP | [First Contenful Paint](https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint) |10%| Marks the time at which the first text or image is painted|
|   SI | [Speed Index](https://developer.chrome.com/docs/lighthouse/performance/speed-index) |10%| Shows how quickly the contents of a page are visibly populated|
|   TBT | [Total Blocking Time](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time) |25%| Sum of all time periods between FCP and Time to Interactive (i.e., the amount of time it takes for the page to be fully interactive)|
|   LCP | [Largest Contenful Paint](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint) |30%| Marks the time at which the largest text or image is painted|
|   CLS | [Cumulative Layout Shift](https://web.dev/articles/cls) |25%| Measures the movement of visible elements within the viewport|
|
  #### [Accessibility] (https://developer.chrome.com/docs/lighthouse/accessibility/scoring) - Stretch feature
  ###### Each metrics are pass/fail, weighted score of importance from 1-10.

  Some examples of Accessiblity Metrics:
  
  |description|weight|
  |---|---|
  |[Button has accessible names](https://dequeuniversity.com/rules/axe/4.7/button-name)|(10)|
  |[No Forms have multiple lablels](https://dequeuniversity.com/rules/axe/4.7/form-field-multiple-labels)|(3)|
  |[Links must have descernible text](https://dequeuniversity.com/rules/axe/4.7/link-name)|(7)|
  |[Image buttons must have alternate text](https://dequeuniversity.com/rules/axe/4.7/input-image-alt)|(10)|

  #### Best Practices - Stretch feature

[Each metrics are just general guidelines of how to use good practices to make your code run smoothly](https://developer.chrome.com/docs/lighthouse/best-practices/doctype)

## Backend Testing


Different types of backend testing:
 Load
   - Benchmarking test
   - Should be the first test you run.
   - To assess current performance of concurrent users/request per second.
     - Performance of system under typical and peak load
     - To have a barometer to compare against for the future. 
     - Great for CI/CD.
     - Use the load test to test against other test i.e. spike and stress.

 Spike (strength training)
   - sSmilar to stress test but instead of ramping the test in steady increament over relatively long time, but 'spikes' it over a very short amount of time

 Stress (endurance training)
   - Limits of the system (verify reliablity and stability)
   - How far can we push it under extreme condition
   - What is the max capacity of users/throughput    
   - What is the breaking point and its failure mode
   - Will the system need a manual intervention to recover after the stress test is complete
 
 Soak (endurance training or maybe long term review)
   - Reliablity over long term, usually the longest test, usually hours
     - Testing for bugs and memory leaks -\ can lead to crash/restarts
     - Verify that expected application restarts don't lose requests
     - Find bugs related to race-conditions that appear sporadically
     - Makes sure the DB doesn't exhaust the alloted storage space and stops
     - Makes sure your logs don't exhaust the alloted disk storage                                                       
     - Makes sure the external services you depend on don't stop working after certain amount of request are executed.

## Security Testing

