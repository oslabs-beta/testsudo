# testudo
 
## Frontend Testing
 ### Lighthouse metrics
  Of 02/25/2024 the latest version of Lighthouse is 11.

### Core Web Vitals:

  #### [Perfromance](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring) - MVP features
Lighthouse 10 Aduit Scoring System

[Understanding LHR (Lighthouse Result Object)](https://github.com/GoogleChrome/lighthouse/blob/main/docs/understanding-results.md) - Where did the 'O' go?

|acronym|audit categories| Weight | Brief Discription |
|----|----|---|----|
|   FCP | [First Contenful Paint](https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint) |10%| Marks the time at which the first text or image is painted|
|   SI |[Speed Index](https://developer.chrome.com/docs/lighthouse/performance/speed-index) |10%|Shows how quickly the contents of a page are visibly populated|
|   TBT | [Total Blocking Time](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time) |25%|Sum of all time periods between FCP and Time to Interactive|
|   LCP | [Largest Contenful Paint](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint) |30%|Marks the time at which the largest text or image is painted|
|   CLS | [Cumulative Layout Shift](https://web.dev/articles/cls) |25%| Measures the movement of visible elements within the viewport|
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

## Backend Testing


Different types of backend testing:

 
 Load
   - Benchmarking test
   - Should be the first test you run.
   - To assess current performance of concurrent users/request per second.
     - performance of system under typical and peak load
     - To have a barometer to compare against for the future. 
     - great for CI/CD.
     - Use the load test to test against other test ie. spike and stress.

 
 Spike (strength training)
   - similar to stress test but instead of ramping the test in steady increament over relatively long time, but 'spikes' it over a very short amount of ti     me

 Stress (endurance training?)
   - Limits of the system (verifiy reliablity and stabality)
   - How far can we push it
   - under extreme condition
   - what is the max capacity of users/throughput    
   - what is the breaking point and it's failure mode
   - will the system need a manual intervention to recover after the stress test is complete
 
 
 Soak (endurance training? or maybe long term review)
   - reliablity over long term, usually the longest test, usually hours
     - testing for bugs and memory leaks -\ can lead to crash/restarts
     - ? Verify that expected application restarts don't lose requests
     - ? Find bugs related to race-conditions that appear sporadically
     - Makes sure the DB doesn't exhaust the alloted storage space and stops
     - ? Make sure your logs don't exhaust the alloted disk storage (what is logs referring to?)                                                          
     - Makes sure the external services (?) you depend on don't stop working after certain amount of request are executed.


### MVP instructions

1. in the testudo repo:

    make a symoblic npm link: ```npm link```

    run the script:
    ``` npm run dev ```

2. sign up for an account and login
3. create a project and copy the project id

4. in the consuming app, create an env file.

    initalize the project id string with the variable ```PROJECTID```

    ie: ```PROJECTID=<paste your project id string here>```

5. in the same file, paste the URI of the SQL with the variable ```PG_URI```

    ie: ```PG_URI=<paste your sql uri string here>```

6. run ```npm link testudo```

7. in the root directory of the consuming app:

    create new file named ```testudo.mjs``` (cli ```touch <name-of-file.extension```)

    paste the following into testudo.mjs, replacing ```<address here>``` with the address (in string) where the consuming app will be launched (usually can be found in webpack):

    ```
    import { runLighthouse, handleMeasuredRequest } from 'testudo';
    import 'dotenv/config';

    const PROJECTID = process.env.PROJECTID;
    const results = await runLighthouse(<address here>, PROJECTID);

    export {handleMeasuredRequest};
    ```
8. in the consuming app's server file:

    where after ```app``` has been declared, paste the code below, below the declaration:

    ```
    const app = express();

    import('../testudo.mjs').then(({handleMeasuredRequest }) => {

        app.use(handleMeasuredRequest)
    ```
    at the very bottom of the same file paste the code below, below the very last code that was there previous:

    ```
    }).catch(error => console.error('Error loading testudo:', error));
    ```

9. in the consuming app's ```package.json```, add a new script under the ```scripts``` property, replacing the ```<consuming-script>``` with the script currently that runs both front and backend of your consuming app:

    ```    "testudo": "concurrently \"<consuming-script>\" \"sleep 5 && node testudo.mjs\"``` 

10. run ```npm run testudo```.


