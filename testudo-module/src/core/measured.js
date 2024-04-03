const db = require('../../../web-app/server/models/sql.js');

const metrics = {
    totalRequests: 0,
    averageResponseTime: 0,
    // pathsInfo: {},
    errors: 0,
    concurrentRequests: 0,
    totalPayloadSize: 0,
    averagePayloadSize: 0,
};

const handleMeasuredRequest = (req, res, next) => {
    const projectID = process.env.PROJECTID; // Read PROJECT_ID from environment variables
    metrics.concurrentRequests += 1;

    const start = process.hrtime();
    
    let requestBodySize = req.socket.bytesRead; // Initial read size

    res.on('finish', async () => {
        const diff = process.hrtime(start);
        const duration = (diff[0] * 1e9 + diff[1]) / 1e6; // Duration in milliseconds
        const endMemoryUsage = process.memoryUsage();

        // Prepare metrics data
        const metricsData = {
            path: req.path,
            duration,
            requestBodySize,
            totalRequests: ++metrics.totalRequests,
            concurrentRequests: --metrics.concurrentRequests, // Updated at the end of request
            errors: metrics.errors, // This assumes errors are tracked elsewhere
            rss: Math.round((endMemoryUsage.rss / 1024 / 1024) * 100) / 100,
            heapTotal: Math.round((endMemoryUsage.heapTotal / 1024 / 1024) * 100) / 100,
            heapUsed: Math.round((endMemoryUsage.heapUsed / 1024 / 1024) * 100) / 100,
            external: Math.round((endMemoryUsage.external / 1024 / 1024) * 100) / 100,
            averageResponseTime: ((metrics.averageResponseTime * (metrics.totalRequests - 1)) + duration) / metrics.totalRequests,
            averagePayloadSize: (metrics.totalPayloadSize + requestBodySize) / metrics.totalRequests // Updated to reflect new total
        };
        
        // Update in-memory metrics for payload size
        metrics.totalPayloadSize += requestBodySize;
        metrics.averagePayloadSize = metricsData.averagePayloadSize;

        // Insert metrics into the database
        try {
            const queryText = `
            INSERT INTO metrics 
            (timestamp, path, duration, request_body_size, total_requests, concurrent_requests, errors, 
            rss, heap_total, heap_used, external, average_response_time, average_payload_size, projectid)
            VALUES (CURRENT_TIMESTAMP, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            `;
            await db.query(queryText, [
                metricsData.path, metricsData.duration, metricsData.requestBodySize,
                metricsData.totalRequests, metricsData.concurrentRequests, metricsData.errors,
                metricsData.rss, metricsData.heapTotal, metricsData.heapUsed,
                metricsData.external, metricsData.averageResponseTime, metricsData.averagePayloadSize, projectID
            ]);
            console.log('Metrics saved to database');
        } catch (err) {
            console.error('Error saving metrics to database:', err.message);
        }
        console.log('PGURI is ', projectID);
        console.log(`Request to ${req.path} took ${duration} ms. Concurrent requests: ${metrics.concurrentRequests}`);
        console.log(metricsData);
    });

    res.on('error', () => {
        metrics.errors += 1; // Increment the error counter here
    });

    next();
};

module.exports = { handleMeasuredRequest };
