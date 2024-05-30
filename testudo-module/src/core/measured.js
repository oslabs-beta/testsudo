const axios = require('axios');

const metrics = {
  totalRequests: 0,
  averageResponseTime: 0,
  pathsInfo: {},
  errors: 0,
  concurrentRequests: 0,
  totalPayloadSize: 0,
  averagePayloadSize: 0,
  performanceScore: 100, // Start with a perfect score, which will be adjusted
};

const handleMeasuredRequestFactory = (projectID) => {
  return (req, res, next) => {
    metrics.concurrentRequests += 1;
    const start = process.hrtime();

    res.on('finish', async () => {
      const diff = process.hrtime(start);
      const duration = (diff[0] * 1e9 + diff[1]) / 1e6; // Convert to milliseconds
      metrics.totalRequests++;
      metrics.averageResponseTime =
        (metrics.averageResponseTime * (metrics.totalRequests - 1) + duration) /
        metrics.totalRequests;
      metrics.concurrentRequests--;

      const requestBodySize = req.socket.bytesRead;
      metrics.totalPayloadSize += requestBodySize;
      metrics.averagePayloadSize =
        metrics.totalPayloadSize / metrics.totalRequests;

      const endMemoryUsage = process.memoryUsage();

      // Update the performance score based on the latest metrics
      updatePerformanceScore(duration, metrics.errors, endMemoryUsage);

      // Prepare and send updated metrics and performance score to the server
      const metricsData = {
        path: req.path,
        duration,
        requestBodySize,
        totalRequests: metrics.totalRequests,
        concurrentRequests: metrics.concurrentRequests,
        errors: metrics.errors,
        rss: Math.round((endMemoryUsage.rss / 1024 / 1024) * 100) / 100,
        heapTotal:
          Math.round((endMemoryUsage.heapTotal / 1024 / 1024) * 100) / 100,
        heapUsed:
          Math.round((endMemoryUsage.heapUsed / 1024 / 1024) * 100) / 100,
        external:
          Math.round((endMemoryUsage.external / 1024 / 1024) * 100) / 100,
        averageResponseTime: metrics.averageResponseTime,
        averagePayloadSize: metrics.averagePayloadSize,
        performanceScore: metrics.performanceScore,
        projectID,
      };

      axios
        .post(
          `http://testsudo-prod.eba-3rruicnb.us-east-1.elasticbeanstalk.com/projects/BE/${projectID}`,
          metricsData
        )
        .then(() =>
          console.log('Metrics data and performance score sent to the server.')
        )
        .catch((err) =>
          console.error('Error sending metrics data to the server:', err)
        );

      console.log(
        `Request to ${req.path} took ${duration} ms. Concurrent requests: ${metrics.concurrentRequests}`
      );
      console.log('Back end metrics data: ', metricsData);
    });

    res.on('error', () => {
      metrics.errors++;
      updatePerformanceScore(null, metrics.errors, null); // Adjust score due to error
    });

    next();
  };
};

function updatePerformanceScore(duration, errors, memoryUsage) {
  if (duration > 500) {
    metrics.performanceScore -= (duration - 500) * 0.1;
  }
  metrics.performanceScore -= errors * 5;
  if (memoryUsage) {
    // Example of deducting points based on memory usage
    metrics.performanceScore -= memoryUsage.heapUsed / 1024 / 1024 / 100; // Deduct points based on used heap size in MB
  }
  metrics.performanceScore = Math.max(0, metrics.performanceScore); // Ensure score doesn't go below 0
}

module.exports = { handleMeasuredRequestFactory };
