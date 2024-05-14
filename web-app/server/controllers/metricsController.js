
const db = require('../models/sql.js');
const { Security } = require('../models/mongodb.js');

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

      if (entries.length > 0) {
        const lastEntry = entries[entries.length - 1][1];
        res.locals.latestFE = lastEntry || undefined;
      } else {
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
      if (entries.length > 0) {
        const lastEntry = entries[entries.length - 1][1];
        res.locals.latestBE = lastEntry || undefined;
      } else {
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

metricsController.getSecurityData = async (req, res, next) => {
  try {
    const projectID = req.params.projectID;
    const project = await Security.findOne({ projectID: projectID });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.locals.securityMetrics = project.data;
    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
    return next();
  }
}


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

metricsController.postSecurityData = async (req, res, next) => {
  try {
    const editedReport = req.body;
    const projectID = req.params.projectID;
    console.log('securityController.postSecurityDataMongo projectID is ', projectID)

    const securityDataArray = [];
    for (const entry of editedReport) {
      const { severity, cwe_id, title, description, filename, line_number } =
        entry;
      const securityData = {
        severity,
        cwe_id,
        title,
        description,
        filename,
        line_number,
      };

      securityDataArray.push(securityData);
    }

    const savedData = await Security.findOneAndUpdate(
      { projectID: projectID },
      { $set: { data: securityDataArray } },
      { upsert: true, new: true }
    );
    console.log('Scan results added to database');
    res.json(savedData);
    res.locals.securityDataArray = savedData;
  } catch (err) {
    return next({
      log:
        'securityController.postSecurityDataMongo - error adding project data: ' +
        err,
      status: 500,
      message: {
        err: 'securityController.postSecurityDataMongo - error adding project data:',
      },
    });
  }
}

module.exports = metricsController;
