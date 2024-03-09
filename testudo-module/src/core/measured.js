import { Collection } from 'measured-core';

const metricsCollection = new Collection();

// Create a timer metric for request durations
const httpRequestTimer = metricsCollection.timer('http.requests');

const metrics = {
    totalRequests: 0,
    averageResponseTime: 0,
    pathsInfo: {},
    errors: 0,
    concurrentRequests: 0,
    totalPayloadSize: 0,
    averagePayloadSize: 0,
};

const handleMeasuredRequest = (req, res, next) => {
    const start = process.hrtime();
    metrics.totalRequests += 1;
    metrics.concurrentRequests += 1;
    
    let requestBodySize = req.socket.bytesRead; // Initial read size

    res.on('finish', () => {
        const diff = process.hrtime(start);
        const duration = (diff[0] * 1e9 + diff[1]) / 1e6; // Duration in milliseconds
        metrics.averageResponseTime = ((metrics.averageResponseTime * (metrics.totalRequests - 1)) + duration) / metrics.totalRequests;

        // Update payload size metrics
        requestBodySize = req.socket.bytesRead - requestBodySize; // Calculate the size of the request body
        metrics.totalPayloadSize += requestBodySize;
        metrics.averagePayloadSize = metrics.totalPayloadSize / metrics.totalRequests;

        // Update path-specific info
        const path = req.path;
        if (!metrics.pathsInfo[path]) {
            metrics.pathsInfo[path] = { count: 1, averageTime: duration, averagePayloadSize: requestBodySize };
        } else {
            const pathInfo = metrics.pathsInfo[path];
            pathInfo.averageTime = ((pathInfo.averageTime * pathInfo.count) + duration) / (pathInfo.count + 1);
            pathInfo.averagePayloadSize = ((pathInfo.averagePayloadSize * pathInfo.count) + requestBodySize) / (pathInfo.count + 1);
            pathInfo.count += 1;
            metrics.pathsInfo[path] = pathInfo;
        }

        metrics.concurrentRequests -= 1; // Decrease concurrent requests count
        console.log(`Request to ${req.path} took ${duration} ms. Concurrent requests: ${metrics.concurrentRequests}`);
    });

    const used = process.memoryUsage();
    for (let key in used) {
        metrics[key] = Math.round((used[key] / 1024 / 1024) * 100) / 100; // Convert to MB
    }
    console.log("Memory Usage: ", metrics);
    

    res.on('error', () => {
        metrics.errors += 1;
    });

    next();
};

export { handleMeasuredRequest };
