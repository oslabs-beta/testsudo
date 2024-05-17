# Testsudo v1.0.0

## Product Description

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

Backend testing is an essential practice in software development that tests the server-side components of applications. This process ensures that the backend functions effectively under various conditions, supporting stability, performance, and security. It verifies server-side logic, database operations, API interactions, and other backend services. Implementing comprehensive backend testing with Testsudo, which utilizes the Measured module, allows developers to detect and address potential issues related to performance bottlenecks, errors, and inefficiencies.

Testsudo leverages the Measured module to provide detailed insights into backend operations through real-time metrics collection. Here are the key metrics tracked by the module:

<li><b>Total Requests</b>: Monitors the total number of requests that the server processes.
<li><b>Average Response Time</b>: Measures the mean time taken by the server to respond, highlighting the responsiveness of the application.
<li><b>Payload Size</b>: Observes the size of incoming data in requests to evaluate its impact on performance.
<li><b>Concurrent Requests</b>: Tracks the number of simultaneous requests, assessing the server’s capacity to manage multiple interactions.
Performance Score: Begins with an ideal score that adjusts based on criteria such as response time, error rates, and memory usage. This score provides an overall health indicator of the backend.
<li><b>Resource Utilization</b>: Records memory usage metrics such as RSS, heap total, heap used, and external resources to help pinpoint potential resource overuse or memory leaks.

<br>
The Measured module within Testsudo plays a crucial role in monitoring these metrics, ensuring that the backend maintains optimal performance levels and supports a seamless user experience. The data captured is also sent to a specified server endpoint for further analysis and proactive optimization efforts.



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
