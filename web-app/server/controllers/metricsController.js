
const db = require('../models/sql.js');

const metricsController = {};

metricsController.getFEData = (req, res, next) => {
  const projectID = req.params.projectID;
  const metricsQuery = `
    SELECT projectID, endpoint, timestamp, firstContentfulPaint, speedIndex, totalBlockingTime, largestContentfulPaint, cumulativeLayoutShift, performance, timeToInteractive, totalByteWeight, accessibility, bestPractices FROM femetrics WHERE projectID = $1
  `;
  const value = [projectID];

  try {
    db.query(metricsQuery, value).then((data) => {
      const filteredData = data.rows.filter((entry) => {
        return (
          entry.firstContentfulPaint !== null &&
          entry.speedIndex !== null &&
          entry.totalBlockingTime !== null &&
          entry.largestContentfulPaint !== null &&
          entry.cumulativeLayoutShift !== null &&
          entry.performance !== null &&
          entry.timeToInteractive !== null &&
          entry.totalByteWeight !== null &&
          entry.accessibility !== null &&
          entry.bestPractices !== null &&
          entry.endpoint !== null
        );
      });
      res.locals.FEmetrics = filteredData;
     
      const entries = Object.entries(filteredData);
      console.log(filteredData);

      // Check if there are any entries
      if (entries.length > 0) {
        // Access the last entry
        const lastEntry = entries[entries.length - 1][1];
        res.locals.latestFE = lastEntry || undefined;
      } else {
        // Handle the case where there are no entries (e.g., filteredData is empty)
        res.locals.latestFE = undefined;
      }

      return next();
    });
  } catch (err) {
    return next({
      log: 'metricsController.getData - error getting FE data',
      status: 500,
      message: { err: 'metricsController.getData - error getting FE data' },
    });
  }
};

metricsController.getBEData = (req, res, next) => {
  const projectID = req.params.projectID;
  const metricsQuery = `
    SELECT projectID, timestamp, duration, request_body_size, errors, rss, heap_total, heap_used, external, average_response_time, average_payload_size, total_requests, concurrent_requests, performance_score, path FROM metrics WHERE projectID = $1
  `;
  const value = [projectID];

  try {
    db.query(metricsQuery, value).then((data) => {
      const filteredData = data.rows.filter((entry) => {
        return (
          entry.duration !== null &&
          entry.request_body_size !== null &&
          entry.errors !== null &&
          entry.rss !== null &&
          entry.heap_total !== null &&
          entry.heap_used !== null &&
          entry.external !== null &&
          entry.average_response_time !== null &&
          entry.average_payload_size !== null &&
          entry.total_requests !== null &&
          entry.concurrent_requests !== null &&
          entry.performance_score !== null &&
          entry.path !== null
        );
      });
      res.locals.BEmetrics = filteredData;

      const entries = Object.entries(filteredData);
      // Check if there are any entries
      if (entries.length > 0) {
        // Access the last entry
        const lastEntry = entries[entries.length - 1][1];
        res.locals.latestBE = lastEntry || undefined;
      } else {
        // Handle the case where there are no entries (e.g., filteredData is empty)
        res.locals.response = undefined;
        res.locals.latestBE = undefined;
      }

      return next();
    });
  } catch (err) {
    return next({
      log: 'metricsController.getData - error getting BE data',
      status: 500,
      message: { err: 'metricsController.getData - error getting BE data' },
    });
  }
};

metricsController.postFEData = (req, res, next) => {
  try {
    const projectID = req.params.projectID;
    const {
      endpoint,
      firstContentfulPaint,
      speedIndex,
      totalBlockingTime,
      largestContentfulPaint,
      cumulativeLayoutShift,
      performance,
      timeToInteractive,
      totalByteWeight,
      accessibility,
      bestPractices
    } = req.body;
    const value = [
      projectID,
      endpoint,
      firstContentfulPaint,
      speedIndex,
      totalBlockingTime,
      largestContentfulPaint,
      cumulativeLayoutShift,
      performance,
      timeToInteractive,
      totalByteWeight,
      accessibility,
      bestPractices
    ];
    const postQuery = `INSERT INTO femetrics
    (projectID, endpoint, firstContentfulPaint, speedIndex, totalBlockingTime, largestContentfulPaint, cumulativeLayoutShift, performance, timeToInteractive, totalByteWeight, accessibility, bestPractices)
    VALUES 
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;

    db.query(postQuery, value).then((data) => {
      return next();
    });
  } catch (err) {
    return next({
      log: 'metricsController.postData - error adding project data: ' + err,
      status: 500,
      message: {
        err: 'metricsController.postData - error adding project data:',
      },
    });
  }
};

metricsController.postBEData = async (req, res, next) => {
  const projectID = req.params.projectID;
  console.log('project ID is ', projectID);
  const {
    path,
    duration,
    requestBodySize,
    totalRequests,
    concurrentRequests,
    errors,
    rss,
    heapTotal,
    heapUsed,
    external,
    averageResponseTime,
    averagePayloadSize,
    performanceScore
  } = req.body;
  console.log('ave payload size is ', averagePayloadSize);
  try {
    const queryText = `
                INSERT INTO metrics 
                (timestamp, path, duration, request_body_size, total_requests, concurrent_requests, errors, 
                rss, heap_total, heap_used, external, average_response_time, average_payload_size, projectid, performance_score)
                VALUES (CURRENT_TIMESTAMP, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
                `;
    await db.query(queryText, [
      path,
      duration,
      requestBodySize,
      totalRequests,
      concurrentRequests,
      errors,
      rss,
      heapTotal,
      heapUsed,
      external,
      averageResponseTime,
      averagePayloadSize,
      projectID,
      performanceScore
    ]);
    console.log('Metrics saved to database');
    return next();
  } catch (err) {
    console.error('Error saving metrics to database:', err.message);
    return next(err);
  }
};


// INFLUX //
// import { InfluxDB, Point } from '@influxdata/influxdb-client';
// import 'dotenv/config';

// const url = process.env.INFLUX_URL;
// const token = process.env.INFLUX_TOKEN;
// const org = process.env.INFLUX_ORG;
// const bucket = process.env.INFLUX_BUCKET;
// // const projectID = process.env.PROJECT_ID;

// const influxDB = new InfluxDB({ url, token });

// const writeApi = influxDB.getWriteApi(org, bucket);

// const measurementName = 'metrics';

// const metricsController = {};

// metricsController.getData = async (req, res, next) => {
//   const { userID, serverID } = req.body;

//   const query = `
//     from(bucket:"${bucket}")
//     |> range(start: 0)
//     |> filter (fn: (r) => r.userID == "${userID}" and r.serverID == "${serverID}")
//   `;

//   try {
//     const queryApi = influxDB.getQueryApi(org);

//     const result = await queryApi.queryRaw(query);

//     // to send back result
//     console.log('result from metricsController.getData, ', result);
//     return next();
//   } catch (err) {
//     console.log('error getting data from metricsController.getData ', err);
//     return next();
//   }
// };

// metricsController.postData = async (req, res, next) => {
//   console.log('entered metricsController.postData');
//   const {
//     userID,
//     serverID,
//     firstContentfulPaint,
//     speedIndex,
//     totalBlockingTime,
//     largestContentfulPaint,
//     cumulativeLayoutShift,
//     performance,
//   } = req.body;
//   console.log('req.body ', req.body);
//   console.log(
//     userID,
//     serverID,
//     firstContentfulPaint,
//     speedIndex,
//     totalBlockingTime,
//     largestContentfulPaint,
//     cumulativeLayoutShift,
//     performance
//   );

//   try {
//     console.log('in metricsController');
//     // create a point by calling the Point method
//     const point = new Point(measurementName)
//       .tag('userID', userID)
//       .tag('serverID', serverID)
//       .floatField('first-contentful-paint', firstContentfulPaint) // saved in milliseconds but to display in seconds
//       .floatField('speed-index', speedIndex) // saved in milliseconds but to display in seconds
//       .floatField('total-blocking-time', totalBlockingTime) // saved in milliseconds but to display in seconds
//       .floatField('largest-contentful-paint', largestContentfulPaint) // saved in milliseconds; display in milliseconds
//       .floatField('cumulative-layout-shift', cumulativeLayoutShift) // saved in milliseconds but to display in seconds
//       .floatField('performance', performance) // no unit
//       .timestamp(new Date());

//     console.log(` ${point}`);

//     await writeApi.writePoint(point);

//     writeApi.close().then(() => {
//       console.log('WRITE FINISHED in metricsController.postData');
//       return next();
//     });
//   } catch (err) {
//     console.log('error writing data in metricsController.postData ', err);
//     return next();
//   }
// };

module.exports = metricsController;
