# Testsudo v1.0.0

## Product Description

![logo](web-app/client/assets/logo.jpg)

Welcome to Testsudo, a one-stop testing suite enabling you to test your project's frontend, backend, and security performance!

With a simple CLI command, Testsudo will perform some testing magic and give you a range of metrics for your project on a compatible web application. Rather than searching for 3 separate performance optimization tools, Testsudo abstracts that away into a single command.

Testsudo allows you to:

- Track multiple projects on the web application, each with its own unique Dashboard
- Test each page of your project and drills down into the metrics by path

## Instructions on using the Testsudo Module

1. Sign up and login to Testsudo <http://testsudo.com>.

2. Create a new project and copy the Project ID.

3. On your terminal, run `npm i @testsudo/testsudo`.

4. Create a `testsudoConfig.js` in the root directory of your consuming app.

```
module.exports = {
    lighthouseUrl: <insert url of what project you want to test>,
    projectID: <insert project id from the web app in quotes>,
};
```

4. In the consuming app’s server.js file, add the following code immediately after app is initialized (`const app = express()`):

If using CommonJS:

```
const testsudo = require(‘testsudo’);
const testsudoConfig = require(‘../testsudoConfig.js’); // make sure this is the actual location of testsudoConfig.js
testsudo.initializeTestsudo(app, testsudoConfig);
```

If using ES6+:

```
import testsudo from 'testsudo';
import testsudoConfig from '../testsudoConfig.js'; // make sure this is the actual location of testsudoConfig.js
testsudo.initializeTestsudo(app, testsudoConfig);
```

5. Run your development environment as you would normally would (e.g., npm run dev).

6. Review your project dashboard on Testsudo <http://testsudo.com>

## Frontend Testing

### Lighthouse metrics

Of 05/13/2024 the latest version of Lighthouse is 12.

### Core Web Vitals:

#### [Performance](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring)

Lighthouse 10 Audit Scoring System

[Understanding LHR (Lighthouse Result Object)](https://github.com/GoogleChrome/lighthouse/blob/main/docs/understanding-results.md)

| acronym | audit categories                                                                                                        | Weight | Brief Description                                                                                                                    |
| ------- | ----------------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| FCP     | [First Contenful Paint](https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint)                | 10%    | Marks the time at which the first text or image is painted                                                                           |
| SI      | [Speed Index](https://developer.chrome.com/docs/lighthouse/performance/speed-index)                                     | 10%    | Shows how quickly the contents of a page are visibly populated                                                                       |
| TBT     | [Total Blocking Time](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time)          | 25%    | Sum of all time periods between FCP and Time to Interactive (i.e., the amount of time it takes for the page to be fully interactive) |
| LCP     | [Largest Contenful Paint](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint) | 30%    | Marks the time at which the largest text or image is painted                                                                         |
| CLS     | [Cumulative Layout Shift](https://web.dev/articles/cls)                                                                 | 25%    | Measures the movement of visible elements within the viewport                                                                        |

|

#### [Accessibility] (https://developer.chrome.com/docs/lighthouse/accessibility/scoring)

###### Each metrics are pass/fail, weighted score of importance from 1-10.

Some examples of Accessiblity Metrics:

| description                                                                                            | weight |
| ------------------------------------------------------------------------------------------------------ | ------ |
| [Button has accessible names](https://dequeuniversity.com/rules/axe/4.7/button-name)                   | (10)   |
| [No Forms have multiple lablels](https://dequeuniversity.com/rules/axe/4.7/form-field-multiple-labels) | (3)    |
| [Links must have descernible text](https://dequeuniversity.com/rules/axe/4.7/link-name)                | (7)    |
| [Image buttons must have alternate text](https://dequeuniversity.com/rules/axe/4.7/input-image-alt)    | (10)   |

#### Best Practices

[Each set of metrics are just general guidelines of how to use good practices to make your code run smoothly](https://developer.chrome.com/docs/lighthouse/best-practices/doctype)

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

Security Metrics Warning Categories:

- Warning
- Low
- Medium
- High
- Critical

You can click a warning category of the pie chart to isolate only warnings of that kind in the other sections.

The Security Vulnerabilities section will display a breakdown of the quantity of each vulnerability your project has by title.

The Location of Vulnerabilities section will show the type of vulnerability along with the file location of the vulnerability inside of your project.

## Contributors

<table>
  <tr>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/99973059?v=4" width="140px;" alt=""/>
      <br />
      <sub><b>Daniel Sin</b></sub>
      <br />
      <a href="#">🖇️</a>
      <a href="https://github.com/heymistersin">🐙</a>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/35116242?v=4" width="140px;" alt=""/>
      <br />
      <sub><b>Trang Do</b></sub>
      <br />
      <a href="#">🖇️</a>
      <a href="https://github.com/trangyz">🐙</a>
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/119250512?v=4" width="140px;" alt=""/>
      <br />
      <sub><b>Paul Krapivin</b></sub>
      <br />
      <a href="#">🖇️</a>
      <a href="https://github.com/PavelKrapivin">🐙</a>
    </td>
     <td align="center">
      <img src="https://avatars.githubusercontent.com/u/144400166?v=4" width="140px;" alt=""/>
      <br />
      <sub><b>Wan Ting Lee</b></sub>
      <br />
      <a href="#">🖇️</a>
      <a href="https://github.com/wantinglee90">🐙</a>
    </td>
     <td align="center">
      <img src="https://avatars.githubusercontent.com/u/140926208?s=400&u=1754b0edab1f319f20e1da263226b20fea9e3bd8&v=4" width="140px;" alt=""/>
      <br />
      <sub><b>Aaron Rivas</b></sub>
      <br />
      <a href="https://www.linkedin.com/in/aaronrivas/">🖇️</a>
      <a href="https://github.com/arivreduce">🐙</a>
    </td>

  </tr>
</table>

- 🖇️ = LinkedIn
- 🐙 = Github
