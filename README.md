# testudo



 ## Lighthouse metrics
  Of 02/25/2024 the latest version of Lighthouse is 11.

### Core Web Vitals:

  #### [Perfromance](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring) - MVP features
Lighthouse 10 Aduit Scoring System

[Understanding LHR (Lighthouse Result Object)](https://github.com/GoogleChrome/lighthouse/blob/main/docs/understanding-results.md) - Where did the 'O' go?

|acronym|audit categories| Weight | Brief Discription |
|----|----|---|----|
|   FCP | [First Contenful Paint](https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint) | 10 %|marks the time at which the first text or image is painted|
|   SI |[Speed Index](https://developer.chrome.com/docs/lighthouse/performance/speed-index) |10%|shows how quickly the contents of a page are visibly populated|
|   TBT | [Total Blocking Time](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time) |25%|sum of all time periods between FCP and Time to Interactive|
|   LCP | [Largest Contenful Paint](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint) |30%|marks the time at which the largest text or image is painted|
|   CLS | [Cumulative Layout Shift](https://web.dev/articles/cls) |25%| measures the movement of visible elements within the viewport|
|
  #### [Accessibility](https://developer.chrome.com/docs/lighthouse/accessibility/scoring) - Stretch feature
  ###### Each metrics are pass/fail, weighted score of importantance from 1-10.

  Some examples of Accessiblity Metrics:
  

  |description|weight|
  |---|---|
  |[Button has accessible names](https://dequeuniversity.com/rules/axe/4.7/button-name)|(10)|
  |[No Forms have multiple lablels](https://dequeuniversity.com/rules/axe/4.7/form-field-multiple-labels)|(3)|
  |[Links must have descernible text](https://dequeuniversity.com/rules/axe/4.7/link-name)|(7)|
  |[Image buttons must have alternate text](https://dequeuniversity.com/rules/axe/4.7/input-image-alt)|(10)|

  #### Best Practices - ?Stretch feature?


[Each metrics are just general guidelines of how to use good practices to make your code run smoothly](https://developer.chrome.com/docs/lighthouse/best-practices/doctype)

